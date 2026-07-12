"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { WatchlistItem } from "@/types/watchlist";

export type WatchlistType = "movies" | "series";

type ToggleWatchlistArgs = {
  id: string;
  type: WatchlistType;
  name?: string;
  poster?: string;
};

type WatchlistContextType = {
  items: WatchlistItem[];
  toggleWatchlist: (args: ToggleWatchlistArgs) => void;
  isInWatchlist: (args: ToggleWatchlistArgs) => boolean;
  clearWatchlist: () => void;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);
const STORAGE_KEY = "watchlist";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggleWatchlist = useCallback(
    ({ id, type, name, poster }: ToggleWatchlistArgs) => {
      setItems((prev) => {
        const exists = prev.some((w) => w.id === id && w.type === type);
        if (exists) {
          return prev.filter((w) => !(w.id === id && w.type === type));
        }
        return [
          ...prev.filter((w) => !(w.id === id && w.type === type)),
          { id, type, name: name ?? id, poster },
        ];
      });
    },
    []
  );

  const isInWatchlist = useCallback(
    ({ id, type }: ToggleWatchlistArgs) =>
      items.some((w) => w.id === id && w.type === type),
    [items]
  );

  const clearWatchlist = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      toggleWatchlist,
      isInWatchlist,
      clearWatchlist,
    }),
    [items, toggleWatchlist, isInWatchlist, clearWatchlist]
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return ctx;
}
