 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/admin/content", label: "Homepage Content" },
  { href: "/admin/videos", label: "Experience Videos" },
  { href: "/admin/schedule", label: "Schedule & Notes" },
  { href: "/admin/calendar", label: "Class Calendar" },
];

const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin123";
const AUTH_KEY = "fitvilla-admin-auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(AUTH_KEY);
      if (stored === "true") {
        setIsAuthed(true);
      }
    } catch {
      // ignore
    } finally {
      setChecked(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      try {
        window.localStorage.setItem(AUTH_KEY, "true");
      } catch {
        // ignore
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    try {
      window.localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
  };

  if (!checked) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-50">
        <p className="text-sm text-slate-400">Loading admin panel…</p>
      </main>
    );
  }

  if (!isAuthed) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-50">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl shadow-black/60 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-fitvilla-cyan/20 ring-1 ring-fitvilla-cyan/60">
              <span className="text-xs font-black tracking-[0.18em] text-fitvilla-cyan">
                FV
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fitvilla-cyan">
                FitVilla
              </p>
              <p className="text-sm font-medium text-slate-100">Admin Login</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-5 space-y-4 text-sm">
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                placeholder="admin@admin.com"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-xs text-rose-400">{error}</p>}
            <button
              type="submit"
              className="mt-1 w-full rounded-full bg-fitvilla-cyan px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-fitvilla-glow hover:shadow-[0_0_24px_rgba(45,212,228,0.6)]"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-[11px] text-slate-500">
            Access to this dashboard is restricted to FitVilla administrators.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-50">
      {/* Top nav */}
      <header className="border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-fitvilla-cyan/20 ring-1 ring-fitvilla-cyan/50">
              <span className="text-xs font-black tracking-[0.18em] text-fitvilla-cyan">
                FV
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fitvilla-cyan">
                FitVilla
              </p>
              <p className="text-sm font-medium text-slate-100">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-fitvilla-cyan/60 hover:bg-fitvilla-cyan/10 hover:text-fitvilla-cyan"
            >
              View Website
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-100 transition hover:bg-rose-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Shell with sidebar + main */}
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6 lg:py-8">
        {/* Sidebar */}
        <aside className="hidden w-60 flex-col gap-4 rounded-3xl border border-white/10 bg-black/60 p-4 text-xs text-slate-300 shadow-xl shadow-black/40 backdrop-blur-2xl lg:flex">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Navigation
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Switch between admin tools.
            </p>
          </div>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl px-3 py-2 text-xs font-medium transition ${
                    active
                      ? "bg-fitvilla-cyan/15 text-fitvilla-cyan ring-1 ring-fitvilla-cyan/60"
                      : "bg-white/0 text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-fitvilla-cyan shadow-[0_0_8px_rgba(45,212,228,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main area */}
        <section className="flex-1">
          {/* Inline nav for mobile */}
          <nav className="mb-4 flex gap-2 overflow-x-auto pb-1 text-xs lg:hidden">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition ${
                    active
                      ? "bg-fitvilla-cyan text-black"
                      : "bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {children}
        </section>
      </div>
    </main>
  );
}

