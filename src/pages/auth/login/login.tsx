//components
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";
import LoginForm from "@/pages/auth/login/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full flex items-center justify-center">

      <AuthCard>
        <AuthHeader 
          title="Welcome Back" 
          subtitle="Login to continue watching your movies" 
        />
        <LoginForm />
      </AuthCard>
    </div>
  );
}
