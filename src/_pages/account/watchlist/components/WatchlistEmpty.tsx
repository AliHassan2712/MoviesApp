import Link from "next/link";
import { Bookmark } from "lucide-react";

export function WatchlistEmpty() {
  return (
    <div className="text-center py-20 opacity-70">
      <Bookmark size={80} className="mx-auto text-blue-400 mb-4" />
      <h2 className="text-2xl font-semibold">
        Your Watchlist is Empty
      </h2>
      <p className="text-muted mt-1">
        Add movies to your watchlist and track what you want to watch later.
      </p>

      <Link
        href="/movies"
        className="mt-6 inline-block bg-secondary px-6 py-3"
      >
        Explore Movies
      </Link>
    </div>
  );
}
