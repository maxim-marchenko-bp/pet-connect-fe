export const buildSearchParams = (params: Record<string, string | number | (string | number)[]>) => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "" || value === null) return;

    if (Array.isArray(value)) {
      if (value.length === 0) return;

      search.set(key, value.map(v => String(v)).join(","));
    } else {
      search.set(key, String(value));
    }
  });

  return search.toString();
};
