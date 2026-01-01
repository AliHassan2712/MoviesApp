"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import Pagination from "@/components/ui/Pagination";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

import AdminTable from "@/components/admin/AdminTable";
import Modal from "@/components/admin/Modal";

import type { AdminActor, UpsertActorPayload } from "@/services/admin/actors.service";
import { useAdminActors } from "./hooks/useAdminActors";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

type ActorForm = {
  name: string;
  profilePath: string;
  tmdbId: string;
  popularity: string;
};

export default function AdminActorsPage() {
  const {
    actors,
    pagination,
    isLoading,
    setPage,
    search,
    setSearch,
    createActor,
    updateActor,
    deleteActor,
    isSaving,
    isDeleting,
  } = useAdminActors();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminActor | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const title = useMemo(() => (editing ? "Edit Actor" : "Create Actor"), [editing]);

  const [form, setForm] = useState<ActorForm>({
    name: "",
    profilePath: "",
    tmdbId: "",
    popularity: "",
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", profilePath: "", tmdbId: "", popularity: "" });
    setOpen(true);
  };

  const openEdit = (a: AdminActor) => {
    setEditing(a);
    setForm({
      name: a.name ?? "",
      profilePath: a.profilePath ?? "",
      tmdbId: a.tmdbId != null ? String(a.tmdbId) : "",
      popularity: a.popularity != null ? String(a.popularity) : "",
    });
    setOpen(true);
  };


  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteActor(deleteId);
      toast.success("Actor deleted");
    } catch (e: any) {
      toast.error(e?.message || "Delete failed");
    } finally {
      setDeleteId(null);
    }
  };


  const submit = async () => {
    if (!form.name.trim()) return toast.error("Name is required");

    try {
      const payload: UpsertActorPayload = {
        name: form.name.trim(),
        profilePath: form.profilePath.trim() ? form.profilePath.trim() : undefined,
        tmdbId: form.tmdbId.trim() ? Number(form.tmdbId) : undefined,
        popularity: form.popularity.trim() ? Number(form.popularity) : undefined,
      };

      if (editing) {
        await updateActor({ id: editing._id, payload });
        toast.success("Actor updated");
      } else {
        await createActor(payload);
        toast.success("Actor created");
      }

      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message || "Operation failed");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this actor?")) return;

    try {
      await deleteActor(id);
      toast.success("Actor deleted");
    } catch (e: any) {
      toast.error(e?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Actors</h1>
          <p className="text-muted text-sm">Manage actors (CRUD)</p>
        </div>
      </div>

      <AdminTable
        title="Actors"
        toolbar={
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search actors..."
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
            <th className="p-3">TMDB ID</th>
            <th className="p-3">Popularity</th>
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

        {!isLoading && actors.length === 0 && (
          <tr>
            <td className="p-4 text-muted" colSpan={4}>
              No actors found.
            </td>
          </tr>
        )}

        {!isLoading &&
          actors.map((a) => (
            <tr key={a._id} className="hover:bg-soft/40">
              <td className="p-3 font-medium">{a.name ?? "-"}</td>
              <td className="p-3">{a.tmdbId ?? "-"}</td>
              <td className="p-3">{a.popularity ?? "-"}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(a)}
                    className="px-3 py-1 rounded-lg bg-soft border border-main hover:border-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(a._id)}
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
        <div className="space-y-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e: any) => setForm((p) => ({ ...p, name: e.target.value }))}
          />

          <Input
            label="Profile image URL (optional)"
            value={form.profilePath}
            onChange={(e: any) => setForm((p) => ({ ...p, profilePath: e.target.value }))}
          />

          <Input
            label="TMDB ID (optional)"
            type="number"
            value={form.tmdbId}
            onChange={(e: any) => setForm((p) => ({ ...p, tmdbId: e.target.value }))}
          />

          <Input
            label="Popularity (optional)"
            type="number"
            value={form.popularity}
            onChange={(e: any) => setForm((p) => ({ ...p, popularity: e.target.value }))}
          />

          <PrimaryButton type="button" isLoading={isSaving} onClick={submit}>
            Save
          </PrimaryButton>
        </div>
      </Modal>

      <ConfirmDeleteModal
        open={!!deleteId}
        isLoading={isDeleting}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        description="Are you sure you want to delete this actor? This action cannot be undone."
      />

    </div>
  );
}
