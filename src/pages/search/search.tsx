"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/containers/Container";
import useSearch from "./hooks/useSearch";
import MoviesResults from "./components/MoviesResults";
import SeriesResults from "./components/SeriesResults";
import ActorsResults from "./components/ActorsResults";
import Pagination from "@/components/ui/Pagination";

export default function SearchPageComponent() {
  const params = useSearchParams();
  const query = params?.get("q") || "";

  /* ===== PAGINATION STATE ===== */
  const [moviesPage, setMoviesPage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);
  const [actorsPage, setActorsPage] = useState(1);

  /* reset pagination on new search */
  useEffect(() => {
    setMoviesPage(1);
    setSeriesPage(1);
    setActorsPage(1);
  }, [query]);

  const {
    movies,
    series,
    actors,
    pagination,
    loading,
  } = useSearch(query, {
    movies: moviesPage,
    series: seriesPage,
    actors: actorsPage,
  });

  return (
    <Container className="pt-20 space-y-14">
      <div>
        <h1 className="text-3xl font-bold">
          Search results for "{query}"
        </h1>
      </div>

      {loading ? (
        <p className="text-muted">Searching...</p>
      ) : (
        <>
          {/* ===== MOVIES ===== */}
          <MoviesResults data={movies} />
          {pagination.movies && (
            <Pagination
              pagination={pagination.movies}
              onChange={(p) => {
                setMoviesPage(p);
                
              }}
            />
          )}

          {/* ===== SERIES ===== */}
          <SeriesResults data={series} />
          {pagination.series && (
            <Pagination
              pagination={pagination.series}
              onChange={(p) => {
                setSeriesPage(p);
                
              }}
            />
          )}

          {/* ===== ACTORS ===== */}
          <ActorsResults data={actors} />
          {pagination.actors && (
            <Pagination
              pagination={pagination.actors}
              onChange={(p) => {
                setActorsPage(p);
               
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}
