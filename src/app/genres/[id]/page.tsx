// components
import GenreDetailsComponent from "@/_pages/genres/GenreDetails/GenreDetails";


type GenreDetailsProps = {
  params: Promise<{ id: string }>;
};


export default async function GenreDetails({
  params }: GenreDetailsProps) {
  const { id } = await params;


  return (
    <GenreDetailsComponent id={id} />
  )
}