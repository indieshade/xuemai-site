import type { MetadataRoute } from "next";
import { siteUrl } from "./site-path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-25T00:00:00.000Z");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/domains/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/interactive-ai-learning-system/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
