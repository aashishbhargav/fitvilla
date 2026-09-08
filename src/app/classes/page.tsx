"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function ClassesPage() {
  const [heroInView, heroRef] = useInView();

  return (
    <main className="bg-black">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/page-hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            sizes="100vw"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(45,212,228,0.12),transparent_55%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <p
            className={`mb-4 text-sm font-medium uppercase tracking-[0.2em] text-fitvilla-cyan transition-all duration-1000 ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Group Classes
          </p>
          <h1
            className={`text-4xl font-bold leading-tight tracking-tight text-white transition-all duration-1000 delay-75 sm:text-5xl lg:text-6xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Train Together, Grow Stronger
          </h1>
          <p
            className={`mt-6 text-lg text-fitvilla-light/90 transition-all duration-1000 delay-150 sm:text-xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Spin, HIIT, yoga, strength and more — all included in your membership. View the full schedule and book your spot.
          </p>
          <Link
            href="/classes/calendar"
            className={`mt-10 inline-flex rounded-full bg-fitvilla-cyan px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.4)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            View class schedule
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            What to expect
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-fitvilla-light/90">
            Spin, HIIT, yoga, strength, recovery and combat sessions run across Sector 76, Sector 133 and Mayur Vihar. Check the schedule for times and instructors — no extra charge, just show up and train.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-fitvilla-muted">
            <span>Spin</span>
            <span>·</span>
            <span>HIIT</span>
            <span>·</span>
            <span>Yoga</span>
            <span>·</span>
            <span>Strength</span>
            <span>·</span>
            <span>Recovery</span>
          </div>
          <Link
            href="/classes/calendar"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-fitvilla-cyan/50 px-6 py-3 text-sm font-semibold text-fitvilla-cyan transition-colors hover:bg-fitvilla-cyan/10"
          >
            Open full schedule
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
