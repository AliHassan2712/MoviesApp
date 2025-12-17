export type Genre = {
  _id: string;
  name_en: string;
};

export type Cast = {
  _id: string;
  name: string;
  profilePath?: string;
  popularity?: number;
};

export type Series = {
  _id: string;
  name: string;
  description: string;
  poster?: string;
  backdrop?: string;
  genres?: Genre[];
  releaseYear?: number | string;
  cast: Cast[];
};
