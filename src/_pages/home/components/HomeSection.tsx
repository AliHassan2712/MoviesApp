"use client";

import { memo, useMemo, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import GridSkeleton from "@/components/skeletons/GridSkeleton";
import HomeMediaCard from "./HomeMediaCard";
import { Movie } from "@/types/movie";

type HomeSectionProps = {
  title: string;
  items: Movie[];
  loading: boolean;
  viewAllHref: string;
};

function HomeSectionComponent({
  title,
  items,
  loading,
  viewAllHref,
}: HomeSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayItems = useMemo(() => items.slice(0, 12), [items]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({
      left:
        dir === "left"
          ? scrollLeft - clientWidth * 0.75
          : scrollLeft + clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-14">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-xl font-bold text-main tracking-tight">{title}</h2>
        <Link
          href={viewAllHref}
          className="text-[13px] font-medium text-muted hover:text-main transition-colors duration-200 pb-0.5 border-b border-transparent hover:border-main"
        >
          See all
        </Link>
      </div>

      {loading ? (
        <GridSkeleton count={6} />
      ) : displayItems.length === 0 ? (
        <p className="text-muted text-sm py-10 text-center">
          No content available.
        </p>
      ) : (
        <div className="group/row relative">
          {/* Left fade edge — uses CSS var so it works in light + dark */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
          />

          {/* Left scroll button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[42%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-card border border-main text-muted hover:text-main hover:bg-soft hover:border-main flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-250 active:scale-90 cursor-pointer shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto pb-1 scrollbar-none"
          >
            {displayItems.map((item) => (
              <div
                key={item._id}
                className="flex-none w-[140px] sm:w-[155px] md:w-[170px]"
              >
                <HomeMediaCard item={item} />
              </div>
            ))}
          </div>

          {/* Right fade edge — uses CSS var so it works in light + dark */}
          <div
            className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
          />

          {/* Right scroll button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[42%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-card border border-main text-muted hover:text-main hover:bg-soft hover:border-main flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-250 active:scale-90 cursor-pointer shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </section>
  );
}

export default memo(HomeSectionComponent);
