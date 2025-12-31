"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import Pagination from "@/components/ui/Pagination";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

import AdminTable from "@/components/admin/AdminTable";
import Modal from "@/components/admin/Modal";

import type { AdminUser, UpsertUserPayload } from "@/services/admin/users.service";
import { useAdminUsersMutations, useAdminUsersQuery } from "./hooks/useAdminUsers";

// ✅ UI Form type (avoid TS optional issues)
type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  password: string; // نخليه string في الفورم ثم نحوله undefined لو فاضي
};

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);

  const { data, isLoading, isError, error, isFetching } = useAdminUsersQuery(page, search);
  const { create, update, remove } = useAdminUsersMutations();

  const users = data?.data ?? [];
  const pagination = data?.pagination ?? null;

  const title = useMemo(() => (editing ? "Edit User" : "Create User"), [editing]);

  const [form, setForm] = useState<UserForm>({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    password: "",
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "user",
      password: "",
    });
    setOpen(true);
  };

  const openEdit = (u: AdminUser) => {
    setEditing(u);
    setForm({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      role: (u.role as "user" | "admin") || "user",
      password: "", // عادة ما نتركها فاضية عند التعديل
    });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.firstName.trim()) return toast.error("First name is required");
    if (!form.lastName.trim()) return toast.error("Last name is required");
    if (!form.email.trim()) return toast.error("Email is required");

    try {
      const payload: UpsertUserPayload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        role: form.role,
        password: form.password.trim() ? form.password.trim() : undefined,
      };

      if (editing) {
        await update.mutateAsync({ id: editing._id, payload });
        toast.success("User updated");
      } else {
        // عند الإنشاء قد يكون الباسورد مطلوب عندك
        // إذا لازم: تحقق هنا
        // if (!payload.password) return toast.error("Password is required");
        await create.mutateAsync(payload);
        toast.success("User created");
      }

      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message || "Operation failed");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    try {
      await remove.mutateAsync(id);
      toast.success("User deleted");
    } catch (e: any) {
      toast.error(e?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted text-sm">Manage users (CRUD)</p>
        </div>
        {isFetching && <span className="text-xs text-muted">Updating…</span>}
      </div>

      <AdminTable
        title="Users"
        toolbar={
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search users..."
              className="px-4 py-2 bg-main border border-main rounded-lg text-sm"
            />
            <button type="button" onClick={openCreate} className="btn-primary px-4 py-2 rounded-lg">
              + Create
            </button>
          </div>
        }
        head={
          <tr className="text-left">
            <th className="p-3">First name</th>
            <th className="p-3">Last name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3 w-44">Actions</th>
          </tr>
        }
      >
        {isLoading && (
          <tr>
            <td className="p-4 text-muted" colSpan={5}>
              Loading…
            </td>
          </tr>
        )}

        {isError && (
          <tr>
            <td className="p-4 text-red-500" colSpan={5}>
              {String((error as any)?.message || "Error")}
            </td>
          </tr>
        )}

        {!isLoading && !isError && users.length === 0 && (
          <tr>
            <td className="p-4 text-muted" colSpan={5}>
              No users found.
            </td>
          </tr>
        )}

        {!isLoading &&
          !isError &&
          users.map((u) => (
            <tr key={u._id} className="hover:bg-soft/40">
              <td className="p-3 font-medium">{u.firstName ?? "-"}</td>
              <td className="p-3">{u.lastName ?? "-"}</td>
              <td className="p-3">{u.email ?? "-"}</td>
              <td className="p-3">{u.role ?? "-"}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(u)}
                    className="px-3 py-1 rounded-lg bg-soft border border-main hover:border-primary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(u._id)}
                    className="px-3 py-1 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </AdminTable>

      {(pagination?.totalPages ?? 0) > 1 && (
        <Pagination pagination={pagination!} onChange={setPage} />
      )}

      <Modal open={open} title={title} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <Input
            label="First name"
            value={form.firstName}
            onChange={(e: any) => setForm((p) => ({ ...p, firstName: e.target.value }))}
          />

          <Input
            label="Last name"
            value={form.lastName}
            onChange={(e: any) => setForm((p) => ({ ...p, lastName: e.target.value }))}
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(e: any) => setForm((p) => ({ ...p, email: e.target.value }))}
          />

          <div className="space-y-2">
            <p className="text-text-soft block mb-1 font-medium">Role</p>
            <select
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as "user" | "admin" }))}
              className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <Input
            label="Password (optional)"
            type="password"
            value={form.password}
            onChange={(e: any) => setForm((p) => ({ ...p, password: e.target.value }))}
          />

          <PrimaryButton
            type="button"
            isLoading={create.isPending || update.isPending}
            onClick={submit}
          >
            Save
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
