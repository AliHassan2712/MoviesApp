"use client";

// React
import { useState } from "react";

//contexts
import { useAuth } from "@/contexts/AuthContext";

//hooks
import useApiHandler from "@/lib/api/useApiHandler";

//toast notify
import toast from "react-hot-toast";


//types
type SocialProvider = "google" | "facebook";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Social Auth Hook 
//handles social login via Google or Facebook
// and fetches user data upon successful login
// manages loading state during the process
// returns socialLogin function and isLoading state
export default function useSocialAuth() {
  const { fetchUser } = useAuth();
  const { post } = useApiHandler();
  const [isLoading, setIsLoading] = useState(false);

  const socialLogin = async (
    provider: SocialProvider,
    token: string
  ) => {
    try {
      setIsLoading(true);

      const endpoint =
        provider === "google"
          ? "/auth/google-login"
          : "/auth/facebook-login";

      const payload =
        provider === "google"
          ? { idToken: token }
          : { accessToken: token };

      const res = await post(`${API_URL}${endpoint}`, payload);

      if (res.success) {
        toast.success(`Logged in with ${provider}`);
        await fetchUser();
      } else {
        toast.error(res.message || `${provider} login failed`);
      }

      return res;
    } catch {
      toast.error(`${provider} login failed`);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    socialLogin,
    isLoading,
  };
}
