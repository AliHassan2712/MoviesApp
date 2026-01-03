//types
import { Movie } from "@/types/movie"

type ApiResponse<T> = {
  status: string
  data: T
}

//All Movies with Search and Pagination
export async function fetchMovies(params: {
  page: number;
  query?: string;
  limit?: number;
  signal?: AbortSignal;
}) {
  const { page, query, limit = 12, signal } = params;

  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(query ? Object.fromEntries(new URLSearchParams(query)) : {}),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies?${searchParams.toString()}`,
    {
      cache: "no-store",
      signal,
    }
  );

  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}




//Single Movie
export async function getMovieById(id: string, signal?: AbortSignal): Promise<Movie> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, {
    credentials: 'include',
    cache: 'no-store',
    signal,
  })

  if (!res.ok) throw new Error('Failed to fetch movie')

  const json: ApiResponse<Movie> = await res.json()
  return json.data
}







