import { memo } from 'react'
import Image from 'next/image'
import { Cast } from '@/types/movie'

function MovieCastComponent({ cast }: { cast: Cast[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {cast.map((c) => (
        <div key={c._id} className="text-center">
          <Image
            src={c.profilePath || '/avatar.png'}
            alt={c.name}
            width={112}
            height={112}
            className="rounded-full mx-auto"
          />
          <p className="mt-3 text-sm">{c.name}</p>
        </div>
      ))}
    </div>
  )
}

export const MovieCast = memo(MovieCastComponent)
