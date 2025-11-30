//next
import { useState } from "react";

// validation schema and types
import { LoginSchemaType } from "../validation";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const login = async (data: LoginSchemaType) => {
    try {
      setIsLoading(true);
      setServerError(null);

      // Fake delay for now
      await new Promise((res) => setTimeout(res, 1200));

      setSuccess("Login successful!");
      
    } catch (err) {
      setServerError("Login failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, serverError, success };
}
