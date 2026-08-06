"use client";

import Image from "next/image";
import Link from "next/link";
import { freeTrialCta } from "@/content/site";
import { scrollToLeadForm } from "@/lib/scroll";
import { Card } from "@/components/ui/Card";

const transformations = [
  {
    name: "Sanchi Malhotra",
    summary: "9 kg fat loss · 6 months",
    imageSrc: "/images/transformations/sanchi-malhotra.jpg",
  },
  {
    name: "Atharva Pusalkar",
    summary: "5 kg fat loss · 6 months",
    imageSrc: "/images/transformations/atharva-pusalkar.jpg",
  },
  {
    name: "Raj Dubey",
    summary: "12 month transformation",
    imageSrc: "/images/transformations/raj-dubey.jpg",
  },
];

export function TransformationsSection() {

  return (
    <section
      aria-labelledby="transformations-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="transformations-heading"
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Real Members. Real Results.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {transformations.map((transformation) => (
            <Card
              key={transformation.name}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
            >
              <div className="relative aspect-[4/5] bg-fitvilla-deep">
                <Image
                  src={transformation.imageSrc}
                  alt={`${transformation.name} FitVilla transformation`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="p-4 text-center text-sm text-fitvilla-light/80">
                <h3 className="font-bold text-white">{transformation.name}</h3>
                <p className="mt-1">{transformation.summary}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
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
