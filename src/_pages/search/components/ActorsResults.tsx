//React & Next
import Link from "next/link";
import Image from "next/image";

//paths constants
import { PATHS } from "@/constant/PATHS";

export default function ActorsResults({ data }: { data: any[] }) {
  if (!data.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Actors</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {data.map((actor) => (
          <Link
            key={actor._id}
            href={PATHS.ACTOR_DETAILS(actor._id)}
            className="text-center"
          >
            <Image
              src={actor.profilePath || "/assets/images/img_hero.jpg"}
              alt={actor.name}
              width={200}
              height={200}
              className="rounded-full h-32 w-32 object-cover mx-auto"
            />
            <p className="mt-2 font-semibold">{actor.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
