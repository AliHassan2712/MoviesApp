export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-main">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-main border-t-primary rounded-full animate-spin" />

        {/* Text */}
        <p className="text-muted text-sm tracking-wide">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
