//components
import { Container } from "@/components/containers/Container";

type PageProps = {
  params: Promise<{ id: string }>;
};


export default async function MovieDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Container>

      <h1>Movie Details Page for ID: {id}</h1>
    </Container>
  );
}
