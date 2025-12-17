"use client";

import { useEffect, useState } from "react";
import { useFavorite } from "@/contexts/FavoriteContext";
import { BackendPagination } from "@/types/pagination";

/* ================= TYPES ================= */

export type FavoriteItemUI = {
  _id: string;
  name: string;
  poster?: string;
  releaseYear?: number;
  type: "movies" | "series";
};

/* ================= CONSTANTS ================= */

const LIMIT = 6;

/* ================= HOOK ================= */

export function useFavorites() {
  const { favoriteList } = useFavorite();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [items, setItems] = useState<FavoriteItemUI[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] =
    useState<"movies" | "series">("movies");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState<BackendPagination>({
      page: 1,
      limit: LIMIT,
      totalDocs: 0,
      totalPages: 0,
    });

  /* ================= FETCH FAVORITES ================= */

  useEffect(() => {
    if (!API_URL) return;

    const ids = favoriteList
      .filter((f) => f.type === activeTab)
      .map((f) => f.id)
      .join(",");

    // no favorites
    if (!ids) {
      setItems([]);
      setPagination({
        page: 1,
        limit: LIMIT,
        totalDocs: 0,
        totalPages: 0,
      });
      return;
    }

    async function fetchFavorites() {
      try {
        setLoading(true);

        const endpoint =
          activeTab === "movies" ? "movies" : "series";

        const res = await fetch(
          `${API_URL}/${endpoint}?_id=${ids}&page=${page}&limit=${LIMIT}`
        );

        const json = await res.json();

        setItems(
          (json.data || []).map((item: any) => ({
            ...item,
            type: activeTab,
          }))
        );

        setPagination(json.pagination);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [API_URL, favoriteList, activeTab, page]);

  /* ================= RESET PAGE ON TAB CHANGE ================= */

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  /* ================= RETURN ================= */

  return {
    loading,

    items,

    activeTab,
    setActiveTab,

    page,
    setPage,

    pagination,
  };
}
