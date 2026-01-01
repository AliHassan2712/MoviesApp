import AdminActorsPage from "@/_pages/admin/actors/AdminActorsPage";
import AdminRoute from "@/components/auth/AdminRoute";

export default function Page() {
  return (
    <AdminRoute>
      <AdminActorsPage />;
    </AdminRoute>
  )

}
