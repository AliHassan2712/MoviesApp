"use client";

import { useEffect, useState } from "react";
import { BackendPagination } from "@/types/pagination";
import { Actor } from "@/types/actor";
import { getActors } from "@/services/actors.service";

export function useActors() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState<BackendPagination | null>(null);

  useEffect(() => {
    async function loadActors() {
      try {
        setLoading(true);
        const { data, pagination } = await getActors(page);
        setActors(data || []);
        setPagination(pagination);
      } catch (error) {
        console.error("Actors fetch error", error);
        setActors([]);
      } finally {
        setLoading(false);
      }
    }

    loadActors();
  }, [page]);

  return {
    actors,
    loading,
    page,
    setPage,
    pagination,
  };
}
