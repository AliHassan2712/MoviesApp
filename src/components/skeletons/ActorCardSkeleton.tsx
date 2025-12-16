export default function ActorCardSkeleton() {
  return (
    <div className="flex flex-col items-center animate-pulse">
      {/* Avatar */}
      <div className="w-32 h-32 rounded-full bg-soft border border-main mb-3" />

      {/* Name */}
      <div className="h-4 w-24 bg-soft rounded-md" />
    </div>
  );
}
