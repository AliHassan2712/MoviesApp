
 import MovieContainer from "./MovieContainer";
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    
    <>
      {/* <h1>Movie Details Page for ID: {id}</h1> */}
        <MovieContainer id={id} />
        </>
   
  );
}







