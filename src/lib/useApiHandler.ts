"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function useApiHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function post<T>(url: string, body: T) {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(url, {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
        return { success: false, data };
      }

      toast.success(data.message || "Success");
      return { success: true, data };

    } catch (err) {
      console.error(err);
      toast.error("Network error");
      return { success: false, data: null };
    } finally {
      setIsLoading(false);
    }
  }

  return { post, isLoading, error };
}
