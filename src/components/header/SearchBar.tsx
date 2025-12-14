"use client";

// react icons
import { X, Search } from "lucide-react";

export default function SearchBar({ showSearch, setShowSearch, searchRef }: any) {
  if (!showSearch) return null;

  return (
    <div className="dropdown absolute top-full left-0 w-full bg-card border-b border-main backdrop-blur-xl p-4 z-50 animate-dropdown-open">

      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <Search size={20} className="text-muted" />

        <input
          ref={searchRef}
          type="text"
          placeholder="Search movies, series, actors..."
          className="flex-1 bg-transparent outline-none text-main placeholder:text-muted text-base"
        />

        <button onClick={() => setShowSearch(false)} className="text-main hover:text-primary">
          <X size={22} />
        </button>
      </div>
    </div>
  );
}
