//components
import MovieContainer from "@/_pages/movies/components/MovieContainer";

type MovieDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { id } = await params;

  return <MovieContainer id={id} />;
}
