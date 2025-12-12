//components
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";
import ForgotPasswordForm from "@/pages/auth/forget-password/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full flex items-center justify-center">
   
      <AuthCard>
        <AuthHeader 
          title="Forgot Password"
          subtitle="Enter your email to receive a reset link"
        />

        <ForgotPasswordForm />
      </AuthCard>
    </div>
  );
}
