'use client'

// React
import { useEffect, useState } from 'react'

// types
import { Movie } from '@/types/movie'
import { BackendPagination } from '@/types/pagination'

// services
import { fetchGenreMovies } from '@/services/genre.service'

export function useGenreMovies(genreId: string) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] =
    useState<BackendPagination | null>(null)
  const [loading, setLoading] = useState(true)

  //  fetch when page OR genreId changes
  useEffect(() => {
    if (!genreId) return

    async function load() {
      setLoading(true)
      try {
        const res = await fetchGenreMovies({
          genreId,
          page,
        })

        setMovies(res.data || [])
        setPagination(res.pagination)
      } catch (e) {
        console.error('Genre movies error:', e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [genreId, page])

  // 🔹 reset page ONLY when genreId changes
  useEffect(() => {
    setPage(1)
  }, [genreId])

  return {
    movies,
    loading,
    pagination,
    page,
    setPage,
  }
}
