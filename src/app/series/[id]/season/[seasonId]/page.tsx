//components
import SeasonDetails from "@/_pages/series/components/season/SeasonDetails";


type SeasonPageProps = {
  params: Promise<{ id: string,seasonId:string }>;
};
export default async function SeasonPage({ params }: SeasonPageProps) {
  const { id, seasonId} = await params;

  return (
    <>
   <SeasonDetails id={id} seasonId={seasonId} />
    

    </>
  );
}
