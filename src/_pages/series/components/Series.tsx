'use client'

//React
import { useState } from 'react'

// hooks
import { useGenres } from '@/_pages/genres/hooks/useGenres'

// context
import { useFavorite } from '@/contexts/FavoriteContext'

// components
import { Container } from '@/components/containers/Container'
import GenresTabs from '@/components/media/GenresTabs'
import GenresSidebar from '@/components/media/GenresSidebar'
import MobileGenresModal from '@/components/media/MobileGenresModal'
import MediaGrid from '@/components/media/MediaGrid'
import MediaPagination from '@/components/media/MediaPagination'

// constants
import { PATHS } from '@/constant/PATHS'
import { useSeries } from '../hooks/useSeries'

export default function SeriesPage() {
  /* ===== GENRES ===== */
  const { allGenres, activeTab, setActiveTab } = useGenres()

  const query =
    activeTab !== '0' ? `genres=${activeTab}` : undefined

  /* ===== Series ===== */
  const {
    series,
    loading,
    pagination,
    setPage,
  } = useSeries(query)

  /* ===== FAVORITES ===== */
  const { favoriteList, toggleFavorite } = useFavorite()

  /* ===== UI STATE ===== */
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* ===== TOP GENRES TABS ===== */}
      <GenresTabs
        genres={allGenres}
        activeId={activeTab}
        onChange={setActiveTab}
        loading={loading}
      />

      <Container>
        <div className="flex flex-col lg:flex-row gap-6 py-10 relative">
          {/* ===== DESKTOP SIDEBAR ===== */}
          <GenresSidebar
            genres={allGenres}
            activeId={activeTab}
            onChange={setActiveTab}
            loading={loading}
          />

          {/* ===== MOBILE GENRES MODAL ===== */}
          <MobileGenresModal
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            genres={allGenres}
            activeId={activeTab}
            onSelect={setActiveTab}
            loading={loading}
          />

          {/* ===== MOBILE OPEN BUTTON ===== */}
          {!loading && (
            <button
              className="lg:hidden fixed bottom-5 right-6 btn-primary px-4 py-3 rounded-full shadow-lg z-50"
              onClick={() => setSidebarOpen(true)}
            >
              Genres
            </button>
          )}

          {/* ===== Series GRID ===== */}
          <MediaGrid
            items={series}
            loading={loading}
            favorites={favoriteList}
            mediaType="series"
            getHref={(id) => PATHS.SERIES_DETAILS(id)}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* ===== PAGINATION ===== */}
        <MediaPagination
          pagination={pagination}
          onChange={setPage}
        />
      </Container>
    </>
  )
}
