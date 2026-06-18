import { getTestimonialVideos } from "@/content/testimonialVideos";
import { getVideoEmbed } from "@/lib/videoEmbed";

export function TestimonialVideosSection() {
  const videos = getTestimonialVideos();

  return (
    <section
      aria-labelledby="testimonial-videos-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="testimonial-videos-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Member Stories
          </h2>
          <p className="mt-3 text-sm text-fitvilla-light/80 sm:text-base">
            Real FitVilla members sharing their training experience.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {videos.map((video) => {
            const embed = getVideoEmbed(video.videoSrc);

            return (
              <div
                key={video.id}
                className="mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40 transition hover:border-fitvilla-cyan/40 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-fitvilla-deep">
                  {embed ? (
                    <iframe
                      src={embed.src}
                      title={video.title}
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-fitvilla-muted">
                      Video unavailable
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
