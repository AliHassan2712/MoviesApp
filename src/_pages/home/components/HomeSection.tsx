"use client";

import Link from "next/link";
import GridSkeleton from "@/components/skeletons/GridSkeleton";
import HomeMediaCard from "./HomeMediaCard";
import { Movie } from "@/types/movie";

type HomeSectionProps = {
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
}: HomeSectionProps) {
  return (
    <section className="px-6 mb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href={viewAllHref}
          className="text-primary text-sm hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <GridSkeleton count={4} />
      ) : items.length === 0 ? (
        <p className="text-muted">No items found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item) => (
            <HomeMediaCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
