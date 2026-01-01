import AdminGenresPage from "@/_pages/admin/genres/AdminGenresPage";
import AdminRoute from "@/components/auth/AdminRoute";

export default function Page() {
  return (
    <AdminRoute>
      <AdminGenresPage />;
    </AdminRoute>

  )
}
