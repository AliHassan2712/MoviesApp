'use client'

// React
import { useEffect, useState } from 'react'

// types
import { BackendPagination } from '@/types/pagination'
import { Series } from '@/types/series'

// services
import { fetchGenreSeries } from '@/services/genre.service'

export function useGenreSeries(genreId: string) {
    const [series, setSeries] = useState<Series[]>([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] =
        useState<BackendPagination | null>(null)
    const [loading, setLoading] = useState(true)

    // fetch when page OR genreId changes
    useEffect(() => {
        if (!genreId) return

        async function load() {
            setLoading(true)
            try {
                const res = await fetchGenreSeries({
                    genreId,
                    page,
                })

                setSeries(res.data || [])
                setPagination(res.pagination)
            } catch (e) {
                console.error('Genre series error:', e)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [genreId, page])

    //  reset page ONLY when genreId changes
    useEffect(() => {
        setPage(1)
    }, [genreId])

    return {
        series,
        loading,
        pagination,
        page,
        setPage,
    }
}
