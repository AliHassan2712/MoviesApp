// app/movies/[id]/page.tsx
 // إذا تحتاج استخدام useState / useEffect — أو تخلّيها server component إذا ممكن


 "use client";
 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFavorite } from "@/contexts/FavoriteContext";

type Movie = {
  _id: string;
  name: string;
  description: string;
  poster: string;
  backdrop: string;
  duration: number;
  releaseYear: number;
  genresRefs: string[];
  castRefs: { id: string; name: string; avatar?: string }[]; // عدّلي حسب شكل cast
  country?: string;
  languages?: string[];
  budget?: number;
  viewsCount?: number;
  rating?: number;
};

export default function FilmDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const { favoriteList, toggleFavorite } = useFavorite();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch("https://movies-api-w3xb.onrender.com/api/v1/movies/692ea9f0b8794d67cdd42447");
        const json = await res.json();
        const found: Movie | undefined = json.data.find((m: Movie) => m._id === id);
        if (found) {
          setMovie(found);
        } else {
          console.error("Movie not found with id", id);
        }
      } catch (err) {
        console.error("Fetch movie error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  const isFav = favoriteList.includes(movie._id);

  return (
    <div className="space-y-8 p-4">
      {/* ====== Video / Hero Section ====== */}
      <div className="w-full h-64 md:h-96 bg-black relative">
        {/* مثال: لو عندك فيديو */}
        {/* <video src={movie.videoUrl} controls className="w-full h-full object-cover" /> */}
        {/* إذا ما عندك فيديو: استخدمي backdrop أو poster */}
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => toggleFavorite(movie._id)}
          className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow ${
            isFav ? "text-red-500" : "text-gray-500"
          }`}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>

      {/* ====== Basic Info: Title, Year, Rating, Views ====== */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{movie.name}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>📅 {movie.releaseYear}</span>
          {movie.rating != null && <span>⭐ {movie.rating.toFixed(1)}</span>}
          {movie.viewsCount != null && <span>👁️ {movie.viewsCount} views</span>}
        </div>
        <p className="mt-3 text-gray-800">{movie.description}</p>
      </div>

      {/* ====== Detailed Info Section ====== */}
      <div className="border-t pt-4 space-y-2 text-gray-700">
        <h2 className="text-xl font-semibold">Details</h2>
        <ul className="space-y-1">
          {movie.country && <li><strong>Country:</strong> {movie.country}</li>}
          {movie.languages && <li><strong>Languages:</strong> {movie.languages.join(", ")}</li>}
          {movie.duration && <li><strong>Duration:</strong> {movie.duration} min</li>}
          <li><strong>Genres:</strong> {movie.genresRefs.join(", ")}</li>
          {movie.budget && <li><strong>Budget:</strong> ${movie.budget.toLocaleString()}</li>}
          <li><strong>Cast Count:</strong> {movie.castRefs.length}</li>
        </ul>
      </div>

      {/* ====== Cast Section ====== */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movie.castRefs.map(cast => (
            <div key={cast.id} className="bg-white rounded overflow-hidden shadow">
              {cast.avatar && (
                <img src={cast.avatar} alt={cast.name} className="w-full h-40 object-cover" />
              )}
              <div className="p-2">
                <h3 className="font-semibold">{cast.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
