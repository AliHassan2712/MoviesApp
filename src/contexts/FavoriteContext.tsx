"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FavoriteItem, FavoriteType } from "@/types/favorite";

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
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteList));
  }, [favoriteList]);

  const toggleFavorite = useCallback(
    ({ id, type }: ToggleFavoriteArgs) => {
      setFavoriteList((prev) => {
        const exists = prev.some((f) => f.id === id && f.type === type);
        if (exists) {
          return prev.filter((f) => !(f.id === id && f.type === type));
        }
        return [...prev.filter(f => !(f.id === id && f.type === type)), { id, type }];
      });
    },
    []
  );

  const isFavorite = useCallback(
    ({ id, type }: ToggleFavoriteArgs) =>
      favoriteList.some((f) => f.id === id && f.type === type),
    [favoriteList]
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
    throw new Error("useFavorite must be used within FavoriteProvider");
  }
  return ctx;
}
