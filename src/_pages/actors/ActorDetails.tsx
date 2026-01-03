"use client";

//Next
import Image from "next/image";

//components 
import { Container } from "@/components/containers/Container";
import ActorDetailsSkeleton from "@/components/skeletons/ActorDetailsSkeleton";
import { MediaCard } from "@/components/cards/MediaCard";

//paths constants
import { PATHS } from "@/constant/PATHS";

//hooks
import { useActorDetails } from "./hooks/useActorDetails";

export default function ActorDetailsComponent({
  id,
}: {
  id: string;
}) {
  const { actor, movies, series, loading } =
    useActorDetails(id);

  if (loading) {
    return (
      <Container className="pt-20">
        <ActorDetailsSkeleton />
      </Container>
    );
  }

  if (!actor) {
    return (
      <Container className="pt-20">
        <p className="text-muted">Actor not found.</p>
      </Container>
    );
  }

  return (
    <Container className="pt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="w-48 h-48 rounded-full overflow-hidden border bg-soft">
          <Image
            src={actor.profilePath || "/assets/images/img_hero.jpg"}
            alt={actor.name}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">
            {actor.name}
          </h1>

          {actor.popularity !== undefined && (
            <p className="text-muted">
              Popularity ⭐ {actor.popularity.toFixed(1)}
            </p>
          )}
        </div>
      </div>

      {/* Movies */}
      {movies.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-5">
            Movies ({movies.length})
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies.map((m) => (
              <MediaCard
                key={m._id}
                id={m._id}
                title={m.name}
                poster={m.poster}
                releaseYear={m.releaseYear}
                href={PATHS.MOVIE_DETAILS(m._id)}
                aspect="landscape"
              />

            ))}

          </div>
        </section>
      )}

      {/* Series */}
      {series.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-5">
            Series ({series.length})
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {series.map((s) => (
              <MediaCard
                key={s._id}
                title={s.name}
                poster={s.poster}
                href={PATHS.SERIES_DETAILS(s._id)}
                aspect="landscape"
              />
            ))}

          </div>
        </section>
      )}
    </Container>
  );
}
