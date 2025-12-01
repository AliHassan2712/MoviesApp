import AuthBackground from "@/components/ui/AuthBackground";
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";

import LoginForm from "@/pages/auth/login/components/LoginForm";
import bgImg from "@/pages/auth/login/assets/imgs/background.png";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main">
      <AuthBackground image={bgImg} />

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
