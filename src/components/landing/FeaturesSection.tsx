"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { featuresHeadline, featuresSubtext, freeTrialCta } from "@/content/site";
import { getFeatures } from "@/content/features";
import { scrollToLeadForm } from "@/lib/scroll";
import { getFeatureCardImageUrl } from "@/content/ecosystemGallery";
import { FeatureIcon } from "@/components/icons/FeatureIcons";
import { Card } from "@/components/ui/Card";

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

function useInView(once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
        else if (!once) setInView(false);
      },
      { threshold: 0.15, rootMargin: "0px 0px -20px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return { ref, inView };
}

function FeatureCard({
  feature: f,
  index,
}: {
  feature: { id: string; title: string; subtext: string; priority: string; imageSrc?: string };
  index: number;
}) {
  const { ref, inView } = useInView(true);
  const imageSrc = getFeatureCardImageUrl(index, f.imageSrc ?? "");

  return (
    <div
      ref={ref}
      className={`feature-card-animate h-full ${inView ? "in-view" : ""}`}
    >
      <Card
        className={`feature-card group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 px-5 py-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-fitvilla-cyan/40 hover:shadow-[0_12px_40px_-12px_rgba(45,212,228,0.25)] ${
          f.priority === "highlight"
            ? "ring-1 ring-fitvilla-cyan/20 hover:ring-fitvilla-cyan/40"
            : ""
        }`}
      >
        {imageSrc && (
          <div className="absolute inset-0 [transform:translateZ(0)] [backface-visibility:hidden]">
            {imageSrc.includes("drive.google.com") ? (
              <img
                src={imageSrc}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" aria-hidden />
          </div>
        )}
        <div className="relative flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-fitvilla-cyan/90 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-fitvilla-cyan/20 group-hover:text-fitvilla-cyan group-hover:ring-fitvilla-cyan/40">
            <FeatureIcon featureId={f.id} />
          </div>
          <h3 className="mt-3 text-base font-semibold text-white">
            {f.title}
          </h3>
          <p className="mt-1.5 flex-1 text-sm leading-snug text-fitvilla-light/90 line-clamp-3">
            {f.subtext}
          </p>
        </div>
      </Card>
    </div>
  );
}

export function FeaturesSection() {
  const features = getFeatures();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="features-heading"
      className="relative scroll-mt-20 bg-black px-4 py-16 sm:px-6 lg:px-8 [contain:layout]"
    >
      {/* Scroll progress bar – left */}
      <div className="absolute left-2 top-0 hidden h-full w-2 overflow-hidden rounded-full bg-white/10 sm:left-4 lg:block" aria-hidden>
        <div
          className="features-progress-fill w-full rounded-full transition-[height] duration-75 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll progress bar – right */}
      <div className="absolute right-2 top-0 hidden h-full w-2 overflow-hidden rounded-full bg-white/10 sm:right-4 lg:block" aria-hidden>
        <div
          className="features-progress-fill w-full rounded-full transition-[height] duration-75 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto max-w-7xl lg:pl-8 lg:pr-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {featuresHeadline}
          </h2>
          <p className="mt-4 text-lg text-fitvilla-muted">{featuresSubtext}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, index) => (
            <div key={f.id} className="h-[200px] sm:h-[220px] lg:h-[240px]">
              <FeatureCard feature={f} index={index} />
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-fitvilla-light/90">Experience the difference yourself</p>
          <Link
            href="#lead-form"
            onClick={scrollToLeadForm}
            className="rounded-full bg-fitvilla-cyan px-8 py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.35)]"
          >
            {freeTrialCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
