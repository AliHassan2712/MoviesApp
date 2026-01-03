"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FavoriteItem, FavoriteType } from "@/types/favorite";

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

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

const STORAGE_KEY = "favorites";

export function FavoriteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);

  /** تحميل من localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavoriteList(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load favorites", err);
    }
  }, []);

  /** حفظ في localStorage */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteList));
  }, [favoriteList]);

  /** فحص هل العنصر Favorite */
  const isFavorite = useCallback(
    ({ id, type }: ToggleFavoriteArgs) => {
      return favoriteList.some(
        (fav) => fav.id === id && fav.type === type
      );
    },
    [favoriteList]
  );

  /** إضافة / حذف Favorite */
  const toggleFavorite = useCallback(
    ({ id, type }: ToggleFavoriteArgs) => {
      setFavoriteList((prev) => {
        const exists = prev.some(
          (fav) => fav.id === id && fav.type === type
        );

        if (exists) {
          return prev.filter(
            (fav) => !(fav.id === id && fav.type === type)
          );
        }

        return [...prev, { id, type }];
      });
    },
    []
  );

  const clearFavorites = useCallback(() => {
    setFavoriteList([]);
  }, []);

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
    throw new Error("useFavorite must be used inside FavoriteProvider");
  }
  return ctx;
}
