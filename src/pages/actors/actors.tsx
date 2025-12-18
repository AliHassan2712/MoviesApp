"use client";

import { Container } from "@/components/containers/Container";
import Pagination from "@/components/ui/Pagination";
import ActorsGridSkeleton from "@/components/skeletons/ActorsGridSkeleton";

import { useActors } from "./hooks/useActors";
import { ActorCard } from "./components/ActorCard";

export default function ActorsPageComponent() {
  const {
    actors,
    loading,
    setPage,
    pagination,
  } = useActors();

  return (
    <Container className="pt-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3">
          Actors
        </h1>
        <p className="text-muted">
          Explore popular actors and their works
        </p>
      </div>

      {/* Content */}
      {loading && <ActorsGridSkeleton count={12} />}

      {!loading && actors.length === 0 && (
        <p className="text-center text-muted">
          No actors found.
        </p>
      )}

      {!loading && actors.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {actors.map((actor) => (
              <ActorCard
                key={actor._id}
                actor={actor}
              />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <Pagination
              pagination={pagination}
              onChange={setPage}
            />
          )}
        </>
      )}
    </Container>
  );
}
