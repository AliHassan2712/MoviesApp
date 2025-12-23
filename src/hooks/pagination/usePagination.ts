import { BackendPagination } from "@/types/pagination";

export function usePagination(pagination: BackendPagination) {
  const { page, totalPages, totalDocs } = pagination;

  if (!totalDocs || totalDocs === 0 || totalPages <= 1) {
    return [];
  }

  const MAX_VISIBLE = 5;

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

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

  return getPages();
}
