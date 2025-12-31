"use client";

import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import type { SeriesListResponse, UpsertSeriesPayload } from "@/services/admin/series.service";
import {
  createAdminSeries,
  deleteAdminSeries,
  fetchAdminSeries,
  updateAdminSeries,
} from "@/services/admin/series.service";

export function useAdminSeriesQuery(page: number, search: string) {
  return useQuery<SeriesListResponse>({
    queryKey: ["admin-series", page, search],
    queryFn: () => fetchAdminSeries({ page, search: search || undefined, limit: 10 }),
    placeholderData: keepPreviousData,
  });
}

export function useAdminSeriesMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-series"] });

  const create = useMutation({
    mutationFn: (payload: UpsertSeriesPayload) => createAdminSeries(payload),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpsertSeriesPayload }) =>
      updateAdminSeries(id, payload),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteAdminSeries(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
