"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminStats, fetchLatestMovies, fetchLatestUsers } from "@/services/dashboard.service";

export function useAdminDashboard() {
  const stats = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: fetchAdminStats,
  });

  const latestUsers = useQuery({
    queryKey: ["admin-dashboard-latest-users"],
    queryFn: () => fetchLatestUsers(5),
  });

  const latestMovies = useQuery({
    queryKey: ["admin-dashboard-latest-movies"],
    queryFn: () => fetchLatestMovies(5),
  });

  return { stats, latestUsers, latestMovies };
}
