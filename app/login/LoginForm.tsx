"use client";

import { FormEvent, useEffect, useState } from "react";

type Provider = "google" | "apple";
type Providers = Record<Provider, boolean>;

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Providers>({ google: false, apple: false });

  useEffect(() => {
    fetch("/api/auth/providers", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setProviders({ google: Boolean(data.google), apple: Boolean(data.apple) }))
      .catch(() => undefined);
  }, []);

  function socialSignIn(provider: Provider) {
    setError("");
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      setError("Social sign-in is not configured yet.");
      return;
    }
    const redirectTo = `${window.location.origin}/auth/callback`;
    const authorize = new URL(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/authorize`);
    authorize.searchParams.set("provider", provider);
    authorize.searchParams.set("redirect_to", redirectTo);
    window.location.assign(authorize.toString());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.assign(data.destination || "/portal");
      return;
    }
    setError(data.error || "Sign in failed");
    setLoading(false);
  }

  const hasSocial = providers.google || providers.apple;

  return <form className="loginCard" onSubmit={submit}>
    <a className="brand" href="/"><span>V</span> VONG / DIGITAL WORKS</a>
    <p className="kicker">Secure account access</p>
    <h1>Sign in to your<br />private workspace.</h1>
    {hasSocial && <div className="socialLogin" aria-label="Social sign-in options">
      {providers.google && <button type="button" className="socialButton" onClick={() => socialSignIn("google")}><span className="googleMark" aria-hidden="true">G</span>Continue with Google</button>}
      {providers.apple && <button type="button" className="socialButton appleButton" onClick={() => socialSignIn("apple")}><span className="appleMark" aria-hidden="true">●</span>Continue with Apple</button>}
      <div className="loginDivider"><span>or use your password</span></div>
    </div>}
    <label>Email<input name="email" type="email" required autoComplete="email" /></label>
    <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
    {error && <p className="loginError">{error}</p>}
    <button className="dashAdd" disabled={loading}>{loading ? "Signing in…" : "Sign in →"}</button>
    <small>Approved team members enter the business dashboard. Customers enter a private portal containing only their own records.</small>
  </form>;
}
