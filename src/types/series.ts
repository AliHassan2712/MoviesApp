export type Series={
  _id: string;
  name: string;
  description:string,
  poster:string,
  genres?:string[],
  releaseYear?:string,
  backdrop:string
}
export type Genre={
  id:string,
  name_en:string
}