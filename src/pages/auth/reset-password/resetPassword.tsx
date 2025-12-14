//components
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";
import ResetPasswordForm from "@/pages/auth/reset-password/components/ResetPasswordForm";

export default function ResetPasswordPage({ token } : { token: string }) {
  return (
    <div className="w-full flex items-center justify-center">

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
