/**
 * Home = full landing page. Section order matches wireframe (and mobile stack).
 */

import { AnnouncementBanner } from "@/components/landing/AnnouncementBanner";
import { HeroSection } from "@/components/landing/HeroSection";
import { ClassesWeekPreview } from "@/components/landing/ClassesWeekPreview";
import { TestimonialVideosSection } from "@/components/landing/TestimonialVideosSection";
import { VideoCardsSection } from "@/components/landing/VideoCardsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { LocationsSection } from "@/components/landing/LocationsSection";
import { ExperienceSection } from "@/components/landing/ExperienceSection";
import { TransformationsSection } from "@/components/landing/TransformationsSection";
import { OfferSection } from "@/components/landing/OfferSection";
import { LeadFormSection } from "@/components/landing/LeadFormSection";
import { MapSection } from "@/components/landing/MapSection";
import { GoogleReviewsSection } from "@/components/landing/GoogleReviewsSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <main className="pt-16">
      <AnnouncementBanner />
      <HeroSection />
      <ScrollReveal>
        <ClassesWeekPreview />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialVideosSection />
      </ScrollReveal>
      <ScrollReveal>
        <VideoCardsSection />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>
      
      <ScrollReveal delay={1}>
        <LocationsSection />
      </ScrollReveal>
      <ScrollReveal>
        <ExperienceSection />
      </ScrollReveal>
      <ScrollReveal delay={1}>
        <TransformationsSection />
      </ScrollReveal>
      <ScrollReveal>
        <OfferSection />
      </ScrollReveal>
      <ScrollReveal delay={1}>
        <LeadFormSection id="lead-form" />
      </ScrollReveal>
      <ScrollReveal>
        <GoogleReviewsSection />
      </ScrollReveal>
      <ScrollReveal>
        <MapSection />
      </ScrollReveal>
    </main>
  );
}
