export default function MoviePlayer({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="container mx-auto px-4 md:px-10 mt-12">
      <div className="max-w-6xl mx-auto bg-black/60 border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl">
        <div className="aspect-video">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  )
}
