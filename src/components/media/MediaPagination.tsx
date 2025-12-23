//components
import Pagination from '@/components/ui/Pagination'

//types
import { BackendPagination } from '@/types/pagination'

export default function MediaPagination({
  pagination,
  onChange,
}: {
  pagination: BackendPagination | null
  onChange: (page: number) => void
}) {
  if (!pagination) return null

  return (
    <div className="mt-10">
      <Pagination pagination={pagination} onChange={onChange} />
    </div>
  )
}
