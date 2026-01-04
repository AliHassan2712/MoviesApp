"use client";

// React
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// constants
import { PATHS } from "@/constant/PATHS";

// types
import { AuthContextType, UserType } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(false);

  const fetchUser = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
        signal: controller.signal,
      });

      const data = await res.json().catch(() => null);

      if (!mountedRef.current) return null;

      if (!res.ok) {
        setUser(null);
        return null;
      }

      const u = data?.data?.user ?? null;
      setUser(u);
      return u;
    } catch (err: any) {
      if (err?.name === "AbortError") return null;

      if (mountedRef.current) setUser(null);
      return null;
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchUser();

    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
    } finally {
      setUser(null);
      window.location.href = PATHS.LOGIN;
    }
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      setUser,
      isLoggedIn: !!user,
      loading,
      fetchUser,
      logout,
    }),
    [user, loading, fetchUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
