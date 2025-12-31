"use client";

import { BarChart3, Film, Users, Tv } from "lucide-react";
import StatCard from "./components/StatCard";
import DashboardTable from "./components/DashboardTable";
import { useAdminDashboard } from "./hooks/useAdminDashboard";

export default function AdminDashboardPage() {
  const { stats, latestUsers, latestMovies } = useAdminDashboard();

  const anyLoading = stats.isLoading || latestUsers.isLoading || latestMovies.isLoading;
  const anyError = stats.isError || latestUsers.isError || latestMovies.isError;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <BarChart3 className="text-primary" size={28} />
          Dashboard
        </h1>
        <p className="text-muted mt-1">Overview + latest activity</p>
      </div>

      {/* Errors */}
      {anyError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
          {String(
            (stats.error as any)?.message ||
              (latestUsers.error as any)?.message ||
              (latestMovies.error as any)?.message ||
              "Something went wrong"
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.data?.totalUsers ?? "—"} icon={<Users className="text-primary" />} />
        <StatCard title="Movies" value={stats.data?.totalMovies ?? "—"} icon={<Film className="text-primary" />} />
        <StatCard title="Series" value={stats.data?.totalSeries ?? "—"} icon={<Tv className="text-primary" />} />
      </div>

      {/* Latest */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardTable
          title="Latest Users"
          head={
            <tr className="text-left">
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          }
        >
          {anyLoading && (
            <tr>
              <td className="p-4 text-muted" colSpan={2}>
                Loading…
              </td>
            </tr>
          )}

          {!anyLoading && (latestUsers.data?.length ?? 0) === 0 && (
            <tr>
              <td className="p-4 text-muted" colSpan={2}>
                No users
              </td>
            </tr>
          )}

          {!anyLoading &&
            latestUsers.data?.map((u) => (
              <tr key={u._id} className="hover:bg-soft/40">
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role ?? "-"}</td>
              </tr>
            ))}
        </DashboardTable>

        <DashboardTable
          title="Latest Movies"
          head={
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Year</th>
            </tr>
          }
        >
          {anyLoading && (
            <tr>
              <td className="p-4 text-muted" colSpan={2}>
                Loading…
              </td>
            </tr>
          )}

          {!anyLoading && (latestMovies.data?.length ?? 0) === 0 && (
            <tr>
              <td className="p-4 text-muted" colSpan={2}>
                No movies
              </td>
            </tr>
          )}

          {!anyLoading &&
            latestMovies.data?.map((m) => (
              <tr key={m._id} className="hover:bg-soft/40">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.releaseYear ?? "-"}</td>
              </tr>
            ))}
        </DashboardTable>
      </div>
    </div>
  );
}
