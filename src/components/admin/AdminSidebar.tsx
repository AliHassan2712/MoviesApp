"use client";

import { useRouter } from "next/navigation";
import { PATHS } from "@/constant/PATHS";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

import { BarChart3, Users, Film, LogOut, Tv } from "lucide-react";
import NavItem from "@/components/admin/NavItem";

export default function AdminSidebar() {
  const router = useRouter();
  const { user, logout } = useAuth() as any;

  const handleLogout = async () => {
    try {
      if (typeof logout === "function") {
        await logout();
      }
      toast.success("Logged out");
      router.replace(PATHS.LOGIN);
    } catch (e: any) {
      toast.error(e?.message || "Logout failed");
    }
  };

  return (
    <aside className="h-full p-6 flex flex-col">
      {/* Header */}
      <div>
        <p className="text-sm text-muted">Admin Panel</p>
        <p className="font-semibold truncate">
          {user?.email ?? "Admin"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 space-y-1">
        <NavItem
          href={PATHS.ADMIN}
          icon={<BarChart3 size={18} />}
          label="Dashboard"
        />

        <NavItem
          href={PATHS.ADMIN_USERS}
          icon={<Users size={18} />}
          label="Users"
        />

        <NavItem
          href={PATHS.ADMIN_MOVIES}
          icon={<Film size={18} />}
          label="Movies"
        />

        <NavItem href={PATHS.ADMIN_SERIES} icon={<Tv size={18} />} label="Series" />

      </nav>

      {/* Logout */}
      <div className="pt-6 border-t border-main">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
