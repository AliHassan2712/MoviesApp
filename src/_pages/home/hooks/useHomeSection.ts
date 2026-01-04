"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";

export function useHomeSection(endpoint: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_URL) {
      setLoading(false);
      setError("NEXT_PUBLIC_API_URL is not set");
      return;
    }

    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}${endpoint}`, {
          signal: controller.signal,
          credentials: "include",
          cache: "no-store",
        });

        const json = await res.json();

        setData(json.data || []);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        console.error(e);
        setError("Failed to load section");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [API_URL, endpoint]);

  return { data, loading, error };
}
