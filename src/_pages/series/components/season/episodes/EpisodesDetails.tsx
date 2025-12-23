"use client";

//React & Next
import { useRouter } from "next/navigation";
import { useState } from "react";

//components
import { Container } from "@/components/containers/Container";
import EpisodesDetailsSkeleton from "@/components/skeletons/EpisodesDetailsSkeleton";

//hooks
import { useEpisodes } from "@/_pages/series/hooks/useEpisodes";

type SeasonDetailsProps = {
  id: string;
  seasonId: string;
  episodesId: string;
};

export default function EpisodesDetails({
  id,
  seasonId,
  episodesId,
}: SeasonDetailsProps) {
  const router = useRouter();

  //  Not logged in message
  const [showLoginMsg, setShowLoginMsg] = useState(true);

  // all episodes of the season
  const { episodes: episodesList, isloading } = useEpisodes(id, seasonId);

  // current episode details

  const { episodes: currentEpisodeData } = useEpisodes(
    id,
    seasonId,
    episodesId
  );

  const currentEpisode = Array.isArray(currentEpisodeData)
    ? currentEpisodeData[0]
    : currentEpisodeData;

  if (isloading) {
    return <EpisodesDetailsSkeleton />;
  }

  if (!currentEpisode || !episodesList) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted text-xl">
        Episode not found
      </div>
    );
  }

  // Find index of current episode to get prev and next episodes
  const currentIndex = episodesList.findIndex(
    (ep) => ep._id === currentEpisode._id
  );


  // Get previous and next episodes
  const prevEpisode =
    currentIndex > 0 ? episodesList[currentIndex - 1] : null;

    // Get next episode
  const nextEpisode =
    currentIndex < episodesList.length - 1
      ? episodesList[currentIndex + 1]
      : null;

      // Navigate to episode details
  const goToEpisode = (episodeId: string) => {
    router.push(`/series/${id}/season/${seasonId}/episodes/${episodeId}`);
  };

  return (
    <div>
      {/* ================= VIDEO / NOT LOGGED IN ================= */}
      {currentEpisode.videoUrl && (
        <>
          <video
            src={currentEpisode.videoUrl}
            controls
            className="w-full h-[60vh] md:h-screen lg:h-[85vh]
              object-cover rounded-b-2xl bg-black"
          />

          {/*  Navigation */}
          <div className="flex justify-between items-center px-6 mt-6">
            <button
              onClick={() => prevEpisode && goToEpisode(prevEpisode._id)}
              disabled={!prevEpisode}
              className="px-6 py-3 rounded-full font-semibold
                bg-card hover:bg-soft
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⬅ Prev Episode
            </button>

            <button
              onClick={() => nextEpisode && goToEpisode(nextEpisode._id)}
              disabled={!nextEpisode}
              className="px-6 py-3 rounded-full font-semibold
                btn-primary text-white
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Episode ➡
            </button>
          </div>
        </>
      )}

      {/*  Not Logged In Message (same as movies) */}
      {!currentEpisode.videoUrl && showLoginMsg && (
        <div className="container mx-auto px-4 md:px-10 mt-8">
          <div className="flex items-center justify-between gap-4 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl">
            <p className="font-medium">
              🔒 You must be logged in to watch this episode
            </p>
            <button
              onClick={() => setShowLoginMsg(false)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ================= EPISODE DETAILS ================= */}
      <Container>
        <div className="py-20 flex flex-col gap-8">
          <p className="text-muted text-[18px]">
            <span className="text-[20px] font-bold text-red-600">
              Episode Number:
            </span>{" "}
            {currentEpisode.episodeNumber}
          </p>

          <h1 className="text-3xl font-bold text-red-500">
            {currentEpisode.title}
          </h1>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-red-500">
              Episode Overview
            </h2>
            <p className="text-muted text-[18px] leading-relaxed">
              {currentEpisode.overview}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
