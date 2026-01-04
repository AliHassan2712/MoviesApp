"use client";

//components
import { MediaCard } from "@/components/cards/MediaCard";
import { WatchlistEmpty } from "./components/WatchlistEmpty";

//hooks
import { useWatchlist } from "./hooks/useWatchlist";

//icons
import { Bookmark } from "lucide-react";

export default function WatchlistPage() {
  const { items, isEmpty } = useWatchlist();

  return (
    <div className="min-h-screen pt-20 px-6 max-w-6xl mx-auto space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bookmark className="text-blue-400" size={32} />
          Your Watchlist
        </h1>
        <p className="text-muted mt-2">
          Movies and series you plan to watch later
        </p>
      </div>

      {/* Empty */}
      {isEmpty && <WatchlistEmpty />}

      {/* Grid */}
      {!isEmpty && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <MediaCard
              key={`${item.type}-${item.id}`}
              id={item.id}
              title={item.name}
              poster={item.poster}
              href={`/${item.type}/${item.id}`}
            />

          ))}
        </div>
      )}
    </div>
  );
}
