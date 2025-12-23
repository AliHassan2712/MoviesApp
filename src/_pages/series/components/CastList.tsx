"use client";
//React & Next
import Image from "next/image";

//types
import { Cast } from "@/types/series";

type CastListProps = {
  cast: Cast[];
};

export default function CastList({ cast }: CastListProps) {
  if (!cast || cast.length === 0)
    return <div className="text-center text-muted">No Cast Found for this Series</div>;

  return (
    <>
      <h1 className="text-3xl font-bold text-red-500 p-5">Cast</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 p-2">
        {cast.map(actor => (
          <li key={actor._id} className="shrink w-60 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Image src={actor.profilePath || "/assets/images/img_hero.jpg"} alt={actor.name} width={400} height={300} className="w-full h-70 md:h-80 object-cover" />
            <div className="p-2 text-center flex flex-col items-center justify-center gap-2 text-[16px]">
              <h2 className="text-sm font-semibold text-main truncate">{actor.name}</h2>
              <p className="text-xs text-muted">{`Popularity: ${actor.popularity?.toFixed(1)}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
