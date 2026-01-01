"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import AdminTable from "@/components/admin/AdminTable";
import Modal from "@/components/admin/Modal";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { PATHS } from "@/constant/PATHS";

import type { AdminSeason, UpsertSeasonPayload } from "@/services/admin/seasons.service";
import { useAdminSeasonsMutations, useAdminSeasonsQuery } from "../series/hooks/useAdminSeasons";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

export default function AdminSeasonsPage({ seriesId }: { seriesId: string }) {
  const { data, isLoading, isError, error, isFetching } = useAdminSeasonsQuery(seriesId);
  const { create, update, remove } = useAdminSeasonsMutations(seriesId);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const list = data ?? [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminSeason | null>(null);
  const title = useMemo(() => (editing ? "Edit Season" : "Create Season"), [editing]);

  const [form, setForm] = useState<UpsertSeasonPayload>({
    name: "",
    seasonNumber: undefined,
    poster: "",
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", seasonNumber: undefined, poster: "" });
    setOpen(true);
  };

  const openEdit = (s: AdminSeason) => {
    setEditing(s);
    setForm({ name: s.name || "", seasonNumber: s.seasonNumber, poster: s.poster || "" });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.name?.trim()) return toast.error("Season name is required");

    try {
      const payload: UpsertSeasonPayload = {
        name: form.name.trim(),
        seasonNumber: form.seasonNumber ? Number(form.seasonNumber) : undefined,
        poster: form.poster?.trim() || undefined,
      };

      if (editing) {
        await update.mutateAsync({ id: editing._id, payload });
        toast.success("Season updated");
      } else {
        await create.mutateAsync(payload);
        toast.success("Season created");
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
      toast.success("Season deleted");
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
          <h1 className="text-2xl font-bold">Seasons</h1>
          <p className="text-muted text-sm">Click a season to manage its episodes</p>
        </div>
        {isFetching && <span className="text-xs text-muted">Updating…</span>}
      </div>

      <AdminTable
        title="Seasons"
        toolbar={
          <div className="flex gap-3">
            <button onClick={openCreate} className="btn-primary px-4 py-2 rounded-lg">
              + Create
            </button>
          </div>
        }
        head={
          <tr className="text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Number</th>
            <th className="p-3">Episodes</th>
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
              No seasons found.
            </td>
          </tr>
        )}

        {!isLoading &&
          !isError &&
          list.map((s) => (
            <tr key={s._id} className="hover:bg-soft/40">
              <td className="p-3 font-medium">
                <Link
                  className=" hover:underline"
                  href={PATHS.ADMIN_SEASON_EPISODES(seriesId, s._id)}
                >
                  Season {s.seasonNumber}
                </Link>
              </td>
              <td className="p-3">{s.seasonNumber ?? "-"}</td>
              <td className="p-3">
                <Link
                  className="text-sm text-primary hover:underline"
                  href={PATHS.ADMIN_SEASON_EPISODES(seriesId, s._id)}
                >
                  Manage episodes →
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

      <Modal open={open} title={title} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e: any) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <Input
            label="Season Number"
            type="number"
            value={form.seasonNumber ?? ""}
            onChange={(e: any) =>
              setForm((p) => ({ ...p, seasonNumber: e.target.value ? Number(e.target.value) : undefined }))
            }
          />
          <Input
            label="Poster URL"
            value={form.poster || ""}
            onChange={(e: any) => setForm((p) => ({ ...p, poster: e.target.value }))}
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
        description="Are you sure you want to delete this season? This action cannot be undone."
      />

    </div>
  );
}
