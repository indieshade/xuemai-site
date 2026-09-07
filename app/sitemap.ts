import type { MetadataRoute } from "next";
import { siteUrl } from "./site-path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLastModified = new Date("2026-09-07T00:00:00.000Z");
  const productLastModified = new Date("2026-08-25T00:00:00.000Z");

  return [
    {
      url: siteUrl,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/domains/`,
      lastModified: productLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/interactive-ai-learning-system/`,
      lastModified: productLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/what-is-xuemai/`,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/learn-from-materials/`,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/learning-map/`,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/download/`,
      lastModified: productLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pricing/`,
      lastModified: productLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy/`,
      lastModified: productLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/changelog/`,
      lastModified: productLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
