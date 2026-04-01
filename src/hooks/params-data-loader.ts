  import { useUrlSearchParams } from "@/hooks/use-url-search-params";
  import { useQuery } from "@tanstack/react-query";
  import { clientFetch } from "@/lib/api/client-fetch";
  import { FilteredItems } from "@/lib/api/filtered-items";
  import { buildSearchParams } from "@/lib/search-params/build-search-params";
  import { useMemo } from "react";
  import { QueryOptions } from "@/domain/query-options/query-options.model";

  export function useParamsDataLoader<T>({ path, queryKey, searchParams }: QueryOptions): {
    data: T[];
    isLoading: boolean;
    error?: Error;
    setQueryParams: (params: Record<string, unknown>) => void;
    paginationParams: { totalCount?: number, totalPages: number, page: number };
    queryFilters: Record<string, string | number>;
  }
  {
    const [queryParams, setQueryParams] = useUrlSearchParams(searchParams);
    const { pageSize, page, ...queryFilters } = queryParams;
    const { data, isLoading, isError, error } = useQuery({
      queryKey: [...queryKey, queryParams],
      queryFn: () => clientFetch<FilteredItems<T>>(`${path}?${buildSearchParams(queryParams)}`),
    });
    const { items = [], totalCount } = data || {};
    const totalPages = useMemo(() => totalCount
      ? Math.ceil(totalCount / pageSize)
      : 1, [totalCount, pageSize]);

    return {
      data: items,
      isLoading,
      error: isError ? error : undefined,
      setQueryParams,
      paginationParams: {
        totalCount,
        totalPages,
        page,
      },
      queryFilters,
    }
  }
