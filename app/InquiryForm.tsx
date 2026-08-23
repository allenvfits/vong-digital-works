"use client";

import { FormEvent, useState } from "react";

export default function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data.entries())) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to send your inquiry.");
      form.reset();
      setStatus("success");
      setMessage("Thank you. Your project inquiry was received, and I’ll be in touch soon.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your inquiry. Please try again.");
    }
  }

  return <form className="inquiry" onSubmit={submit}>
    <label>Name <span>(optional)</span><input name="name" placeholder="Your name" maxLength={120} /></label>
    <label>Email<input type="email" name="email" placeholder="you@company.com" maxLength={254} required /></label>
    <label>What do you need? <span>(optional)</span><select name="service" defaultValue=""><option value="">Select a service</option><option>Custom business website</option><option>Full-stack web application</option><option>Website redesign</option><option>Not sure yet</option></select></label>
    <label>Tell me about the project <span>(optional)</span><textarea name="project" placeholder="Goals, features, timeline, budget..." rows={4} maxLength={5000} /></label>
    <label className="inquiryTrap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Send project inquiry <span>↗</span></>}</button>
    {message && <p className={`inquiryStatus ${status}`} role="status">{message}</p>}
    <small>Your information is submitted securely and used only to respond to your inquiry.</small>
  </form>;
}
