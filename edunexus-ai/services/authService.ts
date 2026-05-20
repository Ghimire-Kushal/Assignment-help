import { api } from "./api";
import type { User } from "@/types";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<AuthResponse>("/auth/login", payload),

  register: (payload: RegisterPayload) =>
    api.post<AuthResponse>("/auth/register", payload),

  logout: () => api.post<void>("/auth/logout", {}),

  me: () => api.get<User>("/auth/me"),

  refreshToken: () => api.post<{ token: string }>("/auth/refresh", {}),

  forgotPassword: (email: string) =>
    api.post<void>("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    api.post<void>("/auth/reset-password", { token, password }),
};
