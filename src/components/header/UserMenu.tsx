"use client";

// React & Next
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

//paths constant
import { PATHS } from "@/constant/PATHS";

//contexts
import { useAuth } from "@/contexts/AuthContext";

//react icons
import { LogOut, User, Heart, Bookmark, Settings } from "lucide-react";

type UserMenuProps = {
  isLoggedIn: boolean;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export default function UserMenu({
  isLoggedIn,
  isOpen,
  setIsOpen,
}:UserMenuProps ) {

  const { user, logout } = useAuth();
  const [closing, setClosing] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  if (!isLoggedIn) return null;

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsOpen(false);
    }, 160);
  };

  const panelAnimation = closing ? "animate-dropdown-close" : "animate-dropdown-open";

  return (
    <div ref={ref} className="dropdown relative">
      <button
        onClick={() => {
          if (isOpen) closeMenu();
          else setIsOpen(true);
        }}
        className="w-10 h-10 rounded-full bg-card border border-main flex items-center justify-center hover:border-primary overflow-hidden transition"
      >
        {user?.photo ? (
          <Image src={user.photo} alt="avatar" width={40} height={40} className="rounded-full object-cover" />
        ) : (
          <span className="text-primary font-bold text-lg">{user?.firstName?.[0]}</span>
        )}
      </button>

      {isOpen && (
        <div
          className={`dropdown absolute right-0 mt-3 w-52 bg-card border border-main rounded-xl shadow-xl overflow-hidden z-50 ${panelAnimation}`}
        >
          <div className="px-4 py-3 border-b border-main cursor-pointer" onClick={closeMenu}>
            <p className="text-main font-semibold">{user?.firstName} {user?.lastName}</p>
            <p className="text-muted text-xs">{user?.email}</p>
          </div>

          

          <Link href={PATHS.PROFILE} onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 hover:bg-soft text-main text-sm">
            <User size={18} /> Profile
          </Link>

          <Link href={PATHS.FAVORITES} onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 hover:bg-soft text-main text-sm">
            <Heart size={18} /> Favorites
          </Link>

          <Link href={PATHS.WATCHLIST} onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 hover:bg-soft text-main text-sm">
            <Bookmark size={18} /> Watchlist
          </Link>

          <Link href={PATHS.SETTINGS} onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 hover:bg-soft text-main text-sm">
            <Settings size={18} /> Settings
          </Link>

          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/20 text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
