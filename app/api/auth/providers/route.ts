export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return Response.json({ google: false, apple: false });

  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/auth/v1/settings`, {
      headers: { apikey: key },
      cache: "no-store",
    });
    if (!response.ok) return Response.json({ google: false, apple: false });
    const settings = await response.json();
    return Response.json({
      google: Boolean(settings.external?.google),
      apple: Boolean(settings.external?.apple),
    });
  } catch {
    return Response.json({ google: false, apple: false });
  }
}
