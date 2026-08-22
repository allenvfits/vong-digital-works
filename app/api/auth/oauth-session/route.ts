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

  const privateHeaders = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` };
  const [profilesResponse, clientsResponse] = await Promise.all([
    fetch(`${url}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=role`, { headers: privateHeaders, cache: "no-store" }),
    fetch(`${url}/rest/v1/clients?auth_user_id=eq.${encodeURIComponent(user.id)}&select=id`, { headers: privateHeaders, cache: "no-store" }),
  ]);
  const profiles = profilesResponse.ok ? await profilesResponse.json() : [];
  const clients = clientsResponse.ok ? await clientsResponse.json() : [];
  const destination = profiles[0] ? "/dashboard" : clients[0] ? "/portal" : null;
  if (!destination) return Response.json({ error: "This account has not been approved for access." }, { status: 403 });

  const maxAge = Math.min(Math.max(Number(expiresIn) || 3600, 60), 3600);
  return new Response(JSON.stringify({ ok: true, destination }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `vdw_access_token=${encodeURIComponent(accessToken)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${maxAge}`,
    },
  });
}
