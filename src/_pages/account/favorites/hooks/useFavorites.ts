"use client";

//React
import { useEffect, useState } from "react";

//contexts
import { useFavorite } from "@/contexts/FavoriteContext";

//types
import { BackendPagination } from "@/types/pagination";
import { FavoriteItem, FavoriteType } from "@/types/favorite";

//services
import { getFavoritesByIds } from "@/services/favorites.service";

const LIMIT = 8;

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

    // fetch favorites when favoriteList, activeTab, or page changes
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

    // fetch favorites
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

export default useFavorites;
