"use client";

// React & Next
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

//paths constant
import { PATHS } from "@/constant/PATHS";

//contexts
import { useAuth } from "@/contexts/AuthContext";
// import { useTheme } from "@/contexts/ThemeContext";

//render icons
import { Heart, Bookmark, Search } from "lucide-react";

//components
import DesktopNav from "./DesktopNav";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoggedIn, loading } = useAuth();
  // const { theme, toggleTheme } = useTheme();

  const searchRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus search input
  useEffect(() => {
    if (showSearch && searchRef.current) searchRef.current.focus();
  }, [showSearch]);

  // Close menus when clicking outside dropdown areas
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // If click is inside any dropdown → don't close
      if (target.closest(".dropdown")) return;

      setNotifOpen(false);
      setUserOpen(false);
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) return null;

  return (
    <header
      className="
        relative
        w-full
        top-0 left-0
        z-50
        backdrop-blur-md
        border-b
        transition-all duration-300
      "
      style={{
        backgroundColor: "var(--header-bg)",
        borderColor: "var(--header-border)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href={PATHS.HOME} className="text-2xl md:text-3xl font-extrabold tracking-wide flex gap-1">
          <span className="text-primary">Movies</span>
          <span className="text-main">App</span>
        </Link>

        {/* DESKTOP NAV */}
        <DesktopNav />

        {/* RIGHT SIDE (Desktop) */}
        <div className="hidden md:flex items-center gap-5">

          {/* THEME SWITCH */}
          {/* <button onClick={toggleTheme} className="text-main hover:text-primary transition">
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button> */}

          {/* SEARCH ICON */}
          <button
            onClick={() => {
              setShowSearch(true);
              setNotifOpen(false);
              setUserOpen(false);
            }}
            className="text-main hover:text-primary transition"
          >
            <Search size={22} />
          </button>

          {!isLoggedIn && <Link href={`${PATHS.LOGIN}`} className={`w-full btn-primary px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2`}>Login</Link>
          }



          {/* NOTIFICATIONS */}
          {/* <NotificationsMenu
            isLoggedIn={isLoggedIn}
            isOpen={notifOpen}
            setIsOpen={(v: boolean) => {
              setNotifOpen(v);
              if (v) setUserOpen(false);
            }}
            desktopOnly
          /> */}

          {/* USER MENU */}
          <UserMenu
            isLoggedIn={isLoggedIn}
            isOpen={userOpen}
            setIsOpen={(v: boolean) => {
              setUserOpen(v);
              if (v) setNotifOpen(false);
            }}
          />
        </div>

        {/* MOBILE ACTION BAR */}
        <div className="md:hidden flex items-center gap-4">

          {isLoggedIn && (
            <>
              {/* SEARCH */}
              <button
                onClick={() => {
                  setShowSearch(true);
                  setNotifOpen(false);
                  setMenuOpen(false);
                }}
                className="text-main hover:text-primary transition"
              >
                <Search size={22} />
              </button>

              {/* FAVORITES */}
              <Link href={PATHS.FAVORITES} className="text-main hover:text-primary transition">
                <Heart size={22} />
              </Link>

              {/* WATCHLIST */}
              <Link href={PATHS.WATCHLIST} className="text-main hover:text-primary transition">
                <Bookmark size={22} />
              </Link>

              {/* MOBILE NOTIFICATIONS */}
              {/* <NotificationsMenu
                isLoggedIn={isLoggedIn}
                isMobile
                isOpen={notifOpen}
                setIsOpen={(v: boolean) => {
                  setNotifOpen(v);
                  if (v) setMenuOpen(false);
                }}
              /> */}
            </>
          )}

          {/* MENU BUTTON (WITH FIXED TOGGLE) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
              setNotifOpen(false);
              setUserOpen(false);
              setShowSearch(false);
            }}
            className="dropdown text-main text-3xl"
          >
            ☰
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />

      {/* SEARCH BAR */}
      <SearchBar
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchRef={searchRef}
      />
    </header>
  );
}
