import { useState } from "react";
import toast from "react-hot-toast";

export default function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetPassword = async (password: string) => {
    try {
      setIsLoading(true);
      setServerError(null);
      setSuccessMessage(null);

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
        return false;
      }

      setSuccessMessage(data.message);
      toast.success("Password updated successfully!");

      return true;

    } catch {
      setServerError("Network error, please try again.");
      toast.error("Network error, please try again.");
      return false;

    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading, serverError, successMessage };
}
