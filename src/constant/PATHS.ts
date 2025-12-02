export const PATHS = {
  HOME: "/",

  MOVIES: "/movies",
  MOVIE_DETAILS: (id: string | number) => `/movies/${id}`,

  SERIES: "/series",
  SERIES_DETAILS: (id: string | number) => `/series/${id}`,

  ACTORS: "/actors",
  ACTOR_DETAILS: (id: string | number) => `/actors/${id}`,

  GENRES: "/genres",
  GENRE_DETAILS: (id: string | number) => `/genres/${id}`,

  FAVORITES: "/favorites",
  WATCHLIST: "/watchlist",

  // Auth
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forget-password",

  PROFILE: "/profile",
} as const;
