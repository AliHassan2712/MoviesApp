"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // عندك AuthContext
import { PATHS } from "@/constant/PATHS";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading, user } = useAuth();
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
  if (!isLoggedIn) return null;
  if (user?.role !== "admin") return null;

  return <>{children}</>;
}
