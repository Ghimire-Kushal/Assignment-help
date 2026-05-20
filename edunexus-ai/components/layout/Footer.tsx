import Link from "next/link";
import { Zap, Send, Code2, Briefcase, Mail } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Assignment Help", href: "/services/assignment" },
    { label: "Essay Writing", href: "/services/essay" },
    { label: "Research Papers", href: "/services/research" },
    { label: "Coding Help", href: "/services/coding" },
    { label: "Dissertation", href: "/services/dissertation" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refunds" },
  ],
};

const socialLinks = [
  { icon: Send, href: "https://twitter.com", label: "Twitter / X" },
  { icon: Code2, href: "https://github.com", label: "GitHub" },
  { icon: Briefcase, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@edunexus.ai", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                <span className="gradient-text">EduNexus</span>
                <span className="text-foreground/50 font-normal text-sm">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The most advanced AI-powered academic service platform. Trusted by
              50,000+ students across 120+ countries.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EduNexus AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with precision for academic excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
