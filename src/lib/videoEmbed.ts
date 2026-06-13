export type VideoEmbedProvider = "vimeo" | "drive";

export type VideoEmbed = {
  provider: VideoEmbedProvider;
  src: string;
};

type EmbedOptions = {
  controls?: boolean;
};

function appendParams(src: string, params: Record<string, string>) {
  const url = new URL(src);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

function getVimeoVideoId(url: URL) {
  if (url.hostname === "vimeo.com" || url.hostname === "www.vimeo.com") {
    return url.pathname.split("/").filter(Boolean)[0] ?? "";
  }

  if (url.hostname === "player.vimeo.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[0] === "video" ? parts[1] ?? "" : "";
  }

  return "";
}

export function getVideoEmbed(src: string, options: EmbedOptions = {}): VideoEmbed | null {
  if (!src) return null;

  try {
    const url = new URL(src);

    if (url.hostname.includes("drive.google.com")) {
      const sep = src.includes("?") ? "&" : "?";
      return {
        provider: "drive",
        src: `${src}${sep}autoplay=1`,
      };
    }

    const videoId = getVimeoVideoId(url);
    if (!videoId) return null;

    const embedUrl = new URL(`https://player.vimeo.com/video/${videoId}`);
    const privacyHash = url.searchParams.get("h");
    if (privacyHash) embedUrl.searchParams.set("h", privacyHash);

    return {
      provider: "vimeo",
      src: appendParams(embedUrl.toString(), {
        autoplay: "1",
        muted: "1",
        loop: "1",
        playsinline: "1",
        dnt: "1",
        ...(options.controls === false ? { controls: "0" } : {}),
      }),
    };
  } catch {
    return null;
  }
}

export function isEmbeddableVideo(src: string): boolean {
  return getVideoEmbed(src) !== null;
}
