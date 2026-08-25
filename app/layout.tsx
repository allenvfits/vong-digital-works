import type { Metadata } from "next";
import CookieConsent from "./CookieConsent";
import LeadChat from "./LeadChat";
import "./globals.css";
import "./enhanced.css";
import "./login.css";
import "./invoice.css";
import "./impact.css";
import "./apex.css";
import "./lex.css";
import "./range.css";
import "./reel.css";
import "./portal.css";
import "./inquiry.css";
import "./concept.css";
import "./professional.css";
import "./demo-lab.css";
import "./three.css";
import "./three-fallback.css";
import "./pricing.css";
import "./oauth.css";
import "./payment.css";
import "./cookie-consent.css";
import "./brand-logo.css";
import "./lead-chat.css";

const siteUrl = "https://vongdigitalworks.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Vong Digital Works",
  title: {
    default: "Vong Digital Works | Custom Websites & Full-Stack Development",
    template: "%s | Vong Digital Works",
  },
  description:
    "Vong Digital Works builds custom business websites, full-stack web applications, backend systems, portals, payments, and digital experiences designed to help businesses grow.",
  keywords: [
    "Vong Digital Works",
    "custom websites",
    "full-stack development",
    "web development",
    "business websites",
    "web applications",
    "backend systems",
    "website design",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Vong Digital Works | Custom Websites & Full-Stack Development",
    description:
      "Custom websites, web applications, backend systems, portals, payments, and digital experiences built for growing businesses.",
    url: siteUrl,
    siteName: "Vong Digital Works",
    type: "website",
    locale: "en_US",
    images: [
      { url: "/og.png", width: 1732, height: 909, alt: "Vong Digital Works" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vong Digital Works | Custom Websites & Full-Stack Development",
    description:
      "Custom websites, web applications, backend systems, portals, payments, and digital experiences built for growing businesses.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Vong Digital Works",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  image: `${siteUrl}/og.png`,
  email: "contact@vongdigitalworks.com",
  description:
    "Vong Digital Works builds custom websites, full-stack web applications, backend systems, portals, payments, and digital experiences for businesses.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Vong Digital Works",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <LeadChat />
        <CookieConsent />
      </body>
    </html>
  );
}
