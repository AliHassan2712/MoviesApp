import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/constant/PATHS";
import { Actor } from "@/types/actor";

type ActorCardProps = {
  actor: Actor;
};

export function ActorCard({ actor }: ActorCardProps) {
  return (
    <Link
      href={PATHS.ACTOR_DETAILS(actor._id)}
      className="group text-center"
    >
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-main bg-soft">
        <Image
          src={actor.profilePath || "/assets/images/img_hero.jpg"}
          alt={actor.name}
          width={200}
          height={200}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
      </div>

      <p className="mt-3 font-semibold group-hover:text-primary transition">
        {actor.name}
      </p>
    </Link>
  );
}
