import ResetPasswordBackground from "./components/ResetPasswordBackground";
import ResetPasswordHeader from "./components/ResetPasswordHeader";
import ResetPasswordForm from "./components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main">

      {/* Background */}
      <ResetPasswordBackground />

      {/* Card */}
      <div className="relative z-10 w-[90%] sm:max-w-lg bg-card p-10 rounded-xl border border-main shadow-xl">
        <ResetPasswordHeader />
        <ResetPasswordForm />
      </div>

    </div>
  );
}
