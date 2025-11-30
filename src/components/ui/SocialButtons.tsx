// icons 
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface SocialButtonsProps {
  mode?: "signup" | "login";
}

export default function SocialButtons({ mode = "signup" }: SocialButtonsProps) {
  const isSignup = mode === "signup";

  const googleText = isSignup ? "Continue with Google" : "Login with Google";
  const facebookText = isSignup ? "Continue with Facebook" : "Login with Facebook";

  return (
    <div className="space-y-3 mt-6">
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-md shadow hover:bg-gray-200 transition"
      >
        <FcGoogle size={22} />
        {googleText}
      </button>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-[#1877f2] text-white py-3 rounded-md shadow hover:bg-[#145cc0] transition"
      >
        <FaFacebook size={22} />
        {facebookText}
      </button>
    </div>
  );
}
