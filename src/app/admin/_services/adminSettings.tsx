 "use client";

import { useEffect, useState } from "react";
import {
  siteTagline as defaultSiteTagline,
  heroHeadline as defaultHeroHeadline,
  heroSubtext as defaultHeroSubtext,
} from "@/content/site";
import { videoCards as defaultVideoCards, type VideoCardItem } from "@/content/videoCards";
import { heroPosterDefault, heroVideoDefault } from "@/content/heroMedia";

export type HeroSettings = {
  siteTagline: string;
  heroHeadline: string;
  heroSubtext: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
};

export type AdminSettings = {
  hero: HeroSettings;
  videos: VideoCardItem[];
  scheduleNote: string;
};

const STORAGE_KEY = "fitvilla-admin-settings";
const OLD_LOCAL_HERO_VIDEO = "/videos/hero.mp4";

const DEFAULT_SETTINGS: AdminSettings = {
  hero: {
    siteTagline: defaultSiteTagline,
    heroHeadline: defaultHeroHeadline,
    heroSubtext: defaultHeroSubtext,
    heroVideoUrl: heroVideoDefault,
    heroPosterUrl: heroPosterDefault,
  },
  videos: defaultVideoCards,
  scheduleNote: "Update class schedule details or special announcements here.",
};

export type AdminStatus = "" | "saved";

type UseAdminSettingsResult = {
  settings: AdminSettings | null;
  status: AdminStatus;
  setHero: (patch: Partial<HeroSettings>) => void;
  setVideo: (id: string, patch: Partial<VideoCardItem>) => void;
  setScheduleNote: (note: string) => void;
};

export function useAdminSettings(): UseAdminSettingsResult {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [status, setStatus] = useState<AdminStatus>("");

  // Load settings from localStorage on first render
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setSettings(DEFAULT_SETTINGS);
          return;
        }
        const parsed = JSON.parse(raw) as AdminSettings;
        setSettings({
          hero: {
            ...DEFAULT_SETTINGS.hero,
            ...parsed.hero,
            heroVideoUrl:
              parsed.hero?.heroVideoUrl === OLD_LOCAL_HERO_VIDEO
                ? heroVideoDefault
                : parsed.hero?.heroVideoUrl || DEFAULT_SETTINGS.hero.heroVideoUrl,
          },
          videos: parsed.videos?.length ? parsed.videos : DEFAULT_SETTINGS.videos,
          scheduleNote: parsed.scheduleNote ?? DEFAULT_SETTINGS.scheduleNote,
        });
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  // Auto-save to localStorage whenever settings change
  useEffect(() => {
    if (!settings) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      const saveId = window.setTimeout(() => setStatus("saved"), 0);
      const clearId = window.setTimeout(() => setStatus(""), 2000);
      return () => {
        window.clearTimeout(saveId);
        window.clearTimeout(clearId);
      };
    } catch {
      // ignore storage errors
    }
  }, [settings]);

  const setHero = (patch: Partial<HeroSettings>) =>
    setSettings((prev) => (prev ? { ...prev, hero: { ...prev.hero, ...patch } } : prev));

  const setVideo = (id: string, patch: Partial<VideoCardItem>) =>
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            videos: prev.videos.map((v) => (v.id === id ? { ...v, ...patch } : v)),
          }
        : prev
    );

  const setScheduleNote = (note: string) =>
    setSettings((prev) => (prev ? { ...prev, scheduleNote: note } : prev));

  return { settings, status, setHero, setVideo, setScheduleNote };
}
