import GenreDetailsComponent from "@/pages/genres/GenreDetails/GenreDetails";

export default function GenreDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <GenreDetailsComponent params={params} />
  )
}