import Image from "next/image";
import Link from "next/link";

type MediaCardProps = {
  title: string;
  poster?: string;
  href: string;
  aspect?: "portrait" | "landscape";
  releaseYear?: number;
};

export function MediaCard({
  title,
  poster,
  href,
  releaseYear,
  aspect = "portrait",
}: MediaCardProps) {
  return (
    <Link
      href={href}
      className="group bg-card rounded-xl overflow-hidden transition hover:scale-105"
    >
      <div
        className={`relative w-full ${aspect === "portrait" ? "h-64" : "h-40"
          }`}
      >
        <Image
          src={poster || "/assets/images/img_hero.jpg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3">
        <p className="font-semibold truncate group-hover:text-primary transition">
          {title}
        </p>

        {releaseYear && (
          <p className="text-xs text-muted flex items-center gap-1 mt-1">
            {releaseYear}
          </p>
        )}
      </div>
    </Link>
  );
}
