import type { Metadata } from "next";
import { OTPPage } from "@/components/pages/auth/OTPPage";

export const metadata: Metadata = {
  title: "Verify Email — EduNexus AI",
  description: "Verify your email address to complete your EduNexus AI registration.",
};

export default function VerifyOTPRoute() {
  return <OTPPage />;
}
