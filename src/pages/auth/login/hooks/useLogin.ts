import { LoginSchemaType } from "../validation";
import useApiHandler from "@/lib/useApiHandler";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const { post, isLoading, error } = useApiHandler();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const login = async (data: LoginSchemaType) => {
    const res = await post(`${API_URL}/auth/login`, data );

    if (res.success) {
      setTimeout(() => router.push("/"), 1000);
    }

    return res.success;
  };

  return { login, isLoading, error };
}
