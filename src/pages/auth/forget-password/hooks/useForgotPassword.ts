import { useState } from "react";
import toast from "react-hot-toast";

export default function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const sendResetEmail = async (email: string) => {
    try {
      setIsLoading(true);
      setServerError(null);
      setSuccessMessage(null);

      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
        return false;
      }

      setSuccessMessage(data.message);
      toast.success("Reset email sent successfully!");
      return true;

    } catch {
      setServerError("Network error, please try again.");
      toast.error("Network error, please try again.");
      return false;

    } finally {
      setIsLoading(false);
    }
  };

  return { sendResetEmail, isLoading, serverError, successMessage };
}
