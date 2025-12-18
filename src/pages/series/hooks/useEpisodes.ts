"use client";

import { useState, useEffect } from "react";
import {Episode} from "@/types/episodes"

export const useEpisodes = (seriesId?: string,seasonId?: string,episodesId?:string) => {
  const [episodes, setEpisodes ] = useState<Episode []|null>(null);
  const [isloading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      if(!seriesId || !seasonId) return;
      setIsLoading(true);
      try {
        const url =!episodesId?`${API_URL}/series/${seriesId}/seasons/${seasonId}/episodes?sort=episodeNumber`:`${API_URL}/series/${seriesId}/seasons/${seasonId}/episodes/${episodesId}`
        const episodesRes = await fetch(url);
        const episodesData = await episodesRes.json();
        setEpisodes(episodesData.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [API_URL, seasonId,seriesId]); 

  return {
    episodes,
    isloading,
    
  };
};
