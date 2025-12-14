// protected route wrapper for profile page
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// profile page component
import Profile from "@/pages/account/profile/profilePage";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
     <Profile />
    </ProtectedRoute>
  );
}
