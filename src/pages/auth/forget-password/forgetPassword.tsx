//components
import ForgetPasswordBackground from "./components/ForgetPasswordBackground";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main">

      {/* Background */}
      <ForgetPasswordBackground />

      {/* Card */}
      <div className="relative z-10 w-[90%] sm:max-w-lg bg-card p-10 rounded-xl border border-main shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-3 text-main">
          Forgot Password
        </h1>

        <p className="text-center text-text-soft text-sm mb-6">
          Enter your email and we will send you a reset link.
        </p>

        <ForgotPasswordForm />
      </div>

    </div>
  );
}
