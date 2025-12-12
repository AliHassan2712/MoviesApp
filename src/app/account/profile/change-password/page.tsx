// protected route wrapper for change password page
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// change password page component
import ChangePasswordPage from "@/pages/account/profile/change-password/ChangePasswordPage";

export default function ChangePassword() {
  return (
    <ProtectedRoute>
      <ChangePasswordPage />
    </ProtectedRoute>
  );
}
