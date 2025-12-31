"use client";

import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import type { UsersListResponse, UpsertUserPayload } from "@/services/admin/users.service";
import {
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  updateAdminUser,
} from "@/services/admin/users.service";

export function useAdminUsersQuery(page: number, search: string) {
  return useQuery<UsersListResponse>({
    queryKey: ["admin-users", page, search],
    queryFn: () => fetchAdminUsers({ page, search: search || undefined, limit: 10 }),
    placeholderData: keepPreviousData, // ✅ React Query v5
  });
}

export function useAdminUsersMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-users"] });

  const create = useMutation({
    mutationFn: (payload: UpsertUserPayload) => createAdminUser(payload),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpsertUserPayload }) =>
      updateAdminUser(id, payload),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteAdminUser(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
