//components
import SingleSeries from "@/_pages/series/components/SingleSeries"


type SeriesDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SeriesDetailsPage({ params }: SeriesDetailsPageProps) {
  const { id } = await params;

  return (
    <>
    <SingleSeries id={id}/>
    

    </>
  );
}
