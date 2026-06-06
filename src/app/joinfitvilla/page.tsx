"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getFeatures } from "@/content/features";
import { getAllLocations } from "@/content/locations";
import { getFeatureCardImageUrl } from "@/content/ecosystemGallery";
import { FeatureIcon } from "@/components/icons/FeatureIcons";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { LOCATION_OPTIONS } from "@/lib/constants";
import { getLeadFormValues, openLeadOnWhatsApp } from "@/lib/leadForm";
import { freeTrialCta, leadFormHeading, siteName } from "@/content/site";

const HEADER_LOGO = "/images/logo/fitvilla-logo.png";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rahul Mehta",
    role: "Member · Sector 76",
    quote:
      "FitVilla has everything I need – Technogym equipment, steam & sauna, and coaches who actually track my progress.",
  },
  {
    name: "Ananya Gupta",
    role: "Member · Sector 133",
    quote:
      "The Sector 133 club feels like a luxury fitness hotel. Recovery zones and group classes keep me consistent.",
  },
  {
    name: "Vikas Sharma",
    role: "Member · Mayur Vihar",
    quote:
      "Finally a premium gym in East Delhi. The environment, coaches and facilities are on another level.",
  },
];

import { getGoogleReviews } from "@/content/googleReviews";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  { question: "I've never joined a gym before. Can I still try FitVilla?", answer: "Absolutely! Most of our members started as beginners. Your free trial includes a quick orientation and our coaches will guide you through the equipment and basics. No pressure – just show up in comfortable clothes and we'll take care of the rest." },
  { question: "What if I miss my free trial slot? Can I reschedule?", answer: "Yes. Once you book, our team will call you to confirm. If you need to reschedule, just let us know and we'll find another slot. We want you to come when it's convenient for you." },
  { question: "How soon can I start after booking?", answer: "We confirm most trial slots within the same day or the next. You can often start within 24–48 hours depending on your preferred location and time. Book now and we'll call you right away." },
  { question: "Is there any registration or signup fee for the free trial?", answer: "No. Your first trial visit is completely free – no signup fee, no card required. We only ask for your name, phone and preferred location so we can confirm your slot and give you the best experience." },
  { question: "Do you have certification or recognitions?", answer: "Yes. We use Technogym equipment (global fitness standard), and our trainers are certified. Our clubs are built to international standards. You're in safe, professional hands at every FitVilla location." },
];

export default function JoinFitvillaPage() {
  const features = getFeatures();
  const locations = getAllLocations();
  const [showPopup, setShowPopup] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [logoError, setLogoError] = useState(false);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: "left" | "right") => {
    const el = reviewsScrollRef.current;
    if (!el) return;
    const cardWidth = 320;
    const gap = 16;
    const step = cardWidth + gap;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  const handleLeadSubmit = (event: React.FormEvent<HTMLFormElement>, source: string) => {
    event.preventDefault();
    openLeadOnWhatsApp({
      ...getLeadFormValues(event.currentTarget),
      source,
    });
  };

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openBooking = () => setShowPopup(true);

  return (
    <main className="min-h-screen bg-black">
      {/* ——— Sticky ad-style header ——— */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-3 px-3 py-2 transition-all duration-300 sm:gap-4 sm:px-6 sm:py-3 lg:px-8 ${
          headerScrolled
            ? "bg-black/85 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          {!logoError ? (
            <Image
              src={HEADER_LOGO}
              alt={siteName}
              width={180}
              height={56}
              className="h-8 w-auto max-w-[140px] object-contain object-left sm:h-9 sm:max-w-[160px]"
              priority
              sizes="(max-width: 640px) 140px, 160px"
              unoptimized
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
              FitVilla
            </span>
          )}
          <span className="hidden text-sm text-fitvilla-muted sm:inline">
            Luxury fitness · Noida & Delhi
          </span>
        </div>
        <button
          type="button"
          onClick={openBooking}
          className="rounded-full bg-fitvilla-cyan px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.5)]"
        >
          Book free trial
        </button>
      </header>

      {/* ——— Hero (ad-style) ——— */}
      <section className="relative flex min-h-0 flex-col items-start justify-start overflow-hidden px-4 pt-16 pb-8 text-center sm:min-h-[85vh] sm:items-center sm:justify-center sm:px-6 sm:pt-20 sm:pb-24 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="/images/home/join-hero-spin.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/85 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(45,212,228,0.12),transparent_55%)]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-4 sm:gap-8">
          {/* Ad badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-fitvilla-cyan/40 bg-fitvilla-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-fitvilla-cyan animate-pulse" />
            Free trial · Limited spots this week
          </div>

          <div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl">
              Train in a{" "}
              <span className="bg-gradient-to-r from-fitvilla-cyan to-fitvilla-glow bg-clip-text text-transparent">
                Luxury Fitness
              </span>{" "}
              Ecosystem
            </h1>
            <p className="mt-3 max-w-2xl text-base text-fitvilla-light/90 sm:mt-5 sm:text-lg">
              Technogym equipment · Certified coaches · Steam, sauna & recovery.
              <br className="hidden sm:inline" /> Three premium clubs in Noida & Mayur Vihar.
            </p>
          </div>

          {/* Inline booking form */}
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/50 p-4 shadow-xl backdrop-blur-sm sm:p-5">
            <p className="mb-3 text-center text-sm font-semibold text-white">
              Book your seat now — few left
            </p>
            <form
              className="space-y-3"
              onSubmit={(event) => handleLeadSubmit(event, "Join FitVilla hero form")}
            >
              <Input
                id="hero-name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2.5 text-sm text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
              />
              <Input
                id="hero-phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                required
                className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2.5 text-sm text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
              />
              <Select
                id="hero-location"
                name="location"
                options={LOCATION_OPTIONS}
                required
                className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2.5 text-sm text-white focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-fitvilla-cyan py-3 text-sm font-bold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.4)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black"
              >
                {freeTrialCta}
              </button>
            </form>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-fitvilla-muted sm:gap-8 sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="font-semibold text-fitvilla-cyan">3</span> Premium locations
            </span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-fitvilla-cyan">No</span> signup fee
            </span>
            <span>Sector 76 · Sector 133 · Mayur Vihar</span>
          </div>
        </div>
      </section>

      {/* ——— Social proof strip ——— */}
      <section className="border-y border-white/10 bg-white/[0.02] py-2 sm:py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 text-center text-sm text-fitvilla-light/80 sm:gap-6 sm:gap-y-2">
          <span>✓ Technogym equipment</span>
          <span>✓ Steam & sauna</span>
          <span>✓ Certified coaches</span>
          <span>✓ Free trial · No card required</span>
        </div>
      </section>

      {/* ——— Services (ad-style section title) ——— */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
              Why FitVilla?
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need under one roof
            </h2>
            <p className="mt-3 text-fitvilla-muted">
              Performance training, recovery zones, and member comfort — no compromises.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.slice(0, 6).map((f, index) => {
              const imageSrc = getFeatureCardImageUrl(index, f.imageSrc ?? "");
              return (
                <Card
                  key={f.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-fitvilla-cyan/40 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(45,212,228,0.08)]"
                >
                  {imageSrc && (
                    <div className="pointer-events-none absolute inset-0 opacity-30">
                      {imageSrc.includes("drive.google.com") ? (
                        <img
                          src={imageSrc}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Image
                          src={imageSrc}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    </div>
                  )}
                  <div className="relative flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/70 text-fitvilla-cyan ring-1 ring-white/15">
                      <FeatureIcon featureId={f.id} />
                    </div>
                    <h3 className="text-base font-semibold text-white">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-fitvilla-light/90">{f.subtext}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Locations ——— */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
              Find your club
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Choose your nearest FitVilla
            </h2>
            <p className="mt-3 text-fitvilla-muted">
              Same premium experience at every location.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-3">
            {locations.map((loc) => (
              <Card
                key={loc.slug}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
              >
                <div className="relative aspect-[4/3] bg-fitvilla-deep">
                  <Image
                    src={loc.imagePath}
                    alt={loc.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{loc.name}</h3>
                    <p className="mt-1 text-xs text-fitvilla-light/90">{loc.shortDescription}</p>
                  </div>
                </div>
                <div className="p-4">
                  <button
                    type="button"
                    onClick={openBooking}
                    className="text-sm font-semibold text-fitvilla-cyan hover:text-fitvilla-glow"
                  >
                    Book your trial here →
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Testimonials (ad-style) ——— */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
              Real members
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What members are saying
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.name}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-white/20"
              >
                <p className="text-sm leading-relaxed text-fitvilla-light/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-fitvilla-cyan/20 flex items-center justify-center text-lg font-bold text-fitvilla-cyan">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-fitvilla-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Gallery (Inside FitVilla) ——— */}
      <section className="border-t border-white/10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-3xl">
              Inside FitVilla
            </h2>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-fitvilla-muted sm:inline">
              Swipe to explore
            </span>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 sm:mt-6 sm:pb-3">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="relative h-44 min-w-[260px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-fitvilla-deep"
              >
                <Image
                  src={`/images/hero/hero-${idx}.jpg`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="260px"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Google Reviews ——— */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Google Reviews
                  </h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-2xl font-bold text-fitvilla-cyan">4.9</span>
                    <span className="text-white/80">/5</span>
                    <span className="flex text-amber-400">
                      {"★".repeat(5)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-fitvilla-muted">
              Trusted by members across Noida & Delhi
            </p>
          </div>
          <div className="relative mt-8">
            <div
              ref={reviewsScrollRef}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:pb-4"
            >
              {getGoogleReviews().map((review, i) => (
              <div
                key={i}
                className="min-w-[300px] max-w-[320px] flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fitvilla-cyan/20 text-lg font-bold text-fitvilla-cyan">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{review.name}</p>
                      <p className="text-xs text-fitvilla-muted">{review.date}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400">
                      Verified
                    </span>
                  )}
                </div>
                <div className="mt-3 flex text-amber-400">
                  {"★".repeat(review.rating)}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fitvilla-light/90">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
            ))}
            </div>
            {/* Desktop scroll buttons */}
            <button
              type="button"
              onClick={() => scrollReviews("left")}
              className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/80 p-2.5 text-white shadow-lg backdrop-blur-sm transition-all hover:border-fitvilla-cyan/50 hover:bg-fitvilla-cyan/20 hover:text-fitvilla-cyan md:flex md:items-center md:justify-center"
              aria-label="Previous reviews"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollReviews("right")}
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/80 p-2.5 text-white shadow-lg backdrop-blur-sm transition-all hover:border-fitvilla-cyan/50 hover:bg-fitvilla-cyan/20 hover:text-fitvilla-cyan md:flex md:items-center md:justify-center"
              aria-label="Next reviews"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ——— FAQ (high conversion) ——— */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
              Got questions?
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-fitvilla-muted">
              Everything you need to know before your free trial.
            </p>
          </div>
          <div className="mt-10 space-y-2">
            {FAQ_ITEMS.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={openFaqIndex === i}
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <span
                    className={`inline-block shrink-0 text-fitvilla-cyan transition-transform duration-200 ${openFaqIndex === i ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ${
                    openFaqIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-white/10 px-5 pb-4 pt-1">
                      <p className="text-sm leading-relaxed text-fitvilla-light/90">
                        {faq.answer}
                      </p>
                      {openFaqIndex === i && (
                        <button
                          type="button"
                          onClick={openBooking}
                          className="mt-4 inline-flex rounded-full bg-fitvilla-cyan/20 px-4 py-2 text-sm font-semibold text-fitvilla-cyan transition-colors hover:bg-fitvilla-cyan/30"
                        >
                          Book your free trial →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <button
              type="button"
              onClick={openBooking}
              className="rounded-full bg-fitvilla-cyan px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.4)]"
            >
              Book your free trial now
            </button>
          </p>
        </div>
      </section>

      {/* ——— Sticky footer (booking bar) ——— */}
      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 py-2.5 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:py-3">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-3 sm:flex-row sm:justify-between sm:gap-4 sm:px-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-white">
              Book your free trial — limited spots this week
            </p>
            <p className="text-xs text-fitvilla-muted">
              Sector 76 · Sector 133 · Mayur Vihar
            </p>
          </div>
          <button
            type="button"
            onClick={openBooking}
            className="w-full shrink-0 rounded-full bg-fitvilla-cyan px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.5)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
          >
            {freeTrialCta}
          </button>
        </div>
      </footer>

      {/* Spacer so content isn't hidden behind sticky footer */}
      <div className="h-20 sm:h-20" />

      {/* ——— Popup lead form ——— */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book your seat now"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-fitvilla-cyan/30 bg-gradient-to-br from-fitvilla-deep/95 via-black to-black shadow-[0_24px_80px_rgba(0,0,0,0.95),0_0_0_1px_rgba(45,212,228,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-fitvilla-light hover:bg-white/10"
              aria-label="Close"
            >
              <span className="text-lg leading-none">×</span>
            </button>
            <div className="relative p-6 sm:p-8">
              <div className="mb-6">
                <p className="inline-flex items-center rounded-full bg-fitvilla-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-fitvilla-cyan">
                  {leadFormHeading}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                  Book your seat now — few left
                </h2>
                <p className="mt-2 text-sm text-fitvilla-light/85">
                  Share your details and our team will call you back to confirm your free trial at your preferred location.
                </p>
              </div>

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  handleLeadSubmit(event, "Join FitVilla popup form");
                  setShowPopup(false);
                }}
              >
                <Input
                  id="popup-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <Input
                  id="popup-phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <Select
                  id="popup-location"
                  name="location"
                  options={LOCATION_OPTIONS}
                  required
                  className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-3 text-white focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-fitvilla-cyan py-3.5 text-sm font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.4)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black"
                >
                  {freeTrialCta}
                </button>
                <p className="mt-2 text-[11px] text-fitvilla-muted">
                  No spam. We&apos;ll only contact you to confirm your trial and answer questions.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
