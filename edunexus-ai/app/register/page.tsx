import type { Metadata } from "next";
import { RegisterPage } from "@/components/pages/auth/RegisterPage";

export const metadata: Metadata = {
  title: "Create Account — ScholarSync Nepal",
  description: "Join ScholarSync Nepal — the premium academic assistance platform for top-performing students.",
};

export default function RegisterRoute() {
  return <RegisterPage />;
}
