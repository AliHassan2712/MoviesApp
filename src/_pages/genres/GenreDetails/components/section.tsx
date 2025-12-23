// components
import { MediaCard } from '@/components/cards/MediaCard'

//paths constants
import { PATHS } from '@/constant/PATHS'

// types
import { Item } from '@/types/genre'

type SectionProps = {
  title: string
  items: Item[]
  type: 'movies' | 'series'

  favorites: string[]
  onToggleFavorite: (item: Item, type: 'movies' | 'series') => void
}

export default function Section({
  title,
  items,
  type,
  favorites,
  onToggleFavorite,
}: SectionProps) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-semibold mb-5">
        {title}
        {items.length > 0 && (
          <span className="ml-2 text-muted text-base">
            ({items.length})
          </span>
        )}
      </h2>

      {items.length === 0 ? (
        <p className="text-muted">
          Not found {type === 'movies' ? 'movies' : 'series'}.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const isFavorite = favorites.includes(item._id)

            return (
              <MediaCard
                key={item._id}
                title={item.name}
                poster={item.poster}
                releaseYear={item.releaseYear}
                href={
                  type === 'movies'
                    ? PATHS.MOVIE_DETAILS(item._id)
                    : PATHS.SERIES_DETAILS(item._id)
                }
                isFavorite={isFavorite}
                onToggleFavorite={() =>
                  onToggleFavorite(item, type)
                }
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
