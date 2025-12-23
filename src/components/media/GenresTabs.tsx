//Skeleton
import GenresTabsSkeleton from '@/components/skeletons/GenresTabsSkeleton'

type GenresTabsProps = {
  genres: { _id: string; name_en: string }[]
  activeId: string
  onChange: (id: string) => void
  loading: boolean
}

export default function GenresTabs({
  genres,
  activeId,
  onChange,
  loading,
}: GenresTabsProps) {
  if (loading) return <GenresTabsSkeleton />

  return (
    <div className="flex items-center justify-center px-4 mb-5">
      <div className="flex flex-wrap justify-center gap-4 bg-soft p-2 rounded-full w-full max-w-md">
        {genres.slice(0, 4).map((g) => (
          <button
            key={g._id}
            onClick={() => onChange(g._id)}
            className={`px-6 py-2 rounded-full transition ${
              activeId === g._id
                ? 'bg-card shadow text-main'
                : 'text-muted hover:bg-card'
            }`}
          >
            {g.name_en}
          </button>
        ))}
      </div>
    </div>
  )
}
