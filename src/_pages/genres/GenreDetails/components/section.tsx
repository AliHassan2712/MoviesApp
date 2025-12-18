import { PATHS } from "@/constant/PATHS";
import { Item } from "@/types/genre";
import Image from "next/image";
import Link from "next/link";

export default function Section({
  title,
  items,
  type,
}: {
  title: string;
  items: Item[];
  type: "movies" | "series";
}) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-semibold mb-5">
        {title}
        {items.length > 0 && (
          <span className="ml-2 text-muted text-base">
            ({items.length})
          </span>
        )}
      </h2>

      {items.length === 0 ? (
        <p className="text-muted">
          No {title.toLowerCase()} found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item._id}
              href={
                type === "movies"
                  ? PATHS.MOVIE_DETAILS(item._id)
                  : PATHS.SERIES_DETAILS(item._id)
              }
              className="bg-card rounded-xl overflow-hidden transition hover:scale-105"
            >
              <Image
                src={
                  item.poster?.trim()
                    ? item.poster
                    : "/assets/images/img_hero.jpg"
                }
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">{item.name}</h3>
                {item.releaseYear && (
                  <p className="text-muted text-sm">
                    {item.releaseYear}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
