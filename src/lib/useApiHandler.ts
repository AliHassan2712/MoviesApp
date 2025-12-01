import { useState } from "react";
import toast from "react-hot-toast";

export default function useApiHandler() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (url: string, body: any ) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // ---------- ❌ request failed ----------
      if (!res.ok) {
        const msg = data?.message || "Something went wrong";

        setError(msg);
        toast.error(msg); 

        return { success: false, data };
      }

      // ---------- ✅ request success ----------
      const msg = data?.message || "Success";

      toast.success(msg); 

      return { success: true, data };
    } catch {
      setError("Network error");
      toast.error("Network error, please try again.");
      return { success: false, data: null };
    } finally {
      setLoading(false);
    }
  };

  return { post, isLoading, error };
}
