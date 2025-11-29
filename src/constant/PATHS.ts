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

  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET_PASSWORD: "/reset-password",
  PROFILE: "/profile",
  
} as const;
