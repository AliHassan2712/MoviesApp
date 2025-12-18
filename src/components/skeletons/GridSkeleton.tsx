import MovieCardSkeleton from "./CardSkeleton";

type GridSkeletonProps = {
  count?: number;
};

export default function GridSkeleton({ count = 6 }: GridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
