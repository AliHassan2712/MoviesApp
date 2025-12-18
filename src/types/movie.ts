export type Genre = {
  _id: string;
  name_en: string;
};

export type Movie = {
  _id: string;
  name: string;
  poster: string;
  videoUrl?: string;

  releaseYear?: number;
  genresRefs?: string[];
};


