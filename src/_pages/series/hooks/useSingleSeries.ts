"use client";

import { Series } from "@/types/series";
import { useState, useEffect } from "react";

export const useSingleSeries = (id?: string) => {
  const [singleSeries, setSingleSeries ] = useState<Series|null>(null);
  const [isloading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const url = `${API_URL}/series${id ? `/${id}` : ""}`;
        const seriesRes = await fetch(url);
        const seriesData = await seriesRes.json();
        setSingleSeries(seriesData.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [API_URL, id]); 

  return {
    singleSeries,
    isloading,
  };
};
