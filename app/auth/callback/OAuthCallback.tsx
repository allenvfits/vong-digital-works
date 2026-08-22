"use client";

import { useEffect, useState } from "react";

export default function OAuthCallback() {
  const [error, setError] = useState("");

  useEffect(() => {
    async function completeSignIn() {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const query = new URLSearchParams(window.location.search);
      const providerError = hash.get("error_description") || query.get("error_description") || hash.get("error") || query.get("error");
      const accessToken = hash.get("access_token");
      const expiresIn = hash.get("expires_in");
      window.history.replaceState({}, document.title, "/auth/callback");
      if (providerError) {
        setError(providerError);
        return;
      }
      if (!accessToken) {
        setError("No sign-in session was returned. Please try again.");
        return;
      }

      const response = await fetch("/api/auth/oauth-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, expiresIn }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Social sign-in could not be completed.");
        return;
      }
      window.location.replace(data.destination || "/portal");
    }
    completeSignIn().catch(() => setError("Social sign-in could not be completed."));
  }, []);

  return <main className="oauthPage"><section className="oauthCard">
    <a className="brand" href="/"><span>V</span> VONG / DIGITAL WORKS</a>
    {!error ? <><div className="oauthSpinner" aria-hidden="true" /><p className="kicker">Secure connection</p><h1>Completing sign in…</h1><small>Verifying your approved workspace access.</small></> : <><p className="kicker">Sign-in interrupted</p><h1>We couldn&apos;t sign you in.</h1><p className="loginError">{error}</p><a className="oauthReturn" href="/login">Return to sign in →</a></>}
  </section></main>;
}
