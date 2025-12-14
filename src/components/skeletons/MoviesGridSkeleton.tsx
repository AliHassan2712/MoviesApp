import MovieCardSkeleton from "./MovieCardSkeleton";

type Props = {
  count?: number;
};

export default function MoviesGridSkeleton({ count = 6 }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
