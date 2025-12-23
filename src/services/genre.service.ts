//types
import { Movie } from '@/types/movie'
import { BackendPagination } from '@/types/pagination'
import { Genre } from '@/types/movie'
import { Series } from '@/types/series'


type GenresResponse = {
  data: Genre[]
}

//All Genres
export async function fetchGenres(): Promise<Genre[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/genres`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch genres')
  }

  const json: GenresResponse = await res.json()
  return json.data
}





type GenreMoviesResponse = {
  data: Movie[]
  pagination: BackendPagination
}
//Movies
export async function fetchGenreMovies(params: {
  genreId: string
  page: number
  limit?: number
}): Promise<GenreMoviesResponse> {
  const { genreId, page, limit = 12 } = params

  const searchParams = new URLSearchParams({
    page: String(page),
    genresRefs: genreId,
    limit: String(limit),
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies?${searchParams.toString()}`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch genre movies')
  }

  return res.json()
}




//Series
type GenreSeriesResponse = {
  data: Series[]
  pagination: BackendPagination
}
export async function fetchGenreSeries(params: {
  genreId: string
  page: number
  limit?: number
}): Promise<GenreSeriesResponse> {
  const { genreId, page, limit = 12 } = params

  const searchParams = new URLSearchParams({
    page: String(page),
    genres: genreId,
    limit: String(limit),
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/series?${searchParams.toString()}`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch genre series')
  }

  return res.json()
}
