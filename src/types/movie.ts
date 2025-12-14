export type Genre = {
  _id: string;
  name_en: string; 
};

export type Movie = {
  _id: string;
  name: string;
  image: string;
  releaseYear?: number;
  genresRefs?: string[];
};


