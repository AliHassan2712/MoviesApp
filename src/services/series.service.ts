export async function fetchSeries(params: {
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
    `${process.env.NEXT_PUBLIC_API_URL}/series?${searchParams.toString()}`,
    {
      cache: "no-store",
      signal,
    }
  );

  if (!res.ok) throw new Error("Failed to fetch series");
  return res.json();
}

export async function getSeriesById(id: string, signal?: AbortSignal) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/${id}`, {
    cache: "no-store",
    credentials: "include",
    signal,
  });

  if (!res.ok) throw new Error("Failed to fetch series");
  const json = await res.json();
  return json.data;
}
