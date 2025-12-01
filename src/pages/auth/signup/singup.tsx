import AuthBackground from "@/components/ui/AuthBackground";
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";

import SignupForm from "@/pages/auth/signup/components/SignupForm";
import bgImg from "@/pages/auth/signup/assets/imgs/background.png";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main">
      <AuthBackground image={bgImg} />

      <AuthCard>
        <AuthHeader 
          title="Create Account" 
          subtitle="Join us and enjoy unlimited movies & shows" 
        />
        <SignupForm />
      </AuthCard>
    </div>
  );
}
