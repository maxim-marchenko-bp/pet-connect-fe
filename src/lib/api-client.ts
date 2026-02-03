import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  } else {
    redirect('/login');
  }
}

export const apiFetch =
  async <T>(endpoint: string, options: RequestInit = {}, canRetry = true): Promise<T> =>
  {
    const opts: RequestInit = {
      credentials: 'include',
      ...options,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, opts);

    // If 401 and haven't retried yet, try to refresh the token
    if (res.status === 401 && canRetry) {
      const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshRes.ok) {
        // Refresh failed, throw 401 error
        redirectToLogin();
        throw new Error('Unauthorized');
      }

      // Retry the original request once after successful refresh
      return apiFetch<T>(endpoint, opts, false);
    }

    if (!res.ok) {
      throw new Error(`API call failed: ${res.status}`);
    }

    return res.json();
  };
