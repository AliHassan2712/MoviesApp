//React & Next
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback } from "react";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

type MediaCardProps = {
  id: string; 
  title: string;
  poster?: string;
  href: string;
  aspect?: "portrait" | "landscape";
  releaseYear?: number;

  // optional favorites
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void; 
};

function MediaCardComponent({
  id,
  title,
  poster,
  href,
  releaseYear,
  aspect = "portrait",
  isFavorite,
  onToggleFavorite,
}: MediaCardProps) {
  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleFavorite?.(id);
    },
    [onToggleFavorite, id]
  );

  return (
    <div className="group bg-card rounded-xl overflow-hidden transition hover:scale-105 relative">
      {/* Favorite Button */}
      {onToggleFavorite && (
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 z-10 bg-soft p-2 rounded-full shadow"
        >
          <FontAwesomeIcon
            icon={isFavorite ? faHeart : faHeartRegular}
            className={`text-lg ${isFavorite ? "text-red-500" : "text-muted"}`}
          />
        </button>
      )}

      <Link href={href}>
        <div className={`relative w-full ${aspect === "portrait" ? "h-64" : "h-40"}`}>
          <Image
            src={poster || "/assets/images/img_hero.jpg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-3">
          <p className="font-semibold truncate group-hover:text-primary transition">
            {title}
          </p>

          {releaseYear && <p className="text-xs text-muted mt-1">{releaseYear}</p>}
        </div>
      </Link>
    </div>
  );
}

export const MediaCard = memo(MediaCardComponent);
