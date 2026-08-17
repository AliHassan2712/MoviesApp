"use client";

// React & Next
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// context
import { useAuth } from "@/contexts/AuthContext";

// path constant
import { PATHS } from "@/constant/PATHS";

export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      if (user?.role === "admin") {
        router.replace(PATHS.ADMIN);
      } else {
        router.replace(PATHS.HOME);
      }
    }
  }, [loading, isLoggedIn, user, router]);

  if (loading) return null;

  if (isLoggedIn) return null;

  return <>{children}</>;
}

