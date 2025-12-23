"use client";

// types 
import { Series } from "@/types/series";

// contexts
import { FavoriteItem } from "@/contexts/FavoriteContext";

// components
import MediaGrid from "@/components/media/MediaGrid";

type SimilarSeriesGridProps = {
  series: Series[];
  favoriteList: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
};

export default function SimilarSeriesGrid({ series, favoriteList, toggleFavorite }: SimilarSeriesGridProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-red-500 p-5">Similar Series</h1>
      <div className="flex-1 my-10">
        <MediaGrid
          items={series.map((s) => ({
            _id: s._id,
            name: s.name,
            poster: s.poster,
            releaseYear: s.releaseYear ? Number(s.releaseYear) : undefined,
          }))}
          loading={false} 
          favorites={favoriteList}
          mediaType="series"
          getHref={(id) => `/series/${id}`}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </>
  );
}
