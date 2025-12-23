//types
import { FavoriteType } from "@/types/favorite";

//icons
import { Film, Tv } from "lucide-react";


type FavoritesTabsProps = {
    activeTab: FavoriteType;
    onChange: (tab: FavoriteType) => void;
};

export function FavoritesTabs({ activeTab, onChange }: FavoritesTabsProps) {
    return (
        <div className="flex justify-center gap-4">
            <button
                onClick={() => onChange("movies")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full
          ${activeTab === "movies"
                        ? "btn-primary text-white"
                        : "bg-soft hover:bg-card"
                    }`}
            >
                <Film size={18} />
                Movies
            </button>

            <button
                onClick={() => onChange("series")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full
          ${activeTab === "series"
                        ? "btn-primary text-white"
                        : "bg-soft hover:bg-card"
                    }`}
            >
                <Tv size={18} />
                Series
            </button>
        </div>
    );
}

export default FavoritesTabs;
