//components
import SignupBackground from "./components/SignupBackground";
import SignupForm from "./components/SignupForm";
import SignupHeader from "./components/SignupHeader";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main">

      {/* Background */}
      <SignupBackground />

      {/* Card */}
      <div className="relative z-10 w-[90%] sm:max-w-lg bg-card p-10 rounded-xl border border-main shadow-xl">
        <SignupHeader />
        <SignupForm />
      </div>

    </div>
  );
}
