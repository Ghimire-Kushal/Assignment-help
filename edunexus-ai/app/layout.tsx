import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import { RouteLoader } from "@/components/RouteLoader";
import { FloatingActions } from "@/components/shared/FloatingActions";

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
    default: "ScholarSync Nepal — Premium Academic Services",
    template: "%s | ScholarSync Nepal",
  },
  description:
    "Nepal's premier academic assistance platform. Expert help with assignments, essays, research, and more — delivered fast and precisely.",
  keywords: [
    "academic help",
    "assignment assistance",
    "Nepal tutoring",
    "essay writing",
    "research support",
    "ScholarSync Nepal",
  ],
  authors: [{ name: "ScholarSync Nepal" }],
  creator: "ScholarSync Nepal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scholarsyncnepal.com",
    title: "ScholarSync Nepal — Premium Academic Services",
    description:
      "Nepal's premier academic assistance platform for students.",
    siteName: "ScholarSync Nepal",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScholarSync Nepal — Premium Academic Services",
    description: "Nepal's premier academic assistance platform for students.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
          <QueryProvider>
            <Suspense fallback={null}>
              <RouteLoader />
            </Suspense>
            <div className="relative flex min-h-screen flex-col">
              <NavbarWrapper />
              <main className="flex-1">{children}</main>
              <FooterWrapper />
              <FloatingActions />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
