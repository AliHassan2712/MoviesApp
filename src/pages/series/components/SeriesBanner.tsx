"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSeries } from "@/lib/api/getAllSeries";
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
  const [status,setStatus]=useState<{isLoading:boolean,error:string|null}>({isLoading:true,error:null})
  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await  getAllSeries();
        const serie:Series= response.data[0];

        setCurrentSeries(serie);
        setStatus((prev) => ({ ...prev, isLoading: false }));

      } catch (error) {
        console.error("Fetch error:", error);
        setStatus((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : String(error),
          isLoading: false,
        }));
      }
    }

    fetchSeries();

  }, []);
  if (status.isLoading)
    return <p className="flex items-center justify-center w-full text-gray-700">Loading...</p>;
  if (status.error)
    return <p className="flex items-center justify-center w-full text-red-500">{status.error}</p>;
  return (
    <>
{currentSeries&&
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
}
 


    </>
  );
}
