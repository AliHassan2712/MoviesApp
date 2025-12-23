'use client'

// React
import { useEffect, useMemo, useState } from 'react'

// types
import { Genre } from '@/types/movie'

// services
import { fetchGenres } from '@/services/genre.service'

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [activeTab, setActiveTab] = useState('0')
  const [loading, setLoading] = useState(true)

  // fetch genres on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchGenres()
        setGenres(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])


  // all genres with "All" option
  const allGenres = useMemo(() => {
    return [{ _id: '0', name_en: 'All' }, ...genres]
  }, [genres])

  const getGenreById = (id: string) =>
    genres.find((g) => g._id === id)

  return {
    genres,
    allGenres,
    activeTab,
    loading,
    setActiveTab,
    getGenreById,
  }
}
