//types
import { FavoriteType } from "@/types/favorite";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getFavoritesByIds(
  type: FavoriteType,
  ids: string,
  page: number,
  limit: number
) {
  const endpoint = type === "movies" ? "movies" : "series";

  const res = await fetch(
    `${API_URL}/${endpoint}?_id=${ids}&page=${page}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch favorites");
  }

  return res.json();
}
