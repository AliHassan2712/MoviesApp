//types
import { ChangePasswordPayload } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;


//change Password user
export async function changePassword(
  payload: ChangePasswordPayload
) {
  const res = await fetch(`${API_URL}/users/change-password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Change password failed");
  }

  return json;
}


//update profile user
export async function updateProfile(
  formData: FormData
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const res = await fetch(`${API_URL}/users/update-me`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Update profile failed");
  }

  return json;
}
