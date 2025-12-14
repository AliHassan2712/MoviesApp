"use client";
import { getAllSeries } from "@/lib/api/getAllSeries";
import SeriesCard from "./SeriesCard"
import { useEffect, useMemo, useState } from "react";
import { filterSeries } from "@/lib/utils/filterSeries";
import Pagination from "./Pagination";

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
interface SeriesListProp{
  tab:string
  className?:string
}


export default function SeriesList({tab,className=""}:SeriesListProp) {
  const [currentSeries, setCurrentSeries] = useState<Series[] | null>(null);
  const [currentPage,setCurrentPage]=useState(1)

  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await getAllSeries();
        console.log(response.data)
       
        const seriesArray: Series[] = response.data;

        setCurrentSeries(seriesArray);

      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchSeries();
   
  }, []);
  if (!currentSeries) return  <p className=" flex items-center justify-center w-full  text-gray-700">isLoading....</p>;


  const perPage=12
  const totalPages=Math.ceil(currentSeries.length/perPage)
  const startIndex=(currentPage-1)*perPage
  const visibleSeries=filterSeries(tab,currentSeries).slice(startIndex,startIndex+perPage)
  function handleChange(page:number){
    setCurrentPage(page)
  }
  

  return (
<section className="lg:w-[80%] md:w-[65%] flex flex-col items-center justify-center ">
<ul className="flex items-center justify-end gap-x-4 gap-y-4 flex-wrap p-5 ">
 
      {visibleSeries.map((item)=>(
        <li>
   
    <SeriesCard key={item.id} imdbRating={item.imdbRating} name={item.title} releaseYear={item.year} poster={item.poster} backdrop={item.backdrop}/>
    </li>
      ))}
    
    </ul>
    <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={handleChange}/>
    </section>
    
  )
}
