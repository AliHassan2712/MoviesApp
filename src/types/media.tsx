export type MediaItem = {
  _id: string;
  name: string;
  poster?: string;
  releaseYear?: number;
  type: "movies" | "series";
  
};
