"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "vdw-analytics-consent";
const MEASUREMENT_ID = "G-6SKQ931YE8";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function enableAnalytics() {
  if (document.getElementById("vdw-google-analytics")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);

  const script = document.createElement("script");
  script.id = "vdw-google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "granted" || saved === "denied") {
      setChoice(saved);
      if (saved === "granted") enableAnalytics();
    } else {
      setOpen(true);
    }
  }, []);

  function save(next: "granted" | "denied") {
    window.localStorage.setItem(CONSENT_KEY, next);
    setChoice(next);
    setOpen(false);
    if (next === "granted") {
      enableAnalytics();
    } else if (choice === "granted") {
      window.location.reload();
    }
  }

  return (
    <>
      {open && (
        <section
          className="cookieConsent"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
        >
          <div>
            <p>YOUR PRIVACY</p>
            <h2 id="cookie-consent-title">Cookies & analytics</h2>
            <span>
              Allow optional Google Analytics to help us improve this website?
            </span>
          </div>
          <div className="cookieActions">
            <button className="cookieAccept" onClick={() => save("granted")}>
              Accept
            </button>
            <button className="cookieReject" onClick={() => save("denied")}>
              Reject
            </button>
          </div>
        </section>
      )}
      {!open && choice && (
        <button className="privacyChoices" onClick={() => setOpen(true)}>
          Privacy choices
        </button>
      )}
    </>
  );
}
