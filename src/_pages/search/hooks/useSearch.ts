"use client";

import { useEffect, useState } from "react";
import { searchAll } from "@/services/search.service";
import { BackendPagination } from "@/types/pagination";
import { MediaItem } from "@/types/media";
import { useDebouncedValue } from "@/hooks/search/useDebouncedValue";

export default function useSearch(
  query: string,
  pages: { movies: number; series: number; actors: number }
) {
  const debouncedQuery = useDebouncedValue(query, 350);

  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [series, setSeries] = useState<MediaItem[]>([]);
  const [actors, setActors] = useState<MediaItem[]>([]);

  const [pagination, setPagination] = useState<{
    movies?: BackendPagination;
    series?: BackendPagination;
    actors?: BackendPagination;
  }>({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (!debouncedQuery) {
      setMovies([]);
      setSeries([]);
      setActors([]);
      setPagination({});
      setLoading(false);
      return () => controller.abort();
    }

    async function fetchAll() {
      setLoading(true);
      try {
        const { moviesData, seriesData, actorsData } = await searchAll(
          debouncedQuery,
          pages,
          controller.signal
        );

        setMovies(moviesData.data || []);
        setSeries(seriesData.data || []);
        setActors(actorsData.data || []);

        setPagination({
          movies: moviesData.pagination,
          series: seriesData.pagination,
          actors: actorsData.pagination,
        });
      } catch (e: any) {
        if (e.name === "AbortError") return;
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
    return () => controller.abort();
  }, [debouncedQuery, pages.movies, pages.series, pages.actors]); 

  return { movies, series, actors, pagination, loading };
}
