"use client";

import { getAllSeries } from "@/lib/api/getAllSeries";
import SeriesCard from "./SeriesCard";
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

interface SeriesListProp {
  tab: string;
  className?: string;
}

export default function SeriesList({ tab, className = "" }: SeriesListProp) {
  const [currentSeries, setCurrentSeries] = useState<Series[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<{ isLoading: boolean; error: string | null }>({
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await getAllSeries();
        const seriesArray: Series[] = response.data || [];
        setCurrentSeries(seriesArray);
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
  console.log(currentSeries)

  const filteredSeries =useMemo(()=>filterSeries(tab, currentSeries),[tab,currentSeries]) 

  if (status.isLoading)
    return <p className="flex items-center justify-center w-full text-gray-700">Loading...</p>;
  if (status.error)
    return <p className="flex items-center justify-center w-full text-red-500">{status.error}</p>;

  const perPage = 10;
  const totalPages = Math.ceil(filteredSeries.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const visibleSeries = filteredSeries.slice(startIndex, startIndex + perPage);

  function handleChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <section className={`lg:w-[80%] md:w-[65%] flex flex-col items-center justify-center ${className}`}>
      {visibleSeries.length === 0 ? (
        <p className="text-gray-700 mt-5">لا توجد مسلسلات لهذا التصنيف</p>
      ) : (
        <ul className="flex items-center justify-end gap-x-4 gap-y-4 flex-wrap p-5">
          {visibleSeries.map((item) => (
            <li key={item.id}>
              <SeriesCard
                id={item.id}
                imdbRating={item.imdbRating}
                name={item.title}
                releaseYear={item.year}
                poster={item.poster}
                backdrop={item.backdrop}
              />
            </li>
          ))}
        </ul>
      )}
      {currentSeries.length !== 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={handleChange} />
      }    </section>
  );
}
