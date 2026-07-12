'use client'

import { useCallback, useEffect, useState } from 'react'
import { getMovieById } from '@/services/movie.service'
import { Movie } from '@/types/movie'
import { useAuth } from '@/contexts/AuthContext'

export function useMovie(id: string) {
  const { isLoggedIn } = useAuth()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showPlayer, setShowPlayer] = useState(false)
  const [showLoginMsg, setShowLoginMsg] = useState(false)

  // reset UI when id changes
  useEffect(() => {
    setShowPlayer(false)
    setShowLoginMsg(false)
  }, [id])

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await getMovieById(id, controller.signal)
        setMovie(data)
      } catch (e: any) {
        if (e?.name === 'AbortError') return
        setError('Failed to load movie')
        setMovie(null)
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [id])

  const hideLoginMsg = useCallback(() => {
    setShowLoginMsg(false)
  }, [])

  const togglePlayer = useCallback(() => {
    if (!isLoggedIn) {
      setShowLoginMsg(true)
      return
    }

    if (movie?.videoUrl) {
      setShowLoginMsg(false)
      setShowPlayer((prev) => !prev)
    } else {
      setShowLoginMsg(true)
    }
  }, [isLoggedIn, movie?.videoUrl])

  return {
    movie,
    loading,
    error,
    showPlayer,
    showLoginMsg,
    togglePlayer,
    hideLoginMsg,
  }
}
