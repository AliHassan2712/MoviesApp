//types
import { BackendPagination } from '@/types/pagination'
import { Movie } from "@/types/movie"



type MoviesResponse = {
  data: Movie[]
  pagination: BackendPagination
}
type ApiResponse<T> = {
  status: string
  data: T
}

//All Movies with Search and Pagination
export async function fetchMovies(params: {
  page: number
  query?: string
  limit?: number
}): Promise<MoviesResponse> {
  const { page, query, limit = 12 } = params

  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(query ? Object.fromEntries(new URLSearchParams(query)) : {}),
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies?${searchParams.toString()}`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch movies')
  }

  return res.json()
}


//Single Movie
export async function getMovieById(id: string): Promise<Movie> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`,
    {
      credentials: 'include',
      cache: 'no-store',
    }
  )

  if (!res.ok) throw new Error('Failed to fetch movie')

  const json: ApiResponse<Movie> = await res.json()
  return json.data
}






