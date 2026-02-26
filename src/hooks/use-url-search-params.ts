import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useUrlSearchParams(params: Record<string, string | number | (string | number)[]> = {}) {
  const searchParams = useSearchParams();
  const queryParams = useMemo(() => (
    {
      page: Number(searchParams.get('page') || 1),
      pageSize: Number(searchParams.get('pageSize') || 10),
      searchTerm: searchParams.get('searchTerm') || '',
      ...params,
    }
  ), [searchParams, params]);

  return {
    searchParams,
    queryParams,
  }

}
