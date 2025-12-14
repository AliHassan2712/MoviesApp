"use client";

// React & Next
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// context
import { useAuth } from "@/contexts/AuthContext";

// path constant
import { PATHS } from "@/constant/PATHS";

export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace(PATHS.HOME);
    }
  }, [loading, isLoggedIn, router]);

  if (loading) return null;

  if (isLoggedIn) return null;

  return <>{children}</>;
}
