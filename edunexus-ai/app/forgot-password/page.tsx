import type { Metadata } from "next";
import { ForgotPasswordPage } from "@/components/pages/auth/ForgotPasswordPage";

export const metadata: Metadata = {
  title: "Reset Password — EduNexus AI",
  description: "Reset your EduNexus AI account password.",
};

export default function ForgotPasswordRoute() {
  return <ForgotPasswordPage />;
}
