"use client";

// React & Next
import Image from "next/image";
import Link from "next/link";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

// types
import { Series, Genre } from "@/types/series";
import { Season } from "@/types/season";
import { FavoriteItem } from "@/types/favorite";

// constants
import { PATHS } from "@/constant/PATHS";

type SeriesDetailsProps = {
  series: Series;
  favoriteList: FavoriteItem[];
  toggleFavorite: (id: string) => void; // ✅ id فقط
  season: Season[];
};

export default function SeriesDetails({
  series,
  favoriteList,
  toggleFavorite,
  season,
}: SeriesDetailsProps) {
  const isSeriesFavorite = favoriteList.some(
    (fav) => fav.id === series._id && fav.type === "series"
  );

  return (
    <div className="mt-10 flex flex-col gap-y-8 py-10">
      <h1 className="text-3xl mb-2 font-bold">{series.name}</h1>

      {/* Genres */}
      <ul className="flex flex-wrap md:flex-nowrap gap-5">
        {series.genres?.map((genre: Genre) => (
          <li
            key={genre._id}
            className="btn-primary text-white px-2 py-1 rounded-xl"
          >
            {genre.name_en}
          </li>
        ))}
      </ul>

      {/* Description */}
      <div>
        <p className="text-3xl font-bold text-red-500 mb-2">
          Description
        </p>
        <p className="text-[16px] text-muted mt-1">
          {series.description}
        </p>
      </div>

      {/* Actions */}
      <div className="w-[80%] md:w-[20%] flex justify-between items-center gap-2">
        <button
          className={`cursor-pointer border p-2 rounded flex items-center gap-1 ${
            isSeriesFavorite ? "bg-red-500" : "bg-muted"
          }`}
          onClick={() => toggleFavorite(series._id)}
        >
          Add to favorite
          <FontAwesomeIcon
            icon={isSeriesFavorite ? faHeart : faHeartRegular}
            className={`text-xl ${
              isSeriesFavorite ? "text-white" : "text-red-500"
            }`}
          />
        </button>

        <button className="cursor-pointer border p-2 rounded flex items-center gap-1">
          Share <FontAwesomeIcon icon={faShareNodes} />
        </button>
      </div>

      {/* Seasons */}
      <div>
        <h1 className="text-3xl font-bold text-red-500 p-5">
          Season
        </h1>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-1">
          {season.map((s) => (
            <li
              key={s._id}
              className="shrink w-65 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={PATHS.SEASONS(series._id, s._id)}>
                <Image
                  src={s.poster || "/assets/images/img_hero.jpg"}
                  alt="season poster"
                  width={400}
                  height={300}
                  className="w-full h-65 md:h-75 object-cover"
                />
                <div className="p-2 text-center flex flex-col items-start justify-between gap-2 text-[16px]">
                  <div>Season: {s.seasonNumber}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
