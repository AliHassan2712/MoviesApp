"use client";

// React & Next
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// paths
import { PATHS } from "@/constant/PATHS";

// hooks
import useHeroItems from "@/hooks/hero/useHeroItems";

// components
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";

type HeroType = "movies" | "series";


type HeroSliderProps = {
  type: HeroType;
  limit?: number;
};

export default function Hero({
  type,
  limit = 5,
}: HeroSliderProps) {
  const {
    item,
    loading,
    activeIndex,
    total,
    setActiveIndex,
  } = useHeroItems({ type, limit });

  const startX = useRef<number | null>(null);

  /* ================= SKELETON ================= */
  if (loading || !item) {
    return <HeroSkeleton />;
  }

  /* ================= DATA ================= */
  const heroImage =
    item.backdrop && item.backdrop.trim() !== ""
      ? item.backdrop
      : "/assets/images/img_hero.jpg";

  const detailsHref =
    type === "movies"
      ? PATHS.MOVIE_DETAILS(item._id)
      : PATHS.SERIES_DETAILS(item._id);

  /* ================= UI ================= */
  return (
    <section
      className="relative w-full margin-bottom overflow-hidden"
      onTouchStart={(e) =>
        (startX.current = e.touches[0].clientX)
      }
      onTouchEnd={(e) => {
        if (!startX.current) return;
        const diff = startX.current - e.changedTouches[0].clientX;

        if (diff > 50)
          setActiveIndex((i) => (i + 1) % total);
        if (diff < -50)
          setActiveIndex((i) => (i - 1 + total) % total);

        startX.current = null;
      }}
    >
      <div className="relative h-[60vh] md:h-screen lg:h-[85vh]">

        {/* BACKGROUND IMAGE */}
        <Image
          key={item._id}
          src={heroImage}
          alt={item.name}
          fill
          priority
          className="object-cover animate-fade"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-overlay" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-end px-6 md:px-12 py-16">
          <div className="max-w-4xl text-white animate-fade-up">

            <h1 className="text-3xl md:text-5xl font-extrabold">
              {item.name}
            </h1>

            <p className="mt-4 text-white/90 max-w-2xl">
              {item.description ||
                "Featured content you should watch 📺"}
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href={detailsHref}
                className="px-6 py-3 bg-white text-black rounded-2xl font-semibold"
              >
                Watch Now
              </Link>

              <Link
                href={type === "movies" ? PATHS.MOVIES : PATHS.SERIES}
                className="px-6 py-3 border border-white/30 rounded-2xl"
              >
                Browse {type}
              </Link>
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition
                ${
                  i === activeIndex
                    ? "bg-white"
                    : "bg-white/40"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
