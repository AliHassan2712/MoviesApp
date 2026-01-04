"use client";

import { memo } from "react";
import Pagination from "@/components/ui/Pagination";
import { BackendPagination } from "@/types/pagination";

function MediaPaginationComponent({
  pagination,
  onChange,
}: {
  pagination: BackendPagination;
  onChange: (page: number) => void;
}) {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="mt-10">
      <Pagination pagination={pagination} onChange={onChange} />
    </div>
  );
}

export default memo(MediaPaginationComponent);
