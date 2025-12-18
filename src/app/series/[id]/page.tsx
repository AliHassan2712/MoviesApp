type PageProps = {
  params: Promise<{ id: string }>;
};
import SingleSeries from "@/_pages/series/components/SingleSeries"

export default async function SeriesDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
    <SingleSeries id={id}/>
    

    </>
  );
}
