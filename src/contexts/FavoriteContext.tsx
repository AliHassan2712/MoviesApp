"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FavoriteContextType = {
  favoriteList: (string | number)[];
  toggleFavorite: (id: string | number) => void;
};
const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);


export const FavoriteProvider = ({ children }: { children: ReactNode }) => {

const [favoriteList, setFavoriteList] = useState<(string | number)[]>([]);
// const [favoriteList, setFavoriteList] = useState<string[]>([]);


  useEffect(() => {
    const stored = localStorage.getItem("favoriteList");
    if (stored) {
      setFavoriteList(JSON.parse(stored));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);

  const toggleFavorite = (id: string | number) => {
  setFavoriteList(prev =>
    prev.includes(id)
      ? prev.filter(fav => fav !== id)
      : [...prev, id]
  );
};


  return (
    <FavoriteContext.Provider value={{ favoriteList, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};


export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error("useFavorite must be used inside FavoriteProvider");
  return context;
};
