"use client";

//react 
import { createContext, useContext, useEffect, useState } from "react";

//path constant
import { PATHS } from "@/constant/PATHS";

//types user
import { AuthContextType, UserType } from "@/types/user";


const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { },
  isLoggedIn: false,
  loading: true,
  fetchUser: async () => { },
  logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  // *** Fetch user by calling /auth/me ***
  async function fetchUser() {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setUser(null);
      } else {
        setUser(data.data.user);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    setUser(null);
    window.location.href = PATHS.LOGIN;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user,
        loading,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
