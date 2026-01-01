const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export type BackendPagination = {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  nextPage?: number;
};

export type AdminSeries = {
  _id: string;
  name: string;

  description?: string;
  videoUrl?: string;

  releaseYear?: number;
  poster?: string;
  seasons?: number;

  genres?: Array<string | { _id: string }>;
  cast?: Array<string | { _id: string }>;

  createdAt?: string;
};

export type SeriesListResponse = {
  data: AdminSeries[];
  pagination: BackendPagination | null;
};

function normalizeList(json: any): SeriesListResponse {
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

export async function fetchAdminSeries(params: {
  page: number;
  limit?: number;
  search?: string;
}): Promise<SeriesListResponse> {
  const sp = new URLSearchParams({
    page: String(params.page),
    ...(params.limit ? { limit: String(params.limit) } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  const res = await fetch(`${API_URL}/series?${sp.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch series");
  return normalizeList(json);
}

export type UpsertSeriesPayload = {
  name: string;
  description: string;

  releaseYear?: number;
  poster?: string;
  seasons?: number;

  genres?: string[];
  cast?: string[];
};

export async function createAdminSeries(payload: UpsertSeriesPayload) {
  const res = await fetch(`${API_URL}/series`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to create series");
  return json;
}

export async function updateAdminSeries(id: string, payload: UpsertSeriesPayload) {
  const res = await fetch(`${API_URL}/series/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to update series");
  return json;
}

export async function deleteAdminSeries(id: string) {
  const res = await fetch(`${API_URL}/series/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to delete series");
  return json;
}
