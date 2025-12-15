"use client";
import { Genre, Series } from "@/types/series";
import { useState, useEffect, useMemo } from "react";



export const useSeries = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    async function fetchData() {
      try {
        const [seriesRes, genresRes] = await Promise.all([
          fetch(`${API_URL}/series/`),
          fetch(`${API_URL}/genres`),
        ]);

        const seriesData = await seriesRes.json();
        const genresData = await genresRes.json();

        setSeries(seriesData.data);
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
    series,
    allGenres,
    activeTab,
    loading,
    setActiveTab,
  };
};
