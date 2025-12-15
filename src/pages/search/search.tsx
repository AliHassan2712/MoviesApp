"use client";

import { useSearchParams } from "next/navigation";
import { Container } from "@/components/containers/Container";
import useSearch from "./hooks/useSearch";
import MoviesResults from "./components/MoviesResults";
import SeriesResults from "./components/SeriesResults";
import ActorsResults from "./components/ActorsResults";


export default function SearchPageComponent() {
  const params = useSearchParams();
  const query = params?.get("q") || "";

  const { movies, series, actors, loading } = useSearch(query);

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
          <MoviesResults data={movies} />
          <SeriesResults data={series} />
          <ActorsResults data={actors} />
        </>
      )}
    </Container>
  );
}
