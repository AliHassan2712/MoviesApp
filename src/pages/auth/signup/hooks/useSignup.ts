"use client"

//Next
import { useRouter } from "next/navigation";

//hooks
import useApiHandler from "@/lib/api/useApiHandler";

//validation Yup
import { SignupSchemaType } from "../validation";

//path constant
import { PATHS } from "@/constant/PATHS";

export default function useSignup() {
  const router = useRouter();
  const { post, isLoading, error } = useApiHandler();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const signup = async (data: SignupSchemaType) => {
    const res = await post(`${API_URL}/auth/signup`, data);

    if (res.success) {
      setTimeout(() => {
        router.push(PATHS.LOGIN);
      }, 1200);
    }

    return res.success;
  };

  return { signup, isLoading, error };
}
