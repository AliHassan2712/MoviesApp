"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";

export function useHomeSection(endpoint: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}${endpoint}`);
        const json = await res.json();
        setData(json.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL, endpoint]);

  return { data, loading };
}
