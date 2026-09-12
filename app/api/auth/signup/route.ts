export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return Response.json({ error: "Account creation is temporarily unavailable. Please try again later." }, { status: 503 });
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || password.length < 8 || password.length > 128) return Response.json({ error: "Enter a valid email and a password between 8 and 128 characters." }, { status: 400 });
    const response = await fetch(`${url}/auth/v1/signup`, {
      method: "POST", headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) return Response.json({ error: response.status === 429 ? "Too many attempts. Please wait a few minutes before trying again." : data.msg || data.message || "Unable to create your account. Please try again." }, { status: response.status === 429 ? 429 : 400 });
    return Response.json({ ok: true, message: data.access_token ? "Your account is created. You can now sign in." : "Check your email for a confirmation link, then return here to sign in. If you already have an account, sign in with your existing password." });
  } catch { return Response.json({ error: "Unable to connect. Please try again." }, { status: 503 }); }
}
