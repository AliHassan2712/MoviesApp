// protected route wrapper for edit profile page
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// edit profile page component
import EditProfilePage from "@/pages/account/profile/edit/EditProfilePage";

export default function EditProfile() {
  return (
    <ProtectedRoute>
      <EditProfilePage />
    </ProtectedRoute>
  );
}
