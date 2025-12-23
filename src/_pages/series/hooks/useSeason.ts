"use client";

import { useState, useEffect } from "react";
import { Season } from "@/types/season"

export const useSeason = (seriesId?: string, seasonId?: string) => {
  const [season, setSeason] = useState<Season[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      if (!seriesId) return;
      setIsLoading(true);
      try {
        const url = seasonId ? `${API_URL}/series/${seriesId}/seasons/${seasonId}` : `${API_URL}/series/${seriesId}/seasons?sort=seasonNumber`;
        const seasonRes = await fetch(url);
        const seasonData = await seasonRes.json();
        setSeason(seasonData.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [API_URL, seasonId, seriesId]);

  return {
    season,
    isLoading,
  };
};
