"use client";

import Image from "next/image";
import Movies from "../../../../public/assets/images/movies.jpg";

export default function Hero() {
  return (
    <section className="relative w-full margin-bottom">
      <div className="relative w-full h-[60vh] md:h-screen lg:h-[85vh]">

        {/* Hero Image */}
        <Image
          src={Movies}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Gradient Overlay (Dynamic) */}
        <div
          className="absolute inset-0 bg-hero-gradient"
          aria-hidden="true"
        />

        {/* Overlay (Dynamic) */}
        <div className="absolute inset-0 bg-overlay" />

        {/* Content */}
        <div className="absolute inset-0 flex px-6 md:px-12 py-12">
          <div className="max-w-4xl text-hero">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
              🎬 Discover Your Next Favorite Movie
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-hero-muted max-w-3xl">
              Browse, explore, and stream the latest blockbusters and timeless classics.
              From action-packed adventures to heartwarming dramas, find movies that match your mood.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
