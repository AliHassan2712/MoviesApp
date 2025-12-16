export default function GenreSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-card border border-border px-6 py-8 flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-muted/40" />
      <div className="h-4 w-24 rounded bg-muted/40" />
      <div className="h-3 w-16 rounded bg-muted/30" />
    </div>
  );
}
