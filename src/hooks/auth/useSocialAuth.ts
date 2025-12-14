"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import useApiHandler from "@/lib/api/useApiHandler";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useSocialAuth() {
  const { fetchUser } = useAuth();
  const { post } = useApiHandler();

  const [isLoading, setIsLoading] = useState(false);
  

  const googleLogin = async (idToken: string) => {
    try {
      setIsLoading(true);

  const res = await post(`${API_URL}/auth/google-login`, {
    idToken,   // ✅ SEND ID TOKEN
    credentials: "include",
  });
      if (res.success) {
        toast.success("Logged in with Google 🎉");
        await fetchUser();
      } else {
        toast.error(res.message || "Google login failed");
      }

      return res;
    } catch (err) {
      toast.error("Google login failed");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const facebookLogin = async (accessToken: string) => {
    try {
      setIsLoading(true);

      const res = await post(`${API_URL}/auth/facebook-login`, { accessToken });

      if (res.success) {
        toast.success("Logged in with Facebook 🎉");
        await fetchUser();
      } else {
        toast.error(res.message || "Facebook login failed");
      }

      return res;
    } catch (err) {
      toast.error("Facebook login failed");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    googleLogin,
    facebookLogin,
    isLoading,
  };
}
