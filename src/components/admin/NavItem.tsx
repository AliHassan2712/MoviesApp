"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export default function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href ;

  return (
    <Link
      href={href}
      className={[
        "group flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
        isActive
          ? "bg-primary/15 text-main"
          : "text-muted hover:text-main hover:bg-soft/40",
      ].join(" ")}
    >
      <span
        className={[
          "transition-colors",
          isActive ? "text-primary" : "group-hover:text-main",
        ].join(" ")}
      >
        {icon}
      </span>

      <span className="font-medium">{label}</span>

      {isActive && (
        <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
      )}
    </Link>
  );
}
