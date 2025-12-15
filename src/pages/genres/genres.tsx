"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Film,
  Tv,
  Flame,
  Ghost,
  Laugh,
  Heart,
  Sword,
  Rocket,
  Drama,
} from "lucide-react";

import { Container } from "@/components/containers/Container";
import { PATHS } from "@/constant/PATHS";

type Genre = {
  _id: string;
  name_en: string;
};

const GENRE_ICONS: Record<string, any> = {
  action: Sword,
  adventure: Rocket,
  comedy: Laugh,
  drama: Drama,
  horror: Ghost,
  romance: Heart,
  thriller: Flame,
  sci_fi: Rocket,
  animation: Film,
  tv: Tv,
};

const SKELETON_COUNT = 10;

export default function GenresPageComponent() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(`${API_URL}/genres`);
        const data = await res.json();
        setGenres(data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchGenres();
  }, [API_URL]);

  return (
    <Container className="pt-20">
      {/* ================= HEADER ================= */}
      <div className="mb-12 text-left">
        <h1 className="text-4xl font-extrabold mb-3">
          Genres
        </h1>
        <p className="text-muted">
          Explore movies & series by genre
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <GenreSkeleton key={i} />
            ))
          : genres.map((genre) => {
              const key = genre.name_en
                .toLowerCase()
                .replace(/\s+/g, "_");

              const Icon = GENRE_ICONS[key] || Film;

              return (
                <Link
                  key={genre._id}
                  href={PATHS.GENRE_DETAILS(genre._id)}
                  className="group rounded-2xl border border-border bg-gradient-to-br from-card to-card/60 px-6 py-8 text-center transition-all duration-300 hover:scale-105 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Icon
                    size={36}
                    className="mx-auto mb-4 text-primary/80 group-hover:text-primary"
                  />

                  <h3 className="font-semibold text-lg">
                    {genre.name_en}
                  </h3>

                  <span className="mt-3 inline-block text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Explore
                  </span>
                </Link>
              );
            })}
      </div>
    </Container>
  );
}

/* ================= SKELETON ================= */
function GenreSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-card border border-border px-6 py-8 flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-muted/40" />
      <div className="h-4 w-24 rounded bg-muted/40" />
      <div className="h-3 w-16 rounded bg-muted/30" />
    </div>
  );
}
