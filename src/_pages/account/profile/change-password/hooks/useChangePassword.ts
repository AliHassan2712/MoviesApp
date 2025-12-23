"use client";

//React
import { useState } from "react";

//services
import { changePassword } from "@/services/user.service";

//types
import { ChangePasswordPayload } from "@/types/user";

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: ChangePasswordPayload) => {
    try {
      setIsLoading(true);
      await changePassword(data);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
}
