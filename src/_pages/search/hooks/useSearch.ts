"use client";

//React
import { useEffect, useState } from "react";

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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    if (!query) {
      setMovies([]);
      setSeries([]);
      setActors([]);
      setPagination({});
      setLoading(false);
      return;
    }

    async function fetchAll() {
      setLoading(true);
      //Fetch movies, series, and actors in parallel
      try {
        const [m, s, a] = await Promise.all([
          fetch(`${API_URL}/movies?search=${query}&page=${pages.movies}`),
          fetch(`${API_URL}/series?search=${query}&page=${pages.series}`),
          fetch(`${API_URL}/actors?search=${query}&page=${pages.actors}`),
        ]);

        const moviesData = await m.json();
        const seriesData = await s.json();
        const actorsData = await a.json();

        //Set states 
        
        setMovies(moviesData.data || []);
        setSeries(seriesData.data || []);
        setActors(actorsData.data || []);

        //Set pagination
        setPagination({
          movies: moviesData.pagination,
          series: seriesData.pagination,
          actors: actorsData.pagination,
        });
      } catch (e) {
        console.error("Search error", e);
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
