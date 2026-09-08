"use client";

import Image from "next/image";
import Link from "next/link";
import { getFeatures } from "@/content/features";
import { getFeatureCardImageUrl } from "@/content/ecosystemGallery";
import { FeatureIcon } from "@/components/icons/FeatureIcons";
import { useInView } from "@/hooks/useInView";
import { Card } from "@/components/ui/Card";

export default function FacilitiesPage() {
  const [heroInView, heroRef] = useInView();
  const features = getFeatures();

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
            What We Offer
          </p>
          <h1
            className={`text-4xl font-bold leading-tight tracking-tight text-white transition-all duration-1000 delay-75 sm:text-5xl lg:text-6xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            World-Class Facilities Under One Roof
          </h1>
          <p
            className={`mt-6 text-lg text-fitvilla-light/90 transition-all duration-1000 delay-150 sm:text-xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            From Technogym equipment and certified coaches to steam, sauna, and recovery — every detail is designed to elevate your training.
          </p>
        </div>
      </section>

      {/* Facilities grid */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore Our Facilities
            </h2>
            <p className="mt-4 text-lg text-fitvilla-muted">
              From Technogym floors and BCA body analysis to steam, sauna, lockers and wellness cafe — explore what each branch offers.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, index) => {
              const imageSrc = getFeatureCardImageUrl(index, f.imageSrc ?? "");
              return (
                <Card
                  key={f.id}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-fitvilla-cyan/30 hover:shadow-[0_12px_40px_-12px_rgba(45,212,228,0.2)] ${
                    f.priority === "highlight"
                      ? "ring-1 ring-fitvilla-cyan/20"
                      : ""
                  }`}
                >
                  {imageSrc && (
                    <div className="absolute inset-0 [transform:translateZ(0)]">
                      {imageSrc.includes("drive.google.com") ? (
                        <img
                          src={imageSrc}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    </div>
                  )}
                  <div className="relative flex flex-col items-center p-6 text-center sm:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-fitvilla-cyan ring-1 ring-white/20 transition-all duration-300 group-hover:bg-fitvilla-cyan/20 group-hover:ring-fitvilla-cyan/40">
                      <FeatureIcon featureId={f.id} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fitvilla-light/90">
                      {f.subtext}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="mt-16 flex justify-center">
            <Link
              href="/#lead-form"
              className="rounded-full bg-fitvilla-cyan px-8 py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.4)]"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
