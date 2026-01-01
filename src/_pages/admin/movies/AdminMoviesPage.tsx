"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import Pagination from "@/components/ui/Pagination";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AdminTable from "@/components/admin/AdminTable";
import Modal from "@/components/admin/Modal";

import MultiSelect from "@/components/ui/multi-select";

import type { AdminMovie, UpsertMoviePayload } from "@/services/admin/movies.service";
import { useAdminMoviesMutations, useAdminMoviesQuery } from "./hooks/useAdminMovies";

import { fetchAdminGenres } from "@/services/admin/genres.service";
import { fetchAdminActors } from "@/services/admin/actors.service";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function toIds(arr: any): string[] {
  return (arr ?? [])
    .map((x: any) => (typeof x === "string" ? x : x?._id))
    .filter(Boolean);
}

export default function AdminMoviesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminMovie | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isError, error, isFetching } = useAdminMoviesQuery(page, search);
  const { create, update, remove } = useAdminMoviesMutations();

  const movies = data?.data ?? [];
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
    .filter((g: any) => !g.type || g.type === "movie" || g.type === "both")
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

  const title = useMemo(() => (editing ? "Edit Movie" : "Create Movie"), [editing]);

  const [form, setForm] = useState<UpsertMoviePayload>({
    name: "",
    description: "",
    videoUrl: "",
    releaseYear: undefined,
    poster: "",
    duration: undefined,
    genresRefs: [],
    castRefs: [],
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      description: "",
      videoUrl: "",
      releaseYear: undefined,
      poster: "",
      duration: undefined,
      genresRefs: [],
      castRefs: [],
    });
    setOpen(true);
  };

  const openEdit = (m: AdminMovie) => {
    setEditing(m);
    setForm({
      name: m.name || "",
      description: m.description || "",
      videoUrl: (m as any).videoUrl || "",
      releaseYear: m.releaseYear,
      poster: m.poster || "",
      duration: (m as any).duration,
      genresRefs: toIds((m as any).genresRefs ?? (m as any).genres),
      castRefs: toIds((m as any).castRefs ?? (m as any).cast),
    });
    setOpen(true);
  };




  const submit = async () => {
    if (!form.name?.trim()) return toast.error("Movie name is required");
    if (!form.description?.trim()) return toast.error("Description is required");
    if (!form.videoUrl?.trim()) return toast.error("Video URL is required");
    if (!isValidUrl(form.videoUrl.trim())) return toast.error("Invalid video URL");

    try {
      const payload: UpsertMoviePayload = {
        name: form.name.trim(),
        description: form.description.trim(),
        videoUrl: form.videoUrl.trim(),
        poster: form.poster?.trim() ? form.poster.trim() : undefined,
        releaseYear: form.releaseYear ? Number(form.releaseYear) : undefined,
        duration: (form as any).duration ? Number((form as any).duration) : undefined,
        genresRefs: (form.genresRefs ?? []).length ? form.genresRefs : undefined,
        castRefs: (form.castRefs ?? []).length ? form.castRefs : undefined,
      };

      if (editing) {
        await update.mutateAsync({ id: editing._id, payload });
        toast.success("Movie updated");
      } else {
        await create.mutateAsync(payload);
        toast.success("Movie created");
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
      toast.success("Movie deleted");
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
          <h1 className="text-2xl font-bold">Movies</h1>
          <p className="text-muted text-sm">Manage movies (CRUD)</p>
        </div>
        {isFetching && <span className="text-xs text-muted">Updating…</span>}
      </div>

      <AdminTable
        title="Movies"
        toolbar={
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search movies..."
              className="px-4 py-2 bg-main border border-main rounded-lg text-sm"
            />
            <button type="button" onClick={openCreate} className="btn-primary px-4 py-2 rounded-lg">
              + Create
            </button>
          </div>
        }
        head={
          <tr className="text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Year</th>
            <th className="p-3">Poster</th>
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

        {!isLoading && !isError && movies.length === 0 && (
          <tr>
            <td className="p-4 text-muted" colSpan={4}>
              No movies found.
            </td>
          </tr>
        )}

        {!isLoading &&
          !isError &&
          movies.map((m) => (
            <tr key={m._id} className="hover:bg-soft/40">
              <td className="p-3 font-medium">{m.name}</td>
              <td className="p-3">{m.releaseYear ?? "-"}</td>
              <td className="p-3">{m.poster ? "Yes" : "No"}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(m)}
                    className="px-3 py-1 rounded-lg bg-soft border border-main hover:border-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(m._id)}
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
        <div className="max-h-[75vh] overflow-auto pr-1 space-y-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e: any) => setForm((p) => ({ ...p, name: e.target.value }))}
          />

          <div className="space-y-2">
            <p className="text-soft block mb-1 font-medium">Description</p>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Write a short description..."
              className="w-full min-h-[110px] bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Input
            label="Video URL"
            placeholder="https://youtube.com/watch?v=..."
            value={form.videoUrl}
            onChange={(e: any) => setForm((p) => ({ ...p, videoUrl: e.target.value }))}
          />

          <div className="grid sm:grid-cols-2 gap-4">
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
            <Input
              label="Duration (min)"
              type="number"
              value={(form as any).duration ?? ""}
              onChange={(e: any) =>
                setForm((p) => ({
                  ...p,
                  duration: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            />
          </div>

          <Input
            label="Poster URL"
            value={form.poster || ""}
            onChange={(e: any) => setForm((p) => ({ ...p, poster: e.target.value }))}
          />

          <MultiSelect
            label="Genres"
            placeholder="Search genres..."
            options={genreOptions}
            value={form.genresRefs ?? []}
            onChange={(ids) => setForm((p) => ({ ...p, genresRefs: ids }))}
            disabled={genresQuery.isLoading && genreOptions.length === 0}
            maxNamesOnButton={2}
          />

          <MultiSelect
            label="Actors"
            placeholder="Search actors..."
            options={actorOptions}
            value={form.castRefs ?? []}
            onChange={(ids) => setForm((p) => ({ ...p, castRefs: ids }))}
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
        description="Are you sure you want to delete this movie? This action cannot be undone."
      />

    </div>
  );
}
