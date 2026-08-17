"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Play, Bookmark, Star, Clock } from "lucide-react";

import { PATHS } from "@/constant/PATHS";
import useHeroItems from "@/hooks/hero/useHeroItems";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import { useWatchlist } from "@/contexts/WatchlistContext";

type HeroType = "movies" | "series";
type HeroSliderProps = { type: HeroType; limit?: number };

export default function Hero({ type, limit = 5 }: HeroSliderProps) {
  const { item, items, loading, activeIndex, total, setActiveIndex } =
    useHeroItems({ type, limit });

  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const startX = useRef<number | null>(null);

  if (loading || !item) return <HeroSkeleton />;

  const inWatchlist = isInWatchlist({ id: item._id, type });

  const heroImage = item.backdrop?.trim()
    ? item.backdrop
    : "/assets/images/img_hero.jpg";

  const detailsHref =
    type === "movies"
      ? PATHS.MOVIE_DETAILS(item._id)
      : PATHS.SERIES_DETAILS(item._id);

  return (
    <section
      className="relative w-full overflow-hidden margin-bottom"
      onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (!startX.current) return;
        const diff = startX.current - e.changedTouches[0].clientX;
        if (diff > 50) setActiveIndex((i) => (i + 1) % total);
        if (diff < -50) setActiveIndex((i) => (i - 1 + total) % total);
        startX.current = null;
      }}
    >
      {/* Full-bleed background */}
      <div className="relative h-[70vh] md:h-[88vh]">
        <Image
          key={item._id}
          src={heroImage}
          alt={item.name}
          fill
          priority
          className="object-cover object-top transition-opacity duration-700"
        />

        {/* Dual cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/15" />

        {/* Main content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-8 md:px-16 w-full max-w-3xl animate-fade-up">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Featured
              </span>
              <span className="text-white/50 text-xs uppercase tracking-widest font-medium">
                {type === "movies" ? "Movie" : "Series"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              {item.name}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              {item.rating != null && (
                <span className="flex items-center gap-1.5 text-amber-400 text-sm font-bold">
                  <Star size={14} fill="currentColor" />
                  {Number(item.rating).toFixed(1)}
                </span>
              )}
              {item.releaseYear != null && (
                <span className="text-white/50 text-sm font-medium">
                  {item.releaseYear}
                </span>
              )}
              {item.duration != null && (
                <span className="flex items-center gap-1 text-white/50 text-sm">
                  <Clock size={13} />
                  {item.duration} min
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-5 text-white/65 text-base md:text-lg leading-relaxed line-clamp-2 max-w-xl">
              {item.description || "Discover this featured title."}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={detailsHref}
                className="group/btn inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-2xl"
              >
                <Play
                  size={18}
                  fill="currentColor"
                  className="group-hover/btn:scale-110 transition-transform duration-200"
                />
                Watch Now
              </Link>

              <button
                onClick={() =>
                  toggleWatchlist({
                    id: item._id,
                    type,
                    name: item.name,
                    poster: item.poster || item.backdrop,
                  })
                }
                className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm border backdrop-blur-sm active:scale-95 transition-all duration-200 ${
                  inWatchlist
                    ? "bg-white/20 border-white/50 text-white"
                    : "bg-white/10 hover:bg-white/20 border-white/15 hover:border-white/30 text-white"
                }`}
              >
                <Bookmark
                  size={18}
                  fill={inWatchlist ? "currentColor" : "none"}
                  className="shrink-0"
                />
                {inWatchlist ? "In Watchlist" : "Add to List"}
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail strip – desktop only */}
        {total > 1 && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-20">
            {(items ?? []).slice(0, total).map((slide, i) => {
              const thumb = slide.backdrop?.trim()
                ? slide.backdrop
                : "/assets/images/img_hero.jpg";
              return (
                <button
                  key={slide._id}
                  onClick={() => setActiveIndex(i)}
                  className={`relative w-28 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer
                    ${
                      i === activeIndex
                        ? "border-primary scale-105 shadow-lg shadow-primary/25"
                        : "border-white/10 opacity-45 hover:opacity-75 hover:border-white/25"
                    }`}
                >
                  <Image src={thumb} alt={slide.name} fill className="object-cover" />
                  {i === activeIndex && (
                    <div className="absolute inset-0 bg-primary/15" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 lg:hidden z-20">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/30 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
