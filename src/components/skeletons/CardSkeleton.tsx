export default function MovieCardSkeleton() {
  return (
    <div className="p-4 bg-card rounded-xl shadow animate-pulse">
      {/* Image */}
      <div className="w-full h-48 bg-soft rounded-lg mb-4" />

      {/* Title */}
      <div className="h-4 bg-soft rounded w-3/4 mb-2" />

      {/* Year */}
      <div className="h-3 bg-soft rounded w-1/3" />
    </div>
  );
}
