export type Genre = {
  _id: string
  name_en: string
}

export type Cast = {
  _id: string
  name: string
  profilePath: string | null
}

export type Movie = {
  _id: string
  name: string
  description: string
  poster: string
  backdrop: string
  duration: number
  releaseYear: number
  genresRefs: Genre[]
  castRefs: Cast[]
  isDeleted: boolean
  videoUrl?: string
}
