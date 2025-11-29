type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function GenreDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <h1>Genre Details Page for ID: {id}</h1>
  );
}
