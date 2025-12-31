"use client";

import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import type { MoviesListResponse, UpsertMoviePayload } from "@/services/admin/movies.service";
import {
  createAdminMovie,
  deleteAdminMovie,
  fetchAdminMovies,
  updateAdminMovie,
} from "@/services/admin/movies.service";

export function useAdminMoviesQuery(page: number, search: string) {
  return useQuery<MoviesListResponse>({
    queryKey: ["admin-movies", page, search],
    queryFn: () => fetchAdminMovies({ page, search: search || undefined, limit: 10 }),

    //  React Query v5 replacement for keepPreviousData: true
    placeholderData: keepPreviousData,
  });
}

export function useAdminMoviesMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-movies"] });

  const create = useMutation({
    mutationFn: (payload: UpsertMoviePayload) => createAdminMovie(payload),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpsertMoviePayload }) =>
      updateAdminMovie(id, payload),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteAdminMovie(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
