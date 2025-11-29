type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SeriesDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <h1>Series Details Page for ID: {id}</h1>
  );
}
