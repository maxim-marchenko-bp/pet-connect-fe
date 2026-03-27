import { getBaseUrl } from "@/lib/api/base-url";

const API_BASE_URL = getBaseUrl();

export async function clientFetch<T>(info: RequestInfo, init?: RequestInit, canRetry = true): Promise<T> {
  const opts: RequestInit = {
    ...init,
    credentials: 'include',
  };

  const res = await fetch(`${API_BASE_URL}${info}`, opts);

  // If 401 and haven't retried yet, try to refresh the token
  if (res.status === 401 && canRetry) {
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!refreshRes.ok) {
      // Refresh failed, throw 401 error
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    // Retry the original request once after successful refresh
    return clientFetch<T>(info, opts, false);
  }

  if (!res.ok) {
    let errorBody: { message: string } | null = null;
    try {
      errorBody = await res.json();
    } catch (err) {
      throw err;
    }
    throw new Error(errorBody?.message ?? res.statusText ?? 'Api error')
  }

  return res.json();
}
