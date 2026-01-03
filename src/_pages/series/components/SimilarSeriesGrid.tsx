"use client";

import { memo, useCallback, useMemo } from "react";

import MediaGrid from "@/components/media/MediaGrid";
import { Series } from "@/types/series";

type SimilarSeriesGridProps = {
  series: Series[];
  favoriteList: any[];
  toggleFavorite: (id: string) => void;
};

function SimilarSeriesGridComponent({
  series,
  favoriteList,
  toggleFavorite,
}: SimilarSeriesGridProps) {
  const items = useMemo(
    () =>
      series.map((s) => ({
        _id: s._id,
        name: s.name,
        poster: s.poster,
        releaseYear: s.releaseYear ? Number(s.releaseYear) : undefined,
      })),
    [series]
  );

  const getHref = useCallback((id: string) => `/series/${id}`, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-red-500 p-5">Similar Series</h1>

      <div className="flex-1 my-10">
        <MediaGrid
          items={items}
          mediaType="series"
          loading={false}
          favorites={favoriteList}
          getHref={getHref}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </>
  );
}

const SimilarSeriesGrid = memo(SimilarSeriesGridComponent);
export default SimilarSeriesGrid;
