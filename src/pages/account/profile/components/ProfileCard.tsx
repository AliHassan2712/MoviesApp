"use client";

// Next
import Image from "next/image";

//components
import ProfileInfoRow from "./ProfileInfoRow";

//context
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="bg-card border border-main rounded-xl p-6 md:p-8 shadow-xl">

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-soft border border-main overflow-hidden flex items-center justify-center">
          {user.photo ? (
            <Image
              src={user.photo}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          ) : (
            <p className="text-primary text-3xl font-bold">
              {user?.firstName?.[0] ?? "U"}
            </p>

          )}
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-muted">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <ProfileInfoRow label="Full Name" value={`${user.firstName} ${user.lastName}`} />
        <ProfileInfoRow label="Email" value={user.email} />
        <ProfileInfoRow label="Role" value={user.role} />
        <ProfileInfoRow label="Status" value={user.active ? "Active" : "Inactive"} />
        <ProfileInfoRow label="Favorites" value={`${user.favorites?.length} Movies`} />
      </div>

    </div>
  );
}
