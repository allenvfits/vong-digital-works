import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://allen-web-studio.avongs97.chatgpt.site"),
  title: "Vong Digital Works | Advanced Full-Stack Engineering",
  description: "Vong Digital Works creates custom full-stack websites, from strategy and frontend design to powerful backend systems.",
  openGraph: { title: "Vong Digital Works", description: "Advanced full-stack engineering for brands that refuse to look ordinary.", type: "website", images: [{ url: "/og.png", width: 1732, height: 909, alt: "Vong Digital Works" }] },
  twitter: { card: "summary_large_image", title: "Vong Digital Works", description: "Advanced full-stack engineering for brands that refuse to look ordinary.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
