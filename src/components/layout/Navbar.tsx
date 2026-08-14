"use client";

import Link from "next/link";
import Image from "next/image";
import { navLinks, ctaLabel, ctaHref } from "@/content/nav";
import { siteName } from "@/content/site";
import { useState } from "react";
import { useNavbarScrolled } from "@/hooks/useScrollPosition";

const LOGO = "/images/logo/fitvilla-logo.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useNavbarScrolled();

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-white/10 bg-black/95 py-1.5" : "border-white/10 bg-black/75 py-2"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`logo-no-bg navbar-logo flex shrink-0 items-center justify-center rounded-full px-2 focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 ${
            scrolled ? "h-11 sm:h-12" : "h-14 sm:h-16 md:h-[72px]"
          }`}
          aria-label={`${siteName} home`}
        >
          <Image
            src={LOGO}
            alt={siteName}
            width={280}
            height={90}
            className="h-full w-auto max-w-full object-contain object-left"
            priority
            sizes="(max-width: 768px) 180px, 280px"
            unoptimized
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-fitvilla-light/90 transition-colors hover:text-fitvilla-cyan"
            >
              {label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            className="rounded-full bg-fitvilla-cyan px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.4)]"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 rounded p-2 text-fitvilla-light md:hidden"
        >
          <span className={`h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-md transition-all duration-300 md:hidden ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg py-3 text-fitvilla-light/90 hover:bg-white/5 hover:text-fitvilla-cyan"
            >
              {label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-fitvilla-cyan py-3 text-center font-semibold text-black"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </nav>
  );
}
