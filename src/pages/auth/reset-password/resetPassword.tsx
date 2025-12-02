import AuthBackground from "@/components/ui/AuthBackground";
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";

import ResetPasswordForm from "@/pages/auth/reset-password/components/ResetPasswordForm";
import bgImg from "@/pages/auth/reset-password/assets/imgs/background.png";

export default function ResetPasswordPage({ token } : { token: string }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main">
      <AuthBackground image={bgImg} />

      <AuthCard>
        <AuthHeader 
          title="Reset Password"
          subtitle="Enter your new password below"
        />

        <ResetPasswordForm token={token} />   
      </AuthCard>
    </div>
  );
}
