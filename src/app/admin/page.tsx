import AdminDashboardPage from "@/_pages/admin/AdminDashboardPage";
import AdminRoute from "@/components/auth/AdminRoute";

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminDashboardPage />
    </AdminRoute>
  );
}
