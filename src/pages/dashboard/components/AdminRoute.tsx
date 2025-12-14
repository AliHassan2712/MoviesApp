"use client";

// React & Next
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// context
import { useAuth } from "@/contexts/AuthContext";

// paths
import { PATHS } from "@/constant/PATHS";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isLoggedIn) {
      router.replace(PATHS.LOGIN);
      return;
    }

    if (user?.role !== "admin") {
      router.replace(PATHS.HOME);
    }
  }, [loading, isLoggedIn, user, router]);

  if (loading) return null;
  if (!isLoggedIn || user?.role !== "admin") return null;

  return <>{children}</>;
}
