export default function TrustLinks() {
  return (
    <aside
      aria-label="Business trust and legal information"
      style={{
        borderTop: "1px solid rgba(127,127,127,.25)",
        padding: "18px 20px",
        fontSize: 13,
        lineHeight: 1.6,
        background: "#0f0f0f",
        color: "#f4f4ef",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "10px 24px",
        }}
      >
        <span>Vong Digital Works · contact@vongdigitalworks.com</span>
        <span style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <a href="/privacy" style={{ color: "inherit" }}>
            Privacy
          </a>
          <a href="/terms" style={{ color: "inherit" }}>
            Terms
          </a>
          <a href="/security" style={{ color: "inherit" }}>
            Security & Trust
          </a>
        </span>
      </div>
    </aside>
  );
}
