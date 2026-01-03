"use client";

import { useEffect, useMemo, useState } from "react";
import { Season } from "@/types/season";

export const useSeason = (seriesId?: string, seasonId?: string) => {
  const [season, setSeason] = useState<Season[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = useMemo(() => {
    if (!API_URL || !seriesId) return null;
    return seasonId
      ? `${API_URL}/series/${seriesId}/seasons/${seasonId}`
      : `${API_URL}/series/${seriesId}/seasons?sort=seasonNumber`;
  }, [API_URL, seriesId, seasonId]);

  useEffect(() => {
    if (!url) {
      setSeason(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        setSeason(data.data ?? null);
      } catch (err: any) {
        if (err?.name !== "AbortError") console.error("Fetch error:", err);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { season, isLoading };
};
