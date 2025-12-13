import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react";


export default function GenresList() {
  const[isActive,setIsActive]=useState(false)
  const genres=[{id:0,genre:" رسوم متحركة" },
    {id:0,genre:" حركة ومغامرة" },
    {id:1,genre:"  كوميديا" },
    {id:2,genre:"  دراما" },
    {id:3,genre:"  جريمة" },
    {id:4,genre:"  وثائقي" },
    {id:5,genre:"  اخبار" },
    {id:6,genre:"  غموض" },
    {id:7,genre:" خيال علمي وفانتازيا"},
    {id:7,genre:"  اوبرا صابونية" },
    {id:8,genre:"  حوار" },
    {id:9,genre:"  غربي" },
    {id:10,genre:"  اطفال" },
    {id:11,genre:"  عائلي" },
    {id:12,genre:"  حرب وسياسة" },
    {id:13,genre:"   واقع" },


  ]
  
  function handleScreen() {
    setIsActive(!isActive)

  }
  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-4  lg:w-[25%] md:w-[35%]">
    <button type="button" onClick={handleScreen} aria-expanded={isActive}
    className="md:hidden  flex justify-between border border-white/20 p-2 rounded   "
    >
      ShowGenres
    {isActive?<ChevronUp/>:<ChevronDown/>}
    </button>
    <div className={` md:block w-full  border border-white/10 mt-5 px-3 rounded-2xl box-border  h-fit shadow-md shadow-white/30 ${isActive ?"block w-full":"hidden"}`} 
    >
      <div className="text-center font-bold p-2"> التصنيفات
        <hr className="border-t border-white/20  mt-4 w-full " />
      </div>
      <div className="grid grid-cols-2  overflow-y-auto gap-2 h-80"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {genres.map((genre)=>(
            <GenreButton key={genre.id}>{genre.genre}</GenreButton>
          ))}
      </div>
    </div>
    </div>
    
  )
}
function GenreButton
  ({ children }) {
  return (
    <button type="button" aria-label={`genre ${children}`}
     className="inline-flex  cursor-pointer
    justify-center items-center rounded
    flex-1 p-2 md:p-3 transition-all  duration-200 hover:bg-red-600  hover:text-white
  focus:outline-none text-sm bg-black/5">{children}</button>
  )

}