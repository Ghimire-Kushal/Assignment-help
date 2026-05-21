import type { Metadata } from "next";
import { LoginPage } from "@/components/pages/auth/LoginPage";

export const metadata: Metadata = {
  title: "Sign In — ScholarSync Nepal",
  description: "Sign in to your ScholarSync Nepal account to access premium academic assistance.",
};

export default function LoginRoute() {
  return <LoginPage />;
}
