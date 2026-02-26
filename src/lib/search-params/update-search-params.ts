import { ReadonlyURLSearchParams } from "next/navigation";

export const updateSearchParams = (
  updates: Record<string, string | number>,
  searchParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });

  return params;
};
