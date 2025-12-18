"use client";

import { useAuth } from "@/contexts/AuthContext";
import ProfileCard from "./components/ProfileCard";
import { ActionCard } from "./components/ActionCard";
import { getProfileActions } from "./config/profileActions";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const actions = getProfileActions(logout);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-3xl font-bold">Your Account</h1>
        <p className="text-muted mt-2">
          Manage your profile and account preferences
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <ProfileCard />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {actions.map((action) => (
          <ActionCard key={action.title} {...action} />
        ))}
      </div>
    </div>
  );
}
