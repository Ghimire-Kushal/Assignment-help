"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Code2, Camera, Mail } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Assignment Help",  href: "/services" },
    { label: "Essay Writing",    href: "/services" },
    { label: "Research Papers",  href: "/services" },
    { label: "Coding Help",      href: "/services" },
    { label: "Dissertation",     href: "/services" },
  ],
  Company: [
    { label: "Blog",           href: "/blog"        },
    { label: "Pricing",        href: "/pricing"     },
    { label: "Guidelines",     href: "/guidelines"  },
    { label: "Contact",        href: "/contact"     },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use",   href: "/terms"   },
  ],
  Connect: [
    { label: "WhatsApp",  href: "https://wa.me/9749231395"                   },
    { label: "Instagram", href: "https://www.instagram.com/kushalghimire57/" },
    { label: "GitHub",    href: "https://github.com/Ghimire-Kushal"          },
    { label: "Email",     href: "mailto:scholarsyncnepal@gmail.com"                },
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/9749231395",                      label: "WhatsApp",  color: "hover:border-green-500/50 hover:bg-green-500/5 hover:text-green-400"   },
  { icon: Camera,        href: "https://www.instagram.com/kushalghimire57/",    label: "Instagram", color: "hover:border-pink-500/50 hover:bg-pink-500/5 hover:text-pink-400"      },
  { icon: Code2,         href: "https://github.com/Ghimire-Kushal",             label: "GitHub",    color: "hover:border-slate-400/50 hover:bg-slate-400/5 hover:text-slate-300"  },
  { icon: Mail,          href: "mailto:scholarsyncnepal@gmail.com",                   label: "Email",     color: "hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-400"     },
];

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="border-b border-white/[0.06] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <p className="font-semibold text-foreground">Get weekly academic tips in your inbox</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Join 8,000+ students · No spam · Unsubscribe anytime</p>
          </div>
          {done ? (
            <p className="text-sm font-medium text-green-400">Thanks! You&apos;re subscribed.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
              className="flex w-full max-w-sm gap-2"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-blue-500/40 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                Subscribe <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark-900/50">
      <NewsletterSignup />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <Image
                src="/scholarsync-logo.png"
                alt="ScholarSync Nepal"
                width={36}
                height={36}
                className="rounded-full object-cover ring-1 ring-[#C0504D]/30"
              />
              <span className="font-bold text-lg tracking-tight">
                <span className="gradient-text">ScholarSync</span>
                <span className="text-foreground/50 font-normal text-sm">Nepal</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Nepal&apos;s premier academic assistance platform. Trusted by
              500+ students across Nepal.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-all ${color}`}
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
                  <li key={link.label}>
                    {link.href.startsWith("http") || link.href.startsWith("mailto") ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ScholarSync Nepal. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Use
            </Link>
            <span className="text-xs text-muted-foreground">Made with precision for academic excellence.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
