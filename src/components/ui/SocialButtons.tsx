"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import useSocialAuth from "../../hooks/auth/useSocialAuth";

declare global {
  interface Window {
    google?: any;
    FB?: any;
  }
}

interface SocialButtonsProps {
  mode?: "login" | "signup";
}

export default function SocialButtons({ mode = "login" }: SocialButtonsProps) {
  const { googleLogin, facebookLogin, isLoading } = useSocialAuth();

  const handleGoogle = async () => {
    if (!window.google || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      toast.error("Google SDK not loaded");
      return;
    }

    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email profile",
        callback: async (response: any) => {
          if (response.access_token) {
            await googleLogin(response.access_token);
          } else {
            toast.error("Google did not return access token");
          }
        },
      });

      client.requestAccessToken();
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  const handleFacebook = async () => {
    if (!window.FB) {
      toast.error("Facebook SDK not loaded");
      return;
    }

    window.FB.login(
      async (response: any) => {
        if (response.authResponse?.accessToken) {
          await facebookLogin(response.authResponse.accessToken);
        } else {
          toast.error("Facebook login cancelled");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="space-y-3 mt-6">
      <p className="text-center text-muted text-sm">
        {mode === "login" ? "Or continue with" : "Or sign up using"}
      </p>

      {/* GOOGLE BUTTON */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={isLoading}
        className="
          w-full flex items-center justify-center gap-3
          bg-white text-black py-3 rounded-lg shadow-md
          hover:bg-gray-200 transition disabled:opacity-60
        "
      >
        {isLoading ? <Spinner /> : <FcGoogle size={22} />}
        Continue with Google
      </button>

      {/* FACEBOOK BUTTON */}
      <button
        type="button"
        onClick={handleFacebook}
        disabled={isLoading}
        className="
          w-full flex items-center justify-center gap-3
          bg-[#1877f2] text-white py-3 rounded-lg shadow-md
          hover:bg-[#145cc0] transition disabled:opacity-60
        "
      >
        {isLoading ? <Spinner /> : <FaFacebook size={22} />}
        Continue with Facebook
      </button>
    </div>
  );
}
