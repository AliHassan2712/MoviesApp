"use client";

import { useState } from "react";
import { updateProfile } from "@/services/user.service";
import { useAuth } from "@/contexts/AuthContext";
import { ActionResult } from "@/types/user";

export function useEditProfile() {
  const { fetchUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (
    formData: FormData
  ): Promise<ActionResult> => {
    try {
      setIsLoading(true);
      await updateProfile(formData);
      await fetchUser();
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
}
