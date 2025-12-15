"use client";

import { X, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ showSearch, setShowSearch }: any) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  if (!showSearch) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowSearch(false);
  }

  return (
    <div className="absolute top-full left-0 w-full bg-card border-b border-main p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex items-center gap-3"
      >
        <Search size={20} className="text-muted" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, series, actors..."
          className="flex-1 bg-transparent outline-none text-main"
        />

        <button type="button" onClick={() => setShowSearch(false)}>
          <X size={22} />
        </button>
      </form>
    </div>
  );
}
