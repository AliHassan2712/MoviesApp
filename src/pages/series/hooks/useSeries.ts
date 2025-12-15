"use client";

import { Series } from "@/types/series";
import { useState, useEffect } from "react";

export const useSeries = (query?: string) => {
  const [series, setSeries ] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const url = `${API_URL}/series${query ? `?${query}` : ""}`;
        const seriesRes = await fetch(url);
        const seriesData = await seriesRes.json();
        setSeries(seriesData.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL, query]); 

  return {
    series,
    loading,
  };
};
