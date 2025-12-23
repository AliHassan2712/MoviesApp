"use client";

// components
import { MediaCard } from "@/components/cards/MediaCard";

// paths constants
import { PATHS } from "@/constant/PATHS";

// types
import { Movie } from "@/types/movie";

// context
import { useFavorite } from "@/contexts/FavoriteContext";

// icons
import { Heart } from "lucide-react";

type HomeMediaCardProps = {
  item: Movie;
};

export default function HomeMediaCard({ item }: HomeMediaCardProps) {
  const { toggleFavorite, isFavorite } = useFavorite();

  return (
    <div className="relative">
      <MediaCard
        title={item.name}
        poster={item.poster}
        releaseYear={item.releaseYear}
        href={PATHS.MOVIE_DETAILS(item._id)}
      />

      <button
        onClick={() =>
          toggleFavorite({ id: item._id, type: "movies" })
        }
        className="absolute top-3 right-3 bg-soft p-2 rounded-full shadow"
      >
        <Heart
          size={18}
          className={
            isFavorite({ id: item._id, type: "movies" })
              ? "text-red-500 fill-red-500"
              : "text-muted"
          }
        />
      </button>
    </div>
  );
}
