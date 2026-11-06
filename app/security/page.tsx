import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "Security and trust information for Vong Digital Works, including HTTPS, analytics consent, payment handling, and responsible reporting.",
  alternates: { canonical: "/security" },
};

const sectionStyle = { marginTop: "2rem" } as const;
const headingStyle = { marginBottom: ".6rem", fontSize: "1.2rem" } as const;

export default function SecurityPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#f7f7f2",
        padding: "48px 20px 72px",
      }}
    >
      <article style={{ maxWidth: 820, margin: "0 auto", lineHeight: 1.7 }}>
        <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
          ← Vong Digital Works
        </a>
        <p style={{ marginTop: 40, letterSpacing: ".08em", fontSize: 13 }}>
          SECURITY & TRUST
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4.8rem)", lineHeight: 1 }}>
          Built to earn trust.
        </h1>
        <p>
          Vong Digital Works uses modern managed infrastructure and practical
          safeguards designed to protect visitors, inquiries, and client-facing
          systems. No online system can promise perfect security, so we focus on
          minimizing unnecessary data collection and using established providers
          for sensitive infrastructure.
        </p>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Encrypted connections</h2>
          <p>
            vongdigitalworks.com is served over HTTPS so information sent between
            your browser and the website is encrypted in transit.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Consent-based analytics</h2>
          <p>
            Optional Google Analytics is loaded only after a visitor accepts
            analytics. Visitors can reject analytics and can reopen the site&apos;s
            Privacy choices control later.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Payments and sensitive data</h2>
          <p>
            Payment-card information is handled by the payment processor rather
            than intentionally stored in full by Vong Digital Works. Client
            authentication and application data rely on managed services with
            access controls appropriate to their role.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Minimal inquiry data</h2>
          <p>
            The public project inquiry form asks only for the information needed
            to respond to a potential project. Do not send passwords, payment-card
            numbers, government identifiers, or other highly sensitive information
            through the public inquiry form.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Responsible security reporting</h2>
          <p>
            If you believe you found a security issue affecting this website or a
            Vong Digital Works system, please report it privately to{" "}
            <a href="mailto:contact@vongdigitalworks.com" style={{ color: "inherit" }}>
              contact@vongdigitalworks.com
            </a>
            . Include the affected URL, what you observed, and steps to reproduce
            the issue. Please avoid accessing or modifying data that does not
            belong to you.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Business verification</h2>
          <p>
            Questions about the legitimacy of this website, a proposal, invoice,
            or project communication can be verified directly through the contact
            address published on this domain: contact@vongdigitalworks.com.
          </p>
        </section>
      </article>
    </main>
  );
}
