"use client";

//React
import { useState } from "react";

//types
import { WatchlistItem } from "@/types/watchlist";

export function useWatchlist() {
  const [items] = useState<WatchlistItem[]>([]);

  return {
    items,
    isEmpty: items.length === 0,
  };
}
