"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdminSeason,
  deleteAdminSeason,
  fetchAdminSeasons,
  updateAdminSeason,
  UpsertSeasonPayload,
} from "@/services/admin/seasons.service";

export function useAdminSeasonsQuery(seriesId: string) {
  return useQuery({
    queryKey: ["admin-seasons", seriesId],
    queryFn: () => fetchAdminSeasons(seriesId),
  });
}

export function useAdminSeasonsMutations(seriesId: string) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-seasons", seriesId] });

  const create = useMutation({
    mutationFn: (payload: UpsertSeasonPayload) => createAdminSeason(seriesId, payload),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpsertSeasonPayload }) =>
      updateAdminSeason(id, payload),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteAdminSeason(seriesId,id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
