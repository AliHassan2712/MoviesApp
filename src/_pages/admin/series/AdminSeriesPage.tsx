"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import AdminTable from "@/components/admin/AdminTable";
import Modal from "@/components/admin/Modal";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Pagination from "@/components/ui/Pagination";
import { PATHS } from "@/constant/PATHS";

import MultiSelect from "@/components/ui/multi-select";

import type { AdminSeries, UpsertSeriesPayload } from "@/services/admin/series.service";
import { useAdminSeriesMutations, useAdminSeriesQuery } from "./hooks/useAdminSeries";

import { fetchAdminGenres } from "@/services/admin/genres.service";
import { fetchAdminActors } from "@/services/admin/actors.service";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

function toIds(arr: any): string[] {
  return (arr ?? [])
    .map((x: any) => (typeof x === "string" ? x : x?._id))
    .filter(Boolean);
}

type SeriesForm = {
  name: string;
  description: string;
  poster: string;
  releaseYear?: number;
  genres: string[];
  cast: string[];
};

export default function AdminSeriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error, isFetching } = useAdminSeriesQuery(page, search);
  const { create, update, remove } = useAdminSeriesMutations();

  const list = data?.data ?? [];
  const pagination = data?.pagination ?? null;

  const genresQuery = useQuery({
    queryKey: ["admin-genres-all"],
    queryFn: () => fetchAdminGenres({ page: 1, limit: 500 }),
    staleTime: 60_000,
  });

  const actorsQuery = useQuery({
    queryKey: ["admin-actors-all"],
    queryFn: () => fetchAdminActors({ page: 1, limit: 500 }),
    staleTime: 60_000,
  });

  const genres = genresQuery.data?.data ?? [];
  const actors = actorsQuery.data?.data ?? [];

  const genreOptions = genres
    .filter((g: any) => !g.type || g.type === "series" || g.type === "both")
    .map((g: any) => ({
      value: g._id,
      label: g.name_en || g.name_ar || g._id,
      meta: g.type ? `type: ${g.type}` : undefined,
    }));

  const actorOptions = actors.map((a: any) => ({
    value: a._id,
    label: a.name || a._id,
    meta: a.tmdbId ? `tmdb: ${a.tmdbId}` : undefined,
  }));

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminSeries | null>(null);
  const title = useMemo(() => (editing ? "Edit Series" : "Create Series"), [editing]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<SeriesForm>({
    name: "",
    description: "",
    poster: "",
    releaseYear: undefined,
    genres: [],
    cast: [],
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      description: "",
      poster: "",
      releaseYear: undefined,
      genres: [],
      cast: [],
    });
    setOpen(true);
  };

  const openEdit = (s: AdminSeries) => {
    setEditing(s);
    setForm({
      name: s.name || "",
      description: (s as any).description || "",
      poster: s.poster || "",
      releaseYear: s.releaseYear,
      genres: toIds((s as any).genres),
      cast: toIds((s as any).cast),
    });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.name.trim()) return toast.error("Series name is required");

    try {
      const payload: UpsertSeriesPayload = {
        name: form.name.trim(),
        description: form.description.trim(),
        poster: form.poster.trim() ? form.poster.trim() : undefined,
        releaseYear: form.releaseYear ? Number(form.releaseYear) : undefined,
        genres: form.genres.length ? form.genres : undefined,
        cast: form.cast.length ? form.cast : undefined,
      };

      if (editing) {
        await update.mutateAsync({ id: editing._id, payload });
        toast.success("Series updated");
      } else {
        await create.mutateAsync(payload);
        toast.success("Series created");
      }
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await remove.mutateAsync(deleteId);
      toast.success("Series deleted");
    } catch (e: any) {
      toast.error(e?.message || "Delete failed");
    } finally {
      setDeleteId(null);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Series</h1>
          <p className="text-muted text-sm">Click a series to manage its seasons</p>
        </div>
        {isFetching && <span className="text-xs text-muted">Updating…</span>}
      </div>

      <AdminTable
        title="Series"
        toolbar={
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search series..."
              className="px-4 py-2 bg-main border border-main rounded-lg text-sm"
            />
            <button onClick={openCreate} className="btn-primary px-4 py-2 rounded-lg">
              + Create
            </button>
          </div>
        }
        head={
          <tr className="text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Year</th>
            <th className="p-3">Seasons</th>
            <th className="p-3 w-44">Actions</th>
          </tr>
        }
      >
        {isLoading && (
          <tr>
            <td className="p-4 text-muted" colSpan={4}>
              Loading…
            </td>
          </tr>
        )}

        {isError && (
          <tr>
            <td className="p-4 text-red-500" colSpan={4}>
              {String((error as any)?.message || "Error")}
            </td>
          </tr>
        )}

        {!isLoading && !isError && list.length === 0 && (
          <tr>
            <td className="p-4 text-muted" colSpan={4}>
              No series found.
            </td>
          </tr>
        )}

        {!isLoading &&
          !isError &&
          list.map((s) => (
            <tr key={s._id} className="hover:bg-soft/40">
              <td className="p-3 font-medium">
                <Link className="hover:underline" href={PATHS.ADMIN_SERIES_SEASONS(s._id)}>
                  {s.name}
                </Link>
              </td>
              <td className="p-3">{s.releaseYear ?? "-"}</td>
              <td className="p-3">
                <Link className="text-sm text-primary hover:underline" href={PATHS.ADMIN_SERIES_SEASONS(s._id)}>
                  Manage seasons →
                </Link>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="px-3 py-1 rounded-lg bg-soft border border-main hover:border-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(s._id)}
                    className="px-3 py-1 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
      </AdminTable>

      {(pagination?.totalPages ?? 0) > 1 && <Pagination pagination={pagination!} onChange={setPage} />}

      <Modal open={open} title={title} onClose={() => setOpen(false)}>
        {/* ✅ Scroll container */}
        <div className="max-h-[75vh] overflow-auto pr-1 space-y-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e: any) => setForm((p) => ({ ...p, name: e.target.value }))}
          />

          <Input
            label="Poster URL"
            value={form.poster}
            onChange={(e: any) => setForm((p) => ({ ...p, poster: e.target.value }))}
          />

          <Input
            label="Release Year"
            type="number"
            value={form.releaseYear ?? ""}
            onChange={(e: any) =>
              setForm((p) => ({
                ...p,
                releaseYear: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />

          <div className="space-y-2">
            <p className="text-soft block mb-1 font-medium">Description</p>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="w-full min-h-[110px] bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <MultiSelect
            label="Genres"
            placeholder="Search genres..."
            options={genreOptions}
            value={form.genres ?? []}
            onChange={(ids) => setForm((p) => ({ ...p, genres: ids }))}
            disabled={genresQuery.isLoading && genreOptions.length === 0}
            maxNamesOnButton={2}
          />

          <MultiSelect
            label="Actors"
            placeholder="Search actors..."
            options={actorOptions}
            value={form.cast}
            onChange={(ids) => setForm((p) => ({ ...p, cast: ids }))}
            disabled={actorsQuery.isLoading && actorOptions.length === 0}
          />

          <PrimaryButton type="button" isLoading={create.isPending || update.isPending} onClick={submit}>
            Save
          </PrimaryButton>
        </div>
      </Modal>
      <ConfirmDeleteModal
        open={!!deleteId}
        isLoading={isLoading}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        description="Are you sure you want to delete this series? This action cannot be undone."
      />

    </div>
  );
}
