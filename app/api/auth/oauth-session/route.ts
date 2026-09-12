import { customerDestination } from "@/lib/customer-access";
export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !serviceKey) return Response.json({ error: "Supabase authentication is not configured" }, { status: 503 });

  const { accessToken, expiresIn } = await request.json();
  if (typeof accessToken !== "string" || !accessToken) return Response.json({ error: "Missing sign-in session" }, { status: 400 });

  const authResponse = await fetch(`${url.replace(/\/$/, "")}/auth/v1/user`, {
    headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!authResponse.ok) return Response.json({ error: "The sign-in session could not be verified." }, { status: 401 });
  const user = await authResponse.json();
  if (!user?.id) return Response.json({ error: "The sign-in session is invalid." }, { status: 401 });

  let destination: string;
  try { destination = await customerDestination(user); }
  catch (error) { return Response.json({error: error instanceof Error ? error.message : "Unable to open your account."}, {status: 503}); }
  const maxAge = Math.min(Math.max(Number(expiresIn) || 3600, 60), 3600);
  return new Response(JSON.stringify({ ok: true, destination }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `vdw_access_token=${encodeURIComponent(accessToken)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${maxAge}`,
    },
  });
}
