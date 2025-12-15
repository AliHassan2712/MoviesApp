import Link from "next/link";
import Image from "next/image";
import { PATHS } from "@/constant/PATHS";

export default function MoviesResults({ data }: { data: any[] }) {
  if (!data.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Movies</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((item) => (
          <Link
            key={item._id}
            href={PATHS.MOVIE_DETAILS(item._id)}
            className="bg-card rounded-xl overflow-hidden"
          >
            <Image
              src={item.poster || "/assets/images/img_hero.jpg"}
              alt={item.name}
              width={300}
              height={200}
              className="h-48 w-full object-cover"
            />
            <p className="p-3 font-semibold">{item.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
