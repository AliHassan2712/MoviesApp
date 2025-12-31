import AdminSeasonsPage from "@/_pages/admin/seasons/AdminSeasonsPage";
import AdminRoute from "@/components/auth/AdminRoute";

export  default async function AdminSeasonsRoute({ params }: { params: { seriesId: string } }) {
 const {seriesId} = await params;
  return (
    <AdminRoute>
      <AdminSeasonsPage seriesId={seriesId} />
    </AdminRoute>
  );
}
