"use client";

import { useEffect, useState } from "react";
import { BackendPagination } from "@/types/pagination";
import { Movie } from "@/types/movie";

export function useMovies(query?: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] =
    useState<BackendPagination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          ...(query ? Object.fromEntries(new URLSearchParams(query)) : {}),
        });

        const res = await fetch(`${API_URL}/movies?${params}&limit=12`);
        const data = await res.json();

        setMovies(data.data || []);
        setPagination(data.pagination);
      } catch (err) {
        console.error("Movies fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [API_URL, page, query]);


  useEffect(() => {
    setPage(1);
  }, [query]);

  return {
    movies,
    loading,
    page,
    setPage,
    pagination,
  };
}
