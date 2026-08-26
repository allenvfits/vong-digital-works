import type { MetadataRoute } from "next";

const baseUrl = "https://vongdigitalworks.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/showcase", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/security", priority: 0.7, changeFrequency: "monthly" as const },
    {
      path: "/demo/real-estate",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/demo/fitness",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/demo/restaurant",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/demo/ecommerce",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
  ];
  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
