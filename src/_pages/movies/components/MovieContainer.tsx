"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ================= TYPES ================= */

type Movie = {
  _id: string;
  name: string;
  description: string;
  poster: string;
  backdrop: string;
  duration: number;
  releaseYear: number;
  genresRefs: { _id: string; name_en: string }[];
  castRefs: { _id: string; name: string; profilePath: string | null }[];
  isDeleted: boolean;
  videoUrl?: string;
};

type ApiResponse<T> = {
  status: string;
  data: T;
};

/* ================= FETCH ================= */

async function getMovieById(id: string): Promise<Movie> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch movie");

  const json: ApiResponse<Movie> = await res.json();
  return json.data;
}

/* ================= COMPONENT ================= */

export default function MovieContainer({ id }: { id: string }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  useEffect(() => {
    getMovieById(id).then(setMovie);
  }, [id]);

  if (!movie) return null;

  if (movie.isDeleted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-bold">
          This movie is not available
        </p>
      </div>
    );
  }

  const {
    name,
    description,
    poster,
    backdrop,
    releaseYear,
    duration,
    genresRefs,
    castRefs,
    videoUrl,
  } = movie;

  return (
    <div className="w-full">
      {/* ================= HERO ================= */}
      <div className="relative h-[420px] md:h-[560px]">
        <Image
          src={backdrop}
          alt={name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0  from-black via-black/70 to-black/30" />

        <div className="absolute inset-0 flex items-end p-6 md:p-12">
          <div className="max-w-4xl">
            <h1 className="text-white text-4xl md:text-6xl font-extrabold">
              {name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  if (!videoUrl) {
                    setShowLoginMsg(true);
                    return;
                  }
                  setShowLoginMsg(false);
                  setShowPlayer((prev) => !prev);
                }}
                className="bg-primary text-white px-7 py-3 rounded-2xl font-bold text-lg hover:opacity-90 transition"
              >
                ▶ {showPlayer ? "Hide Video" : "Watch Movie"}
              </button>

              <span className="px-4 py-2 rounded-xl bg-white/10 text-white">
                🎬 {releaseYear}
              </span>
              <span className="px-4 py-2 rounded-xl bg-white/10 text-white">
                ⏱ {duration} min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= NOT LOGGED IN MESSAGE ================= */}
      {showLoginMsg && (
        <div className="container mx-auto px-4 md:px-10 mt-6">
          <div className="flex items-center justify-between gap-4 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl">
            <p className="font-medium">
              🔒 You must be logged in to watch this movie
            </p>
            <button
              onClick={() => setShowLoginMsg(false)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ================= VIDEO PLAYER ================= */}
      {showPlayer && videoUrl && (
        <div className="container mx-auto px-4 md:px-10 mt-12">
          <div className="max-w-6xl mx-auto bg-black/60 border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl">
            <div className="aspect-video">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Poster */}
        <div>
          <Image
            src={poster}
            alt={name}
            width={500}
            height={750}
            className="rounded-2xl shadow-xl"
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {genresRefs.map((g) => (
              <span
                key={g._id}
                className="btn-primary px-3 py-1 rounded-xl"
              >
                {g.name_en}
              </span>
            ))}
          </div>
        </div>

        {/* Description + Cast */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-white mb-2">Overview</h2>
          <p className="text-muted leading-relaxed max-w-3xl">
            {description}
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {castRefs.map((cast) => (
              <div key={cast._id} className="text-center">
                <Image
                  src={cast.profilePath || "/avatar.png"}
                  alt={cast.name}
                  width={112}
                  height={112}
                  className="rounded-full mx-auto object-cover"
                />
                <p className="mt-3 text-sm text-white">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
