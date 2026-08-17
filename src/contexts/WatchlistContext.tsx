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
import { WatchlistItem } from "@/types/watchlist";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const wasLoggedInRef = useRef(false);

  // 1. Initial load from local storage
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

  // 2. Persist to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // 3. Clear local storage on logout to prevent crossover leak between different user profiles
  useEffect(() => {
    if (!user) {
      if (wasLoggedInRef.current) {
        setItems([]);
        localStorage.removeItem(STORAGE_KEY);
      }
      wasLoggedInRef.current = false;
      return;
    }
    wasLoggedInRef.current = true;
  }, [user]);

  // 4. Toggle Watchlist
  const toggleWatchlist = useCallback(
    ({ id, type, name, poster }: ToggleWatchlistArgs) => {
      setItems((prev) => {
        const exists = prev.some((w) => w.id === id && w.type === type);
        let nextItems;
        if (exists) {
          nextItems = prev.filter((w) => !(w.id === id && w.type === type));
        } else {
          nextItems = [
            ...prev.filter((w) => !(w.id === id && w.type === type)),
            { id, type, name: name ?? id, poster },
          ];
        }
        return nextItems;
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
