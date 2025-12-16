"use client";

import { useEffect, useState } from "react";
import { BackendPagination } from "@/types/pagination";

export type Actor = {
  _id: string;
  name: string;
  profilePath?: string;
};

export function useActors(page: number) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [actors, setActors] = useState<Actor[]>([]);
  const [pagination, setPagination] =
    useState<BackendPagination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActors() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/actors?page=${page}`);
        const data = await res.json();

        setActors(data.data || []);
        setPagination(data.pagination);
      } catch (e) {
        console.error("Actors fetch error", e);
      } finally {
        setLoading(false);
      }
    }

    fetchActors();
  }, [API_URL, page]);

  return { actors, pagination, loading };
}
