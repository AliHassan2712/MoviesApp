import { useRouter } from "next/navigation";
import useApiHandler from "@/lib/useApiHandler";
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
