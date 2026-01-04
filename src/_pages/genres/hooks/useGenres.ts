"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchGenres } from "@/services/genre.service";

export function useGenres() {
  const [genres, setGenres] = useState<{ _id: string; name_en: string }[]>([]);
  const [activeTab, setActiveTab] = useState("0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const res = await fetchGenres({ limit: 1000 });
        if (mounted) setGenres(res.data ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const allGenres = useMemo(() => {
    return [{ _id: "0", name_en: "All" }, ...genres];
  }, [genres]);

  const getGenreById = useCallback(
    (id: string) => genres.find((g) => g._id === id),
    [genres]
  );

  return {
    genres,
    allGenres,
    activeTab,
    loading,
    setActiveTab,
    getGenreById,
  };
}
