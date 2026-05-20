import type { Metadata } from "next";
import { BlogPage } from "@/components/pages/BlogPage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Academic writing guides, citation tips, study strategies, and insights on AI in education — from the EduNexus AI team.",
};

export default function Page() {
  return <BlogPage />;
}
