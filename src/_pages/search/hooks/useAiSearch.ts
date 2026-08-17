"use client";

import { useEffect, useRef, useState } from "react";
import { fetchAiSearchMovies } from "@/services/aiSearch.service";
import { Movie } from "@/types/movie";

export default function useAiSearch(query: string, enabled: boolean) {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usedRealAi, setUsedRealAi] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  // Debounce timer
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear previous debounce
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!enabled || !query.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // 600ms debounce — give the user time to finish typing
    timerRef.current = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const data = await fetchAiSearchMovies(query, controller.signal);
        setResults(data.data ?? []);
        setUsedRealAi(data.ai ?? false);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setError("AI search failed. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      abortRef.current?.abort();
    };
  }, [query, enabled]);

  return { results, loading, error, usedRealAi };
}
