export default function LoginAlert({ onClose }: { onClose: () => void }) {
  return (
    <div className="container mx-auto px-4 md:px-10 mt-6">
      <div className="flex items-center justify-between gap-4 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl">
        <p className="font-medium">
          🔒 You must be logged in to watch this movie
        </p>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
