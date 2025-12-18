import GenreDetailsComponent from "@/_pages/genres/GenreDetails/GenreDetails";

export default function GenreDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <GenreDetailsComponent params={params} />
  )
}