import type { Metadata } from "next";
import { OTPPage } from "@/components/pages/auth/OTPPage";

export const metadata: Metadata = {
  title: "Verify Email — ScholarSync Nepal",
  description: "Verify your email address to complete your ScholarSync Nepal registration.",
};

export default function VerifyOTPRoute() {
  return <OTPPage />;
}
