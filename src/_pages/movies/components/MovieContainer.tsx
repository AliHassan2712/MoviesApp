'use client'

//components
import MovieHero from '../components/MovieHero'
import MoviePlayer from '../components/MoviePlayer'
import MovieContent from '../components/MovieContent'
import LoginAlert from '@/components/ui/LoginAlert'
import { Container } from '@/components/containers/Container'

//hooks
import { useMovie } from '../hooks/useMovie'


export default function MoviePage({ id }: { id: string }) {
  const {
    movie,
    showPlayer,
    showLoginMsg,
    togglePlayer,
    hideLoginMsg,
  } = useMovie(id)

  if (!movie) return null

  if (movie.isDeleted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-bold">
          This movie is not available
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* ===== HERO  ===== */}
      <MovieHero
        movie={movie}
        showPlayer={showPlayer}
        onPlay={togglePlayer}
      />

      {/* ===== PAGE CONTENT ===== */}
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
