import { api, clearAuthToken, setAuthToken } from "./api";
import type { User } from "@/types";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
  role?: "student" | "admin";
}

interface AuthResponse {
  user: User;
  token: string;
}

type BackendAuthResponse = {
  success: boolean;
  accessToken?: string;
  token?: string;
  user?: User;
  data?: AuthResponse;
  message?: string;
};

type BackendUserResponse = {
  success: boolean;
  user?: User;
  data?: User;
  message?: string;
};

function normalizeAuthResponse(response: BackendAuthResponse): AuthResponse {
  const token = response.data?.token ?? response.accessToken ?? response.token;
  const user = response.data?.user ?? response.user;

  if (!token || !user) {
    throw new Error(response.message ?? "Authentication response was incomplete.");
  }

  setAuthToken(token);
  return { token, user };
}

function normalizeUserResponse(response: BackendUserResponse): User {
  const user = response.data ?? response.user;
  if (!user) throw new Error(response.message ?? "Unable to load current user.");
  return user;
}

export const authService = {
  async login(payload: LoginPayload) {
    const response = await api.post<unknown>("/auth/login", payload);
    return normalizeAuthResponse(response as BackendAuthResponse);
  },

  async register(payload: RegisterPayload) {
    const response = await api.post<unknown>("/auth/register", payload);
    return normalizeAuthResponse(response as BackendAuthResponse);
  },

  async logout() {
    try {
      await api.post<void>("/auth/logout", {});
    } finally {
      clearAuthToken();
    }
  },

  async me() {
    const response = await api.get<unknown>("/auth/me");
    return normalizeUserResponse(response as BackendUserResponse);
  },

  async refreshToken() {
    const response = await api.post<unknown>("/auth/refresh-token", {});
    const token = (response as { accessToken?: string; data?: { token?: string } }).accessToken ?? (response as { data?: { token?: string } }).data?.token;
    if (!token) throw new Error("Unable to refresh session.");
    setAuthToken(token);
    return { token };
  },

  forgotPassword: (email: string) =>
    api.post<void>("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    api.post<void>("/auth/reset-password", { token, password }),
};
