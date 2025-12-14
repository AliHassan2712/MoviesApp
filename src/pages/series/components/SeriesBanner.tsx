"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
interface Series {
  id: string;
  title: string;
  plot: string;
  poster: string;
  backdrop?: string;
  actors: string;
  director: string;
  genre: string;
  awards: string;
  boxOffice: string;
  country: string;
  imdbId: string;
  imdbRating: string;
  language: string;
  rated: string;
  released: string;
  runtime: string;
  writer: string;
  year: string;
}

export default function SeriesBanner() {
  const [currentSeries, setCurrentSeries] = useState<Series | null>(null);
  let index = 0
  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await fetch("https://fooapi.com/api/movies");
        const json = await response.json();
        const seriesArray: Series[] = json.data;

        setCurrentSeries(seriesArray[index % seriesArray.length]);

      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchSeries();
    const intervalId = setInterval(fetchSeries, 10000);
    return () => clearInterval(intervalId);
  }, []);
  if (!currentSeries) return  <p className=" h-[80vh] flex items-center justify-center w-full  text-gray-700">isLoading....</p>

  return (
    <>

      <div className="bg-center bg-cover h-[80vh] flex flex-col justify-center p-8 text-white  gap-4 text-xs md:text-2xl  " style={{
        backgroundImage: `url(${currentSeries.backdrop || currentSeries.poster})`,
        textShadow: '1px 1px 4px rgba(255,255,255,0.8)'
      }}>
        <h1 className="md:text-4xl text-xl font-bold w-[50%]">{currentSeries.title}</h1>
        <p className="mt-2">{currentSeries.plot}</p>
        <p className="mt-1 text-sm">
          <strong>Director:</strong> {currentSeries.director} | <strong>Actors:</strong> {currentSeries.actors}
        </p>
        <p className="mt-1 text-sm">
          <strong>Genre:</strong> {currentSeries.genre} | <strong>IMDB:</strong> {currentSeries.imdbRating}
        </p>
        <Link href={`series/${currentSeries.id}`}
        className="mt-4 w-[40%] md:w-[15%] flex justify-center items-center p-2 bg-red-700 rounded font-semibold text-white cursor-pointer hover:bg-red-800 transition-all ease-in-out hover:scale-105 duration-300">
      
          Watch Now
     
        </Link>
       

      </div>


    </>
  );
}
