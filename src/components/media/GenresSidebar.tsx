"use client";

import { memo, useCallback } from "react";
import GenresSidebarSkeleton from "@/components/skeletons/GenresSidebarSkeleton";

type GenresSidebarProps = {
  genres: { _id: string; name_en: string }[];
  activeId: string;
  onChange: (id: string) => void;
  loading: boolean;
};

function GenresSidebarComponent({ genres, activeId, onChange, loading }: GenresSidebarProps) {
  const handleClick = useCallback(
    (id: string) => () => onChange(id),
    [onChange]
  );

  if (loading) return <GenresSidebarSkeleton />;

  return (
    <div className="hidden md:block w-64 bg-soft p-5 rounded-2xl h-fit sticky top-10">
      <h3 className="text-lg font-bold mb-4 text-primary">Genres</h3>

      <div className="grid grid-cols-2 gap-3">
        {genres.map((g) => (
          <button
            key={g._id}
            onClick={handleClick(g._id)}
            className={`px-4 py-2 rounded-lg transition ${
              activeId === g._id ? "btn-primary text-white" : "bg-card text-main hover:bg-soft"
            }`}
          >
            {g.name_en}
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(GenresSidebarComponent);
