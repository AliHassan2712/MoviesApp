"use client";

//custom hook
import useApiHandler from "@/lib/api/useApiHandler";

//contexts
import { useAuth } from "@/contexts/AuthContext";

//validation types
import { LoginSchemaType } from "../validation";

export default function useLogin() {
  const { post, isLoading, error } = useApiHandler();
  const { fetchUser } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const login = async (data: LoginSchemaType) => {
    const res = await post(`${API_URL}/auth/login`, data);

    if (res.success) {
      await fetchUser();
      return true;
    }

    return false;
  };

  return { login, isLoading, error };
}
