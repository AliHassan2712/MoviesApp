import React, { memo, useCallback } from "react";
import { usePagination } from "@/hooks/pagination/usePagination";
import { BackendPagination } from "@/types/pagination";

type Props = {
  pagination: BackendPagination;
  onChange: (page: number) => void;
};

function Pagination({ pagination, onChange }: Props) {
  const { page, totalPages } = pagination;
  const pages = usePagination(pagination);

  const handlePrev = useCallback(() => {
    if (page > 1) onChange(page - 1);
  }, [page, onChange]);

  const handleNext = useCallback(() => {
    if (page < totalPages) onChange(page + 1);
  }, [page, totalPages, onChange]);

  const handleGoTo = useCallback(
    (p: number) => {
      if (p !== page) onChange(p);
    },
    [page, onChange]
  );

  if (!pages.length) return null;

  console.log("aliaksldfasnj;dkfadsjkbfjksafjsk")

  return (
    <div className="flex justify-center gap-2 mt-12 flex-wrap">
      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={handlePrev}
        className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-card disabled:opacity-40"
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-3 py-2 text-muted select-none">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => handleGoTo(p)}
            className={`px-4 py-2 rounded-lg border border-[var(--color-border)] transition ${
              p === page ? "btn-primary text-white" : "bg-card hover:bg-soft"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={handleNext}
        className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-card disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default memo(Pagination);
