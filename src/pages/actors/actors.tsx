"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/containers/Container";
import Pagination from "@/components/ui/Pagination";
import GridSkeleton from "@/components/skeletons/GridSkeleton";
import { PATHS } from "@/constant/PATHS";
import { useActors } from "./hooks/useActors";
import ActorsGridSkeleton from "@/components/skeletons/ActorsGridSkeleton";

export default function ActorsPageComponent() {
  const [page, setPage] = useState(1);
  const { actors, pagination, loading } = useActors(page);

  return (
    <Container className="pt-20">
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3">Actors</h1>
        <p className="text-muted">
          Explore popular actors and their works
        </p>
      </div>

      {/* CONTENT */}
{loading ? (
  <ActorsGridSkeleton count={12} />
) : actors.length === 0 ? (
  <p className="text-center text-muted">No actors found.</p>
) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {actors.map((actor) => (
              <Link
                key={actor._id}
                href={PATHS.ACTOR_DETAILS(actor._id)}
                className="group text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-main bg-soft">
                  <Image
                    src={
                      actor.profilePath ||
                      "/assets/images/img_hero.jpg"
                    }
                    alt={actor.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>

                <p className="mt-3 font-semibold group-hover:text-primary transition">
                  {actor.name}
                </p>
              </Link>
            ))}
          </div>

          {pagination && (
            <Pagination
              pagination={pagination}
              onChange={(p) => {
                setPage(p);
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}
