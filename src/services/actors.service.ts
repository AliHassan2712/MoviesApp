//types
import { BackendPagination } from "@/types/pagination";
import { Actor } from "@/types/actor";


type ActorsResponse = {
  data: Actor[];
  pagination: BackendPagination;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

//All Actors
export async function getActors(
  page: number
): Promise<ActorsResponse> {
  const res = await fetch(`${API_URL}/actors?page=${page}&limit=12`);

  if (!res.ok) {
    throw new Error("Failed to fetch actors");
  }

  return res.json();
}

//Single Actor
export async function getActorById(id: string) {
  const res = await fetch(`${API_URL}/actors/${id}`);
  if (!res.ok) throw new Error("Actor not found");
  return res.json();
}

//Actor's Movies and Series
export async function getActorMovies(id: string) {
  const res = await fetch(`${API_URL}/movies?castRefs=${id}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function getActorSeries(id: string) {
  const res = await fetch(`${API_URL}/series?cast=${id}`);
  if (!res.ok) throw new Error("Failed to fetch series");
  return res.json();
}
