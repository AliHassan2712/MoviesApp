// guest route wrapper for signup page
import GuestRoute from "@/components/auth/GuestRoute";

// signup page component
import SignupPage from "@/pages/auth/signup/signup";

export default function Signup() {
  return (
    <GuestRoute>
      <SignupPage />
    </GuestRoute>
  );
}
