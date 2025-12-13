"use client";
import { Play, Heart, Star } from "lucide-react";
interface SeriesCardProps {
  name: string;
  releaseYear: string;
  poster: string;
  imdbRating: string;
  backdrop?: string;


}

export default function SeriesCard({ name, releaseYear, poster ,imdbRating,backdrop=""}: SeriesCardProps) {
 
  return (
    <div className="bg-white rounded-b-xs hover:scale-105 transition-all duration-300 w-[200px] min-h-80 md:min-h-[360px] group hover:shadow-md hover:shadow-white/20
">
      <div className={`relative overflow-hidden md:h-[280px] h-[220px] `} >

        {/* الصورة */}
        <div
          className="absolute inset-0 h-full w-full transition-all duration-300 bg-cover bg-center group-hover:scale-110"
          style={{ backgroundImage: `url(${poster})` }}
        ></div>

        {/* overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-between">
          <div className="flex justify-between items-center w-[80%] m-2">
            <div className="flex items-center justify-center border-2 border-red-500 w-8 h-8 rounded-full cursor-pointer bg-black/90">
              <Heart className="text-red-600" size={20} />
            </div>

            <div className="flex items-center gap-1 border-2 border-red-500 w-18 h-8 rounded-2xl text-xs bg-black/90 justify-center">
              <Star className="fill-amber-400 text-amber-400" size={20} />
              <span className="text-white">{imdbRating}</span>
            </div>
          </div>

          <button className={`bg-red-700 cursor-pointer group-hover:opacity-100 hover:bg-red-800 group-hover:-translate-y-25 opacity-0  flex items-center justify-center p-2 rounded-xl m-3 w-fit text-white transition-all duration-300 `}>
            <Play strokeWidth={1.5} />
            مشاهدة
          </button>
        </div>
      </div>

      <div className="text-black flex flex-col items-start gap-4 m-2">
        <p className="font-bold text-xs w-[70%]">{name}</p>
        <p>{releaseYear}</p>
      </div>
    </div>
  );
}
