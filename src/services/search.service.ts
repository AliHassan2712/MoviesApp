const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

async function safeJson(res: Response) {
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(json?.message || `Request failed: ${res.status}`);
  }
  return json;
}

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

  const [moviesData, seriesData, actorsData] = await Promise.all([
    safeJson(m),
    safeJson(s),
    safeJson(a),
  ]);

  return { moviesData, seriesData, actorsData };
}
