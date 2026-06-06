"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { leadFormHeading, freeTrialCta } from "@/content/site";
import { LOCATION_OPTIONS } from "@/lib/constants";
import { openLeadOnWhatsApp, type LeadFormValues } from "@/lib/leadForm";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const TRIAL_IMAGES = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
];

const ROLES = { previous: 0, current: 1, next: 2 } as const;

function getImageIndexForRole(role: number, currentIndex: number): number {
  const n = TRIAL_IMAGES.length;
  if (role === ROLES.previous) return (currentIndex - 1 + n) % n;
  if (role === ROLES.current) return currentIndex;
  return (currentIndex + 1) % n;
}

interface LeadFormSectionProps {
  id?: string;
  formIdSuffix?: string;
}

export function LeadFormSection({ id, formIdSuffix = "" }: LeadFormSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roles, setRoles] = useState<number[]>([ROLES.previous, ROLES.current, ROLES.next]);
  const [form, setForm] = useState<LeadFormValues>({
    name: "",
    phone: "",
    location: LOCATION_OPTIONS[0]?.value ?? "",
    source: "Homepage free trial form",
  });
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const go = useCallback((direction: 1 | -1) => {
    if (direction === 1) {
      setRoles((r) => [r[2], r[0], r[1]]);
      setCurrentIndex((c) => (c + 1) % TRIAL_IMAGES.length);
    } else {
      setRoles((r) => [r[1], r[2], r[0]]);
      setCurrentIndex((c) => (c - 1 + TRIAL_IMAGES.length) % TRIAL_IMAGES.length);
    }
  }, []);

  const suffix = formIdSuffix ? `-${formIdSuffix}` : "";
  const headingId = `lead-form-heading${suffix}`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWhatsAppUrl(openLeadOnWhatsApp(form));
  };

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          {/* Left: voyage-style slider */}
          <div className="relative flex min-h-[220px] justify-center lg:order-1 lg:min-h-0 lg:justify-start">
            <div className="voyage-slider">
              <button
                type="button"
                className="voyage-slider__btn"
                onClick={() => go(-1)}
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <div className="voyage-slides-w">
                <div className="voyage-slides">
                  {[0, 1, 2].map((i) => {
                    const role = roles[i];
                    const imageIndex = getImageIndexForRole(role, currentIndex);
                    const src = TRIAL_IMAGES[imageIndex];
                    return (
                      <div
                        key={i}
                        className="voyage-slide"
                        data-current={role === ROLES.current ? "" : undefined}
                        data-previous={role === ROLES.previous ? "" : undefined}
                        data-next={role === ROLES.next ? "" : undefined}
                      >
                        <div className="voyage-slide__inner">
                          <div className="voyage-slide__img-w">
                            <Image
                              src={src}
                              alt=""
                              fill
                              className="voyage-slide__img object-cover"
                              sizes="(max-width: 1024px) 40vw, 280px"
                              unoptimized
                            />
                            <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                className="voyage-slider__btn"
                onClick={() => go(1)}
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:order-2">
            <h2
              id={headingId}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {leadFormHeading}
            </h2>
            <form
              className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                <Input
                  label="Name"
                  id={`name${suffix}`}
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <Input
                  label="Phone"
                  id={`phone${suffix}`}
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  required
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <Select
                  label="Location"
                  id={`location${suffix}`}
                  name="location"
                  options={LOCATION_OPTIONS}
                  required
                  value={form.location}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, location: event.target.value }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-fitvilla-cyan py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.35)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black"
              >
                {freeTrialCta}
              </button>
              {whatsAppUrl && (
                <p className="mt-4 text-center text-sm text-fitvilla-cyan">
                  WhatsApp opened with your trial request. If it did not open,{" "}
                  <a href={whatsAppUrl} target="_blank" rel="noreferrer" className="underline">
                    tap here to send it
                  </a>
                  .
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
