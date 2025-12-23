//components
import AuthCard from "@/components/ui/AuthCard";
import AuthHeader from "@/components/ui/AuthHeader";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
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
