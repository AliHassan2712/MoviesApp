"use client";

//Next
import Link from "next/link";

//components
import ProfileCard from "./components/ProfileCard";

//context
import { useAuth } from "@/contexts/AuthContext";

//path constant
import { PATHS } from "@/constant/PATHS";

//react icons
import { User, Shield, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 md:px-10">

      {/* PAGE HEADER */}
      <div className="max-w-5xl mx-auto mb-12 px-2">
        <h1 className="text-3xl sm:text-4xl font-bold ">
          Your Account
        </h1>
        <p className="text-muted mt-2 text-sm sm:text-base">
          Manage your profile and account preferences
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="max-w-3xl mx-auto px-2 mb-16">
        <ProfileCard />
      </div>

      {/* ACTION GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-2">

        {/* EDIT PROFILE */}
        <Link
          href={PATHS.PROFILE_EDIT}
          className="
            bg-[primary] border border-main rounded-xl p-8 
            shadow-lg transition flex flex-col items-center text-center gap-4 group
          "
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={30} className="text-primary" />
          </div>

          <h2 className="text-lg font-semibold  group-hover:text-primary transition">
            Edit Profile
          </h2>
          <p className="text-muted text-sm">
            Update your personal details
          </p>
        </Link>

        {/* CHANGE PASSWORD */}
        <Link
          href={PATHS.CHANGE_PASSWORD}
          className="
            bg-[primary] border border-main rounded-xl p-8 
            shadow-lg transition flex flex-col items-center text-center gap-4 group
          "
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Shield size={30} className="text-blue-400" />
          </div>

          <h2 className="text-lg font-semibold  group-hover:text-blue-400 transition">
            Security
          </h2>
          <p className="text-muted text-sm">
            Change your password
          </p>
        </Link>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="
            bg-[primary] border border-main rounded-xl p-8 
            shadow-lg transition flex flex-col items-center text-center gap-4 group
          "
        >
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <LogOut size={30} className="text-red-400" />
          </div>

          <h2 className="text-lg font-semibold  group-hover:text-red-400 transition">
            Logout
          </h2>
          <p className="text-muted text-sm">
            Sign out securely
          </p>
        </button>

      </div>

    </div>
  );
}
