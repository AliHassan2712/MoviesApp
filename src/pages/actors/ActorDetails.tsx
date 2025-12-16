"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/containers/Container";
import { PATHS } from "@/constant/PATHS";
import ActorDetailsSkeleton from "@/components/skeletons/ActorDetailsSkeleton";

/* ================= TYPES ================= */

type Actor = {
  _id: string;
  name: string;
  profilePath?: string;
  popularity?: number;
};

type Item = {
  _id: string;
  name: string;
  poster?: string;
};

/* ================= COMPONENT ================= */

export default function ActorDetailsComponent({ id }: { id: string }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [actor, setActor] = useState<Actor | null>(null);
  const [movies, setMovies] = useState<Item[]>([]);
  const [series, setSeries] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);

        const [actorRes, moviesRes, seriesRes] = await Promise.all([
          fetch(`${API_URL}/actors/${id}`),
          fetch(`${API_URL}/movies?castRefs=${id}`),
          fetch(`${API_URL}/series?cast=${id}`),
        ]);

        const actorData = await actorRes.json();
        const moviesData = await moviesRes.json();
        const seriesData = await seriesRes.json();

        setActor(actorData.data);
        setMovies(moviesData.data || []);
        setSeries(seriesData.data || []);
      } catch (error) {
        console.error("Actor details fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [API_URL, id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <Container className="pt-20">
        <ActorDetailsSkeleton />
      </Container>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!actor) {
    return (
      <Container className="pt-20">
        <p className="text-muted">Actor not found.</p>
      </Container>
    );
  }

  /* ================= UI ================= */

  return (
    <Container className="pt-20">
      {/* ===== ACTOR HEADER ===== */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="w-48 h-48 rounded-full overflow-hidden border border-main bg-soft">
          <Image
            src={actor.profilePath || "/assets/images/img_hero.jpg"}
            alt={actor.name}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>

          {actor.popularity !== undefined && (
            <p className="text-muted">
              Popularity: ⭐ {actor.popularity.toFixed(1)}
            </p>
          )}
        </div>
      </div>

      {/* ===== MOVIES SECTION ===== */}
      {movies.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-5">
            Movies
            <span className="ml-2 text-muted text-base">
              ({movies.length})
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie._id}
                href={PATHS.MOVIE_DETAILS(movie._id)}
                className="bg-card rounded-xl overflow-hidden hover:scale-105 transition"
              >
                <Image
                  src={movie.poster || "/assets/images/img_hero.jpg"}
                  alt={movie.name}
                  width={300}
                  height={200}
                  className="h-48 w-full object-cover"
                />
                <p className="p-3 font-semibold">{movie.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== SERIES SECTION ===== */}
      {series.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-5">
            Series
            <span className="ml-2 text-muted text-base">
              ({series.length})
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {series.map((show) => (
              <Link
                key={show._id}
                href={PATHS.SERIES_DETAILS(show._id)}
                className="bg-card rounded-xl overflow-hidden hover:scale-105 transition"
              >
                <Image
                  src={show.poster || "/assets/images/img_hero.jpg"}
                  alt={show.name}
                  width={300}
                  height={200}
                  className="h-48 w-full object-cover"
                />
                <p className="p-3 font-semibold">{show.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
