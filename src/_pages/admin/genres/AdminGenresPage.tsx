"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import Pagination from "@/components/ui/Pagination";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

import AdminTable from "@/components/admin/AdminTable";
import Modal from "@/components/admin/Modal";

import type { AdminGenre, UpsertGenrePayload } from "@/services/admin/genres.service";
import { useAdminGenres } from "./hooks/useAdminGenres";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

type GenreForm = {
  name_en: string;
  name_ar: string;
  type: "movie" | "series" | "both";
};

export default function AdminGenresPage() {
  const {
    genres,
    pagination,
    isLoading,
    setPage,
    search,
    setSearch,
    createGenre,
    updateGenre,
    deleteGenre,
    isSaving,
    isDeleting,
  } = useAdminGenres();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminGenre | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const title = useMemo(() => (editing ? "Edit Genre" : "Create Genre"), [editing]);

  const [form, setForm] = useState<GenreForm>({
    name_en: "",
    name_ar: "",
    type: "both",
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ name_en: "", name_ar: "", type: "both" });
    setOpen(true);
  };

  const openEdit = (g: AdminGenre) => {
    setEditing(g);
    setForm({
      name_en: g.name_en ?? "",
      name_ar: (g.name_ar ?? "") as string,
      type: (g.type ?? "both") as any,
    });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.name_en.trim()) return toast.error("Name (EN) is required");

    try {
      const payload: UpsertGenrePayload = {
        name_en: form.name_en.trim(),
        name_ar: form.name_ar.trim() ? form.name_ar.trim() : undefined,
        type: form.type,
      };

      if (editing) {
        await updateGenre({ id: editing._id, payload });
        toast.success("Genre updated");
      } else {
        await createGenre(payload);
        toast.success("Genre created");
      }

      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteGenre(deleteId);
      toast.success("Genre deleted");
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
          <h1 className="text-2xl font-bold">Genres</h1>
          <p className="text-muted text-sm">Manage genres (CRUD)</p>
        </div>
      </div>

      <AdminTable
        title="Genres"
        toolbar={
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search genres..."
              className="px-4 py-2 bg-main border border-main rounded-lg text-sm"
            />
            <button type="button" onClick={openCreate} className="btn-primary px-4 py-2 rounded-lg">
              + Create
            </button>
          </div>
        }
        head={
          <tr className="text-left">
            <th className="p-3">Name (EN)</th>
            <th className="p-3">Name (AR)</th>
            <th className="p-3">Type</th>
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

        {!isLoading && genres.length === 0 && (
          <tr>
            <td className="p-4 text-muted" colSpan={4}>
              No genres found.
            </td>
          </tr>
        )}

        {!isLoading &&
          genres.map((g) => (
            <tr key={g._id} className="hover:bg-soft/40">
              <td className="p-3 font-medium">{g.name_en ?? "-"}</td>
              <td className="p-3">{g.name_ar ?? "-"}</td>
              <td className="p-3">{g.type ?? "both"}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(g)}
                    className="px-3 py-1 rounded-lg bg-soft border border-main hover:border-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(g._id)}
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
            label="Name (EN)"
            value={form.name_en}
            onChange={(e: any) => setForm((p) => ({ ...p, name_en: e.target.value }))}
          />

          <Input
            label="Name (AR) (optional)"
            value={form.name_ar}
            onChange={(e: any) => setForm((p) => ({ ...p, name_ar: e.target.value }))}
          />

          <div className="space-y-2">
            <p className="text-text-soft block mb-1 font-medium">Type</p>
            <select
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as any }))}
              className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="both">both</option>
              <option value="movie">movie</option>
              <option value="series">series</option>
            </select>
          </div>

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
        description="Are you sure you want to delete this genre? This action cannot be undone."
      />

    </div>
  );
}
