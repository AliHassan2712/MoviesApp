import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginSchemaType } from "../validation";
import toast from "react-hot-toast";

export default function useLogin() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const login = async (data: LoginSchemaType) => {
    try {
      setIsLoading(true);
      setServerError(null);
      setSuccessMessage(null);

      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || "Invalid email or password.");
        toast.error(result.message || "Invalid email or password.");
        return false;
      }

      setSuccessMessage(result.message || "Login successful!");
      toast.success("Welcome back!");

      setTimeout(() => {
        router.push("/");
      }, 1200);

      return true;

    } catch {
      setServerError("Network error, please try again.");
      toast.error("Network error, please try again.");
      return false;

    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, serverError, successMessage };
}
