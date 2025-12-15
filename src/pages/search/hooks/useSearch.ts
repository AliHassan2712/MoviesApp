"use client";

import { useEffect, useState } from "react";

type Item = {
  _id: string;
  name: string;
  image?: string;
};

export default function useSearch(query: string) {
  const [movies, setMovies] = useState<Item[]>([]);
  const [series, setSeries] = useState<Item[]>([]);
  const [actors, setActors] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!query) return;

    async function fetchAll() {
      setLoading(true);

      try {
        const [m, s, a] = await Promise.all([
          fetch(`${API_URL}/movies?search=${query}`),
          fetch(`${API_URL}/series?search=${query}`),
          fetch(`${API_URL}/actors?search=${query}`),
        ]);

        const moviesData = await m.json();
        const seriesData = await s.json();
        const actorsData = await a.json();

        setMovies(moviesData.data || []);
        setSeries(seriesData.data || []);
        setActors(actorsData.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [query, API_URL]);

  return { movies, series, actors, loading };
}
