import AdminEpisodesPage from "@/_pages/admin/episodes/AdminEpisodesPage";
import AdminRoute from "@/components/auth/AdminRoute";

export default async function AdminEpisodesRoute({
  params,
}: {
  params: { seriesId: string; seasonId: string };
}) {

  const {seriesId , seasonId} =await params
  return (
    <AdminRoute>
      <AdminEpisodesPage seriesId={seriesId} seasonId={seasonId} />
    </AdminRoute>
  );
}
