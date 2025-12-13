"use client";

// react hooks
import { useState, useEffect } from "react";

// navigation
import Link from "next/link";
import { PATHS } from "@/constant/PATHS";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={` w-full z-50 transition-all duration-300
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
          <Link href={PATHS.FAVORITES} className="hover:text-primary transition">Favorites</Link>
          <Link href={PATHS.WATCHLIST} className="hover:text-primary transition">Watchlist</Link>
        </nav>

        {/* Desktop Login */}
        <Link
          href={PATHS.LOGIN}
          className="hidden md:block px-4 py-2 rounded-md font-semibold transition btn-primary"
        >
          Login
        </Link>

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
          <Link href={PATHS.FAVORITES} className="block hover:text-primary transition">Favorites</Link>
          <Link href={PATHS.WATCHLIST} className="block hover:text-primary transition">Watchlist</Link>

          <Link
            href={PATHS.LOGIN}
            className="block text-center px-4 py-2 rounded-md font-semibold btn-primary"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};
