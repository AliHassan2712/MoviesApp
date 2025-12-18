"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ================= TYPES ================= */

export type FavoriteType = "movies" | "series";

export type FavoriteItem = {
  id: string;
  type: FavoriteType;
};

type FavoriteContextType = {
  favoriteList: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (item: FavoriteItem) => boolean;
  clearFavorites: () => void;
};

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "favoriteList";

/* ================= CONTEXT ================= */

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

/* ================= PROVIDER ================= */

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);

  /* Load favorites from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavoriteList(JSON.parse(stored));
      }
    } catch {
      setFavoriteList([]);
    }
  }, []);

  /* Save favorites to localStorage */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favoriteList)
    );
  }, [favoriteList]);

  /* Toggle favorite item */
  const toggleFavorite = (item: FavoriteItem) => {
    setFavoriteList(prev =>
      prev.some(
        f => f.id === item.id && f.type === item.type
      )
        ? prev.filter(
          f =>
            !(
              f.id === item.id &&
              f.type === item.type
            )
        )
        : [...prev, item]
    );
  };

  /* Check if item is favorite */
  const isFavorite = (item: FavoriteItem) =>
    favoriteList.some(
      f => f.id === item.id && f.type === item.type
    );

  /* Clear all favorites */
  const clearFavorites = () => {
    setFavoriteList([]);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteList,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useFavorite must be used inside FavoriteProvider"
    );
  }
  return context;
}
