// component
import ActorDetailsComponent from "@/_pages/actors/ActorDetails";

export default async function ActorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ActorDetailsComponent id={id} />;
}
