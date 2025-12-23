//components
import { MediaCard } from "@/components/cards/MediaCard";

//paths constants
import { PATHS } from "@/constant/PATHS";

type MediaType = "movies" | "series";

type MediaResultsSectionProps = {
  title: string;
  type: MediaType;
  data: any[];
};

export default function MediaResultsSection({
  title,
  type,
  data,
}: MediaResultsSectionProps) {
  if (!data.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((item) => (
          <MediaCard
            key={item._id}
            title={item.name}
            poster={item.poster}
            releaseYear={item.releaseYear}
            href={
              type === "movies"
                ? PATHS.MOVIE_DETAILS(item._id)
                : PATHS.SERIES_DETAILS(item._id)
            }
          />
        ))}
      </div>
    </section>
  );
}
