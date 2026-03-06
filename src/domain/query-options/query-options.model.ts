export interface QueryOptions {
  path: string;
  queryKey: ReadonlyArray<unknown>;
  searchParams?: Record<string, string | number | (string | number)[]>;
}
