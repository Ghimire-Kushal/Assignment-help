import type { ApiResponse, PaginatedResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
const TOKEN_KEY = "edunexus_access_token";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path}`;
  const token = getAuthToken();

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message ?? res.statusText, body);
  }

  return res.json() as Promise<ApiResponse<T>>;
}

export const api = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { method: "GET", ...init }),

  post: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
      ...init,
    }),

  put: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
      ...init,
    }),

  patch: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...init,
    }),

  delete: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { method: "DELETE", ...init }),
};

export { ApiError };
export type { ApiResponse, PaginatedResponse };

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

// ─── Demo / mock user storage (used when backend is offline) ──────────────────

const MOCK_USER_KEY = "edunexus_mock_user";

export function getMockUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(MOCK_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setMockUser(user: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
}

export function clearMockUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(MOCK_USER_KEY);
}
