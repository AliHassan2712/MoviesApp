// File: src/_pages/movies/components/MovieContainer.tsx
'use client'


import LoginAlert from '@/components/ui/LoginAlert'
import { Container } from '@/components/containers/Container'
import { useMovie } from '../hooks/useMovie'
import MovieHero from './MovieHero'
import MoviePlayer from './MoviePlayer'
import MovieContent from './MovieContent'


export default function MoviePage({ id }: { id: string }) {
  const {
    movie,
    loading,
    error,
    showPlayer,
    showLoginMsg,
    togglePlayer,
    hideLoginMsg,
  } = useMovie(id)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted">
        Loading movie...
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted">
        {error || 'Movie not found'}
      </div>
    )
  }

  if (movie.isDeleted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-bold">This movie is not available</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <MovieHero movie={movie} showPlayer={showPlayer} onPlay={togglePlayer} />

      <Container>
        {showLoginMsg && (
          <div className="mt-6">
            <LoginAlert onClose={hideLoginMsg} />
          </div>
        )}

        {showPlayer && movie.videoUrl && (
          <div className="mt-12">
            <MoviePlayer videoUrl={movie.videoUrl} />
          </div>
        )}

        <MovieContent movie={movie} />
      </Container>
    </div>
  )
}
