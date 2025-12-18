"use client";

import { Heart } from "lucide-react";

import { Container } from "@/components/containers/Container";
import GridSkeleton from "@/components/skeletons/GridSkeleton";
import Pagination from "@/components/ui/Pagination";
import { MediaCard } from "@/components/cards/MediaCard";

import { useFavorite } from "@/contexts/FavoriteContext";
import { useFavorites } from "./hooks/useFavorites";
import { FavoritesTabs } from "./components/FavoritesTabs";

export default function FavoritesPage() {
  const { toggleFavorite, isFavorite } = useFavorite();

  const {
    loading,
    activeTab,
    setActiveTab,
    items,
    setPage,
    pagination,
  } = useFavorites();

  return (
    <Container>
      <div className="px-4 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          <p className="text-muted">
            Movies & Series you marked as favorite
          </p>
        </div>

        {/* Tabs */}
        <FavoritesTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Loading */}
        {loading && <GridSkeleton count={6} />}

        {/* Content */}
        {!loading && items.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={`${item.type}-${item._id}`}
                  className="relative"
                >
                  <MediaCard
                    title={item.name}
                    poster={item.poster}
                    releaseYear={item.releaseYear}
                    aspect="portrait"
                    href={`/${activeTab}/${item._id}`}
                  />

                  {/* Favorite overlay */}
                  <button
                    onClick={() =>
                      toggleFavorite({
                        id: item._id,
                        type: activeTab,
                      })
                    }
                    className="absolute top-3 right-3 bg-soft p-2 rounded-full shadow"
                  >
                    <Heart
                      size={18}
                      className={
                        isFavorite({
                          id: item._id,
                          type: activeTab,
                        })
                          ? "text-red-500 fill-red-500"
                          : "text-muted"
                      }
                    />
                  </button>
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <Pagination
                pagination={pagination}
                onChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
}
