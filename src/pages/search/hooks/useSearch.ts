"use client";

import { useEffect, useState } from "react";
import { BackendPagination } from "@/types/pagination";

type Item = {
  _id: string;
  name: string;
  image?: string;
};

export default function useSearch(
  query: string,
  pages: {
    movies: number;
    series: number;
    actors: number;
  }
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [movies, setMovies] = useState<Item[]>([]);
  const [series, setSeries] = useState<Item[]>([]);
  const [actors, setActors] = useState<Item[]>([]);

  const [pagination, setPagination] = useState<{
    movies?: BackendPagination;
    series?: BackendPagination;
    actors?: BackendPagination;
  }>({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    async function fetchAll() {
      setLoading(true);

      try {
        const [m, s, a] = await Promise.all([
          fetch(
            `${API_URL}/movies?search=${query}&page=${pages.movies}`
          ),
          fetch(
            `${API_URL}/series?search=${query}&page=${pages.series}`
          ),
          fetch(
            `${API_URL}/actors?search=${query}&page=${pages.actors}`
          ),
        ]);

        const moviesData = await m.json();
        const seriesData = await s.json();
        const actorsData = await a.json();

        setMovies(moviesData.data || []);
        setSeries(seriesData.data || []);
        setActors(actorsData.data || []);

        setPagination({
          movies: moviesData.pagination,
          series: seriesData.pagination,
          actors: actorsData.pagination,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [
    query,
    pages.movies,
    pages.series,
    pages.actors,
    API_URL,
  ]);

  return {
    movies,
    series,
    actors,
    pagination,
    loading,
  };
}
