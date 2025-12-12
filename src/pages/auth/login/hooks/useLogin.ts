"use client"
//Next 
import { useRouter } from "next/navigation";

//path constant
import { PATHS } from "@/constant/PATHS";

//hooks
import useApiHandler from "@/lib/api/useApiHandler";

//validation Yup
import { LoginSchemaType } from "../validation";

//context
import { useAuth } from "@/contexts/AuthContext";

export default function useLogin() {
  const router = useRouter();
  const { post, isLoading, error } = useApiHandler();
  const { fetchUser } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const login = async (data: LoginSchemaType) => {
    const res = await post(`${API_URL}/auth/login`, data);

    if (res.success) {

      await fetchUser();

      router.push(PATHS.HOME);
    }

    return res.success;
  };

  return { login, isLoading, error };
}
