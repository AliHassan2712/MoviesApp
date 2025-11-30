// components
import LoginBackground from "./components/LoginBackground";
import LoginForm from "./components/LoginForm";
import LoginHeader from "./components/LoginHeader";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-main">

      {/* BACKGROUND IMAGE */}
      <LoginBackground />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-[90%] sm:max-w-lg bg-card p-10 rounded-xl border border-main shadow-xl">
        <LoginHeader />
        <LoginForm />
      </div>

    </div>
  );
}
