"use client";
import { useState } from "react";
import SectionTitle from"./SectionTitle"
import SeriesList from "./SeriesList";
import GenresList from "./GenresList"
export default function SeriesTap() {
  const tabs = [
    { id: "rating", label: "الاعلى تقييماً" },
    { id: "latest", label: "الأحدث" },
    { id: "views", label: "الأكثر مشاهدة" },
    { id: "popular", label: "الشائعة" }

  ]
  const [active, setActive] = useState(tabs[0])

  return (
    <div className="px-4 py-8">
          <div className="flex  justify-center items-center md:gap-5 mx-5 md:mx-25  text-xs md:text-xl h-[5vh]">
      {tabs.map((tab) => (
        <button key={tab.id}
          onClick={() => setActive(tab)}
          className={`inline-flex  cursor-pointer
        justify-center items-center whitespace-nowrap  rounded
        flex-1 p-1 md:p-2 transition-all duration-300
      focus:outline-none
        ${active.id === tab.id ? `bg-red-700 text-white` : ``}
        
`}
        >{tab.label}</button>
      )




      )}
    </div>
    <SectionTitle tag={active.label} className="mt-5 flex flex-row-reverse"/>
    <div className="flex flex-col-reverse md:flex-row justify-start gap-0   mt-5">
    <SeriesList tab={active.id} className=""/>
    <GenresList/>
    </div>
    
    <SectionTitle tag="الشائعة" className="mt-5 flex flex-row-reverse"/>
    <div className="flex flex-col md:flex-row justify-start gap-0   mt-5">
    <GenresList/>
    <SeriesList tab="popular"/>
   
</div>

    </div>

  )

}
