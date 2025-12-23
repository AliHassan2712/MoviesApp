//types
import { Series } from '@/types/series';
import { BackendPagination } from '@/types/pagination';

type SeriesResponse = {
  data: Series[];
  pagination: BackendPagination;
};

type ApiResponse<T> = {
  status: string;
  data: T;
};

//All Series with Search and Pagination
export async function fetchSeries(params: {
  page: number;
  query?: string;
  limit?: number;
}): Promise<SeriesResponse> {
  const { page, query, limit = 12 } = params;

  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(query ? Object.fromEntries(new URLSearchParams(query)) : {}),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/series?${searchParams.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to fetch series');

  return res.json();
}

//Single Series
export async function getSeriesById(id: string): Promise<Series> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series/${id}`, {
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch series by ID');

  const json: ApiResponse<Series> = await res.json();
  return json.data;
}
