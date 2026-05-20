import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Academic Services",
  description:
    "Assignment help, thesis support, final year projects, presentation design, editing, and AI-powered academic assistance — all in one platform.",
};

export default function Page() {
  return <ServicesPage />;
}
