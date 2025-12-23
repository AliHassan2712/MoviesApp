"use client";

//React
import { useState } from "react";

//services
import { updateProfile } from "@/services/user.service";

//context
import { useAuth } from "@/contexts/AuthContext";

//types
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
      //refetch user data after successful update
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
