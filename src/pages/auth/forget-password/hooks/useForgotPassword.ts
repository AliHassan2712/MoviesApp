"use client"

// Next
import { useRouter } from "next/navigation";

//hooks
import useApiHandler from "@/lib/api/useApiHandler";

//path constant
import { PATHS } from "@/constant/PATHS";

export default function useForgotPassword() {
  const router = useRouter();
  const { post, isLoading, error } = useApiHandler();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const sendResetEmail = async (email: string) => {
    const res = await post(`${API_URL}/auth/forget-password`, { email });

    if (res.success) {
      router.push(PATHS.LOGIN);
    }

    return res.success;
  };

  return { sendResetEmail, isLoading, error };
}
