
 import MovieContainer from "../../../pages/movies/components/MovieContainer";
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    
    <>
        <MovieContainer id={id} />
        </>
   
  );
}







