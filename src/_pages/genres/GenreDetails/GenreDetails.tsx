'use client'

import { Container } from '@/components/containers/Container'
import MediaPagination from '@/components/media/MediaPagination'
import Section from './components/Section'

// hooks
import { useGenres } from '../hooks/useGenres'
import { useGenreMovies } from '../hooks/useGenreMovies'
import { useGenreSeries } from '../hooks/useGenreSeries'

// context
import { useFavorite } from '@/contexts/FavoriteContext'

type GenreDetailsPageProps = {
  id: string
}

export default function GenreDetailsPage({ id }: GenreDetailsPageProps) {
  const genreId = id

  const { getGenreById, loading: genresLoading } = useGenres()
  const genre = getGenreById(genreId)

  /* ===== MOVIES ===== */
  const {
    movies,
    pagination: moviesPagination,
    setPage: setMoviesPage,
  } = useGenreMovies(genreId)

  /* ===== SERIES ===== */
  const {
    series,
    pagination: seriesPagination,
    setPage: setSeriesPage,
  } = useGenreSeries(genreId)

  /* ===== FAVORITES ===== */
  const { favoriteList, toggleFavorite } = useFavorite()

  return (
    <Container>
      {/* ===== HEADER ===== */}
      <div className="py-10">
        <h1 className="text-3xl font-bold text-main">
          {genresLoading ? 'Loading...' : genre?.name_en || 'Genre'}
        </h1>
        <p className="text-muted mt-2">
          Explore movies and series in this genre
        </p>
      </div>

      {/* ===== MOVIES ===== */}
      <Section
        title="Movies"
        items={movies}
        type="movies"
        favorites={favoriteList.map((f) => f.id)}
        onToggleFavorite={(item, type) => toggleFavorite({ id: item._id, type })}
      />

      <MediaPagination
        pagination={moviesPagination}
        onChange={setMoviesPage}
      />

      {/* ===== SERIES ===== */}
      <Section
        title="Series"
        items={series.map((s) => ({
          ...s,
          releaseYear: typeof s.releaseYear === 'string' ? parseInt(s.releaseYear) : s.releaseYear
        }))}
        type="series"
        favorites={favoriteList.map((f) => f.id)}
        onToggleFavorite={(item, type) => toggleFavorite({ id: item._id, type })}
      />

      <MediaPagination
        pagination={seriesPagination}
        onChange={setSeriesPage}
      />
    </Container>
  )
}
