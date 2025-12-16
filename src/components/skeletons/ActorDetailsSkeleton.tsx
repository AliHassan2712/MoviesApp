export default function ActorDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar */}
        <div className="w-48 h-48 rounded-full bg-soft border border-main" />

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div className="h-8 w-1/2 bg-soft rounded-md" />
          <div className="h-4 w-full bg-soft rounded-md" />
          <div className="h-4 w-5/6 bg-soft rounded-md" />
          <div className="h-4 w-4/6 bg-soft rounded-md" />
        </div>
      </div>

      {/* Movies / Series Section */}
      <div className="space-y-5">
        <div className="h-6 w-32 bg-soft rounded-md" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-xl overflow-hidden"
            >
              <div className="h-48 bg-soft" />
              <div className="p-3">
                <div className="h-4 w-3/4 bg-soft rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
