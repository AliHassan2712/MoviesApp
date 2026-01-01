export const PATHS = {
  HOME: "/",

  MOVIES: "/movies",
  MOVIE_DETAILS: (id: string | number) => `/movies/${id}`,


  SERIES: "/series",
  SERIES_DETAILS: (id: string | number) => `/series/${id}`,
  SEASONS: (seriesId: string | number, seasonId: string | number) => `/series/${seriesId}/season/${seasonId}`,
  EPISODES: (seriesId: string | number, seasonId: string | number, episodesId: string | number) => `/series/${seriesId}/season/${seasonId}/episodes/${episodesId}`,

  ACTORS: "/actors",
  ACTOR_DETAILS: (id: string | number) => `/actors/${id}`,

  GENRES: "/genres",
  GENRE_DETAILS: (id: string | number) => `/genres/${id}`,

  FAVORITES: "/account/favorites",
  WATCHLIST: "/account/watchlist",


  // Auth
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forget-password",

  // Account
  PROFILE: "/account/profile",
  PROFILE_EDIT: "/account/profile/edit",
  CHANGE_PASSWORD: "/account/profile/change-password",
  SETTINGS: "/account/settings",


  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_MOVIES: "/admin/movies",
  ADMIN_SERIES: "/admin/series",
  ADMIN_GENRES: "/admin/genres",
  ADMIN_ACTORS: "/admin/actors",
  ADMIN_SERIES_SEASONS: (seriesId: string) => `/admin/series/${seriesId}/seasons`,
  ADMIN_SEASON_EPISODES: (seriesId: string, seasonId: string) =>
    `/admin/series/${seriesId}/seasons/${seasonId}/episodes`,
} as const;
