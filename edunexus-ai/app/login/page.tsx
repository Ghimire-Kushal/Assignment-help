import type { Metadata } from "next";
import { LoginPage } from "@/components/pages/auth/LoginPage";

export const metadata: Metadata = {
  title: "Sign In — EduNexus AI",
  description: "Sign in to your EduNexus AI account to access premium academic assistance.",
};

export default function LoginRoute() {
  return <LoginPage />;
}
