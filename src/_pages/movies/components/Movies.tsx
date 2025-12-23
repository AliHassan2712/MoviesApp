'use client'
//React
import { useState } from 'react'

// hooks
import { useMovies } from '../hooks/useMovies'
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

export default function MoviesPage() {
  /* ===== GENRES ===== */
  const { allGenres, activeTab, setActiveTab } = useGenres()

  const query =
    activeTab !== '0' ? `genresRefs=${activeTab}` : undefined

  /* ===== MOVIES ===== */
  const {
    movies,
    loading,
    pagination,
    setPage,
  } = useMovies(query)

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

          {/* ===== MOVIES GRID ===== */}
          <MediaGrid
            items={movies}
            loading={loading}
            favorites={favoriteList}
            mediaType="movies"
            getHref={(id) => PATHS.MOVIE_DETAILS(id)}
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
