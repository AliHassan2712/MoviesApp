"use client";

//React
import { useEffect, useState } from "react";

//types
import { Series } from "@/types/series";
import { BackendPagination } from "@/types/pagination";

//services
import { fetchSeries } from "@/services/series.service";

export function useSeries(query?: string) {
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<BackendPagination | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSeries() {
      setLoading(true);
      try {
        const data = await fetchSeries({ page, query, limit: 12 });
        setSeries(data.data ?? []);
        setPagination(data.pagination ?? null);
      } catch (err) {
        console.error("Series fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSeries();
  }, [page, query]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  return { series, loading, page, setPage, pagination };
}
