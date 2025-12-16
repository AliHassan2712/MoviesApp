"use client";

import Image from "next/image";
import Link from "next/link";

// icons
import { Heart, Film, Tv } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";

// context
import { useFavorite } from "@/contexts/FavoriteContext";

// components
import { Container } from "@/components/containers/Container";
import GridSkeleton from "@/components/skeletons/GridSkeleton";
import Pagination from "@/components/ui/Pagination";

// hook
import { useFavorites } from "./hooks/useFavorites";

export default function FavoritesPage() {
  const { toggleFavorite, favoriteList } = useFavorite();

  const {
    loading,
    activeTab,
    setActiveTab,
    items,
    page,
    setPage,
    pagination,
  } = useFavorites();

  return (
    <Container>
      <div className="px-4 py-10 space-y-8">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Heart className="text-primary" />
            Your Favorites
          </h1>
          <p className="text-muted mt-1">
            Movies & Series you marked as favorite
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("movie")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full
              ${
                activeTab === "movie"
                  ? "btn-primary text-white"
                  : "bg-soft hover:bg-card"
              }`}
          >
            <Film size={18} />
            Movies
          </button>

          <button
            onClick={() => setActiveTab("series")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full
              ${
                activeTab === "series"
                  ? "btn-primary text-white"
                  : "bg-soft hover:bg-card"
              }`}
          >
            <Tv size={18} />
            Series
          </button>
        </div>

        {/* ================= LOADING ================= */}
        {loading && <GridSkeleton count={6} />}

        {/* ================= EMPTY STATE ================= */}
        {!loading && pagination.totalDocs === 0 && (
          <div className="text-center py-20 space-y-4">
            <p className="text-muted text-lg">
              No {activeTab} favorites yet
            </p>

            <Link
              href={activeTab === "movie" ? "/movies" : "/series"}
              className="inline-block btn-primary px-6 py-3 rounded-lg font-semibold"
            >
              Browse {activeTab === "movie" ? "Movies" : "Series"}
            </Link>
          </div>
        )}

        {/* ================= GRID ================= */}
        {!loading && items.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={`${item.type}-${item._id}`}
                  className="p-4 bg-card rounded-xl shadow"
                >
                  <div className="relative rounded-lg overflow-hidden">
                    <Link href={`/${item.type}s/${item._id}`}>
                      <Image
                        src={item.poster || "/assets/images/img_hero.jpg"}
                        alt={item.name}
                        width={400}
                        height={300}
                        className="w-full h-52 object-cover"
                      />
                    </Link>

                    <button
                      className="absolute top-3 right-3 bg-soft p-2 rounded-full"
                      onClick={() =>
                        toggleFavorite({
                          id: item._id,
                          type: item.type,
                        })
                      }
                    >
                      <FontAwesomeIcon
                        icon={
                          favoriteList.some(
                            (f) =>
                              f.id === item._id &&
                              f.type === item.type
                          )
                            ? faHeartSolid
                            : faHeartRegular
                        }
                        className={`text-xl ${
                          favoriteList.some(
                            (f) =>
                              f.id === item._id &&
                              f.type === item.type
                          )
                            ? "text-red-500"
                            : "text-muted"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="font-bold mt-2">{item.name}</p>
                  {item.releaseYear && (
                    <p className="text-sm text-muted">
                      {item.releaseYear}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {pagination.totalPages > 1 && (
              <Pagination
                pagination={pagination}
                onChange={(p) => {
                  setPage(p);
                  
                }}
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
}
