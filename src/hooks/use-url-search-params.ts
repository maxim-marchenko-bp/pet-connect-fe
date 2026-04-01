import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { updateSearchParams } from "@/lib/search-params/update-search-params";

interface QueryParamsResult {
  page: number;
  pageSize: number;
  [key: string]: string | number;
}

export function useUrlSearchParams(params: Record<string, unknown> = {}): [QueryParamsResult, (params: Record<string, unknown>) => void] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryParams = useMemo(() => {
    const baseFilter = {
      page: Number(searchParams.get('page') || 1),
      pageSize: Number(searchParams.get('pageSize') || 10),
      ...params,
    } as QueryParamsResult;

    searchParams.keys().filter(key => key !== 'page' && key !== 'pageSize').forEach(key => {
      baseFilter[key] = searchParams.get(key) ?? '';
    });

    return baseFilter;
  }, [searchParams, params]);

  const setUrlQueryParams = (params: Record<string, unknown> = {}) => {
    const updatedParams = updateSearchParams(params, searchParams);
    router.push(`${pathname}?${updatedParams.toString()}`)
  }

  return [
    queryParams,
    setUrlQueryParams,
  ]
}
