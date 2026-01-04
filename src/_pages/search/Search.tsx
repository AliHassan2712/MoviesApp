"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { Container } from "@/components/containers/Container";

import useSearch from "./hooks/useSearch";
import ActorsResults from "./components/ActorsResults";
import MediaResultsSection from "./components/MediaResultsSection";

export default function SearchPageComponent() {
  const params = useSearchParams();
  const query = params?.get("q") || "";

  const [moviesPage, setMoviesPage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);
  const [actorsPage, setActorsPage] = useState(1);

  useEffect(() => {
    setMoviesPage(1);
    setSeriesPage(1);
    setActorsPage(1);
  }, [query]);

  const pages = useMemo(
    () => ({
      movies: moviesPage,
      series: seriesPage,
      actors: actorsPage,
    }),
    [moviesPage, seriesPage, actorsPage]
  );

  const handleMoviesPage = useCallback((p: number) => setMoviesPage(p), []);
  const handleSeriesPage = useCallback((p: number) => setSeriesPage(p), []);
  const handleActorsPage = useCallback((p: number) => setActorsPage(p), []);

  const { movies, series, actors, pagination, loading } = useSearch(
    query,
    pages
  );

  return (
    <Container className="pt-20 space-y-14">
      <h1 className="text-3xl font-bold">
        Search results for "{query}"
      </h1>

      {/* Movies */}
      <MediaResultsSection
        title="Movies"
        type="movies"
        items={movies}
        loading={loading}
        pagination={pagination.movies}
        onPageChange={handleMoviesPage}
      />

      {/* Series */}
      <MediaResultsSection
        title="Series"
        type="series"
        items={series}
        loading={loading}
        pagination={pagination.series}
        onPageChange={handleSeriesPage}
      />

      {/* Actors */}
      <ActorsResults
        items={actors}
        loading={loading}
        pagination={pagination.actors}
        onPageChange={handleActorsPage}
      />
    </Container>
  );
}
