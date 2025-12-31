"use client";

import { apiPost, ApiResponse } from "@/services/auth.service";
import { useState } from "react";

export default function useApiHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function post<TBody, TData = any>(
    url: string,
    body: TBody
  ): Promise<ApiResponse<TData>> {
    setIsLoading(true);
    setError(null);

    const result = await apiPost<TBody, TData>(url, body);

    if (!result.success) setError(result.message || "Something went wrong");

    setIsLoading(false);
    return result;
  }

  return { post, isLoading, error };
}
