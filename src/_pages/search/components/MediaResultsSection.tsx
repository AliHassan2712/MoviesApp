"use client";

import { memo, useCallback, useMemo } from "react";
import { MediaCard } from "@/components/cards/MediaCard";
import Pagination from "@/components/ui/Pagination";
import { PATHS } from "@/constant/PATHS";
import type { BackendPagination } from "@/types/pagination";
import type { MediaItem } from "@/types/media";

type Props = {
  title: string;
  items: MediaItem[];
  loading: boolean;
  pagination?: BackendPagination;
  onPageChange: (page: number) => void;
  type: "movies" | "series";
};

function MediaResultsSectionComponent({
  title,
  items,
  loading,
  pagination,
  onPageChange,
  type,
}: Props) {
  const countLabel = useMemo(
    () => (items.length > 0 ? ` (${items.length})` : ""),
    [items.length]
  );

  const getHref = useCallback(
    (id: string) =>
      type === "movies"
        ? PATHS.MOVIE_DETAILS(id)
        : PATHS.SERIES_DETAILS(id),
    [type]
  );

  if (loading) {
    return (
      <section className="space-y-5">
        <h2 className="text-2xl font-bold">
          {title}
          {countLabel}
        </h2>
        <div className="text-muted">Loading...</div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">
        {title}
        {countLabel}
      </h2>

      {items.length === 0 ? (
        <p className="text-muted">Not found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <MediaCard
                key={item._id}
                id={item._id}
                title={item.name}
                poster={item.poster}
                releaseYear={item.releaseYear}
                href={getHref(item._id)}
              />
            ))}
          </div>

          {pagination && (
            <Pagination
              pagination={pagination}
              onChange={onPageChange}
            />
          )}
        </>
      )}
    </section>
  );
}

export default memo(MediaResultsSectionComponent);
