"use client";

//React & Next
import { useState } from "react";
import { useRouter } from "next/navigation";

//toast notify
import toast from "react-hot-toast";

//context
import { PATHS } from "@/constant/PATHS";
import { useAuth } from "@/contexts/AuthContext";


export default function useEditProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, fetchUser } = useAuth();


  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const updateProfile = async (formData: FormData) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/users/update-me`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return false;
      }

      await fetchUser();


      toast.success("Profile updated successfully!");
      router.push(`${PATHS.PROFILE}`)

    } catch (error) {
      toast.error("Something went wrong");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading };
}
