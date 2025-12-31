export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  message?: string;
  status?: number;
};

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiPost<TBody, TData = any>(
  url: string,
  body: TBody
): Promise<ApiResponse<TData>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await safeJson(res);

    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: json?.message || "Something went wrong",
        status: res.status,
      };
    }

    return {
      success: true,
      data: (json?.data ?? json) as TData,
      message: json?.message,
      status: res.status,
    };
  } catch {
    return { success: false, data: null, message: "Network error" };
  }
}





// const API_URL = process.env.NEXT_PUBLIC_API_URL!;




// export async function signupRequest(data: {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }) {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL!;

//   const res = await fetch(`${API_URL}/auth/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json.message || "Signup failed");
//   }

//   return json;
// }



// export async function loginRequest(data: {
//   email: string;
//   password: string;
// }) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json.message || "Login failed");
//   }

//   return json;
// }



// export async function forgotPassword(email: string) {
//   const res = await fetch(`${API_URL}/auth/forget-password`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to send reset email");
//   }

//   return data;
// }



// export async function resetPasswordRequest(
//   token: string,
//   password: string,
//   confirmPassword: string
// ) {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL!;

//   const res = await fetch(
//     `${API_URL}/auth/reset-password/${token}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         password,
//         confirmPassword,
//       }),
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(
//       data.message || "Failed to reset password"
//     );
//   }

//   return data;
// }
