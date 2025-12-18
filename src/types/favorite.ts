export type FavoriteType = "movies" | "series";

export interface FavoriteItem {
  _id: string;
  name: string;
  poster: string;
  releaseYear?:number,
  type: "movies" | "series";
}
