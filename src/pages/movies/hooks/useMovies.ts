"use client";
import { Genre, Movie } from "@/types/movie";
import { useState, useEffect, useMemo } from "react";



export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    async function fetchData() {
      try {
        const [moviesRes, genresRes] = await Promise.all([
          fetch(`${API_URL}/movies/`),
          fetch(`${API_URL}/genres`),
        ]);

        const moviesData = await moviesRes.json();
        const genresData = await genresRes.json();

        setMovies(moviesData.data);
        setGenres(genresData.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL]);



  const allGenres = useMemo(() => {
    return ["all", ...genres.map(g => g.name_en)]; 
  }, [genres]);


  return {
    movies,
    allGenres,
    activeTab,
    loading,
    setActiveTab,
  };
};
