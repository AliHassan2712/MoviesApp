type PageProps = {
  params: Promise<{ id: string }>;
};


export default async function ActorDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <h1>Actor Details Page for ID: {id}</h1>
  );
}
