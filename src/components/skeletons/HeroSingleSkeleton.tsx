export default function HeroSingleSkeleton() {
  return (
    <section className="relative w-full overflow-hidden">
    <div className="relative h-[60vh] md:h-[85vh] bg-soft animate-pulse">

{/* Gradient overlays */}
<div className="absolute inset-0 bg-hero-gradient opacity-40" />
<div className="absolute inset-0 bg-overlay opacity-30" />

{/* Content */}
<div className="absolute inset-0 flex items-end px-6 md:px-12 py-16">
 <div className="max-w-4xl w-full space-y-4">

   {/* Title */}
   <div className="h-10 md:h-14 w-3/4 bg-card rounded-md" />

   {/* Description */}
   <div className="h-4 w-full bg-card rounded" />
   <div className="h-4 w-5/6 bg-card rounded" />

 
 </div>
 
 </div>
</div>
</section>
  )
   
            }