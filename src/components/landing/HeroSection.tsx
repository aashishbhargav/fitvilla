"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  heroHeadline as defaultHeroHeadline,
  heroSubtext as defaultHeroSubtext,
  freeTrialCta,
  siteTagline as defaultSiteTagline,
} from "@/content/site";
import { ROUTES } from "@/lib/constants";
import { scrollToLeadForm } from "@/lib/scroll";
import type { HeroSettings } from "@/app/admin/_services/adminSettings";
import { getVideoEmbed } from "@/lib/videoEmbed";
import { heroPosterDefault, heroVideoDefault } from "@/content/heroMedia";

const ADMIN_STORAGE_KEY = "fitvilla-admin-settings";
const OLD_LOCAL_HERO_VIDEO = "/videos/hero.mp4";

type AdminSettingsShape = {
  hero?: HeroSettings;
};

export function HeroSection() {
  const [hero, setHero] = useState<HeroSettings>({
    siteTagline: defaultSiteTagline,
    heroHeadline: defaultHeroHeadline,
    heroSubtext: defaultHeroSubtext,
    heroVideoUrl: heroVideoDefault,
    heroPosterUrl: heroPosterDefault,
  });

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        if (typeof window === "undefined") return;
        const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as AdminSettingsShape;
        if (parsed.hero) {
          setHero((prev) => ({
            ...prev,
            ...parsed.hero,
            heroVideoUrl:
              parsed.hero?.heroVideoUrl === OLD_LOCAL_HERO_VIDEO
                ? heroVideoDefault
                : parsed.hero?.heroVideoUrl || prev.heroVideoUrl,
          }));
        }
      } catch {
        // ignore parse/storage errors, fall back to defaults
      }
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  const heroEmbed = getVideoEmbed(hero.heroVideoUrl, { controls: false });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        {heroEmbed ? (
          <>
            <Image
              src={hero.heroPosterUrl || heroPosterDefault}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
              unoptimized
            />
            <iframe
              src={heroEmbed.src}
              title="FitVilla hero background video"
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              aria-hidden
            />
          </>
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            poster={hero.heroPosterUrl || heroPosterDefault}
          >
            <source src={hero.heroVideoUrl || heroVideoDefault} type="video/mp4" />
          </video>
        )}
        {/* Fallback gradient when video missing or loading */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-fitvilla-deep/40 to-transparent"
          aria-hidden
        />
      </div>

      {/* Athletes at left and right ends – hidden for now (cutout)
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
      >
        <div className="hero-athlete-wrap pointer-events-auto absolute left-0 bottom-0 flex h-[75vh] max-h-[700px] w-[min(42vw,320px)] items-end justify-start">
          <div className="rage-light-hover hero-athlete-cutout h-full w-full">
            <Image
              src={ATHLETE_LEFT}
              alt=""
              width={320}
              height={480}
              className="h-full w-full object-contain object-bottom object-left"
              priority
              sizes="(max-width: 768px) 45vw, 320px"
              unoptimized
            />
          </div>
        </div>
        <div className="hero-athlete-wrap pointer-events-auto absolute right-0 bottom-0 flex h-[75vh] max-h-[700px] w-[min(42vw,320px)] items-end justify-end">
          <div className="rage-light-hover hero-athlete-cutout h-full w-full">
            <Image
              src={ATHLETE_RIGHT}
              alt=""
              width={320}
              height={480}
              className="h-full w-full object-contain object-bottom object-right"
              priority
              sizes="(max-width: 768px) 45vw, 320px"
              unoptimized
            />
          </div>
        </div>
      </div>
      */}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <p
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-fitvilla-cyan opacity-0 animate-[slide-up_0.8s_ease-out_0.2s_forwards]"
          aria-hidden
        >
          {hero.siteTagline}
        </p>
        <h1
          id="hero-heading"
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl opacity-0 animate-[slide-up_0.8s_ease-out_0.4s_forwards]"
        >
          {hero.heroHeadline}
        </h1>
        <p
          className="mb-10 max-w-2xl mx-auto text-lg text-fitvilla-light/95 sm:text-xl opacity-0 animate-[slide-up_0.8s_ease-out_0.6s_forwards]"
        >
          {hero.heroSubtext}
        </p>
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0 animate-[slide-up_0.8s_ease-out_0.8s_forwards]"
        >
          <Link
            href="#lead-form"
            onClick={scrollToLeadForm}
            className="rounded-full bg-fitvilla-cyan px-8 py-4 text-base font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.5)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black"
          >
            {freeTrialCta}
          </Link>
          <Link
            href={ROUTES.locations}
            className="rounded-full border-2 border-white/60 px-8 py-4 text-base font-semibold text-white transition-all hover:border-fitvilla-cyan hover:bg-white/5 hover:text-fitvilla-cyan focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
          >
            View Locations
          </Link>
        </div>
        <p
          className="mt-10 text-sm text-fitvilla-muted opacity-0 animate-[slide-up_0.8s_ease-out_1s_forwards]"
        >
          3 Premium Locations · Noida Sector 76 · Sector 133 · Mayur Vihar
        </p>
      </div>

      {/* Subtle bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
