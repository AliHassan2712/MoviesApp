'use client'

//React
import { useEffect, useState } from 'react'

//types
import { Movie } from '@/types/movie'
import { BackendPagination } from '@/types/pagination'

//services
import { fetchMovies } from '@/services/movie.service'

export function useMovies(query?: string) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] =
    useState<BackendPagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetchMovies({
          page,
          query,
        })

        setMovies(res.data || [])
        setPagination(res.pagination)
      } catch (err) {
        console.error('Movies fetch error:', err)
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [page, query])

  useEffect(() => {
    setPage(1)
  }, [query])

  return {
    movies,
    loading,
    error,
    pagination,
    page,
    setPage,
  }
}
