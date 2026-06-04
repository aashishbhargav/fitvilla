"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { aboutTagline } from "@/content/site";

function useScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      if (sectionTop >= viewportHeight) {
        setProgress(0);
        return;
      }
      if (sectionTop + sectionHeight <= 0) {
        setProgress(100);
        return;
      }
      const scrolledThrough = -sectionTop;
      const raw = (scrolledThrough / sectionHeight) * 100;
      const p = Math.min(100, Math.max(0, raw * 1.2));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionRef]);
  return progress;
}

function useTimelineItemInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    location: "Fitvilla Gym Sector 76, Noida",
    date: "August 20, 2020",
    body: "Launched our first branch in Sector 76, Noida — the foundation of the Fitvilla vision. Spanning approximately 10,000 square feet, this facility was designed to offer a structured, results-driven fitness ecosystem with dedicated workout zones, certified coaches, and premium equipment. From day one, Fitvilla Gym Sector 76 positioned itself as a serious contender among the best gyms in Noida.",
  },
  {
    year: "2024",
    title: "Expanding Excellence",
    location: "Fitvilla Gym Sector 133, Noida",
    date: "April 9, 2024",
    body: "Expanded with the Sector 133 branch inside Paras One33 Mall. Spanning nearly 20,000 square feet, it is one of Noida's largest and most luxurious gyms. This facility elevated the Fitvilla experience with expanded workout zones, enhanced recovery spaces, and a refined premium training environment. Today, Fitvilla Sector 133 stands as a benchmark for luxury gyms in Noida.",
  },
  {
    year: "2026",
    title: "Entering East Delhi",
    location: "Fitvilla Gym Mayur Vihar Phase 1",
    date: "January 16, 2026",
    body: "Launched our third branch in Mayur Vihar Phase 1, New Delhi. This expansion brought the Fitvilla luxury fitness experience to East Delhi, serving members looking for a premium gym in Mayur Vihar with world-class infrastructure and professional coaching.",
  },
];

const philosophyPoints = [
  "Structured training programs",
  "Certified expert coaches",
  "Data-driven progress tracking",
  "Community-driven motivation",
  "Premium training infrastructure",
];

const apartPoints = [
  "Large-scale premium training facilities",
  "World-class equipment",
  "Dedicated workout zones for cardio, strength, cross training, spinning and group sessions",
  "Personal training programs",
  "Recovery-focused amenities",
  "A motivating fitness community",
];

const standardPillars = [
  "Professionalism",
  "Cleanliness",
  "Safety",
  "Performance-focused training",
  "Member satisfaction",
];

const teamMembers = [
  { name: "Dr Tarun", role: "Head of Operations" },
  { name: "Shivam Chauhan", role: "Business Operations Manager" },
  { name: "Manoj Pant", role: "Club Manager 133" },
  { name: "Varun Rathode", role: "Club Manager 76" },
  { name: "Akshay Rathi", role: "Club Manager Mayur Vihar" },
  { name: "Naveen Bhist", role: "Fitness Manager 133" },
  { name: "Anshu Majumdar", role: "Fitness Manager 76" },
];


function TimelineItem({
  item,
}: {
  item: (typeof timeline)[number];
}) {
  const { ref, inView } = useTimelineItemInView();
  return (
    <li className="relative flex flex-col sm:flex-row sm:items-center sm:gap-12">
      <div
        ref={ref}
        className={`about-timeline-item ${inView ? "in-view" : ""}`}
      >
        <div className="flex items-start gap-6 sm:flex-row sm:items-center sm:gap-12">
          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-fitvilla-cyan bg-black text-fitvilla-cyan shadow-[0_0_20px_rgba(45,212,228,0.3)] sm:h-14 sm:w-14">
            <span className="text-sm font-bold sm:text-base">{item.year}</span>
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-fitvilla-cyan">
              {item.date}
            </p>
            <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">{item.title}</h3>
            <p className="mt-1 text-fitvilla-muted">{item.location}</p>
            <p className="mt-4 text-fitvilla-light/90">{item.body}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
}) {
  const [inView, ref] = useInView();
  const delayClass = delay === 0 ? "" : delay === 1 ? "delay-100" : delay === 2 ? "delay-200" : "delay-300";
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${delayClass} ${
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const [heroInView, heroRef] = useInView();
  const journeySectionRef = useRef<HTMLElement>(null);
  const journeyProgress = useScrollProgress(journeySectionRef);

  return (
    <main className="bg-black">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        {/* Background: spin studio with city view (about-hero-spin.png) */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/about-hero-spin.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            sizes="100vw"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/85 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(45,212,228,0.12),transparent_55%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <p
            className={`mb-4 text-sm font-medium uppercase tracking-[0.2em] text-fitvilla-cyan transition-all duration-1000 ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            About Fitvilla Gym
          </p>
          <h1
            className={`text-4xl font-bold leading-tight tracking-tight text-white transition-all duration-1000 delay-75 sm:text-5xl lg:text-6xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Redefining Luxury Fitness in Noida and New Delhi
          </h1>
          <p
            className={`mt-6 text-lg text-fitvilla-light/90 transition-all duration-1000 delay-150 sm:text-xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            A high-performance fitness environment that blends world-class equipment, expert coaching, and premium training spaces under one roof.
          </p>
          <p
            className={`mt-4 text-sm font-medium uppercase tracking-wider text-fitvilla-cyan/90 transition-all duration-1000 delay-200 ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {aboutTagline}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <RevealSection>
            <p className="text-lg leading-relaxed text-fitvilla-light/90 sm:text-xl">
              Fitvilla Gym offers a personalised, accessible and inclusive place for your workout. Achieve your individual fitness goals under the supervision of certified trainers, with the benefit of an in-house health cafe in partnership with The Healers Cafe — a top-rated health cafe in Noida, NCR.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-fitvilla-light/90 sm:text-xl">
              Our Sector 76 club spans approximately 10,000 sq ft with dedicated areas for cardio (including isolated cabins), weight training, Zumba, yoga, crossfit and spinning. Steam room, showers and lockers are available; the gym is also equipped with a health cafe managed by a top-rated health food chain in NCR.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-fitvilla-light/90 sm:text-xl">
              What started in Noida has now evolved into one of the fastest-growing luxury fitness brands in Delhi NCR, with branches in Sector 76, Sector 133 and Mayur Vihar Phase 1.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Our Journey - Timeline with scroll progress line */}
      <section
        ref={journeySectionRef}
        className="relative border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8"
        id="journey"
      >
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Journey
            </h2>
          </RevealSection>
          <div className="relative mt-16 pl-10 sm:mt-20 sm:pl-14 lg:pl-16">
            {/* Progress bar track (full height) */}
            <div
              className="absolute left-0 top-0 hidden h-full w-2 overflow-hidden rounded-full bg-white/10 sm:left-4 sm:block"
              aria-hidden
            >
              <div
                className="about-timeline-progress-fill w-full rounded-full transition-[height] duration-75 ease-out"
                style={{ height: `${journeyProgress}%` }}
              />
            </div>
            <ul className="space-y-16 sm:space-y-24">
              {timeline.map((item) => (
                <TimelineItem key={item.year} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Philosophy
            </h2>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="mt-6 text-center text-2xl font-semibold text-fitvilla-cyan sm:text-3xl">
              Train. Nourish. Transform.
            </p>
          </RevealSection>
          <RevealSection delay={2}>
            <p className="mt-8 text-center text-lg text-fitvilla-light/90">
              At Fitvilla Gym, fitness is not treated as a temporary goal. It is built as a sustainable lifestyle.
            </p>
          </RevealSection>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {philosophyPoints.map((point, i) => (
              <RevealSection key={point} delay={i < 3 ? (i as 0 | 1 | 2) : 2}>
                <li className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fitvilla-cyan/20 text-fitvilla-cyan">
                    ✓
                  </span>
                  <span className="text-fitvilla-light/90">{point}</span>
                </li>
              </RevealSection>
            ))}
          </ul>
        </div>
      </section>

      {/* What Sets Fitvilla Apart */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Sets Fitvilla Apart
            </h2>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="mt-6 text-center text-lg text-fitvilla-light/90">
              Fitvilla Gym is not just another gym in Noida or Delhi NCR. We are committed to delivering:
            </p>
          </RevealSection>
          <ul className="mt-12 space-y-4">
            {apartPoints.map((point, i) => (
              <RevealSection key={point} delay={i < 2 ? (i as 0 | 1) : 2}>
                <li className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-4 transition-colors hover:border-fitvilla-cyan/20 hover:bg-white/[0.08]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fitvilla-cyan/20 text-sm text-fitvilla-cyan">
                    {i + 1}
                  </span>
                  <span className="text-fitvilla-light/90">{point}</span>
                </li>
              </RevealSection>
            ))}
          </ul>
        </div>
      </section>

      {/* The Fitvilla Standard */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <RevealSection>
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The Fitvilla Standard
            </h2>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="mt-6 text-center text-lg text-fitvilla-light/90">
              Across all three locations — Sector 76 Noida, Sector 133 Noida, and Mayur Vihar Phase 1 — one standard remains consistent
            </p>
          </RevealSection>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {standardPillars.map((pillar, i) => (
              <RevealSection key={pillar} delay={i < 3 ? (i as 0 | 1 | 2) : 2}>
                <span className="inline-flex rounded-full border border-fitvilla-cyan/40 bg-fitvilla-cyan/10 px-4 py-2 text-sm font-medium text-fitvilla-cyan">
                  {pillar}
                </span>
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={2}>
            <p className="mt-10 text-center text-fitvilla-muted">
              We are continuously evolving, upgrading equipment, training our coaches, and expanding our footprint to redefine what a luxury gym in Delhi NCR should look like.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <RevealSection>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Our Mission
            </h2>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="mt-8 text-lg leading-relaxed text-fitvilla-light/90 sm:text-xl">
              In a country where fitness is often compromised by crowded spaces, outdated machines,
              and inconsistent hygiene, FitVilla was built to change the standard, not just meet it.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-fitvilla-light/90 sm:text-xl">
              We believe fitness isn&apos;t a luxury. It&apos;s a basic need that deserves better
              infrastructure, better environments, and better intent.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-fitvilla-cyan sm:text-xl">
              To upgrade everyday living for residents across India by building fitness
              infrastructure that is accessible, reliable, and designed for real life.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-left">
              <p className="mb-3 text-lg font-semibold text-white">FitVilla solves this with spaces that are:</p>
              <ul className="space-y-2 text-fitvilla-light/90">
                <li>• Built with intent, not as an afterthought</li>
                <li>• Equipped with modern, high-performance machines</li>
                <li>• Maintained with uncompromised hygiene and safety standards</li>
                <li>• Designed to feel comfortable for everyone, without intimidation</li>
              </ul>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-fitvilla-light/90 sm:text-xl">
              This is fitness that fits into your life, not something you have to rearrange your
              life for.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealSection>
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Leadership Team
            </h2>
          </RevealSection>
          <RevealSection delay={1}>
            <p className="mt-4 text-center text-fitvilla-light/80">
              The people building the FitVilla standard every day.
            </p>
          </RevealSection>
          <div className="mt-12 overflow-x-auto overflow-y-visible pb-3 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-5 pr-2">
            {teamMembers.map((member, i) => (
              <RevealSection key={member.name} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="group relative h-72 w-[280px] shrink-0 overflow-hidden rounded-2xl border border-fitvilla-cyan/30 bg-gradient-to-br from-fitvilla-deep/80 via-black to-black shadow-[0_0_0_rgba(45,212,228,0)] transition-all duration-500 hover:-translate-y-1 hover:border-fitvilla-cyan/70 hover:shadow-[0_0_36px_rgba(45,212,228,0.25)]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,228,0.20),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(45,212,228,0.12),transparent_40%)] transition-all duration-500 group-hover:scale-110" />
                  <div className="pointer-events-none absolute inset-0 bg-black/10 backdrop-blur-0 transition-all duration-500 group-hover:bg-black/35 group-hover:backdrop-blur-md" />

                  {/* Name stays visible at all times */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                    <p className="text-lg font-bold tracking-tight text-white drop-shadow">
                      {member.name}
                    </p>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm font-medium text-fitvilla-cyan opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                      {member.role}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-4 py-24 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the Fitvilla Movement
            </h2>
            <p className="mt-6 text-lg text-fitvilla-light/90">
              With three premium locations and growing, Fitvilla Gym continues to raise the standard for gyms in Noida and New Delhi. Whether you are beginning your fitness journey or aiming to elevate your performance, Fitvilla is built for those who expect more.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/locations"
                className="rounded-full bg-fitvilla-cyan px-8 py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.4)]"
              >
                View Locations
              </Link>
              <Link
                href="/#lead-form"
                className="rounded-full border border-fitvilla-cyan/50 px-8 py-3.5 font-semibold text-fitvilla-cyan transition-all hover:bg-fitvilla-cyan/10 hover:border-fitvilla-cyan"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
