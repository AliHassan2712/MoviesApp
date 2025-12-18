export default function GenresSidebarSkeleton() {
  return (
    <div className="hidden md:block w-64 bg-soft p-5 rounded-2xl h-fit sticky top-10 animate-pulse">
      
      {/* Title */}
      <div className="h-5 w-24 bg-card rounded mb-4" />

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-9 bg-card rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
