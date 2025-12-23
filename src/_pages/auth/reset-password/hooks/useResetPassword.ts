"use client";

//custom hook
import useApiHandler from "@/lib/api/useApiHandler";

export default function useResetPassword() {
  const { post, isLoading, error } = useApiHandler();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string
  ) => {
    const res = await post(
      `${API_URL}/auth/reset-password/${token}`,
      { password, confirmPassword }
    );

    return res.success;
  };

  return { resetPassword, isLoading, error };
}
