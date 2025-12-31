const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export type BackendPagination = {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  nextPage?: number;
};

export type AdminMovie = {
  _id: string;
  name: string;

  description?: string;
  videoUrl?: string;

  releaseYear?: number;
  poster?: string;
  duration?: number;
  createdAt?: string;
};

export type MoviesListResponse = {
  data: AdminMovie[];
  pagination: BackendPagination | null;
};

function normalizeList(json: any): MoviesListResponse {
  const data = json?.data?.data ?? json?.data ?? [];
  const pagination = json?.pagination ?? json?.data?.pagination ?? null;
  return { data, pagination };
}

export async function fetchAdminMovies(params: {
  page: number;
  limit?: number;
  search?: string;
}): Promise<MoviesListResponse> {
  const sp = new URLSearchParams({
    page: String(params.page),
    ...(params.limit ? { limit: String(params.limit) } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  const res = await fetch(`${API_URL}/movies?${sp.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch movies");
  return normalizeList(json);
}

export type UpsertMoviePayload = {
  name: string;

  description: string;
  videoUrl: string;

  releaseYear?: number;
  poster?: string;
  duration?: number;
};

export async function createAdminMovie(payload: UpsertMoviePayload) {
  const res = await fetch(`${API_URL}/movies`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to create movie");
  return json;
}

export async function updateAdminMovie(id: string, payload: UpsertMoviePayload) {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to update movie");
  return json;
}

export async function deleteAdminMovie(id: string) {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to delete movie");
  return json;
}
