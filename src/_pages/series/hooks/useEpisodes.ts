"use client";

import { useEffect, useState } from "react";
import { Episode } from "@/types/episodes";

export const useEpisodes = (seriesId?: string, seasonId?: string, episodesId?: string) => {
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [isloading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!seriesId || !seasonId || !API_URL) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      try {
        const url = !episodesId
          ? `${API_URL}/series/${seriesId}/seasons/${seasonId}/episodes?sort=episodeNumber`
          : `${API_URL}/series/${seriesId}/seasons/${seasonId}/episodes/${episodesId}`;

        const res = await fetch(url, {
          credentials: "include",
          signal: controller.signal,
        });

        const json = await res.json();
        setEpisodes(json.data);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [API_URL, seriesId, seasonId, episodesId]); 

  return { episodes, isloading };
};
