import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ScholarSync Nepal Privacy Policy — how we collect, use, and protect your data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly (name, email, order details) and information collected automatically (IP address, browser type, pages visited) to operate and improve our services.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to process orders, communicate with you about your work, send service updates, and improve the platform. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Data Sharing",
    body: "We share your information only with our verified experts (strictly to fulfil your order), payment processors, and service providers who help us operate the platform — all under confidentiality agreements.",
  },
  {
    title: "4. Data Security",
    body: "We use industry-standard encryption and security practices to protect your data. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.",
  },
  {
    title: "5. Cookies",
    body: "We use cookies to keep you logged in, remember your preferences, and understand how the platform is used. You can disable cookies in your browser settings, though some features may not work correctly.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at scholarsyncnepal@gmail.com. We will respond within 30 days.",
  },
  {
    title: "7. Data Retention",
    body: "We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time.",
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this policy periodically. We will notify you of significant changes by email. Continued use of the platform constitutes acceptance of the updated policy.",
  },
  {
    title: "9. Contact Us",
    body: "For privacy-related questions or requests, email scholarsyncnepal@gmail.com or message us on WhatsApp at +977 9749231395.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">
            Privacy Policy
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
            or read our{" "}
            <Link href="/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
