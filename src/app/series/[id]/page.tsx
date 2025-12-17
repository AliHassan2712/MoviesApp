type PageProps = {
  params: Promise<{ id: string }>;
};
import SingleSeries from "@/pages/series/components/SingleSeries"

export default async function SeriesDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
    <SingleSeries id={id}/>
    

    </>
  );
}
