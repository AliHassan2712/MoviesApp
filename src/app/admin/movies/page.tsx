import AdminMoviesPage from "@/_pages/admin/movies/AdminMoviesPage";
import AdminRoute from "@/components/auth/AdminRoute";

export default function AdminMoviesRoute() {
  return (
    <AdminRoute>
      <AdminMoviesPage />
    </AdminRoute>
  );
}
