export default function SeriesDetailsSkeletons() {
  return (
    <section className="flex flex-col gap-2.5 pt-10">
      {/* Title */}
     <div className="h-3 bg-soft rounded w-1/3" />
     {/* {Genres} */}
     <div className="flex gap-4 mt-6">
        <div className="h-10 w-28 bg-card rounded-2xl" />
        <div className="h-10 w-25 bg-card rounded-2xl" />
        <div className="h-10 w-20 bg-card rounded-2xl" />
      </div>
      {/* Descripton */}
      <div className="h-4 bg-soft rounded w-3/4 mb-2" />
      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <div className="h-12 w-40 bg-card rounded-2xl" />
        <div className="h-12 w-30 bg-card rounded-2xl" />
      </div>

    

    </section>
  )
}
