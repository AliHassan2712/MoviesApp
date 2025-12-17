"use client";

import Image from "next/image";
import Link from "next/link";
import GridSkeleton from "@/components/skeletons/GridSkeleton";
import { PATHS } from "@/constant/PATHS";
import { Movie } from "@/types/movie";

type Props = {
  title: string;
  items: Movie[];
  loading: boolean;
  viewAllHref: string;
};

export default function HomeSection({
  title,
  items,
  loading,
  viewAllHref,
}: Props) {
  return (
    <section className="px-6 mb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href={viewAllHref}
          className="text-primary text-sm hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <GridSkeleton count={6} />
      ) : items.length === 0 ? (
        <p className="text-muted">No items found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {items.slice(0, 6).map((item) => (
            <Link
              key={item._id}
              href={PATHS.MOVIE_DETAILS(item._id)}
              className="bg-card rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <Image
                src={item.poster || "/assets/images/img_hero.jpg"}
                alt={item.name}
                width={300}
                height={450}
                className="w-full h-64 object-cover"
              />
              <div className="p-3">
                <p className="font-semibold truncate">{item.name}</p>
                {item.releaseYear && (
                  <p className="text-muted text-sm">{item.releaseYear}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
