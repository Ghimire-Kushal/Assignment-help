import { api } from "./api";
import type { Order, PaginatedResponse } from "@/types";

export const orderService = {
  getAll: (page = 1, limit = 10) =>
    api.get<PaginatedResponse<Order>>(`/orders?page=${page}&limit=${limit}`),

  getById: (id: string) => api.get<Order>(`/orders/${id}`),

  create: (payload: Partial<Order>) => api.post<Order>("/orders", payload),

  update: (id: string, payload: Partial<Order>) =>
    api.patch<Order>(`/orders/${id}`, payload),

  cancel: (id: string) => api.patch<Order>(`/orders/${id}/cancel`, {}),

  uploadFile: async (orderId: string, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return fetch(`/api/orders/${orderId}/files`, {
      method: "POST",
      body: form,
    }).then((r) => r.json());
  },
};
