//Skeleton
import GridSkeleton from '@/components/skeletons/GridSkeleton'

//components
import { MediaCard } from '../cards/MediaCard'

type MediaItem = {
  _id: string
  name: string
  poster?: string
  releaseYear?: number
}

type MediaGridProps = {
  items: MediaItem[]
  loading: boolean
  favorites: { id: string }[]
  mediaType: 'movies' | 'series'
  getHref: (id: string) => string
  onToggleFavorite: (item: { id: string; type: 'movies' | 'series' }) => void
}

export default function MediaGrid({
  items,
  loading,
  favorites,
  mediaType,
  getHref,
  onToggleFavorite,
}: MediaGridProps) {
  if (loading) return <GridSkeleton count={6} />

  if (items.length === 0) {
    return (
      <p className="text-center text-muted">
        No results found.
      </p>
    )
  }

  return (
    <div className="flex-1 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => {
          const isFavorite = favorites.some(
            (f) => f.id === item._id
          )

          return (
            <MediaCard
              key={item._id}
              title={item.name}
              poster={item.poster}
              releaseYear={item.releaseYear}
              href={getHref(item._id)}
              isFavorite={isFavorite}
              onToggleFavorite={() =>
                onToggleFavorite({
                  id: item._id,
                  type: mediaType,
                })
              }
            />
          )
        })}
      </div>
    </div>
  )
}
