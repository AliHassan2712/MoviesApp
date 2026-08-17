"use client";

import { memo } from "react";
import Image from "next/image";
import { Bookmark } from "lucide-react";

import { Movie } from "@/types/movie";
import { useWatchlist } from "@/contexts/WatchlistContext";
type MovieHeroProps = {
  movie: Movie;
  showPlayer: boolean;
  onPlay: () => void;
};

function MovieHeroComponent({ movie, showPlayer, onPlay }: MovieHeroProps) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist({ id: movie._id, type: "movies" });

  const handleWatchlist = () => {
    toggleWatchlist({
      id: movie._id,
      type: "movies",
      name: movie.name,
      poster: movie.poster,
    });
  };

  return (
    <div className="relative h-[420px] md:h-[560px]">
      <Image
        src={movie.backdrop}
        alt={movie.name}
        fill
        priority
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex items-end p-6 md:p-12">
        <div className="max-w-4xl">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold">
            {movie.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* Watch button */}
            <button
              onClick={onPlay}
              className="bg-primary text-white px-7 py-3 rounded-2xl font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              ▶ {showPlayer ? "Hide Video" : "Watch Movie"}
            </button>

            {/* Watchlist button */}
            <button
              onClick={handleWatchlist}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-base border backdrop-blur-sm active:scale-95 transition-all duration-200
                ${
                  inWatchlist
                    ? "bg-white/20 border-white/50 text-white"
                    : "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white"
                }`}
            >
              <Bookmark
                size={18}
                fill={inWatchlist ? "currentColor" : "none"}
                className="shrink-0"
              />
              {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </button>

            {/* Meta badges */}
            {movie.releaseYear && (
              <span className="px-4 py-2 rounded-xl bg-white/10 text-white">
                🎬 {movie.releaseYear}
              </span>
            )}
            {movie.duration && (
              <span className="px-4 py-2 rounded-xl bg-white/10 text-white">
                ⏱ {movie.duration} min
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MovieHeroComponent);
