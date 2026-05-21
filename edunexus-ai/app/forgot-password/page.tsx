import type { Metadata } from "next";
import { ForgotPasswordPage } from "@/components/pages/auth/ForgotPasswordPage";

export const metadata: Metadata = {
  title: "Reset Password — ScholarSync Nepal",
  description: "Reset your ScholarSync Nepal account password.",
};

export default function ForgotPasswordRoute() {
  return <ForgotPasswordPage />;
}
