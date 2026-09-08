import { LocationsMapSection } from "@/components/locations/LocationsMapSection";
import { LocationStackCarousel } from "@/components/locations/LocationStackCarousel";

export const metadata = {
  title: "Locations | FitVilla",
  description: "Choose your nearest FitVilla – Noida Sector 76, Sector 133, Mayur Vihar.",
};

export default function LocationsPage() {
  return (
    <main className="bg-black">
      {/* Hero – Find Your Nearest Fitvilla */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8">
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
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-fitvilla-cyan">
            Find Us
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Nearest Fitvilla
          </h1>
          <p className="mt-6 text-lg text-fitvilla-light/90 sm:text-xl">
            Three branches across Noida and Delhi — explore the map below, then choose your branch.
          </p>
        </div>
      </section>
      <LocationsMapSection />
      <LocationStackCarousel />
    </main>
  );
}
