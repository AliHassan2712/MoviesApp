
interface PaginationProps{
  currentPage:number,
  totalPages:number,
  onChangePage:(page:number)=>void
}
export default function Pagination({currentPage,totalPages,onChangePage}:PaginationProps) {
  return (
    <section className="  md:w-[35%] w-[70%] flex items-center justify-around p-2">
      <button
      disabled={currentPage===1}
      aria-disabled={currentPage===1}
      className="cursor-pointer border border-red-500 rounded-xl  p-2 text-[10px] md:text-sm hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed "
       onClick={()=>onChangePage(currentPage-1)}>السابق</button>
      {Array.from({length:totalPages},(_,i)=>i+1).map((i)=>(
        <button
        aria-current={currentPage===i?"page":undefined}
        aria-label={`Page ${i}`}
         key={i}
        onClick={()=>onChangePage(i)}
        className={`border border-white py-2 px-4 rounded-2xl cursor-pointer  text-[10px] md:text-sm ${currentPage===i ?"bg-red-600":"text-white bg-black"}`}
        >{i}</button>

      ))}
      <button
       disabled={currentPage===totalPages}
       aria-disabled={currentPage===totalPages}
      className="cursor-pointer border border-red-500 rounded-xl  p-2 text-[10px] md:text-sm hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
       onClick={()=>onChangePage(currentPage+1)}>التالي</button>

    </section>
  )
}