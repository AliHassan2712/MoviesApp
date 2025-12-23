//components
import EpisodesDetails from "@/_pages/series/components/season/episodes/EpisodesDetails"

type EpisodesPageProps = {
  params: Promise<{ id: string,seasonId:string,episodesId:string }>;
};
export default async function EpisodesPage({ params }: EpisodesPageProps) {
  const {id,seasonId,episodesId}=await params
  return (
    <EpisodesDetails id={id} seasonId={seasonId} episodesId={episodesId}/>
  )
}