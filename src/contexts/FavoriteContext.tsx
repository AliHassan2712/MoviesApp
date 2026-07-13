"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { FavoriteItem, FavoriteType } from "@/types/favorite";
import { useAuth } from "@/contexts/AuthContext";
import { updateFavoritesOnServer } from "@/services/user.service";

type ToggleFavoriteArgs = {
  id: string;
  type: FavoriteType;
};

type FavoriteContextType = {
  favoriteList: FavoriteItem[];
  toggleFavorite: (args: ToggleFavoriteArgs) => void;
  isFavorite: (args: ToggleFavoriteArgs) => boolean;
  clearFavorites: () => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);
const STORAGE_KEY = "favorites";

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuth();
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);
  const isInitialSyncRef = useRef(true);
  const wasLoggedInRef = useRef(false);

  // 1. Initial load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFavoriteList(JSON.parse(saved));
      } catch {
        setFavoriteList([]);
      }
    }
  }, []);

  // 2. Persist to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteList));
  }, [favoriteList]);

  // 3. Sync from backend user data on login/logout (Merge & Sync)
  useEffect(() => {
    if (!user) {
      // If the user was logged in and now logged out -> clear local favorites to prevent user crossover leak
      if (wasLoggedInRef.current) {
        setFavoriteList([]);
        localStorage.removeItem(STORAGE_KEY);
      }
      wasLoggedInRef.current = false;
      isInitialSyncRef.current = true;
      return;
    }

    // Set logged in flag
    wasLoggedInRef.current = true;

    if (user.favorites) {
      setFavoriteList((prev) => {
        const localIds = prev.map((f) => f.id);
        const serverIds = user.favorites!.map((f) => f._id);
        const mergedIds = Array.from(new Set([...localIds, ...serverIds]));
        
        const mergedList = mergedIds.flatMap((id) => {
          const existing = prev.find((f) => f.id === id);
          if (existing) return [existing];
          return [
            { id, type: "movies" as const },
            { id, type: "series" as const },
          ];
        });

        // Sync back to server if guest added items before logging in
        if (isInitialSyncRef.current && localIds.length > 0) {
          const payload = mergedList.map((f) => ({
            item: f.id,
            itemType: f.type === "movies" ? ("Movie" as const) : ("Series" as const),
          }));
          updateFavoritesOnServer(payload)
            .then((res) => {
              const updatedUser = res.data?.user ?? res.user ?? res.data;
              if (updatedUser) {
                setUser((curr) => (curr ? { ...curr, ...updatedUser } : null));
              }
            })
            .catch((err) => {
              console.error("Failed to sync initial favorites with server:", err);
            });
        }

        isInitialSyncRef.current = false;
        return mergedList;
      });
    } else {
      isInitialSyncRef.current = false;
    }
  }, [user, setUser]);

  // 4. Toggle Favorite
  const toggleFavorite = useCallback(
    ({ id, type }: ToggleFavoriteArgs) => {
      setFavoriteList((prev) => {
        const exists = prev.some((f) => f.id === id && f.type === type);
        let nextList;
        if (exists) {
          nextList = prev.filter((f) => !(f.id === id && f.type === type));
        } else {
          nextList = [
            ...prev.filter((f) => !(f.id === id && f.type === type)),
            { id, type },
          ];
        }

        // Sync with server if logged in
        if (user) {
          const payload = nextList.map((f) => ({
            item: f.id,
            itemType: f.type === "movies" ? ("Movie" as const) : ("Series" as const),
          }));
          updateFavoritesOnServer(payload)
            .then((res) => {
              const updatedUser = res.data?.user ?? res.user ?? res.data;
              if (updatedUser) {
                setUser((curr) => (curr ? { ...curr, ...updatedUser } : null));
              }
            })
            .catch((err) => {
              console.error("Failed to sync toggle favorite with server:", err);
            });
        }

        return nextList;
      });
    },
    [user, setUser]
  );

  const isFavorite = useCallback(
    ({ id, type }: ToggleFavoriteArgs) =>
      favoriteList.some((f) => f.id === id && f.type === type),
    [favoriteList]
  );

  const clearFavorites = useCallback(() => {
    setFavoriteList([]);
    if (user) {
      updateFavoritesOnServer([])
        .then(() => {
          setUser((curr) => (curr ? { ...curr, favorites: [] } : null));
        })
        .catch((err) => {
          console.error("Failed to clear favorites on server:", err);
        });
    }
  }, [user, setUser]);

  const value = useMemo(
    () => ({
      favoriteList,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [favoriteList, toggleFavorite, isFavorite, clearFavorites]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const ctx = useContext(FavoriteContext);
  if (!ctx) {
    throw new Error("useFavorite must be used within FavoriteProvider");
  }
  return ctx;
}
