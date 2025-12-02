"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PATHS } from "@/constant/PATHS";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  // Hooks FIRST — always at the top
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isLoggedIn, loading, logout } = useAuth();

  // scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // AFTER all hooks → safe
  if (loading) return null;

  return (
    <header
      className={`w-full z-50 transition-all duration-300
      ${isScrolled ? "bg-soft shadow-lg border-b border-main" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-wide text-primary cursor-pointer">
          <Link href={PATHS.HOME}>
            Movies<span className="text-main">App</span>
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-lg">
          <Link href={PATHS.HOME} className="hover:text-primary transition">Home</Link>
          <Link href={PATHS.MOVIES} className="hover:text-primary transition">Movies</Link>
          <Link href={PATHS.SERIES} className="hover:text-primary transition">Series</Link>
          <Link href={PATHS.ACTORS} className="hover:text-primary transition">Actors</Link>
          <Link href={PATHS.GENRES} className="hover:text-primary transition">Genres</Link>

          {isLoggedIn && (
            <>
              <Link href={PATHS.FAVORITES} className="hover:text-primary transition">Favorites</Link>
              <Link href={PATHS.WATCHLIST} className="hover:text-primary transition">Watchlist</Link>
            </>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <Link
              href={PATHS.LOGIN}
              className="px-4 py-2 rounded-md font-semibold transition btn-primary"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href={PATHS.PROFILE}
                className="px-4 py-2 rounded-md font-semibold transition bg-card border border-main hover:text-primary"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-md font-semibold transition bg-primary hover:bg-btn-primary-hover text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-main text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 bg-soft border-t border-main p-4">
          <Link href={PATHS.HOME} className="block hover:text-primary transition">Home</Link>
          <Link href={PATHS.MOVIES} className="block hover:text-primary transition">Movies</Link>
          <Link href={PATHS.SERIES} className="block hover:text-primary transition">Series</Link>
          <Link href={PATHS.ACTORS} className="block hover:text-primary transition">Actors</Link>
          <Link href={PATHS.GENRES} className="block hover:text-primary transition">Genres</Link>

          {isLoggedIn && (
            <>
              <Link href={PATHS.FAVORITES} className="block hover:text-primary transition">Favorites</Link>
              <Link href={PATHS.WATCHLIST} className="block hover:text-primary transition">Watchlist</Link>
            </>
          )}

          {!isLoggedIn ? (
            <Link
              href={PATHS.LOGIN}
              className="block text-center px-4 py-2 rounded-md font-semibold btn-primary"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="block w-full text-center px-4 py-2 rounded-md font-semibold bg-primary text-white"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};
