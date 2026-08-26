import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Vong Digital Works, including contact forms, analytics consent, service providers, and privacy choices.",
  alternates: { canonical: "/privacy" },
};

const sectionStyle = {
  marginTop: "2rem",
} as const;

const headingStyle = {
  marginBottom: "0.6rem",
  fontSize: "1.2rem",
} as const;

export default function PrivacyPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f7f2",
        color: "#111",
        padding: "48px 20px 72px",
      }}
    >
      <article style={{ maxWidth: 820, margin: "0 auto", lineHeight: 1.7 }}>
        <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
          ← Vong Digital Works
        </a>

        <p style={{ marginTop: 40, letterSpacing: ".08em", fontSize: 13 }}>
          PRIVACY POLICY
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4.8rem)", lineHeight: 1 }}>
          Your privacy matters.
        </h1>
        <p>
          Effective August 26, 2026. This policy explains how Vong Digital Works
          handles information when you visit vongdigitalworks.com, submit a
          project inquiry, use a client-facing feature, or otherwise communicate
          with us.
        </p>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Information we collect</h2>
          <p>
            We may collect information you choose to provide, such as your name,
            email address, company or website information, project details, and
            communications. If you use client account, contract, invoice, or
            payment features, we may also process the information needed to
            provide those services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Cookies and analytics</h2>
          <p>
            Optional Google Analytics is not loaded unless you choose to accept
            analytics. Your analytics preference is stored in your browser so the
            site can remember your choice. You can reopen the Privacy choices
            control on the site to change that choice.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>How we use information</h2>
          <p>
            We use information to respond to inquiries, evaluate and deliver
            projects, operate client features, process legitimate business
            transactions, maintain security, improve the website, and comply with
            applicable obligations.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Service providers</h2>
          <p>
            We rely on reputable service providers for functions such as hosting,
            databases and authentication, payment processing, email delivery, and
            analytics. These providers may process information only as needed to
            perform those services. Full payment-card details are handled by the
            payment processor rather than intentionally stored by Vong Digital
            Works.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Sharing and selling</h2>
          <p>
            We do not sell personal information. We do not share personal
            information for unrelated third-party advertising. Information may be
            disclosed when necessary to provide a requested service, protect the
            site or users, comply with law, or support a legitimate business
            transfer.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Data retention and security</h2>
          <p>
            We retain information only for as long as reasonably necessary for
            the purpose it was collected, business records, dispute resolution,
            security, and legal obligations. We use technical and organizational
            safeguards designed to protect information, but no internet service
            can guarantee absolute security.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Your choices</h2>
          <p>
            You can decline optional analytics. You may also request access,
            correction, or deletion of personal information we control, subject
            to legal and operational requirements.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Children</h2>
          <p>
            This website is intended for business and general audiences and is
            not directed to children under 13. We do not knowingly collect
            personal information from children under 13.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Changes to this policy</h2>
          <p>
            We may update this policy as the website and services evolve. The
            effective date above will be updated when material changes are made.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Contact</h2>
          <p>
            Privacy questions or requests can be sent to{" "}
            <a href="mailto:contact@vongdigitalworks.com">
              contact@vongdigitalworks.com
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
