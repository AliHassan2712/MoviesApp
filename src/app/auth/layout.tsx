// React
import { ReactNode } from "react";

// layout for auth pages (login, signup, forgot password, reset password)
import AuthBackground from "@/components/ui/AuthBackground";
import defaultBg from "@/assets/imgs/background.png";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main overflow-hidden">
      <AuthBackground image={defaultBg} />
        {children}
    </div>
  );
}
