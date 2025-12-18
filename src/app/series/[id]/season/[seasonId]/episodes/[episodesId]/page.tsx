
type PageProps = {
  params: Promise<{ id: string,seasonId:string,episodesId:string }>;
};
import EpisodesDetails from "@/_pages/series/components/season/episodes/EpisodesDetails"
export default async function EpisodesPage({ params }: PageProps) {
  const {id,seasonId,episodesId}=await params
  return (
    <EpisodesDetails id={id} seasonId={seasonId} episodesId={episodesId}/>
  )
}