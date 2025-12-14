"use client";

// React & Next
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//context
import { useAuth } from "@/contexts/AuthContext";

//path constant
import { PATHS } from "@/constant/PATHS";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace(PATHS.LOGIN);
    }
  }, [loading, isLoggedIn, router]);

  if (loading) return null;

  if (!isLoggedIn) return null;

  return <>{children}</>;
}
