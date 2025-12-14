import GenreButtonSkeleton from "./GenreButtonSkeleton";

export default function GenresTabsSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-soft p-2 rounded-full w-full max-w-md sm:max-w-lg md:max-w-xl">
      {Array.from({ length: 4 }).map((_, i) => (
        <GenreButtonSkeleton key={i} />
      ))}
    </div>
  );
}
