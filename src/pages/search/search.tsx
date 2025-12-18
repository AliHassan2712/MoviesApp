"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Container } from "@/components/containers/Container";
import Pagination from "@/components/ui/Pagination";

import useSearch from "./hooks/useSearch";
import ActorsResults from "./components/ActorsResults";
import MediaResultsSection from "./components/MediaResultsSection";

export default function SearchPageComponent() {
  const params = useSearchParams();
  const query = params?.get("q") || "";

  const [moviesPage, setMoviesPage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);
  const [actorsPage, setActorsPage] = useState(1);

  /* reset pagination when query changes */
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
      <h1 className="text-3xl font-bold">
        Search results for "{query}"
      </h1>

      {loading ? (
        <p className="text-muted">Searching...</p>
      ) : (
        <>
          {/* Movies */}
          <MediaResultsSection
            title="Movies"
            type="movies"
            data={movies}
          />
          {pagination.movies && movies.length > 0 && (
            <Pagination
              pagination={pagination.movies}
              onChange={setMoviesPage}
            />
          )}

          {/* Series */}
          <MediaResultsSection
            title="Series"
            type="series"
            data={series}
          />
          {pagination.series && series.length > 0 && (
            <Pagination
              pagination={pagination.series}
              onChange={setSeriesPage}
            />
          )}

          {/* Actors */}
          <ActorsResults data={actors} />
          {pagination.actors && actors.length > 0 && (
            <Pagination
              pagination={pagination.actors}
              onChange={setActorsPage}
            />
          )}
        </>
      )}
    </Container>
  );
}
