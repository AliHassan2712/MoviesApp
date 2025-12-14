"use client";

// React & Next
import { useState } from "react";
import { useRouter } from "next/navigation";

//toast notify
import toast from "react-hot-toast";

//paths constants
import { PATHS } from "@/constant/PATHS";


type data = { currentPassword: string; newPassword: string; confirmNewPassword: string }

export default function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const changePassword = async (formData: data) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/users/change-password`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        return false;
      }

      toast.success("Password updated successfully!");

      setTimeout(() => {
        router.push(PATHS.PROFILE);
      }, 800);

      return true;
    } catch (error) {
      toast.error("Something went wrong");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
}
