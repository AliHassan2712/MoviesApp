// guest route wrapper for signup page
import GuestRoute from "@/components/auth/GuestRoute";

// component
import SignupPage from "@/_pages/auth/signup/Signup";

export default function Signup() {
  return (
    <GuestRoute>
      <SignupPage />
    </GuestRoute>
  );
}
