const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export type BackendPagination = {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  nextPage?: number;
};

export type AdminActor = {
  _id: string;
  name?: string;
  profilePath?: string;
  tmdbId?: number;
  popularity?: number;
  createdAt?: string;
};

export type ActorsListResponse = {
  data: AdminActor[];
  pagination: BackendPagination | null;
};

function normalizeList(json: any): ActorsListResponse {
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

export async function fetchAdminActors(params: {
  page: number;
  limit?: number;
  search?: string;
}): Promise<ActorsListResponse> {
  const sp = new URLSearchParams({
    page: String(params.page),
    ...(params.limit ? { limit: String(params.limit) } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  const res = await fetch(`${API_URL}/actors?${sp.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch actors");
  return normalizeList(json);
}

export type UpsertActorPayload = {
  name: string;
  profilePath?: string;
  tmdbId?: number;
  popularity?: number;
};

export async function createAdminActor(payload: UpsertActorPayload) {
  const res = await fetch(`${API_URL}/actors`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to create actor");
  return json;
}

export async function updateAdminActor(id: string, payload: UpsertActorPayload) {
  const res = await fetch(`${API_URL}/actors/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await safeJson(res);
  if (!res.ok) throw new Error(json?.message || "Failed to update actor");
  return json;
}

export async function deleteAdminActor(id: string) {
  const res = await fetch(`${API_URL}/actors/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await safeJson(res); 
  if (!res.ok) throw new Error(json?.message || "Failed to delete actor");
  return json;
}
