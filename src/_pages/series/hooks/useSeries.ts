"use client";

import { useEffect, useState } from "react";

import { BackendPagination } from "@/types/pagination";
import { Series } from "@/types/series"; // إذا اسم النوع عندك مختلف عدّله

import { fetchSeries } from "@/services/series.service";

export function useSeries(query?: string) {
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<BackendPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchSeries({
          page,
          query,
          signal: controller.signal,
        });

        setSeries(res.data || []);
        setPagination(res.pagination);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error("Series fetch error:", err);
        setError("Failed to load series");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [page, query]);

  return { series, loading, error, pagination, page, setPage };
}
