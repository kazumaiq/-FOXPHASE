import type { MetadataRoute } from "next";
import { beats } from "@/content/site";

const routes = [
  "",
  "/beats",
  "/licenses",
  "/services",
  "/releases",
  "/collaborations",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = routes.map((route, index) => ({
    url: `https://foxphase.com${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: index === 0 ? 1 : 0.8,
  }));

  const beatEntries: MetadataRoute.Sitemap = beats.map((beat) => ({
    url: `https://foxphase.com/beats/${beat.slug}`,
    lastModified: new Date(beat.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...beatEntries];
}
