// components
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
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
