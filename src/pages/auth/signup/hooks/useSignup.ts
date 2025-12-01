import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupSchemaType } from "../validation";
import toast from "react-hot-toast";

export default function useSignup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const signup = async (data: SignupSchemaType) => {
    try {
      setIsLoading(true);
      setServerError(null);
      setSuccessMessage(null);

      const response = await fetch("/api/account/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || "Something went wrong");
        toast.error(result.message || "Something went wrong");
        return false;
      }

      setSuccessMessage(result.message || "Signup successful!");
      toast.success("Account created successfully!");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);

      return true;

    } catch {
      setServerError("Network error, please try again.");
      toast.error("Network error, please try again.");
      return false;

    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, serverError, successMessage };
}
