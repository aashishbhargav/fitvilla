 "use client";

import { useAdminSettings } from "../_services/adminSettings";

export default function AdminVideosPage() {
  const { settings, status, setVideo } = useAdminSettings();

  if (!settings) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-slate-400">Loading videos…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Experience Videos</h1>
          <p className="mt-1 text-xs text-slate-300">
            Update the three main experience videos shown below the hero section.
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

      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/40 backdrop-blur-xl">
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
          Video Cards
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {settings.videos.map((card) => (
            <div
              key={card.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Card {card.id}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Title
                </label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => setVideo(card.id, { title: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-[11px] text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Description
                </label>
                <textarea
                  value={card.description}
                  onChange={(e) => setVideo(card.id, { description: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-[11px] text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Video URL (Vimeo, MP4, or Google Drive embed)
                </label>
                <input
                  type="text"
                  value={card.videoSrc}
                  onChange={(e) => setVideo(card.id, { videoSrc: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-[11px] text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  value={card.imageSrc}
                  onChange={(e) => setVideo(card.id, { imageSrc: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 text-[11px] text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
