"use client";

//React
import { useEffect, useState, useMemo } from "react";

//types 
import { Series } from "@/types/series";

//services
import { getSeriesById } from "@/services/series.service";

//hooks
import { useSeries } from "../hooks/useSeries";
import { useSeason } from "../hooks/useSeason";

//contexts
import { useFavorite } from "@/contexts/FavoriteContext";

export function useSingleSeries(id: string) {
  const [singleSeries, setSeries] = useState<Series | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const { series, loading } = useSeries();
  const { season } = useSeason(singleSeries?._id);
  const { favoriteList, toggleFavorite } = useFavorite();

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        setIsLoading(true);
        const data = await getSeriesById(id);
        setSeries(data);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  // Similar series
  // based on shared genres
  const similarSeries = useMemo(() => {
    if (isloading || loading || !singleSeries || !series) return [];
    const genreSet = singleSeries.genres?.map(g => g._id);
    return series.filter(
      s =>
        s._id !== singleSeries._id &&
        s.genres?.some(g =>
          typeof g === "string" ? genreSet?.includes(g) : genreSet?.includes(g._id)
        )
    );
  }, [isloading, loading, singleSeries, series]);

  return { singleSeries, isloading, season, favoriteList, toggleFavorite, similarSeries, loading };
}
