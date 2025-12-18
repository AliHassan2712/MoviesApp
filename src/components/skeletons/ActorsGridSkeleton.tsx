import ActorCardSkeleton from "./ActorCardSkeleton";

type Props = {
  count?: number;
};

export default function ActorsGridSkeleton({ count = 12 }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ActorCardSkeleton key={i} />
      ))}
    </div>
  );
}
