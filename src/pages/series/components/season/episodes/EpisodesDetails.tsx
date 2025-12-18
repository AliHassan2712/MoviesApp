"use client";

import { Container } from "@/components/containers/Container";
import { useEpisodes } from "@/pages/series/hooks/useEpisodes";
import EpisodesDetailsSkeleton from "@/components/skeletons/EpisodesDetailsSkeleton"
type SeasonDetailsProps = {
  id: string;
  seasonId: string;
  episodesId: string

};
export default function EpisodesDetails({ id, seasonId, episodesId }: SeasonDetailsProps) {
  const { episodes, isloading } = useEpisodes(id, seasonId, episodesId)
  const seasonArray = Array.isArray(episodes) ? episodes : [episodes];
  const currentEpisodes = seasonArray[0];
  return (
    <div>
      {isloading ? (
        
    
       <EpisodesDetailsSkeleton/>
       
      ) : (
        <div>
          <video src={currentEpisodes?.videoUrl} controls
            className="relative w-full h-[60vh] md:h-screen lg:h-[85vh] rounded-b-xl" />
          <Container>
            <div className="py-20 flex flex-col gap-8">      
            <p className="text-muted text-[18px]"><span className="text-[20px] font-bold text-red-600">Episode Number:</span> {currentEpisodes?.episodeNumber}</p>
              <h1 className="text-3xl font-bold text-red-500 mb-3">{currentEpisodes?.title}</h1>     
              <div className="flex flex-col ">
              <h2 className="text-3xl font-bold text-red-500 mb-5">Episodes overview</h2>
              <p className="text-muted text-[18px]">{currentEpisodes?.overview}</p>
              </div>
              

            </div>

          </Container>
        </div>
      )}
    </div>
  )
}