"use client";

import { useState } from "react";
import Link from "next/link";
import {
  contactEmail,
  phone1,
  phone2,
  openingHours,
} from "@/content/footer";
import { useInView } from "@/hooks/useInView";
import { Input } from "@/components/ui/Input";

const WHATSAPP_NUMBER = "918448519333";

function buildWhatsAppMessage(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
}): string {
  const lines = [
    `*New enquiry from FitVilla Contact*`,
    ``,
    `*Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    `*Email:* ${data.email}`,
    ``,
    `*Message:*`,
    data.message,
  ];
  return lines.join("\n");
}

export default function ContactPage() {
  const [heroInView, heroRef] = useInView();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(buildWhatsAppMessage(form));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
            Get in Touch
          </p>
          <h1
            className={`text-4xl font-bold leading-tight tracking-tight text-white transition-all duration-1000 delay-75 sm:text-5xl lg:text-6xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            We&apos;d Love to Hear From You
          </h1>
          <p
            className={`mt-6 text-lg text-fitvilla-light/90 transition-all duration-1000 delay-150 sm:text-xl ${
              heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Reach out for membership enquiries, free trial bookings, or any questions. Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact: cards left, form right */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
            {/* Left: cards – same layout: icon left, content right */}
            <div className="flex flex-col gap-6">
              {/* Email */}
              <a
                href={`mailto:${contactEmail}`}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fitvilla-cyan/20 text-fitvilla-cyan transition-colors group-hover:bg-fitvilla-cyan/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="mt-1 truncate text-sm text-fitvilla-light/90">{contactEmail}</p>
                  <p className="mt-2 text-xs text-fitvilla-cyan/80">Click to send an email</p>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fitvilla-cyan/20 text-fitvilla-cyan">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">Phone</h3>
                  <a href={`tel:${phone1.replace(/\D/g, "")}`} className="mt-1 block text-sm text-fitvilla-light/90 hover:text-fitvilla-cyan">
                    {phone1}
                  </a>
                  <a href={`tel:${phone2.replace(/\D/g, "")}`} className="mt-1 block text-sm text-fitvilla-light/90 hover:text-fitvilla-cyan">
                    {phone2}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fitvilla-cyan/20 text-fitvilla-cyan">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">Opening Hours</h3>
                  <ul className="mt-3 space-y-2 text-sm text-fitvilla-light/90">
                    {openingHours.map((row) => (
                      <li key={row.days} className="flex justify-between gap-4">
                        <span>{row.days}</span>
                        <span className="text-fitvilla-cyan/90">{row.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: form – same height as left column */}
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-white">Send us a message</h2>
                  <p className="text-sm text-fitvilla-muted">We&apos;ll reply on WhatsApp</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 flex min-h-0 flex-1 flex-col gap-4">
                <Input
                  label="Name"
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <Input
                  label="Phone"
                  id="contact-phone"
                  type="tel"
                  placeholder="Your phone (with country code)"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <Input
                  label="Email"
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                />
                <div className="flex min-h-0 flex-1 flex-col space-y-1.5">
                  <label htmlFor="contact-message" className="block text-sm font-medium text-fitvilla-light/90">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Your message or enquiry..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="min-h-[120px] w-full flex-1 resize-y rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-white transition-all hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-black"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send via WhatsApp
                </button>
                <p className="mt-auto text-center text-xs text-fitvilla-muted">
                  Opens WhatsApp with your message. No account needed in the browser.
                </p>
              </form>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-16 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-center">
            <Link
              href="/#lead-form"
              className="rounded-full bg-fitvilla-cyan px-8 py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.4)]"
            >
              Start Free Trial
            </Link>
            <Link
              href="/locations"
              className="rounded-full border border-fitvilla-cyan/50 px-8 py-3.5 font-semibold text-fitvilla-cyan transition-all hover:bg-fitvilla-cyan/10 hover:border-fitvilla-cyan"
            >
              View Locations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
