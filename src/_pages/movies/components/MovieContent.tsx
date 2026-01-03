import { memo } from 'react'
import Image from 'next/image'
import { Movie } from '@/types/movie'
import { MovieCast } from './MovieCast'

function MovieContentComponent({ movie }: { movie: Movie }) {
  return (
    <div className="container mx-auto px-4 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Poster */}
      <div>
        <Image
          src={movie.poster}
          alt={movie.name}
          width={500}
          height={750}
          className="rounded-2xl shadow-xl"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {movie.genresRefs.map((g) => (
            <span key={g._id} className="btn-primary px-3 py-1 rounded-xl">
              {g.name_en}
            </span>
          ))}
        </div>
      </div>

      {/* Description + Cast */}
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold text-white mb-2">Overview</h2>
        <p className="text-muted leading-relaxed max-w-3xl">{movie.description}</p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Cast</h2>
        <MovieCast cast={movie.castRefs} />
      </div>
    </div>
  )
}

export default memo(MovieContentComponent)
