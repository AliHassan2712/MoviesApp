const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export type BackendPagination = {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  nextPage?: number;
};

export type AdminGenre = {
  _id: string;
  name_en?: string;
  name_ar?: string;
  type?: "movie" | "series" | "both";
  createdAt?: string;
};

export type GenresListResponse = {
  data: AdminGenre[];
  pagination: BackendPagination | null;
};

function normalizeList(json: any): GenresListResponse {
  const data = json?.data?.data ?? json?.data ?? [];
  const pagination = json?.pagination ?? json?.data?.pagination ?? null;
  return { data, pagination };
}

async function safeJson(res: Response) {
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export async function fetchAdminGenres(params: {
  page: number;
  limit?: number;
  search?: string;
}): Promise<GenresListResponse> {
  const sp = new URLSearchParams({
    page: String(params.page),
    ...(params.limit ? { limit: String(params.limit) } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  const res = await fetch(`${API_URL}/genres?${sp.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch genres");
  return normalizeList(json);
}

export type UpsertGenrePayload = {
  name_en: string;
  name_ar?: string;
  type: "movie" | "series" | "both";
};

export async function createAdminGenre(payload: UpsertGenrePayload) {
  const res = await fetch(`${API_URL}/genres`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to create genre");
  return json;
}

export async function updateAdminGenre(id: string, payload: UpsertGenrePayload) {
  const res = await fetch(`${API_URL}/genres/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to update genre");
  return json;
}

export async function deleteAdminGenre(id: string) {
  const res = await fetch(`${API_URL}/genres/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to delete genre");
  return json;
}
