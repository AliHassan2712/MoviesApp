"use client";

import { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import { PATHS } from "@/constant/PATHS";
import type { BackendPagination } from "@/types/pagination";
import type { MediaItem } from "@/types/media";

type Props = {
  items: MediaItem[];
  loading: boolean;
  pagination?: BackendPagination;
  onPageChange: (page: number) => void;
};

function ActorsResultsComponent({
  items,
  loading,
  pagination,
  onPageChange,
}: Props) {
  const countLabel = useMemo(
    () => (items.length > 0 ? ` (${items.length})` : ""),
    [items.length]
  );

  const actorHref = useCallback(
    (id: string) => PATHS.ACTOR_DETAILS(id),
    []
  );

  if (loading) {
    return <div className="text-muted">Loading actors...</div>;
  }

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">
        Actors
        {countLabel}
      </h2>

      {items.length === 0 ? (
        <p className="text-muted">Not found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((a) => (
              <Link
                key={a._id}
                href={actorHref(a._id)}
                className="bg-card p-4 rounded-2xl hover:bg-soft transition"
              >
                {a.name}
              </Link>
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

export default memo(ActorsResultsComponent);
