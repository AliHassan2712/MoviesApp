//components
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";
import SignupForm from "@/pages/auth/signup/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="w-full flex items-center justify-center">
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
