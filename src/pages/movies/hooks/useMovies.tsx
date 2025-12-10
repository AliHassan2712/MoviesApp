"use client";
import { useState, useEffect } from "react";

export const useMovies = () => {
  const [movies, setMovies] = useState<Array<any>>([]);

  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  const genreMapping = {
    "692ea9ecb8794d67cdd4240f": "Action",
    "692ea9edb8794d67cdd42411": "Adventure",
    "692ea9edb8794d67cdd42415": "Sci-Fi",
    
  };

  const allGenres = ["all", ...Object.values(genreMapping)];

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("https://movies-api-w3xb.onrender.com/api/v1/movies");
        const data = await res.json();
        setMovies(data.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie => {
    if (activeTab === "all") return true;
    const movieGenres = movie.genresRefs.map((ref: string) => genreMapping[ref as keyof typeof genreMapping]);

    return movieGenres.includes(activeTab);
  });

  return {
    movies,
    filteredMovies,
    allGenres,
    activeTab,
    loading,
    setActiveTab
  };
};
