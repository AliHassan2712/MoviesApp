"use client";

import { useEffect, useState } from "react";
import { Actor } from "@/types/actor";
import {
  getActorById,
  getActorMovies,
  getActorSeries,
} from "@/services/actors.service";
import { MediaItem } from "@/types/media";

export function useActorDetails(id: string) {
  const [actor, setActor] = useState<Actor | null>(null);
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [series, setSeries] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);

        const [actorRes, moviesRes, seriesRes] =
          await Promise.all([
            getActorById(id),
            getActorMovies(id),
            getActorSeries(id),
          ]);

        setActor(actorRes.data);
        setMovies(moviesRes.data || []);
        setSeries(seriesRes.data || []);
      } catch (error) {
        console.error("Actor details error", error);
        setActor(null);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, [id]);

  return {
    actor,
    movies,
    series,
    loading,
  };
}
