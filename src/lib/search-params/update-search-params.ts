import { ReadonlyURLSearchParams } from "next/navigation";

export const updateSearchParams = <T extends object>(
  updates: T,
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
