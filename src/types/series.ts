export type Series={
  _id: string;
  name: string;
  description:string,
  poster:string,
  genres?:Genre[],
  releaseYear?:string,
  backdrop:string,
  cast:Cast[]
}
export type Genre = {
  _id: string;
  name_en: string;
}
export type Cast = {
  _id: string;
  name:string;
profilePath:string;
popularity:number

}