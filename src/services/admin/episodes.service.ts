const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

export type AdminEpisode = {
  _id: string;
  seasonId: string;
  title: string;
  episodeNumber?: number;
  description?: string;
  videoUrl?: string; 
  duration?: number;
  createdAt?: string;
};

export async function fetchAdminEpisodes(seasonId: string , seriesId:string) {
  const res = await fetch(`${API_URL}/series/${seriesId}/seasons/${seasonId}/episodes?sort=episodeNumber`, {
    credentials: "include",
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to fetch episodes");
  return (json?.data ?? json) as AdminEpisode[];
}

export type UpsertEpisodePayload = {
  title: string;
  episodeNumber?: number;
  description?: string;
  videoUrl?: string;
  duration?: number;
};

export async function createAdminEpisode(seasonId: string,seriesId:string,  payload: UpsertEpisodePayload) {
  const res = await fetch(`${API_URL}/series/${seriesId}/seasons/${seasonId}/episodes`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to create episode");
  return json;
}

export async function updateAdminEpisode(episodeId: string, payload: UpsertEpisodePayload) {
  const res = await fetch(`${API_URL}/episodes/${episodeId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to update episode");
  return json;
}

export async function deleteAdminEpisode(episodeId: string) {
  const res = await fetch(`${API_URL}/episodes/${episodeId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.message || "Failed to delete episode");
  return json;
}
