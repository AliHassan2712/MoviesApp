import AdminUsersPage from "@/_pages/admin/users/AdminUsersPage";
import AdminRoute from "@/components/auth/AdminRoute";

export default function AdminUsers() {
  return (
    <AdminRoute>
      <AdminUsersPage />
    </AdminRoute>
  );
}
