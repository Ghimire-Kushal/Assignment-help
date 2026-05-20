"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

const AUTH_PATHS = ["/login", "/register", "/forgot-password", "/verify-otp"];

export function NavbarWrapper() {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isAuth) return null;
  return <Navbar />;
}
