const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export type AdminStats = {
  totalUsers: number;
  totalMovies: number;
  totalSeries?: number;
};

export type AdminUserRow = {
  _id: string;
  email: string;
  role?: string;
  createdAt?: string;
};

export type AdminMovieRow = {
  _id: string;
  name: string;
  releaseYear?: number;
  createdAt?: string;
};

export async function fetchAdminStats() {
  const res = await fetch(`${API_URL}/stats`, {
    credentials: "include",
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch stats");
  return json as AdminStats;
}

export async function fetchLatestUsers(limit = 5) {
  const res = await fetch(`${API_URL}/users?limit=${limit}`, {
    credentials: "include",
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch latest users");
  return (json?.data ?? json) as AdminUserRow[];
}

export async function fetchLatestMovies(limit = 5) {
  const res = await fetch(`${API_URL}/movies?limit=${limit}`, {
    credentials: "include",
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch latest movies");
  return (json?.data ?? json) as AdminMovieRow[];
}
