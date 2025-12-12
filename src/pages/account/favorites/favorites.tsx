"use client";
// Next
import Link from "next/link";

// context
import { useAuth } from "@/contexts/AuthContext";

// react icons
import { Heart } from "lucide-react";

type FavoriteItem = string; 

export default function FavoritesPage() {
  const { user } = useAuth();

  const favorites: FavoriteItem[] = user?.favorites || [];

  return (
    <div className="min-h-screen pt-20 px-6 max-w-6xl mx-auto space-y-10">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold  flex items-center gap-3">
          <Heart className="text-red-500" size={32} />
          Your Favorites
        </h1>
        <p className="text-muted mt-2">
          All the movies and series you marked as favorite
        </p>
      </div>

      {/* EMPTY STATE */}
      {favorites.length === 0 && (
        <div className="text-center py-20 opacity-70">
          <Heart size={80} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold ">
            No Favorites Yet
          </h2>
          <p className="text-muted mt-1">
            Start exploring and add movies to your favorites.
          </p>

          <Link
            href="/movies"
            className="mt-6 inline-block bg-primary py-3 px-6 rounded-lg font-semibold"
          >
            Browse Movies
          </Link>
        </div>
      )}

      {/* GRID OF FAVORITES */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {favorites.map((movieId) => (
          <Link
            href={`/movies/${movieId}`}
            key={movieId}
            className="group bg-card border border-main rounded-xl overflow-hidden hover:border-primary transition"
          >
            {/* Placeholder for movie poster */}
            <div className="h-48 bg-gray-800" />

            <div className="p-3">
              <p className=" group-hover:text-primary transition">
                Movie ID: {movieId}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
