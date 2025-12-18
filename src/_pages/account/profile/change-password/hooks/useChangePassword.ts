"use client";

import { useState } from "react";
import { changePassword } from "@/services/user.service";
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
