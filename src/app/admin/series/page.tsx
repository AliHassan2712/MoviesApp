import AdminSeriesPage from "@/_pages/admin/series/AdminSeriesPage";
import AdminRoute from "@/components/auth/AdminRoute";

export default function AdminSeriesRoute() {
  return (
    <AdminRoute>
      <AdminSeriesPage />
    </AdminRoute>
  );
}
