"use client";

//React
import { useEffect, useState } from "react";

//service
import { searchAll } from "@/services/search.service";

//types
import { BackendPagination } from "@/types/pagination";
import { MediaItem } from "@/types/media";

export default function useSearch(
  query: string,
  pages: {
    movies: number;
    series: number;
    actors: number;
  }
) {
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

    if (!query) {
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
          query,
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
  }, [query, pages.movies, pages.series, pages.actors]);

  return {
    movies,
    series,
    actors,
    pagination,
    loading,
  };
}
