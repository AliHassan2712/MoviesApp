"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createAdminActor,
  deleteAdminActor,
  fetchAdminActors,
  updateAdminActor,
  UpsertActorPayload,
} from "@/services/admin/actors.service";

export function useAdminActors() {
  const qc = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const queryKey = useMemo(() => ["admin-actors", { page, search }], [page, search]);

  const listQuery = useQuery({
    queryKey,
    queryFn: () => fetchAdminActors({ page, search, limit: 10 }),
    staleTime: 5_000,
  });

  const createMutation = useMutation({
    mutationFn: (payload: UpsertActorPayload) => createAdminActor(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-actors"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: (args: { id: string; payload: UpsertActorPayload }) =>
      updateAdminActor(args.id, args.payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-actors"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminActor(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-actors"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Delete failed"),
  });

  return {
    page,
    setPage,
    search,
    setSearch,

    actors: listQuery.data?.data ?? [],
    pagination: listQuery.data?.pagination ?? null,
    isLoading: listQuery.isLoading || listQuery.isFetching,
    isError: listQuery.isError,
    error: listQuery.error,

    createActor: createMutation.mutateAsync,
    updateActor: updateMutation.mutateAsync,
    deleteActor: deleteMutation.mutateAsync,

    isSaving: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
