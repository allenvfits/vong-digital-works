import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/portal/",
        "/auth/",
        "/pay/",
        "/login",
        "/reset-password",
      ],
    },
    sitemap: "https://vongdigitalworks.com/sitemap.xml",
    host: "https://vongdigitalworks.com",
  };
}
