import useApiHandler from "@/lib/useApiHandler";

export default function useResetPassword() {
  const { post, isLoading, error } = useApiHandler();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const resetPassword = async (password: string , confirmPassword: string) => {
    const res = await post(`${API_URL}/auth/reset-password/`, { password, confirmPassword });
    return res.success;
  };

  return { resetPassword, isLoading, error };
}
