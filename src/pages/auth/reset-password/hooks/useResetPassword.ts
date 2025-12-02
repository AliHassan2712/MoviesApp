import useApiHandler from "@/lib/useApiHandler";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constant/PATHS";

export default function useResetPassword() {
  const router = useRouter();
  const { post, isLoading, error } = useApiHandler();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string
  ) => {
    const res = await post(`${API_URL}/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });

    if (res.success) {
      setTimeout(() => {
        router.push(PATHS.LOGIN);
      }, 1200);
    }

    return res.success;
  };

  return { resetPassword, isLoading, error };
}
