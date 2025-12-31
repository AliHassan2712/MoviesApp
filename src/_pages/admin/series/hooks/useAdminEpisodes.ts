"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdminEpisode,
  deleteAdminEpisode,
  fetchAdminEpisodes,
  updateAdminEpisode,
  UpsertEpisodePayload,
} from "@/services/admin/episodes.service";

export function useAdminEpisodesQuery(seasonId: string , seriesId:string) {
  return useQuery({
    queryKey: ["admin-episodes", seasonId],
    queryFn: () => fetchAdminEpisodes(seasonId,seriesId),
  });
}

export function useAdminEpisodesMutations(seasonId: string, seriesId:string) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-episodes", seasonId] });

  const create = useMutation({
    mutationFn: (payload: UpsertEpisodePayload) => createAdminEpisode(seasonId,  seriesId, payload),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpsertEpisodePayload }) =>
      updateAdminEpisode(id, payload),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteAdminEpisode(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
