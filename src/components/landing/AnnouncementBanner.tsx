"use client";

import { useEffect, useState } from "react";
import { FontWeightText } from "@/registry/eldoraui/font-weight-text";

type AdminAnnouncement = {
  message?: string | null;
  updatedAt?: string | null;
};

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/announcement");
        if (!res.ok) return;
        const data = (await res.json()) as AdminAnnouncement;
        setAnnouncement(data.message?.trim() || "");
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  if (!announcement) {
    return null;
  }

  return (
    <div className="sticky top-[var(--navbar-height,89px)] z-40 border-b border-fitvilla-cyan/40 bg-gradient-to-r from-black via-fitvilla-deep to-black">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-xs text-fitvilla-light/90 sm:text-sm">
        <span className="inline-flex items-center gap-1 rounded-full bg-fitvilla-cyan/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
          <span className="h-2 w-2 animate-pulse rounded-full bg-fitvilla-cyan shadow-[0_0_8px_rgba(45,212,228,0.9)]" />
          <span>Schedule update</span>
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <FontWeightText
              text={announcement}
              fontSize={14}
              className="text-cyan-200"
              minWeight={500}
              maxWeight={850}
              animationDuration={1.6}
              delayMultiplier={0.03}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
