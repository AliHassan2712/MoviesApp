import { memo } from 'react'
import Image from 'next/image'
import { Movie } from '@/types/movie'

type MovieHeroProps = {
  movie: Movie
  showPlayer: boolean
  onPlay: () => void
}

function MovieHeroComponent({ movie, showPlayer, onPlay }: MovieHeroProps) {
  return (
    <div className="relative h-[420px] md:h-[560px]">
      <Image
        src={movie.backdrop}
        alt={movie.name}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 flex items-end p-6 md:p-12">
        <div className="max-w-4xl">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold">
            {movie.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onPlay}
              className="bg-primary text-white px-7 py-3 rounded-2xl font-bold text-lg hover:opacity-90 transition"
            >
              ▶ {showPlayer ? 'Hide Video' : 'Watch Movie'}
            </button>

            <span className="px-4 py-2 rounded-xl bg-white/10 text-white">
              🎬 {movie.releaseYear}
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/10 text-white">
              ⏱ {movie.duration} min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(MovieHeroComponent)
