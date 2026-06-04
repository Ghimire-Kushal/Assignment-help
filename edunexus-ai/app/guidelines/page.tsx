import type { Metadata } from "next";
import { GuidelinesPage } from "@/components/pages/GuidelinesPage";

export const metadata: Metadata = {
  title: "Nepal University Thesis & Research Guidelines",
  description:
    "Free reference guide covering formatting standards, citation requirements, chapter structures, and submission guidelines for all major Nepali universities — TU, KU, PU, AFU, BPKIHS and more.",
  keywords: [
    "Nepal university thesis guidelines",
    "TU thesis format",
    "KU dissertation requirements",
    "APA 7th Nepal",
    "IEEE citation Nepal",
    "Vancouver citation Nepal",
    "thesis formatting Nepal",
    "research proposal Nepal",
  ],
};

export default function Page() {
  return <GuidelinesPage />;
}
