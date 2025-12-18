import SeasonDetails from "@/pages/series/components/season/SeasonDetails";
type PageProps = {
  params: Promise<{ id: string,seasonId:string }>;
};
export default async function SeasonPage({ params }: PageProps) {
  const { id, seasonId} = await params;

  return (
    <>
   <SeasonDetails id={id} seasonId={seasonId} />
    

    </>
  );
}
