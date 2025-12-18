"use client";

import useApiHandler from "@/lib/api/useApiHandler";

export default function useForgotPassword() {
  const { post, isLoading, error } = useApiHandler();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const sendResetEmail = async (email: string) => {
    const res = await post(
      `${API_URL}/auth/forget-password`,
      { email }
    );

    return res.success;
  };

  return { sendResetEmail, isLoading, error };
}
