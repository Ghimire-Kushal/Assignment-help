import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { FooterWrapper } from "@/components/layout/FooterWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EduNexus AI — Premium Academic Services",
    template: "%s | EduNexus AI",
  },
  description:
    "AI-powered academic assistance platform. Expert help with assignments, essays, research, and more — delivered fast and precisely.",
  keywords: [
    "academic help",
    "assignment assistance",
    "AI tutoring",
    "essay writing",
    "research support",
    "EduNexus AI",
  ],
  authors: [{ name: "EduNexus AI" }],
  creator: "EduNexus AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://edunexus.ai",
    title: "EduNexus AI — Premium Academic Services",
    description:
      "AI-powered academic assistance platform for students worldwide.",
    siteName: "EduNexus AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduNexus AI — Premium Academic Services",
    description: "AI-powered academic assistance platform for students worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <NavbarWrapper />
            <main className="flex-1">{children}</main>
            <FooterWrapper />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
