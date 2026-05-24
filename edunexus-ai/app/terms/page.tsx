import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ScholarSync Nepal Terms of Service — read our terms before using the platform.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using ScholarSync Nepal you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.",
  },
  {
    title: "2. Services",
    body: "ScholarSync Nepal provides academic assistance including assignment help, essay writing, research support, and tutoring. All work delivered is intended for reference and learning purposes only.",
  },
  {
    title: "3. User Responsibilities",
    body: "You are responsible for maintaining the confidentiality of your account credentials, for all activity under your account, and for ensuring that your use of our services complies with your institution's academic integrity policies.",
  },
  {
    title: "4. Payments & Refunds",
    body: "Payment is required before work begins. If you are unsatisfied with a delivery you may request revisions within 14 days at no extra cost. Refunds are granted at our discretion in accordance with our money-back guarantee.",
  },
  {
    title: "5. Intellectual Property",
    body: "Upon full payment, you receive the right to use the delivered work for personal academic reference. ScholarSync Nepal retains no rights to resell or redistribute your specific order to third parties.",
  },
  {
    title: "6. Limitation of Liability",
    body: "ScholarSync Nepal is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount paid for the specific order in question.",
  },
  {
    title: "7. Changes to Terms",
    body: "We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the revised terms. We will notify users of material changes via email.",
  },
  {
    title: "8. Contact",
    body: "Questions about these terms? Email us at scholarsyncnepal@gmail.com or message us on WhatsApp at +977 9749231395.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="mt-3 text-muted-foreground">
            Last updated: May 2026
          </p>
        </div>

        <div className="space-y-8">
          {sections.map(({ title, body }) => (
            <div key={title}>
              <h2 className="mb-2 text-lg font-semibold text-foreground">{title}</h2>
              <p className="leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <Link href="/contact" className="text-blue-400 hover:underline">
              Contact our team
            </Link>{" "}
            or view our{" "}
            <Link href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
