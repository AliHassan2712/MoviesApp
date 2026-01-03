"use client";

import { memo, useMemo } from "react";

import GridSkeleton from "@/components/skeletons/GridSkeleton";
import { MediaCard } from "@/components/cards/MediaCard";

type MediaItem = {
  _id: string;
  name: string;
  poster?: string;
  releaseYear?: number;
};

type FavoriteItem = {
  id: string;
  type: "movies" | "series";
};

type MediaGridProps = {
  items: MediaItem[];
  loading: boolean;
  favorites: FavoriteItem[];
  getHref: (id: string) => string;
  onToggleFavorite: (id: string) => void;
  mediaType: "movies" | "series";
};

function MediaGridComponent({
  items,
  loading,
  favorites,
  getHref,
  onToggleFavorite,
  mediaType,
}: MediaGridProps) {
  const favoriteSet = useMemo(() => {
    return new Set(favorites.map((f) => `${f.type}:${f.id}`));
  }, [favorites]);

  if (loading) return <GridSkeleton count={6} />;

  if (!items.length) {
    return <p className="text-center text-muted w-full">No items found.</p>;
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <MediaCard
            key={item._id}
            id={item._id}
            title={item.name}
            poster={item.poster}
            releaseYear={item.releaseYear}
            href={getHref(item._id)}
            isFavorite={favoriteSet.has(`${mediaType}:${item._id}`)} // ✅ الحل
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(MediaGridComponent);
