"use client";

import { useEffect, useMemo, useState } from "react";
import { useFavorite } from "@/contexts/FavoriteContext";
import { FavoriteType } from "@/types/favorite";
import { BackendPagination } from "@/types/pagination";
import { getFavoritesByIds } from "@/services/favorites.service";

const LIMIT = 8;

export function useFavorites() {
  const { favoriteList } = useFavorite();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<FavoriteType>("movies");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState<BackendPagination>({
    page: 1,
    limit: LIMIT,
    totalDocs: 0,
    totalPages: 0,
  });

  const ids = useMemo(
    () =>
      favoriteList
        .filter((f) => f.type === activeTab)
        .map((f) => f.id),
    [favoriteList, activeTab]
  );

  useEffect(() => {
    if (!ids.length) {
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
        const res = await getFavoritesByIds(
          activeTab,
          ids.join(","),
          page,
          LIMIT
        );

        if (page > 1 && res.data.length === 0) {
          setPage(page - 1);
          return;
        }

        setItems(res.data || []);
        setPagination(res.pagination);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [ids, activeTab, page]);

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
