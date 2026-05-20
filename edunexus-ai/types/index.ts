/* ── User & Auth ── */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "student" | "admin" | "expert";
  plan: "free" | "starter" | "pro" | "enterprise";
  createdAt: string;
}

/* ── Order ── */
export type OrderStatus =
  | "pending"
  | "in_progress"
  | "review"
  | "completed"
  | "cancelled";

export type ServiceType =
  | "assignment"
  | "essay"
  | "research"
  | "coding"
  | "dissertation"
  | "presentation"
  | "other";

export interface Order {
  id: string;
  userId: string;
  title: string;
  description: string;
  service: ServiceType;
  status: OrderStatus;
  deadline: string;
  pages?: number;
  wordCount?: number;
  files?: FileAttachment[];
  expert?: Expert;
  price: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

/* ── Expert ── */
export interface Expert {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  completedOrders: number;
  specializations: string[];
  bio: string;
}

/* ── File ── */
export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

/* ── Pricing ── */
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

/* ── Review / Testimonial ── */
export interface Testimonial {
  id: string;
  author: string;
  avatar?: string;
  university?: string;
  rating: number;
  content: string;
  service: ServiceType;
  date: string;
}

/* ── API ── */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/* ── Navigation ── */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

/* ── Theme ── */
export type Theme = "dark" | "light" | "system";
