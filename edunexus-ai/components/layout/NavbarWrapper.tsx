"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

const HIDDEN_CHROME_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/dashboard",
];

export function NavbarWrapper() {
  const pathname = usePathname();
  const isHidden = HIDDEN_CHROME_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isHidden) return null;
  return <Navbar />;
}
