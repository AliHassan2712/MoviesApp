"use client";
import { useCallback, useMemo } from "react";

// components
import { MediaCard } from "@/components/cards/MediaCard";

// paths constants
import { PATHS } from "@/constant/PATHS";

// types
import { Movie } from "@/types/movie";

// context
import { useFavorite } from "@/contexts/FavoriteContext";


type HomeMediaCardProps = {
  item: Movie;
};

export default function HomeMediaCard({ item }: HomeMediaCardProps) {
  const { toggleFavorite, isFavorite } = useFavorite();
  const isFav = useMemo(() => isFavorite({ id: item._id, type: "movies" }), [isFavorite, item._id]);


  const handleToggle = useCallback(
    (id: string) => toggleFavorite({ id, type: "movies" }),
    [toggleFavorite]
  );
  return (
    <div className="relative">
      <MediaCard
        id={item._id}
        title={item.name}
        poster={item.poster}
        releaseYear={item.releaseYear}
        href={PATHS.MOVIE_DETAILS(item._id)}
        isFavorite={isFav}
        onToggleFavorite={handleToggle}
      />
    </div>
  );
}
