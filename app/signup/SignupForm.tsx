"use client";
import { FormEvent, useState } from "react";
export default function SignupForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setError("");
    if (data.get("password") !== data.get("confirm")) { setError("Your passwords do not match."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), password: data.get("password") }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to create your account.");
      setMessage(body.message); form.reset();
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to connect. Please try again."); }
    finally { setBusy(false); }
  }
  return <form className="loginCard" onSubmit={submit}>
    <a className="brand" href="/"><span>V</span> VONG / DIGITAL WORKS</a>
    <p className="kicker">Your customer account</p><h1>Create your account.</h1>
    <p>View your invoices and project documents in your private portal. No payment is required to create an account.</p>
    {message ? <p role="status">{message}</p> : <>
      <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <label>Password<input name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required /></label>
      <small>Use at least 8 characters.</small>
      <label>Confirm password<input name="confirm" type="password" autoComplete="new-password" minLength={8} maxLength={128} required /></label>
      {error && <p className="loginError" role="alert">{error}</p>}
      <button className="dashAdd" disabled={busy}>{busy ? "Creating account…" : "Create account →"}</button>
    </>}
    <p>Already have an account? <a href="/login" style={{textDecoration:"underline"}}>Sign in →</a></p>
  </form>;
}
