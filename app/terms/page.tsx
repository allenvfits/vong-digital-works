import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Vong Digital Works website.",
  alternates: { canonical: "/terms" },
};

const sectionStyle = { marginTop: "2rem" } as const;
const headingStyle = { marginBottom: ".6rem", fontSize: "1.2rem" } as const;

export default function TermsPage() {
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
          TERMS OF USE
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4.8rem)", lineHeight: 1 }}>
          Clear terms. No mystery.
        </h1>
        <p>
          Effective August 26, 2026. These terms apply to your use of
          vongdigitalworks.com. Project-specific work, pricing, deliverables,
          ownership, payment terms, warranties, and support may be governed by a
          separate proposal, statement of work, invoice, or signed agreement.
        </p>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Website purpose</h2>
          <p>
            This website provides information about Vong Digital Works, its web
            development capabilities, portfolio work, interactive demonstrations,
            pricing information, and ways to request services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Project inquiries</h2>
          <p>
            Submitting an inquiry does not create a client relationship or require
            either party to proceed with a project. A project becomes binding only
            when the applicable proposal, contract, invoice, or other written
            agreement is accepted as required.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Interactive demos</h2>
          <p>
            Concept and demo experiences are provided to demonstrate design and
            engineering capabilities. Unless clearly labeled otherwise, demo
            businesses, products, reservations, forms, carts, and transactions are
            illustrative and are not real offers from those fictional brands.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Intellectual property</h2>
          <p>
            The Vong Digital Works name, site design, original copy, code,
            graphics, and portfolio presentation are protected by applicable
            intellectual-property laws unless otherwise indicated. Client-owned
            materials and third-party marks remain the property of their
            respective owners.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Acceptable use</h2>
          <p>
            You may not misuse the website, attempt unauthorized access, interfere
            with normal operation, introduce malicious code, scrape protected or
            personal data in violation of law, or use the site to harm others.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Third-party services and links</h2>
          <p>
            The site may link to or rely on third-party services. Their own terms,
            privacy practices, availability, and security apply when you interact
            with them. Vong Digital Works is not responsible for content or
            services controlled by unrelated third parties.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Availability and disclaimers</h2>
          <p>
            We work to keep the website accurate and available, but information,
            features, examples, and availability may change. The website is
            provided on an as-available basis and should not be treated as legal,
            financial, tax, or other professional advice outside the scope of web
            development services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Vong Digital Works
            will not be liable for indirect, incidental, special, consequential,
            or punitive damages arising solely from use of this public website.
            Any project-specific liability terms are governed by the applicable
            written client agreement.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Changes</h2>
          <p>
            These terms may be updated as the website or services change. The
            effective date above will reflect material revisions.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
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
