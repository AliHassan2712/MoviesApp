"use client";

import Image from "next/image";
import Link from "next/link";
import GridSkeleton from "@/components/skeletons/GridSkeleton";
import { PATHS } from "@/constant/PATHS";
import { Movie } from "@/types/movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useFavorite } from "@/contexts/FavoriteContext";

type Props = {
  title: string;
  items: Movie[];
  loading: boolean;
  viewAllHref: string;
};

export default function HomeSection({
  title,
  items,
  loading,
  viewAllHref,
}: Props) {


    const { favoriteList, toggleFavorite } = useFavorite();
  
  return (
    <section className="px-6 mb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href={viewAllHref}
          className="text-primary text-sm hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <GridSkeleton count={6} />
      ) : items.length === 0 ? (
        <p className="text-muted">No items found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="p-4 bg-card rounded-xl shadow transition hover:shadow-lg"
            >
              <div className="relative overflow-hidden rounded-lg">
                <Link
                  key={item._id}
                  href={PATHS.SERIES_DETAILS(item._id)}
                  className="bg-card rounded-xl overflow-hidden hover:scale-105 transition"
                >
                  <Image
                    src={item.poster || "/assets/images/img_hero.jpg"}
                    alt={item.name}
                    width={300}
                    height={450}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-3">
                    <p className="font-semibold truncate">{item.name}</p>
                    {item.releaseYear && (
                      <p className="text-muted text-sm">{item.releaseYear}</p>
                    )}
                  </div>
                </Link>


                <button
                  className="absolute top-3 right-3 bg-soft p-2 rounded-full shadow"
                  onClick={() => toggleFavorite({ id: item._id, type: "movies" })}
                >
                  <FontAwesomeIcon
                    icon={
                      favoriteList.some(favorite => favorite.id === item._id)
                        ? faHeart
                        : faHeartRegular
                    }
                    className={`text-xl ${favoriteList.some(favorite => favorite.id === item._id)
                      ? "text-red-500"
                      : "text-muted"
                      }`}
                  />
                </button>
              </div>


            </div>
          ))}
        </div>
      )}
    </section>
  );
}
