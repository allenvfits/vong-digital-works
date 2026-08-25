import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vong Digital Works",
    short_name: "Vong Digital",
    description:
      "Custom websites, full-stack web applications, backend systems, portals, payments, and digital experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#030609",
    theme_color: "#030609",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
