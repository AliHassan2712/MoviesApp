"use client";
import { Movie } from "@/types/movie";
import { useState, useEffect } from "react";

export const useMovies = (query?: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const url = `${API_URL}/movies${query ? `?${query}` : ""}`;
        const moviesRes = await fetch(url);
        const moviesData = await moviesRes.json();
        setMovies(moviesData.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL, query]); 

  return {
    movies,
    loading,
  };
};
