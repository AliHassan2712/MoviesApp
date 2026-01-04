"use client";

import { useEffect, useMemo, useState } from "react";

import { Series } from "@/types/series";
import { getSeriesById } from "@/services/series.service";

import { useSeries } from "./useSeries";
import { useSeason } from "./useSeason";

import { useFavorite } from "@/contexts/FavoriteContext";

export function useSingleSeries(id: string) {
  const [singleSeries, setSeries] = useState<Series | null>(null);
  const [isloading, setIsLoading] = useState(true);

  const { series, loading } = useSeries();
  const { season } = useSeason(singleSeries?._id);

  const { favoriteList, toggleFavorite } = useFavorite();

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        const data = await getSeriesById(id, controller.signal);
        setSeries(data);
      } catch (err: any) {
        if (err?.name !== "AbortError") console.error(err);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  const similarSeries = useMemo(() => {
    if (isloading || loading || !singleSeries || !series?.length) return [];

    const genreIds = new Set(
      singleSeries.genres?.map((g: any) => (typeof g === "string" ? g : g._id)) ?? []
    );

    return series.filter((s) => {
      if (s._id === singleSeries._id) return false;

      return s.genres?.some((g: any) => {
        const gid = typeof g === "string" ? g : g._id;
        return genreIds.has(gid);
      });
    });
  }, [isloading, loading, singleSeries, series]);

  return {
    singleSeries,
    isloading,
    season,
    favoriteList,
    toggleFavorite,
    similarSeries,
    loading,
  };
}
