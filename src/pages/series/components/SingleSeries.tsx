"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

import { Series, Genre, Cast } from "@/types/series";
import { useSingleSeries } from "../hooks/useSingleSeries";
import { useSeries } from "../hooks/useSeries";
import { useFavorite } from "../../../contexts/FavoriteContext";
import HeroSingleSkeleton from "@/components/skeletons/HeroSingleSkeleton";
import MoviesGridSkeleton from "@/components/skeletons/MoviesGridSkeleton";
import { Container } from "@/components/containers/Container";
import { PATHS } from "@/constant/PATHS";
import { useSeason } from "../hooks/useSeason";
import { Season } from "@/types/season";
import SeriesDetailsSkeletons from "@/components/skeletons/SeriesDetailsSkeletons"


type SingleSeriesProps = {
  id: string;
};

export default function SingleSeries({ id }: SingleSeriesProps) {
  const { singleSeries, isloading } = useSingleSeries(id);
  const { series, loading } = useSeries();
  const { favoriteList, toggleFavorite } = useFavorite();
  const {season,isLoading}=useSeason(`${singleSeries?._id}`||"")

    
  // Similar series
  const similarSeries: Series[] = useMemo(() => {
    if (isloading || loading || !singleSeries || !series) return [];
    const genreSet = singleSeries.genres?.map((g)=>g._id);
    return series.filter(
      (s) =>
        s._id !== singleSeries._id &&
        s.genres?.some((g) => genreSet?.includes(String(g)))
    );
  }, [isloading, loading, singleSeries, series]);

  return (
    <div className="flex-1">
      {/* Hero Section */}
      {!singleSeries || isloading ? (
        <HeroSingleSkeleton />
      ) : (
        <HeroSection series={singleSeries} />
      )}

      <Container>
        {/* Series Details */}
        {!singleSeries || isloading||!season? <SeriesDetailsSkeletons/> : (
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

        {/* Similar Series */}
        <div className="flex-1  my-10">
          {loading ? (
            <MoviesGridSkeleton />
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

/* ------------------------- Hero Section ------------------------- */
type HeroSectionProps = {
  series: Series;
};

function HeroSection({ series }: HeroSectionProps) {
  return (
    <div className="relative h-[60vh] md:h-screen lg:h-[85vh] animate-fade py-10">
      <Image
        src={series.backdrop || "/assets/images/img_hero.jpg"}
        alt={series.name || ""}
        fill
        className="object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="absolute inset-0 flex items-end px-6 md:px-12 py-16">
        <div className="max-w-4xl text-white animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-extrabold">{series.name}</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            {series.description || "Featured content you should watch 📺"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Series Details ------------------------- */
type SeriesDetailsProps = {
  series: Series;
  favoriteList: (string|number)[];
  toggleFavorite: (id: string) => void;
  season:Season[]
  
};

function SeriesDetails({ series, favoriteList, toggleFavorite,season }: SeriesDetailsProps) {

  return (
    <div className="mt-10 flex flex-col gap-y-8 py-10">
      <h1 className="text-3xl font-bold text-red-500">{series.name}</h1>

      {/* Genres */}
      <ul className="flex flex-wrap md:flex-nowrap gap-5">
        {series.genres?.map((genre: Genre) => (
          <li key={genre._id} className="bg-black text-muted px-2 py-1 rounded-xl">
            {genre.name_en}
          </li>
        ))}
      </ul>
    
      {/* Description */}
      <div>
        <p className="text-3xl font-bold text-red-500 mb-2">Description</p>
        <p className="text-[16px] text-muted mt-1">{series.description}</p>
      </div>

      {/* Actions */}
      <div className="w-[80%] md:w-[20%] flex justify-between items-center gap-2">
        <button
          className={`cursor-pointer border p-2 rounded flex items-center gap-1 ${
            favoriteList.includes(series._id) ? "bg-red-500" : "bg-muted"
          }`}
          onClick={() => toggleFavorite(series._id)}
        >
          Add to favorite
          <FontAwesomeIcon
            icon={favoriteList.includes(series._id) ? faHeart : faHeartRegular}
            className={`text-xl ${
              favoriteList.includes(series._id) ? "text-white" : "text-red-500"
            }`}
          />
        </button>
        <button className="cursor-pointer border p-2 rounded flex items-center gap-1">
          Share <FontAwesomeIcon icon={faShareNodes} />
        </button>
      </div>

        {/* {Seasons} */}
       <div>
       <h1 className="text-3xl font-bold text-red-500  p-5">Season</h1>
        <ul  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-1">
         
          
          {season.map((s)=>(

          <li  key={s._id}   className="shrink w-65 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow ">
                <Link href={PATHS.SEASONS(series._id,s._id)}>
                <Image
              src={s.poster || "/assets/images/img_hero.jpg"}
              alt={"season poaster"}
              width={400}
              height={300}
              className="w-full h-65 md:h-75 object-cover "
            />
             <div className="p-2 text-center flex flex-col items-start justify-between gap-2 text-[16px]">
             <div className="text-[16px] text-white ">Season: {s.seasonNumber}</div>
             {/* <p className="text-[16px] text-muted ">Number of Episodes <span>5</span> </p> */}
             </div>
             </Link>
          </li>
           
          ))}
        </ul>
       </div>
    </div>
  );
}

/* ------------------------- Cast List ------------------------- */
type CastListProps = {
  cast: Cast[];
};

function CastList({ cast }: CastListProps) {
  if (!cast || cast.length === 0)
    return <div className="text-center text-muted">No Cast Found for this Series</div>;

  return (
    <>
      <h1 className="text-3xl font-bold text-red-500  p-5">Cast</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 p-2">
        {cast.map((actor: Cast) => (
          <li
            key={actor._id}
            className="shrink w-60 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src={actor.profilePath || "/assets/images/img_hero.jpg"}
              alt={actor.name}
              width={400}
              height={300}
              className="w-full h-70 md:h-80 object-cover"
            />
            <div className="p-2 text-center flex flex-col items-center justify-center gap-2 text-[16px]">
              <h2 className="text-sm font-semibold text-main truncate">{actor.name}</h2>
              <p className="text-xs text-muted">{`Popularity: ${actor.popularity.toFixed(
                1
              )}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------- Similar Series Grid ------------------------- */
type SimilarSeriesGridProps = {
  series: Series[];
  favoriteList: (number|string)[];
  toggleFavorite: (id: string) => void;
};

function SimilarSeriesGrid({ series, favoriteList, toggleFavorite }: SimilarSeriesGridProps) {
  return (
    < >
      <h1 className="text-3xl font-bold text-red-500  p-5">Similar Series</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {series.map((item) => (
          <Link
            key={item._id}
            href={PATHS.SERIES_DETAILS(item._id)}
            className="p-4 bg-card rounded-xl shadow transition hover:shadow-lg"
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={item.poster || "/assets/images/img_hero.jpg"}
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-50 object-cover transition-transform duration-500 hover:scale-110 mb-3"
              />
              <button
                className="absolute top-3 right-3 bg-soft p-2 rounded-full shadow"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(item._id);
                }}
              >
                <FontAwesomeIcon
                  icon={favoriteList.includes(item._id) ? faHeart : faHeartRegular}
                  className={`text-xl ${
                    favoriteList.includes(item._id) ? "text-red-500" : "text-muted"
                  }`}
                />
              </button>
            </div>
            <p className="font-bold mb-1">{item.name}</p>
            <p className="text-sm text-muted">{item.releaseYear}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
