import { memo, useCallback } from "react";
import { FavoriteType } from "@/types/favorite";
import { Film, Tv } from "lucide-react";

type FavoritesTabsProps = {
  activeTab: FavoriteType;
  onChange: (tab: FavoriteType) => void;
};

function FavoritesTabsComponent({ activeTab, onChange }: FavoritesTabsProps) {
  const goMovies = useCallback(() => onChange("movies"), [onChange]);
  const goSeries = useCallback(() => onChange("series"), [onChange]);

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={goMovies}
        className={`flex items-center gap-2 px-5 py-2 rounded-full
          ${activeTab === "movies" ? "btn-primary text-white" : "bg-soft hover:bg-card"}`}
      >
        <Film size={18} />
        Movies
      </button>

      <button
        onClick={goSeries}
        className={`flex items-center gap-2 px-5 py-2 rounded-full
          ${activeTab === "series" ? "btn-primary text-white" : "bg-soft hover:bg-card"}`}
      >
        <Tv size={18} />
        Series
      </button>
    </div>
  );
}

export const FavoritesTabs = memo(FavoritesTabsComponent);
export default FavoritesTabs;
