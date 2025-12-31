const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export type BackendPagination = {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  nextPage?: number;
};

export type AdminUser = {
  _id: string;

  firstName?: string;
  lastName?: string;
  email?: string;

  role?: "user" | "admin";

  createdAt?: string;
};

export type UsersListResponse = {
  data: AdminUser[];
  pagination: BackendPagination | null;
};

function normalizeList(json: any): UsersListResponse {
  const data = json?.data?.data ?? json?.data ?? [];
  const pagination = json?.pagination ?? json?.data?.pagination ?? null;
  return { data, pagination };
}

export async function fetchAdminUsers(params: {
  page: number;
  limit?: number;
  search?: string;
}): Promise<UsersListResponse> {
  const sp = new URLSearchParams({
    page: String(params.page),
    ...(params.limit ? { limit: String(params.limit) } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  // ✅ غيّر /users إذا endpoint مختلف عندك
  const res = await fetch(`${API_URL}/users?${sp.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch users");
  return normalizeList(json);
}

export type UpsertUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  password?: string;
};

export async function createAdminUser(payload: UpsertUserPayload) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to create user");
  return json;
}

export async function updateAdminUser(id: string, payload: UpsertUserPayload) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to update user");
  return json;
}

export async function deleteAdminUser(id: string) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to delete user");
  return json;
}
