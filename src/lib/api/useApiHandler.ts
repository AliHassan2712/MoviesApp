"use client";

//React
import { useState } from "react";


//types
type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  message?: string;
};

export default function useApiHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function post<TBody, TResponse = any>(
    url: string,
    body: TBody
  ): Promise<ApiResponse<TResponse>> {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return {
          success: false,
          data: null,
          message: data.message,
        };
      }

      return {
        success: true,
        data,
        message: data.message,
      };
    } catch (err) {
      console.error(err);
      setError("Network error");
      return {
        success: false,
        data: null,
        message: "Network error",
      };
    } finally {
      setIsLoading(false);
    }
  }

  return {
    post,
    isLoading,
    error,
  };
}
