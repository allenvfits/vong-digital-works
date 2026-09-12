import { customerDestination } from "@/lib/customer-access";
export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !serviceKey) return Response.json({ error: "Supabase authentication is not configured" }, { status: 503 });
  const { email, password } = await request.json();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: key, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  const data = await response.json();
  if (!response.ok) return Response.json({ error: data.error_description || data.msg || "Sign in failed" }, { status: 401 });
  let destination: string;
  try { destination = await customerDestination(data.user); }
  catch (error) { return Response.json({error: error instanceof Error ? error.message : "Unable to open your account."}, {status: 503}); }
  return new Response(JSON.stringify({ ok: true,destination }), { headers: { "Content-Type": "application/json", "Set-Cookie": `vdw_access_token=${encodeURIComponent(data.access_token)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${data.expires_in || 3600}` } });
}
