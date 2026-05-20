import { api, getAuthToken } from "./api";
import type { Order } from "@/types";

type BackendOrder = Order & {
  _id?: string;
  orderNumber?: string;
  client?: string | { _id?: string; id?: string; name?: string; email?: string };
  assignedExpert?: { _id?: string; id?: string; name?: string; email?: string; avatar?: string } | string | null;
  serviceType?: string;
  subject?: string;
  topic?: string;
  academicLevel?: string;
  pageCount?: number;
  budget?: number;
  finalPrice?: number;
  isPaid?: boolean;
  clientFiles?: Array<{
    _id?: string;
    id?: string;
    filename: string;
    url: string;
    sizeBytes?: number;
    mimeType?: string;
    uploadedAt?: string;
  }>;
  statusHistory?: Array<{
    status: string;
    note?: string;
    changedAt?: string;
  }>;
};

export type CreateOrderPayload = {
  serviceType: string;
  subject: string;
  topic?: string;
  description: string;
  deadline: string;
  budget?: number;
  academicLevel?: string;
  citationStyle?: string;
  wordCount?: number;
  pageCount?: number;
};

export type MyOrdersResponse = {
  orders: BackendOrder[];
  total: number;
  page: number;
  limit: number;
};

type BackendListResponse = {
  success: boolean;
  orders?: BackendOrder[];
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
};

type BackendSingleResponse = {
  success: boolean;
  order?: BackendOrder;
  attachments?: unknown[];
  message?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

function normalizeList(response: BackendListResponse): MyOrdersResponse {
  return {
    orders: response.orders ?? [],
    total: response.total ?? response.orders?.length ?? 0,
    page: response.page ?? 1,
    limit: response.limit ?? 10,
  };
}

function normalizeOrder(response: BackendSingleResponse): BackendOrder {
  if (!response.order) throw new Error(response.message ?? "Order response was incomplete.");
  return response.order;
}

export const orderService = {
  async getMyOrders(page = 1, limit = 10) {
    const response = await api.get<unknown>(`/orders/my?page=${page}&limit=${limit}&sort=-createdAt`);
    return normalizeList(response as BackendListResponse);
  },

  async getById(id: string) {
    const response = await api.get<unknown>(`/orders/${id}`);
    return normalizeOrder(response as BackendSingleResponse);
  },

  async create(payload: CreateOrderPayload) {
    const response = await api.post<unknown>("/orders", payload);
    return normalizeOrder(response as BackendSingleResponse);
  },

  async uploadFiles(orderId: string, files: File[]) {
    if (!files.length) return [];

    const form = new FormData();
    files.slice(0, 5).forEach((file) => form.append("files", file));

    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/orders/${orderId}/files`, {
      method: "POST",
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: form,
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body.message ?? response.statusText);
    }

    return (body as BackendSingleResponse).attachments ?? [];
  },

  async requestRevision(id: string, reason: string) {
    const response = await api.post<unknown>(`/orders/${id}/revision`, { reason });
    return normalizeOrder(response as BackendSingleResponse);
  },
};

export type { BackendOrder };
