import { PATHS } from "@/constant/PATHS";
import { useRouter } from "next/navigation";
import useApiHandler from "@/lib/useApiHandler";
import { LoginSchemaType } from "../validation";
import { useAuth } from "@/contexts/AuthContext";

export default function useLogin() {
  const router = useRouter();
  const { post, isLoading, error } = useApiHandler();
  const { login: setLoginContext } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const login = async (data: LoginSchemaType) => {
    const res = await post(`${API_URL}/auth/login`, data);

    if (res.success) {
      // بما أننا في Production → الكوكي HttpOnly محفوظة تلقائياً
      setLoginContext();

      setTimeout(() => {
        router.push(PATHS.HOME);
      }, 600);
    }

    return res.success;
  };

  return { login, isLoading, error };
}
