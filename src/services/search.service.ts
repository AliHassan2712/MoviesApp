
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export async function searchAll(
  query: string,
  pages: { movies: number; series: number; actors: number },
  signal?: AbortSignal
) {
  const q = encodeURIComponent(query);

  const [m, s, a] = await Promise.all([
    fetch(`${API_URL}/movies?search=${q}&page=${pages.movies}`, { signal }),
    fetch(`${API_URL}/series?search=${q}&page=${pages.series}`, { signal }),
    fetch(`${API_URL}/actors?search=${q}&page=${pages.actors}`, { signal }),
  ]);

  const moviesData = await m.json();
  const seriesData = await s.json();
  const actorsData = await a.json();

  return { moviesData, seriesData, actorsData };
}
