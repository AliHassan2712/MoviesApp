"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { useSeason } from "@/_pages/series/hooks/useSeason";
import { useEpisodes } from "@/_pages/series/hooks/useEpisodes";

import { Season } from "@/types/season";

import HeroSingleSkeleton from "@/components/skeletons/HeroSingleSkeleton";
import { Container } from "@/components/containers/Container";
import SeasonDetailsSkeleton from "@/components/skeletons/SeasonDetailsSkeleton";
import EpisodesCardSkeleton from "@/components/skeletons/EpisodesCardSkeleton";

import { PATHS } from "@/constant/PATHS";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SeasonDetailsProps = {
  id: string;
  seasonId: string;
};

type EpisodeCardProps = {
  seriesId: string;
  seasonId: string;
  e: any;
};

const EpisodeCard = memo(function EpisodeCard({
  seriesId,
  seasonId,
  e,
}: EpisodeCardProps) {
  return (
    <li key={e._id}>
      <div className="flex flex-col gap-4 p-4 bg-card rounded-xl shadow-xl">
        <div className="text-lg font-bold">
          Episode Number : {e.episodeNumber}
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-sm text-muted line-clamp-2">{e.overview}</p>
          </div>

          <Link
            href={PATHS.EPISODES(seriesId, seasonId, e._id)}
            className="text-muted"
          >
            <FontAwesomeIcon icon={faPlay} className="text-red-500 mr-3" />
            Watch Now
          </Link>
        </div>
      </div>
    </li>
  );
});

export default function SeasonDetails({ id, seasonId }: SeasonDetailsProps) {
  const { season, isLoading } = useSeason(id, seasonId);
  const { episodes, isloading } = useEpisodes(id, seasonId);

  const currentSeason = useMemo(() => {
    const seasonArray = Array.isArray(season) ? season : [season];
    return seasonArray[0] as Season | undefined;
  }, [season]);

  const episodesList = useMemo(() => episodes ?? [], [episodes]);

  if (isLoading || !currentSeason) {
    return (
      <div className="flex flex-col gap-10">
        <HeroSingleSkeleton />
        <SeasonDetailsSkeleton />
        <EpisodesCardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
     <HeroSection season={currentSeason} /> 

      <Container>
        <div className="flex flex-col gap-y-8 py-10">
          <div className="flex flex-col gap-2 mt-10">
            <h1 className="text-3xl font-bold text-red-500">Season overview</h1>
            <p className="text-muted text-lg">
              {currentSeason?.overview || "No overview available"}
            </p>
          </div>

          <div className="flex flex-col gap-2 my-10">
            <h1 className="text-3xl font-bold text-red-500">Episodes</h1>

            {isloading ? (
              <EpisodesCardSkeleton />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {episodesList.map((e) => (
                  <EpisodeCard key={e._id} seriesId={id} seasonId={seasonId} e={e} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}


type HeroSectionProps = {
  season: Season;
};

function HeroSection({ season }: HeroSectionProps) {
  return (
    <div className="relative h-[60vh] md:h-screen lg:h-[85vh] animate-fade">
      <Image
        src={season.poster || "/assets/images/img_hero.jpg"}
        alt={`Season ${season.seasonNumber}`}
        fill
        className="object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="absolute inset-0 flex items-end px-6 md:px-12 py-16">
        <div className="max-w-4xl text-white animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Season {season.seasonNumber}
          </h1>
        </div>
      </div>
    </div>
  );
}
