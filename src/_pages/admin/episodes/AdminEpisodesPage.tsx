"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import AdminTable from "@/components/admin/AdminTable";
import Modal from "@/components/admin/Modal";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

import type { AdminEpisode, UpsertEpisodePayload } from "@/services/admin/episodes.service";
import { useAdminEpisodesMutations, useAdminEpisodesQuery } from "../series/hooks/useAdminEpisodes";

function isValidUrl(url?: string) {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function AdminEpisodesPage({
  seriesId,
  seasonId,
}: {
  seriesId: string;
  seasonId: string;
}) {
  const { data, isLoading, isError, error, isFetching } = useAdminEpisodesQuery(seasonId,seriesId);
  const { create, update, remove } = useAdminEpisodesMutations(seasonId, seriesId);

  const list = data ?? [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminEpisode | null>(null);
  const title = useMemo(() => (editing ? "Edit Episode" : "Create Episode"), [editing]);

  const [form, setForm] = useState<UpsertEpisodePayload>({
    title: "",
    episodeNumber: undefined,
    description: "",
    videoUrl: "",
    duration: undefined,
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", episodeNumber: undefined, description: "", videoUrl: "", duration: undefined });
    setOpen(true);
  };

  const openEdit = (e: AdminEpisode) => {
    setEditing(e);
    setForm({
      title: e.title || "",
      episodeNumber: e.episodeNumber,
      description: e.description || "",
      videoUrl: e.videoUrl || "",
      duration: e.duration,
    });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.title?.trim()) return toast.error("Episode title is required");
    if (form.videoUrl?.trim() && !isValidUrl(form.videoUrl.trim())) return toast.error("Invalid video URL");

    try {
      const payload: UpsertEpisodePayload = {
        title: form.title.trim(),
        episodeNumber: form.episodeNumber ? Number(form.episodeNumber) : undefined,
        description: form.description?.trim() || undefined,
        videoUrl: form.videoUrl?.trim() || undefined,
        duration: form.duration ? Number(form.duration) : undefined,
      };

      if (editing) {
        await update.mutateAsync({ id: editing._id, payload });
        toast.success("Episode updated");
      } else {
        await create.mutateAsync(payload);
        toast.success("Episode created");
      }

      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message || "Operation failed");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this episode?")) return;
    try {
      await remove.mutateAsync(id);
      toast.success("Episode deleted");
    } catch (e: any) {
      toast.error(e?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Episodes</h1>
          <p className="text-muted text-sm">Season ID: {seasonId}</p>
        </div>
        {isFetching && <span className="text-xs text-muted">Updating…</span>}
      </div>

      <AdminTable
        title="Episodes"
        toolbar={
          <div className="flex gap-3">
            <button onClick={openCreate} className="btn-primary px-4 py-2 rounded-lg">
              + Create
            </button>
          </div>
        }
        head={
          <tr className="text-left">
            <th className="p-3">Title</th>
            <th className="p-3">No.</th>
            <th className="p-3">Video</th>
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
              No episodes found.
            </td>
          </tr>
        )}

        {!isLoading &&
          !isError &&
          list.map((ep) => (
            <tr key={ep._id} className="hover:bg-soft/40">
              <td className="p-3 font-medium">{ep.title}</td>
              <td className="p-3">{ep.episodeNumber ?? "-"}</td>
              <td className="p-3">
                {ep.videoUrl ? (
                  <a href={ep.videoUrl} target="_blank" className="text-primary hover:underline">
                    Link
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(ep)}
                    className="px-3 py-1 rounded-lg bg-soft border border-main hover:border-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(ep._id)}
                    className="px-3 py-1 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </AdminTable>

      <Modal open={open} title={title} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e: any) => setForm((p) => ({ ...p, title: e.target.value }))} />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Episode Number"
              type="number"
              value={form.episodeNumber ?? ""}
              onChange={(e: any) =>
                setForm((p) => ({ ...p, episodeNumber: e.target.value ? Number(e.target.value) : undefined }))
              }
            />
            <Input
              label="Duration (min)"
              type="number"
              value={form.duration ?? ""}
              onChange={(e: any) =>
                setForm((p) => ({ ...p, duration: e.target.value ? Number(e.target.value) : undefined }))
              }
            />
          </div>

          <Input
            label="Video URL"
            value={form.videoUrl || ""}
            onChange={(e: any) => setForm((p) => ({ ...p, videoUrl: e.target.value }))}
            placeholder="https://..."
          />

          <div className="space-y-2">
            <p className="text-text-soft block mb-1 font-medium">Description</p>
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="w-full min-h-[110px] bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <PrimaryButton type="button" isLoading={create.isPending || update.isPending} onClick={submit}>
            Save
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
