import { BackendPagination } from "@/types/pagination";

type Props = {
  pagination: BackendPagination;
  onChange: (page: number) => void;
};

export default function Pagination({ pagination, onChange }: Props) {
  const { page, totalPages, totalDocs } = pagination;

  /* =================== GUARDS =================== */

  if (!totalDocs || totalDocs === 0 || totalPages <= 1) {
    return null;
  }

  /* =================== PAGES LOGIC =================== */
  const MAX_VISIBLE = 5;

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    // لو الصفحات قليلة
    if (totalPages <= MAX_VISIBLE + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);

    pages.push(1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  /* =================== UI =================== */
  return (
    <div className="flex justify-center gap-2 mt-12 flex-wrap">
      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-4 py-2 rounded-lg border border-[var(--color-border)]  bg-card disabled:opacity-40"
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`dots-${i}`}
            className="px-3 py-2 text-muted select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-4 py-2 rounded-lg border border-[var(--color-border)]  transition
              ${
                p === page
                  ? "btn-primary text-white"
                  : "bg-card hover:bg-soft"
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-card disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
