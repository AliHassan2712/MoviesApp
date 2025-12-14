//Next
import Link from "next/link";

// react icons
import { Bookmark } from "lucide-react";

export default function WatchlistPage() {
  const watchlist: string[] = []; 

  return (
    <div className="min-h-screen pt-20 px-6 max-w-6xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold  flex items-center gap-3">
          <Bookmark className="text-blue-400" size={32} />
          Your Watchlist
        </h1>
        <p className="text-muted mt-2">
          Movies and series you plan to watch later
        </p>
      </div>

      {/* EMPTY STATE */}
      {watchlist.length === 0 && (
        <div className="text-center py-20 opacity-70">
          <Bookmark size={80} className="mx-auto text-blue-400 mb-4" />
          <h2 className="text-2xl font-semibold ">
            Your Watchlist is Empty
          </h2>
          <p className="text-muted mt-1">
            Add movies to your watchlist and track what you want to watch later.
          </p>

          <Link
            href="/movies"
            className="mt-6 inline-block py-3 px-6 rounded-lg font-semibold "
          >
            Explore Movies
          </Link>
        </div>
      )}

      {/* GRID LISTING */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {watchlist.map((id) => (
          <Link
            href={`/movies/${id}`}
            key={id}
            className="group bg-card border border-main rounded-xl overflow-hidden hover:border-primary transition"
          >
            <div className="h-48 bg-gray-800" />
            <div className="p-3">
              <p className=" group-hover:text-primary transition">
                Movie ID: {id}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
