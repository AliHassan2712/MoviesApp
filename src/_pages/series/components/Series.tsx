"use client";

import { useCallback, useMemo, useState } from "react";

import { useSeries } from "../hooks/useSeries";
import { useGenres } from "@/_pages/genres/hooks/useGenres";
import { useFavorite } from "@/contexts/FavoriteContext";

import { Container } from "@/components/containers/Container";
import GenresTabs from "@/components/media/GenresTabs";
import GenresSidebar from "@/components/media/GenresSidebar";
import MobileGenresModal from "@/components/media/MobileGenresModal";
import MediaGrid from "@/components/media/MediaGrid";
import MediaPagination from "@/components/media/MediaPagination";

import { PATHS } from "@/constant/PATHS";

export default function SeriesPage() {
  const { allGenres, activeTab, setActiveTab } = useGenres();

  const query = useMemo(
    () => (activeTab !== "0" ? `genresRefs=${activeTab}` : undefined),
    [activeTab]
  );

  const { series, loading, pagination, setPage } = useSeries(query);
  const { favoriteList, toggleFavorite } = useFavorite();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getSeriesHref = useCallback(
    (id: string) => PATHS.SERIES_DETAILS(id),
    []
  );

  const handleToggleFavorite = useCallback(
    (id: string) => toggleFavorite({ id, type: "series" }),
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
            items={series.map((s) => ({
              ...s,
              releaseYear: s.releaseYear ? Number(s.releaseYear) : undefined
            }))}
            loading={loading}
            favorites={favoriteList}
            getHref={getSeriesHref}
            onToggleFavorite={handleToggleFavorite}
            mediaType="series" 
          />
        </div>

        {pagination && (
          <MediaPagination pagination={pagination} onChange={setPage} />
        )}
      </Container>
    </>
  );
}
