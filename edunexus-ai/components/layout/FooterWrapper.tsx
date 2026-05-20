"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const AUTH_PATHS = ["/login", "/register", "/forgot-password", "/verify-otp"];

export function FooterWrapper() {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isAuth) return null;
  return <Footer />;
}
