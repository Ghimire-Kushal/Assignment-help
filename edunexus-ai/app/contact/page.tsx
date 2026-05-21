import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the ScholarSync Nepal team. We respond in under 2 minutes via live chat, or reach us by email and WhatsApp.",
};

export default function Page() {
  return <ContactPage />;
}
