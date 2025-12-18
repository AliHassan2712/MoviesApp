"use client";

// Next 
import Link from "next/link";
import { usePathname } from "next/navigation";

//paths constant
import { PATHS } from "@/constant/PATHS";

export default function DesktopNav() {
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { label: "Home", href: PATHS.HOME },
    { label: "Movies", href: PATHS.MOVIES },
    { label: "Series", href: PATHS.SERIES },
    { label: "Actors", href: PATHS.ACTORS },
    { label: "Genres", href: PATHS.GENRES },
    // { label: "Settings", href: PATHS.SETTINGS },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-main font-medium text-sm md:text-base">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              relative py-1 transition 
              hover:text-primary
              ${isActive ? "text-primary" : "text-main"}
            `}
          >
            {item.label}

            {/* Underline Animation */}
            <span
              className={`
                absolute left-0 -bottom-1 w-full bg-primary transition-all duration-300
                ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                group-hover:opacity-100 group-hover:scale-100
              `}
            ></span>
          </Link>
        );
      })}
    </nav>
  );
}
