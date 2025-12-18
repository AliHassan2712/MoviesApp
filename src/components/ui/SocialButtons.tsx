"use client";

// React
import { useEffect, useRef, useState } from "react";

//react icons
import { FaFacebook } from "react-icons/fa";

//toast notify
import toast from "react-hot-toast";

//hooks
import useSocialAuth from "../../hooks/auth/useSocialAuth";


declare global {
  interface Window {
    google?: any;
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

export default function SocialButtons() {
  const { socialLogin, isLoading } = useSocialAuth();

  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [facebookReady, setFacebookReady] = useState(false);


  
  /* ================= GOOGLE ================= */
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      console.error("❌ GOOGLE CLIENT ID missing");
      return;
    }

    const initGoogle = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: (response: any) => {
          if (!response.credential) {
            toast.error("Google login failed");
            return;
          }
          socialLogin("google", response.credential);
        },
      });

      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          width: 300,
        });
        setGoogleReady(true);
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    script.onerror = () => toast.error("Failed to load Google SDK");
    document.body.appendChild(script);
  }, [socialLogin]);



  /* ================= FACEBOOK ================= */
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_FACEBOOK_APP_ID) {
      console.error("❌ FACEBOOK APP ID missing");
      return;
    }

    if (window.FB) {
      setFacebookReady(true);
      return;
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        cookie: true,
        xfbml: false,
        version: "v19.0",
      });
      setFacebookReady(true);
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onerror = () => toast.error("Failed to load Facebook SDK");
    document.body.appendChild(script);
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB) {
      toast.error("Facebook SDK not ready");
      return;
    }

    window.FB.login(
      (response: any) => {
        if (!response.authResponse?.accessToken) {
          toast.error("Facebook login failed");
          return;
        }
        socialLogin("facebook", response.authResponse.accessToken);
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="space-y-4 mt-6">
      {/* GOOGLE */}
      <div className="w-full min-h-[44px]">
        {!googleReady && (
          <div className="w-full h-[44px] bg-gray-100 rounded-lg animate-pulse" />
        )}
        <div ref={googleBtnRef} />
      </div>

      {/* FACEBOOK */}
      <button
        onClick={handleFacebookLogin}
        disabled={!facebookReady || isLoading}
        className="w-full h-[44px] flex items-center justify-between gap-3 px-4 rounded-lg
                   bg-[#1877F2] text-white font-medium hover:bg-[#166FE5]
                   disabled:opacity-50"
      >
        <FaFacebook size={20} />
        <span>Continue with Facebook</span>
        <span />
      </button>
    </div>
  );
}
