import { Movie } from "@/types/movie";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export type AiSearchResponse = {
  status: string;
  ai: boolean;
  results: number;
  data: Movie[];
};

export async function fetchAiSearchMovies(
  query: string,
  signal?: AbortSignal
): Promise<AiSearchResponse> {
  const res = await fetch(
    `${API_URL}/movies/ai-search?q=${encodeURIComponent(query)}`,
    {
      credentials: "include",
      cache: "no-store",
      signal,
    }
  );

  if (!res.ok) throw new Error("AI search failed");

  return res.json();
}
