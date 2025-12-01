import AuthBackground from "@/components/ui/AuthBackground";
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";

import ForgotPasswordForm from "@/pages/auth/forget-password/components/ForgotPasswordForm";
import bgImg from "@/pages/auth/forget-password/assets/imgs/background.png";

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main">
      <AuthBackground image={bgImg} />

      <AuthCard>
        <AuthHeader 
          title="Forget Password" 
          subtitle="Enter your email to receive a reset link"
        />
        <ForgotPasswordForm />
      </AuthCard>
    </div>
  );
}
