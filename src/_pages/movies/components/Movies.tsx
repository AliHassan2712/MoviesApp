"use client";

import { useCallback, useMemo, useState } from "react";

import { useMovies } from "../hooks/useMovies";
import { useGenres } from "@/_pages/genres/hooks/useGenres";
import { useFavorite } from "@/contexts/FavoriteContext";

import { Container } from "@/components/containers/Container";
import GenresTabs from "@/components/media/GenresTabs";
import GenresSidebar from "@/components/media/GenresSidebar";
import MobileGenresModal from "@/components/media/MobileGenresModal";
import MediaGrid from "@/components/media/MediaGrid";
import MediaPagination from "@/components/media/MediaPagination";

import { PATHS } from "@/constant/PATHS";

export default function MoviesPage() {
  const { allGenres, activeTab, setActiveTab } = useGenres();

  const query = useMemo(
    () => (activeTab !== "0" ? `genresRefs=${activeTab}` : undefined),
    [activeTab]
  );

  const { movies, loading, pagination, setPage } = useMovies(query);
  const { favoriteList, toggleFavorite } = useFavorite();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMovieHref = useCallback((id: string) => PATHS.MOVIE_DETAILS(id), []);

  const handleToggleFavorite = useCallback(
    (id: string) => toggleFavorite({ id, type: "movies" }),
    [toggleFavorite]
  );

  return (
    <>
      <GenresTabs
        genres={allGenres}
        activeId={activeTab}
        onChange={setActiveTab}
        loading={loading}
      />

      <Container>
        <div className="flex flex-col lg:flex-row gap-6 py-10 relative">
          <GenresSidebar
            genres={allGenres}
            activeId={activeTab}
            onChange={setActiveTab}
            loading={loading}
          />

          <MobileGenresModal
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            genres={allGenres}
            activeId={activeTab}
            onSelect={setActiveTab}
            loading={loading}
          />

          <MediaGrid
            items={movies}
            loading={loading}
            favorites={favoriteList}
            getHref={getMovieHref}
            onToggleFavorite={handleToggleFavorite}
            mediaType="movies" 
          />
        </div>

        {pagination && (
          <MediaPagination pagination={pagination} onChange={setPage} />
        )}
      </Container>
    </>
  );
}
