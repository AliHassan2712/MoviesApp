"use client";

import { useEffect, useState } from "react";

import { Movie } from "@/types/movie";
import { BackendPagination } from "@/types/pagination";

import { fetchMovies } from "@/services/movie.service";

export function useMovies(query?: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<BackendPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchMovies({
          page,
          query,
          signal: controller.signal,
        });

        setMovies(res.data || []);
        setPagination(res.pagination);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error("Movies fetch error:", err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [page, query]);

  return { movies, loading, error, pagination, page, setPage };
}
