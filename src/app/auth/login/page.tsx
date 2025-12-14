// guest route wrapper for login page
import GuestRoute from "@/components/auth/GuestRoute";

// login page component
import LoginPage from "@/pages/auth/login/login";

export default function Login() {
  return (
    <GuestRoute>
      <LoginPage />
    </GuestRoute>
  );
}
