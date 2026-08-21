import { notFound } from "next/navigation";
import DemoSite from "../DemoSite";

const slugs = ["real-estate", "fitness", "restaurant", "ecommerce"];

export function generateStaticParams() { return slugs.map(slug => ({ slug })); }

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  return <DemoSite slug={slug} />;
}
