'use client'

// React & Next.
import Link from 'next/link'

// components
import { Container } from '@/components/containers/Container'
import GenreSkeleton from '@/components/skeletons/GenreSkeleton'

// constants
import { PATHS } from '@/constant/PATHS'
import { GENRE_ICONS } from '@/constant/GENRE_ICONS'


// hooks
import { useGenres } from './hooks/useGenres'

// icons
import {
  Film,
} from 'lucide-react'


const SKELETON_COUNT = 10

export default function GenresPage() {
  const { loading, genres } = useGenres()

  return (
    <Container className="pt-20">
      {/* ===== HEADER ===== */}
      <div className="mb-12 text-left">
        <h1 className="text-4xl font-extrabold mb-3">
          Genres
        </h1>
        <p className="text-muted">
          Explore movies & series by genre
        </p>
      </div>

      {/* ===== GRID ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <GenreSkeleton key={i} />
          ))
          : genres.map((genre) => {
            const key = genre.name_en
              .toLowerCase()
              .replace(/\s+/g, '_')

            const Icon = GENRE_ICONS[key] || Film

            return (
              <Link
                key={genre._id}
                href={PATHS.GENRE_DETAILS(genre._id)}
                className="group rounded-2xl border border-border px-6 py-8 text-center transition-all duration-300 hover:scale-105 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20"
              >
                <Icon
                  size={36}
                  className="mx-auto mb-4 text-primary/80 group-hover:text-primary"
                />

                <h3 className="font-semibold text-lg">
                  {genre.name_en}
                </h3>

                <span className="mt-3 inline-block text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Explore
                </span>
              </Link>
            )
          })}
      </div>
    </Container>
  )
}
