"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/containers/Container";
import { PATHS } from "@/constant/PATHS";
import { useGenres } from "@/pages/genres/hooks/useGenres";

type Item = {
  _id: string;
  name: string;
  poster?: string;
  releaseYear?: number;
};

export default function GenreDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /* =======================
      ROUTE PARAM
  ======================= */
  const { id } = React.use(params);

  /* =======================
      STATE
  ======================= */
  const [movies, setMovies] = useState<Item[]>([]);
  const [series, setSeries] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [genreName, setGenreName] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { allGenres } = useGenres();

  /* =======================
      GET GENRE NAME
  ======================= */
  useEffect(() => {
    if (!allGenres.length) return;

    const name =
      allGenres.find((genre) => genre._id === id)?.name_en || "";

    setGenreName(name);
  }, [allGenres, id]);

  /* =======================
      FETCH MOVIES & SERIES
  ======================= */
  useEffect(() => {
    async function fetchByGenre() {
      try {
        setLoading(true);

        const [moviesRes, seriesRes] = await Promise.all([
          fetch(`${API_URL}/movies?genresRefs=${id}`),
          fetch(`${API_URL}/series?genres=${id}`),
        ]);

        const moviesData = await moviesRes.json();
        const seriesData = await seriesRes.json();

        setMovies(moviesData?.data || []);
        setSeries(seriesData?.data || []);
      } catch (error) {
        console.error("Failed to fetch genre items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchByGenre();
  }, [API_URL, id]);

  return (
    <Container className="pt-20">
      {/* =======================
          HEADER
      ======================= */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold capitalize">
          {genreName} Genre
        </h1>
        <p className="text-muted">
          Browse movies and series in this genre
        </p>
      </div>

      {/* =======================
          LOADING
      ======================= */}
      {loading && (
        <p className="text-center text-muted">Loading...</p>
      )}

      {/* =======================
          CONTENT
      ======================= */}
      {!loading && (
        <>
          {/* MOVIES SECTION */}
          <Section
            title="Movies"
            items={movies}
            type="movies"
          />

          {/* SERIES SECTION */}
          <Section
            title="Series"
            items={series}
            type="series"
          />
        </>
      )}
    </Container>
  );
}

/* =======================
    SECTION COMPONENT
======================= */
function Section({
  title,
  items,
  type,
}: {
  title: string;
  items: Item[];
  type: "movies" | "series";
}) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-semibold mb-5">
        {title}
        {items.length > 0 && (
          <span className="ml-2 text-muted text-base">
            ({items.length})
          </span>
        )}
      </h2>

      {items.length === 0 ? (
        <p className="text-muted">
          No {title.toLowerCase()} found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item._id}
              href={
                type === "movies"
                  ? PATHS.MOVIE_DETAILS(item._id)
                  : PATHS.SERIES_DETAILS(item._id)
              }
              className="bg-card rounded-xl overflow-hidden transition hover:scale-105"
            >
              <Image
                src={
                  item.poster?.trim()
                    ? item.poster
                    : "/assets/images/img_hero.jpg"
                }
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">
                  {item.name}
                </h3>
                {item.releaseYear && (
                  <p className="text-muted text-sm">
                    {item.releaseYear}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
