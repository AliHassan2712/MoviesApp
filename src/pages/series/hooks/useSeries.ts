"use client";

import { useEffect, useState } from "react";
import { BackendPagination } from "@/types/pagination";
import { Series } from "@/types/series";

export function useSeries(query?: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] =
    useState<BackendPagination | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSeries() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          ...(query ? Object.fromEntries(new URLSearchParams(query)) : {}),
        });

        const res = await fetch(`${API_URL}/series?${params}&limit=12`);
        const data = await res.json();

        setSeries(data.data ?? []);
        setPagination(data.pagination ?? null);
      } catch (err) {
        console.error("Series fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSeries();
  }, [API_URL, page, query]);

  // 🔑 Reset page when genre changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  return {
    series,
    loading,
    page,
    setPage,
    pagination,
  };
}
