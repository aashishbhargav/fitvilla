export interface TestimonialVideoItem {
  id: string;
  title: string;
  videoSrc: string;
}

export const testimonialVideos: TestimonialVideoItem[] = [
  {
    id: "member-story-1",
    title: "FitVilla member testimonial 1",
    videoSrc: "https://vimeo.com/1202159649",
  },
  {
    id: "member-story-2",
    title: "FitVilla member testimonial 2",
    videoSrc: "https://vimeo.com/1202156715",
  },
  {
    id: "member-story-3",
    title: "FitVilla member testimonial 3",
    videoSrc: "https://vimeo.com/1202159648",
  },
];

export function getTestimonialVideos(): TestimonialVideoItem[] {
  return testimonialVideos;
}
