'use client'

//React
import { useEffect, useState } from 'react'

//services
import { getMovieById } from '@/services/movie.service'

//types
import { Movie } from '@/types/movie'


export function useMovie(id: string) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const [showLoginMsg, setShowLoginMsg] = useState(false)

  useEffect(() => {
    getMovieById(id).then(setMovie)
  }, [id])

  const togglePlayer = () => {
    if (!movie?.videoUrl) {
      setShowLoginMsg(true)
      return
    }
    setShowLoginMsg(false)
    setShowPlayer((prev) => !prev)
  }

  return {
    movie,
    showPlayer,
    showLoginMsg,
    togglePlayer,
    hideLoginMsg: () => setShowLoginMsg(false),
  }
}
