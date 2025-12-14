export default function HeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[60vh] md:h-[85vh] bg-soft animate-pulse">

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-hero-gradient opacity-40" />
        <div className="absolute inset-0 bg-overlay opacity-30" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end px-6 md:px-12 py-16">
          <div className="max-w-4xl w-full space-y-4">

            {/* Title */}
            <div className="h-10 md:h-14 w-3/4 bg-card rounded-md" />

            {/* Description */}
            <div className="h-4 w-full bg-card rounded" />
            <div className="h-4 w-5/6 bg-card rounded" />

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <div className="h-12 w-36 bg-card rounded-2xl" />
              <div className="h-12 w-40 bg-card rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
