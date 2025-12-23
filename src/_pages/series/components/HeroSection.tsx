"use client";

//React & Next
import Image from "next/image";

//types
import { Series } from "@/types/series";

type HeroSectionProps = {
  series: Series;
};

export default function HeroSection({ series }: HeroSectionProps) {
  return (
    <div className="relative h-[60vh] md:h-screen lg:h-[85vh] animate-fade py-10">
      <Image
        src={series.backdrop || "/assets/images/img_hero.jpg"}
        alt={series.name || ""}
        fill
        className="object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="absolute inset-0 flex items-end px-6 md:px-12 py-16">
        <div className="max-w-4xl text-white animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-extrabold">{series.name}</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            {series.description || "Featured content you should watch 📺"}
          </p>
        </div>
      </div>
    </div>
  );
}
