"use client";

import useApiHandler from "@/lib/api/useApiHandler";
import { SignupSchemaType } from "../validation";

export default function useSignup() {
  const { post, isLoading, error } = useApiHandler();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const signup = async (data: SignupSchemaType) => {
    const res = await post(`${API_URL}/auth/signup`, data);
    return res.success;
  };

  return { signup, isLoading, error };
}
