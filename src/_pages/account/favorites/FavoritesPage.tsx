"use client";

import { memo, useCallback, useMemo } from "react";
import { Container } from "@/components/containers/Container";
import GridSkeleton from "@/components/skeletons/GridSkeleton";
import Pagination from "@/components/ui/Pagination";
import { MediaCard } from "@/components/cards/MediaCard";
import { FavoritesTabs } from "./components/FavoritesTabs";
import { useFavorite } from "@/contexts/FavoriteContext";
import { useFavorites } from "./hooks/useFavorites";
import { Heart } from "lucide-react";

const FavoriteGridItem = memo(function FavoriteGridItem({
  item,
  href,
  isFav,
  onToggle,
}: {
  item: any;
  href: string;
  isFav: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <MediaCard
      id={item._id}
      title={item.name}
      poster={item.poster}
      releaseYear={item.releaseYear}
      aspect="portrait"
      href={href}
      isFavorite={isFav}
      onToggleFavorite={onToggle}
    />
  );
});

export default function FavoritesPage() {
  const { toggleFavorite, isFavorite } = useFavorite();
  const { loading, activeTab, setActiveTab, items, setPage, pagination } =
    useFavorites();

  const handleToggle = useCallback(
    (id: string) => toggleFavorite({ id, type: activeTab }),
    [toggleFavorite, activeTab]
  );

  const itemsWithFav = useMemo(
    () =>
      items.map((item: any) => ({
        ...item,
        fav: isFavorite({ id: item._id, type: activeTab }),
      })),
    [items, isFavorite, activeTab]
  );

  return (
    <Container>
      <div className="px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Heart className="text-red-400" size={32} />
            Your Favorites
          </h1>
          <p className="text-muted">Movies & Series you marked as favorite</p>
        </div>

        <FavoritesTabs activeTab={activeTab} onChange={setActiveTab} />

        {loading && <GridSkeleton count={6} />}

        {!loading && itemsWithFav.length === 0 && (
          <p className="text-center text-muted py-20">
            No favorites yet 💔
          </p>
        )}

        {!loading && itemsWithFav.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {itemsWithFav.map((item: any) => (
                <FavoriteGridItem
                  key={item._id}
                  item={item}
                  href={`/${activeTab}/${item._id}`}
                  isFav={item.fav}
                  onToggle={handleToggle}
                />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <Pagination pagination={pagination} onChange={setPage} />
            )}
          </>
        )}
      </div>
    </Container>
  );
}
