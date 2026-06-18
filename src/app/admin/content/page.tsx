 "use client";

import Image from "next/image";
import { useAdminSettings } from "../_services/adminSettings";
import { getAllLocations, type LocationSlug } from "@/content/locations";

export default function AdminHeroContentPage() {
  const { settings, status, setHero, setLocationImage } = useAdminSettings();
  const locations = getAllLocations();

  if (!settings) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-slate-400">Loading hero content…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Homepage Content</h1>
          <p className="mt-1 text-xs text-slate-300">
            Update the hero text and the location card images shown on the homepage.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
            status === "saved"
              ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-500/50"
              : "bg-slate-700/70 text-slate-200 ring-1 ring-slate-600/60"
          }`}
        >
          {status === "saved" ? "Saved" : "Autosave idle"}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-black/90 p-6 shadow-xl shadow-black/40 backdrop-blur-xl">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-fitvilla-cyan/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
          <div className="md:w-1/2">
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
              Text Settings
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Site Tagline (small text)
                </label>
                <input
                  type="text"
                  value={settings.hero.siteTagline}
                  onChange={(e) => setHero({ siteTagline: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                  placeholder="TRAIN. NOURISH. TRANSFORM."
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Hero Headline (big title)
                </label>
                <input
                  type="text"
                  value={settings.hero.heroHeadline}
                  onChange={(e) => setHero({ heroHeadline: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                  placeholder="LUXURY FITNESS HAS A NEW ADDRESS"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Hero Subtext
                </label>
                <textarea
                  value={settings.hero.heroSubtext}
                  onChange={(e) => setHero({ heroSubtext: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                  placeholder="Premium Technogym equipment. Certified coaches. Steam, sauna and recovery."
                />
              </div>
            </div>
          </div>

          <div className="relative mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 md:mt-0 md:w-1/2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
              Live Preview
            </p>
            <div className="mt-3 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 to-black px-4 py-6 text-center text-xs text-slate-200">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-fitvilla-cyan">
                {settings.hero.siteTagline || "SITE TAGLINE"}
              </p>
              <p className="mb-2 text-xl font-bold tracking-tight text-white">
                {settings.hero.heroHeadline || "Your Hero Headline"}
              </p>
              <p className="mx-auto max-w-md text-[11px] text-slate-300">
                {settings.hero.heroSubtext || "Hero subtext will appear here."}
              </p>
              <div className="mt-5 inline-flex gap-3">
                <span className="rounded-full bg-fitvilla-cyan px-4 py-2 text-[11px] font-semibold text-black">
                  Start Free Trial
                </span>
                <span className="rounded-full border border-white/40 px-4 py-2 text-[11px] font-semibold text-white">
                  View Locations
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Hero Background Video URL (Vimeo or MP4)
                </label>
                <input
                  type="text"
                  value={settings.hero.heroVideoUrl}
                  onChange={(e) => setHero({ heroVideoUrl: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-[11px] text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                  placeholder="https://vimeo.com/123456789 or /videos/hero.mp4"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Hero Poster Image URL
                </label>
                <input
                  type="text"
                  value={settings.hero.heroPosterUrl}
                  onChange={(e) => setHero({ heroPosterUrl: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-[11px] text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                  placeholder="/images/hero/hero-1.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
              Location Card Images
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Change the pictures below “Choose Your Nearest Fitvilla”. Use a local path like
              /images/locations/sector-76.jpg or a full image URL.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {locations.map((location) => {
            const slug = location.slug as LocationSlug;
            const imagePath =
              settings.locationImages[slug] || location.imagePath;

            return (
              <div
                key={location.slug}
                className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 text-xs"
              >
                <div className="relative aspect-[4/3] bg-slate-900">
                  {imagePath ? (
                    <Image
                      src={imagePath}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-500">
                      No image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-semibold text-white">{location.name}</p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      {location.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 p-3">
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={imagePath}
                    onChange={(e) => setLocationImage(slug, e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-[11px] text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                    placeholder={location.imagePath}
                  />
                  <button
                    type="button"
                    onClick={() => setLocationImage(slug, location.imagePath)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-200 transition hover:border-fitvilla-cyan/50 hover:text-fitvilla-cyan"
                  >
                    Reset default
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
