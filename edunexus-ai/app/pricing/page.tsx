import type { Metadata } from "next";
import { PricingPage } from "@/components/pages/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, flexible pricing for every academic need. Choose from Basic, Standard, Premium, or get a Custom quote for large projects.",
};

export default function Page() {
  return <PricingPage />;
}
