import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const updateSearchParams = (
  pathname: string,
  updates: Record<string, string | number>,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) => {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });

  router.push(`${pathname}?${params.toString()}`);
};
