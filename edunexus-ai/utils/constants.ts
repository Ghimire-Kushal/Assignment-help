export const APP_NAME = "EduNexus AI";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://edunexus.ai";
export const APP_DESCRIPTION =
  "AI-powered academic assistance platform for students worldwide.";

export const SERVICES = [
  "Assignment Help",
  "Essay Writing",
  "Research Papers",
  "Coding Help",
  "Dissertation",
  "Presentation",
  "Case Study",
  "Lab Report",
] as const;

export const SUPPORTED_SUBJECTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Business",
  "Economics",
  "Law",
  "Psychology",
  "History",
  "Literature",
  "Engineering",
] as const;

export const DEADLINE_OPTIONS = [
  { label: "3 Hours", value: "3h" },
  { label: "6 Hours", value: "6h" },
  { label: "12 Hours", value: "12h" },
  { label: "24 Hours", value: "24h" },
  { label: "2 Days", value: "2d" },
  { label: "3 Days", value: "3d" },
  { label: "5 Days", value: "5d" },
  { label: "7 Days", value: "7d" },
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/blog" },
] as const;

export const SOCIAL_LINKS = {
  whatsapp:  "https://wa.me/9749231395",
  instagram: "https://www.instagram.com/kushalghimire57/",
  github:    "https://github.com/Ghimire-Kushal",
  email:     "kushal.upr@gmail.com",
} as const;
