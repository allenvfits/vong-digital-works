export type Role = "owner" | "staff" | "bookkeeper";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function backendConfigured() { return Boolean(supabaseUrl && serviceKey); }

async function supabase(path: string, init: RequestInit = {}) {
  if (!supabaseUrl || !serviceKey) throw new Error("Supabase is not configured");
  return fetch(`${supabaseUrl}/rest/v1/${path}`, { ...init, headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "return=representation", ...init.headers }, cache: "no-store" });
}

export async function authorize(request: Request, roles: Role[] = ["owner", "staff", "bookkeeper"]) {
  const cookieToken = request.headers.get("cookie")?.match(/(?:^|;\s*)vdw_access_token=([^;]+)/)?.[1];
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") || (cookieToken ? decodeURIComponent(cookieToken) : undefined);
  if (!token || !supabaseUrl || !serviceKey) return null;
  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: { apikey: serviceKey, Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!userResponse.ok) return null;
  const user = await userResponse.json() as { id: string; email?: string };
  const profileResponse = await supabase(`profiles?id=eq.${encodeURIComponent(user.id)}&select=id,full_name,role`);
  const profiles = await profileResponse.json() as Array<{ id: string; full_name: string | null; role: Role }>;
  const profile = profiles[0];
  return profile && roles.includes(profile.role) ? { ...user, ...profile } : null;
}

export async function tableGet(table: string, query = "select=*") {
  const response = await supabase(`${table}?${query}`);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function tableInsert(table: string, value: unknown) {
  const response = await supabase(table, { method: "POST", body: JSON.stringify(value) });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function tableUpdate(table: string, id: string, value: unknown) {
  const response = await supabase(`${table}?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(value) });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function stripeRequest(path: string, params: URLSearchParams) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  const response = await fetch(`https://api.stripe.com/v1/${path}`, { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" }, body: params });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
