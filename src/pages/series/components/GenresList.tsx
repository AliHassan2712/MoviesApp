import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Genre {
  id: number;
  genre: string;
}

interface GenreButtonProps {
  children: string;
}

export default function GenresList() {
  const [isActive, setIsActive] = useState(false);

  const genres: Genre[] = [
    { id: 0, genre: "رسوم متحركة" },
    { id: 1, genre: "حركة ومغامرة" },
    { id: 2, genre: "كوميديا" },
    { id: 3, genre: "دراما" },
    { id: 4, genre: "جريمة" },
    { id: 5, genre: "وثائقي" },
    { id: 6, genre: "أخبار" },
    { id: 7, genre: "غموض" },
    { id: 8, genre: "خيال علمي وفانتازيا" },
    { id: 9, genre: "أوبرا صابونية" },
    { id: 10, genre: "حوار" },
    { id: 11, genre: "غربي" },
    { id: 12, genre: "أطفال" },
    { id: 13, genre: "عائلي" },
    { id: 14, genre: "حرب وسياسة" },
    { id: 15, genre: "واقع" },
  ];

  function handleScreen() {
    setIsActive((prev) => !prev);
  }

  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-4 lg:w-[25%] md:w-[35%]">
      <button
        type="button"
        onClick={handleScreen}
        aria-expanded={isActive}
        className="md:hidden flex justify-between items-center border border-white/20 p-2 rounded"
      >
        Show Genres
        {isActive ? <ChevronUp /> : <ChevronDown />}
      </button>

      <div
        className={`w-full border border-white/10 mt-5 px-3 rounded-2xl box-border h-fit shadow-md shadow-white/30 ${
          isActive ? "block" : "hidden"
        } md:block`}
      >
        <div className="text-center font-bold p-2">
          التصنيفات
          <hr className="border-t border-white/20 mt-4 w-full" />
        </div>

        <div
          className="grid grid-cols-2 gap-2 h-80 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {genres.map((genre) => (
            <GenreButton key={genre.id}>{genre.genre}</GenreButton>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenreButton({ children }: GenreButtonProps) {
  return (
    <button
      type="button"
      aria-label={`genre ${children}`}
      className="inline-flex cursor-pointer justify-center items-center rounded flex-1 p-2 md:p-3 transition-all duration-200 hover:bg-red-600 hover:text-white focus:outline-none text-sm bg-black/5"
    >
      {children}
    </button>
  );
}
