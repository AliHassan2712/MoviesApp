"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createAdminGenre,
  deleteAdminGenre,
  fetchAdminGenres,
  updateAdminGenre,
  UpsertGenrePayload,
} from "@/services/admin/genres.service";

export function useAdminGenres() {
  const qc = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const queryKey = useMemo(() => ["admin-genres", { page, search }], [page, search]);

  const listQuery = useQuery({
    queryKey,
    queryFn: () => fetchAdminGenres({ page, search, limit: 10 }),
    staleTime: 5_000,
  });

  const createMutation = useMutation({
    mutationFn: (payload: UpsertGenrePayload) => createAdminGenre(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-genres"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: (args: { id: string; payload: UpsertGenrePayload }) =>
      updateAdminGenre(args.id, args.payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-genres"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminGenre(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-genres"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Delete failed"),
  });

  return {
    page,
    setPage,
    search,
    setSearch,

    genres: listQuery.data?.data ?? [],
    pagination: listQuery.data?.pagination ?? null,
    isLoading: listQuery.isLoading || listQuery.isFetching,
    isError: listQuery.isError,
    error: listQuery.error,

    createGenre: createMutation.mutateAsync,
    updateGenre: updateMutation.mutateAsync,
    deleteGenre: deleteMutation.mutateAsync,

    isSaving: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
