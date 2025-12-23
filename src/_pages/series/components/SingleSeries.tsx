"use client";

//components
import { Container } from "@/components/containers/Container";
import HeroSection from "./HeroSection";
import SeriesDetails from "./SeriesDetails";
import CastList from "./CastList";
import SimilarSeriesGrid from "./SimilarSeriesGrid";
import GridSkeleton from "@/components/skeletons/GridSkeleton";
import SeriesDetailsSkeletons from "@/components/skeletons/SeriesDetailsSkeletons";
import HeroSingleSkeleton from "@/components/skeletons/HeroSingleSkeleton";

//hooks
import { useSingleSeries } from "../hooks/useSingleSeries";

type SingleSeriesProps = { id: string };

export default function SingleSeries({ id }: SingleSeriesProps) {
  const { singleSeries, isloading, season, favoriteList, toggleFavorite, similarSeries, loading } =
    useSingleSeries(id);

  return (
    <div className="flex-1">
      {!singleSeries || isloading ? <HeroSingleSkeleton /> : <HeroSection series={singleSeries} />}
      <Container>
        {!singleSeries || isloading || !season ? (
          <SeriesDetailsSkeletons />
        ) : (
          <>
            <SeriesDetails
              series={singleSeries}
              favoriteList={favoriteList}
              toggleFavorite={toggleFavorite}
              season={season}
            />
            <CastList cast={singleSeries.cast} />
          </>
        )}
        <div className="flex-1 my-10">
          {loading ? (
            <GridSkeleton />
          ) : similarSeries.length === 0 ? (
            <p className="text-center text-muted">No similar series found.</p>
          ) : (
            <SimilarSeriesGrid
              series={similarSeries}
              favoriteList={favoriteList}
              toggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
