import { SignupSchemaType } from "../validation";
import useApiHandler from "@/lib/useApiHandler";
import { useRouter } from "next/navigation";

export default function useSignup() {
  const { post, isLoading, error } = useApiHandler();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const signup = async (data: SignupSchemaType) => {
    const res = await post(`${API_URL}/auth/signup`, data);

    if (res.success) {
      setTimeout(() => router.push("/auth/login"), 1200);
    }

    return res.success;
  };

  return { signup, isLoading, error };
}
