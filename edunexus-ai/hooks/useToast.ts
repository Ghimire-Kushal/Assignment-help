"use client";

/**
 * Toast-ready stub. Swap the body of `show` for any real library:
 *   - sonner:         toast[type](message)
 *   - react-hot-toast: toast.success/error/loading(message)
 *   - shadcn/toast:   useToast from "@/components/ui/use-toast"
 */

export type ToastType = "success" | "error" | "info" | "warning";

function show(type: ToastType, message: string) {
  if (process.env.NODE_ENV !== "production") {
    const colors: Record<ToastType, string> = {
      success: "\x1b[32m",
      error: "\x1b[31m",
      info: "\x1b[34m",
      warning: "\x1b[33m",
    };
    console.log(`${colors[type]}[Toast ${type.toUpperCase()}]\x1b[0m`, message);
  }
}

export function useToast() {
  return {
    success: (msg: string) => show("success", msg),
    error: (msg: string) => show("error", msg),
    info: (msg: string) => show("info", msg),
    warning: (msg: string) => show("warning", msg),
  };
}
