const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export type AdminSeason = {
  _id: string;
  seriesId: string;
  name: string;         
  seasonNumber?: number; 
  poster?: string;
  createdAt?: string;
};

export async function fetchAdminSeasons(seriesId: string) {
  const res = await fetch(`${API_URL}/series/${seriesId}/seasons?sort=seasonNumber`, {
    credentials: "include",
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch seasons");
  return (json?.data ?? json) as AdminSeason[];
}

export type UpsertSeasonPayload = {
  name: string;
  seasonNumber?: number;
  poster?: string;
};

export async function createAdminSeason(seriesId: string, payload: UpsertSeasonPayload) {
  const res = await fetch(`${API_URL}/series/${seriesId}/seasons`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to create season");
  return json;
}

export async function updateAdminSeason(seasonId: string, payload: UpsertSeasonPayload) {
  const res = await fetch(`${API_URL}/seasons/${seasonId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to update season");
  return json;
}

export async function deleteAdminSeason(seriesId: string,seasonId: string) {
  const res = await fetch(`${API_URL}/series/${seriesId}/seasons/${seasonId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to delete season");
  return json;
}
