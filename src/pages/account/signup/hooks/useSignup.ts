
//next
import { useState } from "react";
import { useRouter } from "next/navigation";

// Validation types
import { SignupSchemaType } from "../validation";

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

      // =============== SEND DATA TO API ===============
      const response = await fetch("/api/account/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // =============== SERVER ERROR HANDLING ===============
      if (!response.ok) {
        setServerError(result.message || "Something went wrong");
        return false;
      }

      // =============== SUCCESS HANDLING ===============
      setSuccessMessage(result.message || "Signup successful!");

      // Redirect after success
      setTimeout(() => {
        router.push("/account/login");
      }, 1500);

      return true;

    } catch {
      setServerError("Network error, please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    serverError,
    successMessage,
  };
}
