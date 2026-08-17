"use client";

import { memo } from "react";
import { Sparkles, BrainCircuit, SearchX } from "lucide-react";
import { MediaCard } from "@/components/cards/MediaCard";
import { PATHS } from "@/constant/PATHS";
import type { Movie } from "@/types/movie";

/* ─── Skeleton ─── */
function AiSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div
            className="w-full rounded-lg bg-white/5 animate-pulse"
            style={{ aspectRatio: "2/3" }}
          />
          <div className="h-3 bg-white/5 rounded animate-pulse w-3/4" />
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ─── */
type Props = {
  query: string;
  results: Movie[];
  loading: boolean;
  error: string | null;
  usedRealAi: boolean;
};

function AiSearchResultsComponent({ query, results, loading, error, usedRealAi }: Props) {
  /* loading */
  if (loading) {
    return (
      <section className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/30">
            <BrainCircuit size={20} className="text-primary animate-pulse" />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">AI is thinking...</p>
            <p className="text-xs text-muted/60 mt-0.5">
              Analyzing your query: &quot;{query}&quot;
            </p>
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]" />
        </div>

        <AiSkeletonGrid />
      </section>
    );
  }

  /* error */
  if (error) {
    return (
      <section className="py-10 text-center space-y-3">
        <SearchX size={40} className="mx-auto text-muted/50" />
        <p className="text-muted text-sm">{error}</p>
      </section>
    );
  }

  /* no results */
  if (!results.length) {
    return (
      <section className="py-14 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10">
          <SearchX size={28} className="text-muted" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white/80">No matches found</p>
          <p className="text-sm text-muted mt-1">
            Try describing the movie differently — mood, plot, or characters.
          </p>
        </div>
      </section>
    );
  }

  /* results */
  return (
    <section className="space-y-6">
      {/* Header badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-3 py-1.5">
          <Sparkles size={14} className="text-primary" />
          <span className="text-primary text-xs font-semibold tracking-wide">
            {usedRealAi ? "Gemini AI Results" : "Smart Search Results"}
          </span>
        </div>
        <span className="text-muted text-sm">
          {results.length} movie{results.length !== 1 ? "s" : ""} matched for &quot;{query}&quot;
        </span>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
        {results.map((movie, index) => (
          <div key={movie._id} className="relative">
            {/* Rank badge for top 3 */}
            {index < 3 && (
              <div className="absolute -top-1.5 -left-1.5 z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-white text-[10px] font-bold">#{index + 1}</span>
              </div>
            )}
            <MediaCard
              id={movie._id}
              title={movie.name}
              poster={movie.poster}
              releaseYear={movie.releaseYear}
              rating={movie.rating}
              href={PATHS.MOVIE_DETAILS(movie._id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(AiSearchResultsComponent);
