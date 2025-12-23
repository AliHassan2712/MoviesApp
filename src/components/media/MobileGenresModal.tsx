type Props = {
  open: boolean
  onClose: () => void
  genres: { _id: string; name_en: string }[]
  activeId: string
  onSelect: (id: string) => void
  loading: boolean
}

export default function MobileGenresModal({
  open,
  onClose,
  genres,
  activeId,
  onSelect,
  loading,
}: Props) {
  if (!open || loading) return null

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 md:hidden">
      <div className="bg-card w-80 p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-primary">
          Genres
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {genres.map((g) => (
            <button
              key={g._id}
              onClick={() => {
                onSelect(g._id)
                onClose()
              }}
              className={`px-4 py-2 rounded-lg ${
                activeId === g._id
                  ? 'btn-primary text-white'
                  : 'bg-card hover:bg-soft'
              }`}
            >
              {g.name_en}
            </button>
          ))}
        </div>

        <button
          className="mt-4 w-full btn-primary py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
