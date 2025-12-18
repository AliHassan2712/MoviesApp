"use client";

// Next
import Link from "next/link";

//paths constant
import { PATHS } from "@/constant/PATHS";

//contexts
import { useAuth } from "@/contexts/AuthContext";

//react icons
import { Home, Film, Tv, Users, Tag, Settings, LogOut, LogIn, User } from "lucide-react";


type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}


export default function MobileMenu({
  isOpen,
  setIsOpen,
}: MobileMenuProps) {


  const { isLoggedIn, logout } = useAuth();

  if (!isOpen) return null;

  // Menu items
  const menuItems = [
    { label: "Profile", href: PATHS.PROFILE, icon: <User size={20} /> },
    { label: "Settings", href: PATHS.SETTINGS, icon: <Settings size={20} /> },
    { label: "Home", href: PATHS.HOME, icon: <Home size={20} /> },
    { label: "Movies", href: PATHS.MOVIES, icon: <Film size={20} /> },
    { label: "Series", href: PATHS.SERIES, icon: <Tv size={20} /> },
    { label: "Actors", href: PATHS.ACTORS, icon: <Users size={20} /> },
    { label: "Genres", href: PATHS.GENRES, icon: <Tag size={20} /> },
  ];

  return (
    <div className="dropdown md:hidden bg-card border-t border-main p-5 space-y-4 animate-fade-down fixed left-0 w-full shadow-xl z-40">

      <div className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-main hover:text-primary transition py-2"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="pt-4 border-t border-main">
        {isLoggedIn ? (
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-3 text-red-500 hover:text-red-600 transition py-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        ) : (
          <Link
            href={PATHS.LOGIN}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-main hover:text-primary transition py-2"
          >
            <LogIn size={20} />
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
