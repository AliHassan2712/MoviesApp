"use client";

import { useEffect, useState } from "react";
import { useFavorite } from "@/contexts/FavoriteContext";
import { BackendPagination } from "@/types/pagination";
import { FavoriteItem, FavoriteType } from "@/types/favorite";
import { getFavoritesByIds } from "@/services/favorites.service";

const LIMIT = 6;

export function useFavorites() {
  const { favoriteList } = useFavorite();

  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] =
    useState<FavoriteType>("movies");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState<BackendPagination>({
      page: 1,
      limit: LIMIT,
      totalDocs: 0,
      totalPages: 0,
    });

  useEffect(() => {
    const ids = favoriteList
      .filter((f) => f.type === activeTab)
      .map((f) => f.id)
      .join(",");

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

    async function load() {
      try {
        setLoading(true);
        const json = await getFavoritesByIds(
          activeTab,
          ids,
          page,
          LIMIT
        );

        setItems(json.data || []);
        setPagination(json.pagination);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [favoriteList, activeTab, page]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

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
