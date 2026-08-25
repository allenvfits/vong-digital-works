"use client";

import { useState } from "react";

type Step = "intro" | "name" | "email" | "service" | "timeline" | "budget" | "project" | "done";

const serviceOptions = [
  "Custom business website",
  "Full-stack web application",
  "Website redesign",
  "Not sure yet",
];

export default function LeadChat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ name: "", email: "", service: "Not sure yet", timeline: "", budget: "", project: "" });

  function next(nextStep: Step) {
    setError("");
    setStep(nextStep);
  }

  async function submit() {
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setError("Please enter a valid email address.");
      setStep("email");
      return;
    }
    setSending(true);
    setError("");
    const project = [
      data.project && `Project: ${data.project}`,
      data.timeline && `Timeline: ${data.timeline}`,
      data.budget && `Budget: ${data.budget}`,
      "Source: website chatbox",
    ].filter(Boolean).join("\n\n");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          service: data.service,
          project,
          website: "",
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to send your inquiry.");
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your inquiry.");
    } finally {
      setSending(false);
    }
  }

  return <div className={`leadChat ${open ? "open" : ""}`}>
    {open && <div className="leadChatPanel" role="dialog" aria-label="Project assistant">
      <div className="leadChatHead">
        <div><img src="/favicon.svg" alt="" /><span><b>Vong Project Assistant</b><small>Usually replies instantly</small></span></div>
        <button onClick={() => setOpen(false)} aria-label="Close chat">×</button>
      </div>
      <div className="leadChatBody">
        {step === "intro" && <>
          <div className="botBubble">Hi — I can help figure out what your business needs and send the details directly to Vong Digital Works.</div>
          <div className="botBubble">It only takes about a minute. Want to get started?</div>
          <button className="chatChoice primaryChoice" onClick={() => next("name")}>Start project questions →</button>
        </>}
        {step === "name" && <>
          <div className="botBubble">What should I call you?</div>
          <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Your name (optional)" autoFocus />
          <button className="chatChoice primaryChoice" onClick={() => next("email")}>Continue →</button>
        </>}
        {step === "email" && <>
          <div className="botBubble">What email should we use to follow up with you?</div>
          <input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="you@company.com" autoFocus />
          <button className="chatChoice primaryChoice" onClick={() => {
            if (!/^\S+@\S+\.\S+$/.test(data.email)) return setError("Please enter a valid email address.");
            next("service");
          }}>Continue →</button>
        </>}
        {step === "service" && <>
          <div className="botBubble">What are you looking to build?</div>
          <div className="chatChoices">{serviceOptions.map(option => <button key={option} className="chatChoice" onClick={() => { setData({ ...data, service: option }); next("timeline"); }}>{option}</button>)}</div>
        </>}
        {step === "timeline" && <>
          <div className="botBubble">When would you like to get started?</div>
          <div className="chatChoices">{["As soon as possible", "Within 30 days", "1–3 months", "Just exploring"].map(option => <button key={option} className="chatChoice" onClick={() => { setData({ ...data, timeline: option }); next("budget"); }}>{option}</button>)}</div>
        </>}
        {step === "budget" && <>
          <div className="botBubble">What budget range are you considering?</div>
          <div className="chatChoices">{["$750–$1,000", "$1,000–$1,500", "$1,500–$3,000", "$3,000+", "Not sure yet"].map(option => <button key={option} className="chatChoice" onClick={() => { setData({ ...data, budget: option }); next("project"); }}>{option}</button>)}</div>
        </>}
        {step === "project" && <>
          <div className="botBubble">Last question: tell me a little about the business or what you want the system to do.</div>
          <textarea value={data.project} onChange={e => setData({ ...data, project: e.target.value })} placeholder="Example: I run an auto shop and want customers to request quotes, book appointments, and get automatic confirmations." rows={4} autoFocus />
          <button className="chatChoice primaryChoice" onClick={submit} disabled={sending}>{sending ? "Sending…" : "Send my project →"}</button>
        </>}
        {step === "done" && <>
          <div className="botBubble successBubble">You’re all set. Your answers were sent directly to Vong Digital Works.</div>
          <div className="botBubble">We’ll use the details you provided to recommend the best next step.</div>
          <a className="chatChoice primaryChoice" href="/pricing">View packages →</a>
        </>}
        {error && <p className="chatError">{error}</p>}
      </div>
      <div className="leadChatFoot">Your information is only used to respond to your project inquiry.</div>
    </div>}
    <button className="leadChatLauncher" onClick={() => setOpen(!open)} aria-label="Open project chat">
      <img src="/favicon.svg" alt="" />
      <span>{open ? "Close" : "Plan your project"}</span>
    </button>
  </div>;
}
