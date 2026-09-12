// Call only with a user returned by Supabase's verified authentication endpoints.
export async function customerDestination(user: { id: string; email?: string; email_confirmed_at?: string }) {
  if (!user.email || !user.email_confirmed_at) throw new Error("Confirm your email before signing in.");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const profile = await fetch(`${url}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=role`, { headers, cache: "no-store" });
  if (!profile.ok) throw new Error("Unable to open your account. Please try again.");
  const rows = await profile.json();
  if (rows.some((row: {role: string}) => ["owner", "staff", "bookkeeper"].includes(row.role))) return "/dashboard";
  // Only the verified auth ID owns this new, empty customer record. Never claim by email.
  const created = await fetch(`${url}/rest/v1/clients?on_conflict=auth_user_id`, {
    method: "POST", headers: { ...headers, Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({ auth_user_id: user.id, email: user.email, name: user.email }),
  });
  if (!created.ok) throw new Error("Unable to prepare your customer portal. Please try again.");
  return "/portal";
}
