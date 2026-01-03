"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import Link from "next/link";

import { Container } from "@/components/containers/Container";
import GenreSkeleton from "@/components/skeletons/GenreSkeleton";
import Pagination from "@/components/ui/Pagination";

import { PATHS } from "@/constant/PATHS";
import { GENRE_ICONS } from "@/constant/GENRE_ICONS";

import { Film } from "lucide-react";
import { fetchGenres } from "@/services/genre.service";



const SKELETON_COUNT = 10;
const PAGE_LIMIT = 10;

export default function GenresPageComponent() {
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const handlePageChange = useCallback((p: number) => {
    setPage(p);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const res = await fetchGenres({ page, limit: PAGE_LIMIT });
        if (!mounted) return;
        setGenres(res.data);
        setPagination(res.pagination);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [page]);

  const skeletons = useMemo(
    () => Array.from({ length: SKELETON_COUNT }),
    []
  );

  const genreCards = useMemo(() => {
    return genres.map((genre) => {
      const key = genre.name_en.toLowerCase().replace(/\s+/g, "_");
      const Icon = (GENRE_ICONS as any)[key] || Film;

      return (
        <Link
          key={genre._id}
          href={PATHS.GENRE_DETAILS(genre._id)}
          className="group rounded-2xl border border-border px-6 py-8 text-center transition-all duration-300 hover:scale-105 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20"
        >
          <Icon className="mx-auto mb-4 text-primary/80 group-hover:text-primary w-9 h-9" />
          <h3 className="font-semibold text-lg">{genre.name_en}</h3>

          <span className="mt-3 inline-block text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
            Explore
          </span>
        </Link>
      );
    });
  }, [genres]);

  return (
    <Container className="pt-20">
      <div className="mb-12 text-left">
        <h1 className="text-4xl font-extrabold mb-3">Genres</h1>
        <p className="text-muted">Explore movies & series by genre</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading
          ? skeletons.map((_, i) => <GenreSkeleton key={i} />)
          : genreCards}
      </div>

      {(pagination?.totalPages ?? 0) > 1 && (
        <div className="mt-10">
          <Pagination pagination={pagination} onChange={handlePageChange} />
        </div>
      )}
    </Container>
  );
}
