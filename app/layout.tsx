import type { Metadata } from "next";
import CookieConsent from "./CookieConsent";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://vongdigitalworks.com"),
  title: "Vong Digital Works | Advanced Full-Stack Engineering",
  description:
    "Vong Digital Works creates custom full-stack websites, from strategy and frontend design to powerful backend systems.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Vong Digital Works",
    description:
      "Advanced full-stack engineering for brands that refuse to look ordinary.",
    type: "website",
    images: [
      { url: "/og.png", width: 1732, height: 909, alt: "Vong Digital Works" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vong Digital Works",
    description:
      "Advanced full-stack engineering for brands that refuse to look ordinary.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
