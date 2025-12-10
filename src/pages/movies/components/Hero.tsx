"use client";

export default function Hero() {
 
    return (
<section className="relative w-full margin-bottom">
<div className="relative w-full h-[60vh] md:h-screen lg:h-[85vh]">
<img
src={'https://image.tmdb.org/t/p/original/w57nxiBIODAYHLRs1xmrCY9zEFe.jpg&quot'}
alt="Hero background"
className="w-full h-full object-cover object-center absolute inset-0"
/>

<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40" aria-hidden="true" />
{/* Overlay */}
<div className="absolute inset-0 bg-black/50" />


<div className="absolute inset-0 flex px-6 md:px-12 py-12">
<div className="max-w-4xl text-white">
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
🎬 Discover Your Next Favorite Movie
</h1>
<p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-3xl">
Browse, explore, and stream the latest blockbusters and timeless classics. From action-packed adventures to heartwarming dramas, find movies that match your mood.
</p>


</div>
</div>
</div>
</section>
)
  
}
