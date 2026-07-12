"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useCallback } from "react";
import { Heart, Star } from "lucide-react";

type MediaCardProps = {
  id: string;
  title: string;
  poster?: string;
  href: string;
  /** @deprecated aspect ratio is now always 2:3 — this prop is ignored */
  aspect?: "portrait" | "landscape";
  releaseYear?: number;
  rating?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
};

function MediaCardComponent({
  id,
  title,
  poster,
  href,
  releaseYear,
  rating,
  isFavorite = false,
  onToggleFavorite,
}: MediaCardProps) {
  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleFavorite?.(id);
    },
    [onToggleFavorite, id]
  );

  return (
    <Link href={href} className="group block">
      {/* Poster */}
      <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <Image
          src={poster || "/assets/images/img_hero.jpg"}
          alt={title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 16vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {/* Bottom gradient always visible for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Hover full overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating — top left */}
        {rating != null && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded px-1.5 py-0.5">
            <Star size={10} className="text-amber-400 shrink-0" fill="currentColor" />
            <span className="text-white text-[11px] font-semibold leading-none">
              {Number(rating).toFixed(1)}
            </span>
          </div>
        )}

        {/* Favorite — top right, shows on hover */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={handleToggle}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-200 active:scale-90
              ${isFavorite
                ? "bg-primary border-primary opacity-100"
                : "bg-black/60 border-white/20 opacity-0 group-hover:opacity-100 hover:border-primary/60"
              }`}
          >
            <Heart
              size={13}
              className={isFavorite ? "text-white" : "text-white/80"}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        )}

        {/* Year — bottom left inside poster */}
        {releaseYear && (
          <span className="absolute bottom-2 left-2.5 text-white/60 text-[11px] font-medium">
            {releaseYear}
          </span>
        )}
      </div>

      {/* Title below poster */}
      <p className="mt-2.5 text-[13px] font-semibold text-white/75 group-hover:text-white transition-colors duration-200 line-clamp-1 leading-snug px-0.5">
        {title}
      </p>
    </Link>
  );
}

export const MediaCard = memo(MediaCardComponent);
