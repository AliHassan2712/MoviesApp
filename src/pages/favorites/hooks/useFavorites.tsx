"use client";

import { useState, useEffect } from "react";
import { useFavorite } from "../../../contexts/FavoriteContext";

export type Movie = {
  _id: string;
  name: string;
  description: string;
  poster: string;
  backdrop: string;
  duration: number;
  releaseYear: number;
  genresRefs: string[];
  castRefs: string[];
};

export const useFavorites = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { favoriteList, toggleFavorite } = useFavorite();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
console.log("1111");

    async function fetchMovies() {
      try {
        const res = await fetch("https://movies-api-w3xb.onrender.com/api/v1/movies");
        const json = await res.json();
        setMovies(json.data);
        console.log("Data : " + json.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  // فلترة الأفلام المفضلة باستخدام _id
  const favoritemovies = movies.filter((item) =>
    // favoriteList.map(id => id).includes(item._id)
    favoriteList.includes(item._id)

  );
  console.log("Items in favorites: " + favoritemovies)
  console.log("movies from api:", movies)
console.log("favoriteList:", favoriteList)
console.log("favoritemovies:", favoritemovies)


  return {
    movies,
    favoritemovies,
    toggleFavorite,
    loading
  };
};
