"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/containers/Container";
import { useGenres } from "@/pages/genres/hooks/useGenres";
import Section from "./components/section";
import { Item } from "@/types/genre";
import Pagination from "@/components/ui/Pagination";
import { BackendPagination } from "@/types/pagination";

export default function GenreDetailsComponent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /* ================= ROUTE PARAM ================= */
  const { id } = React.use(params);

  /* ================= STATE ================= */
  const [movies, setMovies] = useState<Item[]>([]);
  const [series, setSeries] = useState<Item[]>([]);

  const [moviesPage, setMoviesPage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);

  const [moviesPagination, setMoviesPagination] =
    useState<BackendPagination | null>(null);
  const [seriesPagination, setSeriesPagination] =
    useState<BackendPagination | null>(null);

  const [loading, setLoading] = useState(true);
  const [genreName, setGenreName] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { allGenres } = useGenres();

  /* ================= GENRE NAME ================= */
  useEffect(() => {
    if (!allGenres.length) return;

    const name =
      allGenres.find((g) => g._id === id)?.name_en || "";

    setGenreName(name);
  }, [allGenres, id]);

  /* ================= RESET PAGES WHEN GENRE CHANGES ================= */
  useEffect(() => {
    setMoviesPage(1);
    setSeriesPage(1);
  }, [id]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    async function fetchByGenre() {
      try {
        setLoading(true);

        const [moviesRes, seriesRes] = await Promise.all([
          fetch(
            `${API_URL}/movies?genresRefs=${id}&page=${moviesPage}`
          ),
          fetch(
            `${API_URL}/series?genres=${id}&page=${seriesPage}`
          ),
        ]);

        const moviesData = await moviesRes.json();
        const seriesData = await seriesRes.json();

        setMovies(moviesData.data || []);
        setSeries(seriesData.data || []);

        setMoviesPagination(moviesData.pagination);
        setSeriesPagination(seriesData.pagination);
      } catch (err) {
        console.error("Failed to fetch genre items:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchByGenre();
  }, [API_URL, id, moviesPage, seriesPage]);

  /* ================= UI ================= */
  return (
    <Container className="pt-20">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold capitalize">
          {genreName} Genre
        </h1>
        <p className="text-muted">
          Browse movies and series in this genre
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-muted">Loading...</p>
      )}

      {/* CONTENT */}
      {!loading && (
        <>
          {/* ================= MOVIES ================= */}
          <Section title="Movies" items={movies} type="movies" />

          {moviesPagination && (
            <Pagination
              pagination={moviesPagination}
              onChange={(p) => {
                setMoviesPage(p);
               
              }}
            />
          )}

          {/* ================= SERIES ================= */}
          <Section title="Series" items={series} type="series" />

          {seriesPagination && (
            <Pagination
              pagination={seriesPagination}
              onChange={(p) => {
                setSeriesPage(p);
                
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}
