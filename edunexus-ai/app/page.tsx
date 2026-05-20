import { HeroSection } from "@/components/sections/HeroSection";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { AISection } from "@/components/sections/AISection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoStrip />
      <ServicesSection />
      <WhyUsSection />
      <AISection />
      <WorkflowSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
