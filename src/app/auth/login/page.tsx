// guest route wrapper for login page
import GuestRoute from "@/components/auth/GuestRoute";

// component
import LoginPage from "@/_pages/auth/login/Login";

export default function Login() {
  return (
    <GuestRoute>
      <LoginPage />
    </GuestRoute>
  );
}
