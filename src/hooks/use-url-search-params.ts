import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { updateSearchParams } from "@/lib/search-params/update-search-params";

interface QueryParamsResult {
  page: number;
  pageSize: number;
  searchTerm: string;
  [key: string]: string | number | (string | number);
}

export function useUrlSearchParams(params: Record<string, string | number | (string | number)[]> = {}): [QueryParamsResult, (params: Record<string, string | number>) => void] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryParams = useMemo(() => (
    {
      page: Number(searchParams.get('page') || 1),
      pageSize: Number(searchParams.get('pageSize') || 10),
      searchTerm: searchParams.get('searchTerm') || '',
      ...params,
    }
  ), [searchParams, params]);

  const setUrlQueryParams = (params: Record<string, string | number> = {}) => {
    const updatedParams = updateSearchParams(params, searchParams);
    router.push(`${pathname}?${updatedParams.toString()}`)
  }

  return [
    queryParams,
    setUrlQueryParams,
  ]
}
