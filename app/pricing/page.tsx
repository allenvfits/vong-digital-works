export const metadata = {
  title: "Business Website Systems | Vong Digital Works",
  description: "Website systems for growing businesses: custom websites, lead capture, booking, automated emails, analytics, hosting support, customer management, and ongoing updates.",
};

const packages = [
  {
    label: "01 / DIGITAL FOUNDATION",
    name: "Launch System",
    setup: "$750",
    monthly: "$150/mo",
    description: "A professional website plus the essential systems to capture leads, follow up, and keep your business online without managing the technical side yourself.",
    features: [
      "Custom responsive business website",
      "Quote / lead capture form",
      "Lead notifications by email",
      "Basic appointment booking integration",
      "Google Analytics setup",
      "Domain + deployment support",
      "Managed hosting support",
      "Security and software maintenance",
      "Up to 30 minutes of site changes each month",
    ],
  },
  {
    label: "02 / BUSINESS GROWTH SYSTEM",
    name: "Growth System",
    setup: "$1,000",
    monthly: "$225/mo",
    description: "The complete small-business system: website, leads, appointments, automated follow-up, analytics, customer organization, and ongoing support in one package.",
    features: [
      "Everything in Launch System",
      "Advanced appointment booking flow",
      "Automated customer confirmation emails",
      "Automated lead follow-up emails",
      "Basic customer / lead dashboard",
      "Lead status tracking",
      "Conversion and traffic analytics",
      "Monthly performance summary",
      "Up to 60 minutes of site changes each month",
      "Priority support",
    ],
    featured: true,
  },
  {
    label: "03 / AUTOMATION SYSTEM",
    name: "Pro System",
    setup: "$1,500",
    monthly: "$300/mo",
    description: "For businesses that want their website to become part of their operations, with deeper automation, customer workflows, and room for custom business tools.",
    features: [
      "Everything in Growth System",
      "Custom workflow automation",
      "Advanced customer management features",
      "Payment or deposit integration",
      "Custom forms and intake workflows",
      "Internal admin tools where appropriate",
      "Enhanced reporting and analytics",
      "Up to 2 hours of site changes each month",
      "Priority feature requests",
      "Quarterly growth review",
    ],
  },
];

const addOns = [
  ["Additional custom page", "$125"],
  ["Logo / brand refresh", "$250+"],
  ["Website copywriting", "$200–$500"],
  ["Additional monthly update time", "$75/hr"],
  ["Ecommerce", "Custom quote"],
  ["Customer portal", "Custom quote"],
  ["Advanced AI automation", "Custom quote"],
  ["Custom business dashboard", "Custom quote"],
];

export default function PricingPage() {
  return <main className="pricingPage">
    <nav className="nav shell" aria-label="Primary navigation">
      <a className="brand" href="/"><img src="/vong-logo.svg" alt="Vong Digital Works" className="brandLogo" /></a>
      <div className="navLinks"><a href="/showcase">Explore work</a><a href="/#services">Services</a><a href="/#process">Process</a><a href="/pricing" aria-current="page">Pricing</a><a href="/login">Client login</a></div>
      <a className="navCta" href="/#contact">Start a project <span>↗</span></a>
    </nav>

    <section className="pricingHero shell">
      <div><p className="kicker">Website + business systems</p><h1>More than<br/><em>a website.</em></h1></div>
      <div><p>Vong Digital Works builds the website and the systems around it: lead capture, booking, automated emails, analytics, customer organization, hosting support, maintenance, and ongoing improvements.</p><a className="button primary" href="/#contact">Build my system <span>↗</span></a></div>
    </section>

    <section className="pricingProof"><div className="shell pricingProofGrid">
      <article><span>01</span><b>Get leads</b><p>Your website is built to turn visitors into real inquiries through focused calls to action, quote forms, and booking flows.</p></article>
      <article><span>02</span><b>Follow up automatically</b><p>Customers can receive confirmations and follow-up messages while your business receives organized lead information.</p></article>
      <article><span>03</span><b>Stay managed</b><p>Hosting support, maintenance, analytics, updates, and technical help continue after launch instead of disappearing when the site goes live.</p></article>
    </div></section>

    <section className="pricingPackages shell">
      <div className="pricingSectionHead"><p className="kicker">Choose your system</p><h2>One setup fee.<br/>Ongoing support.</h2></div>
      <div className="pricingCards">{packages.map(item => <article className={item.featured ? "featured" : ""} key={item.name}>
        {item.featured && <strong>MOST POPULAR</strong>}<small>{item.label}</small><h3>{item.name}</h3>
        <div className="systemPrices"><div><b>{item.setup}</b><span>ONE-TIME SETUP</span></div><div><b>{item.monthly}</b><span>ONGOING MANAGEMENT</span></div></div>
        <p>{item.description}</p><ul>{item.features.map(feature => <li key={feature}>✓ {feature}</li>)}</ul>
        <div className="packageBottom"><span>Built around your business</span><a href="/#contact">Choose {item.name} ↗</a></div>
      </article>)}</div>
      <p className="pricingLimit">Third-party costs such as domain registration, paid booking software, email providers, payment processing, premium APIs, or unusually high hosting usage are billed separately when required. Monthly plans cover the services listed above and do not include unlimited redesigns or entirely new applications.</p>
    </section>

    <section className="pricingCompare"><div className="shell compareGrid"><div><p className="kicker">The difference</p><h2>Your website<br/>should do work.</h2><p>A brochure website sits online and waits. A business system captures leads, helps customers book, follows up, measures performance, and gives you someone responsible for keeping it working.</p></div><div className="compareTable"><div><span></span><b>BASIC WEBSITE</b><b>VONG BUSINESS SYSTEM</b></div><div><span>Website</span><i>Pages only</i><strong>Custom conversion-focused build</strong></div><div><span>Lead capture</span><i>Basic contact form</i><strong>Structured inquiry workflow</strong></div><div><span>Appointments</span><i>Usually separate</i><strong>Integrated booking</strong></div><div><span>Follow-up</span><i>Manual</i><strong>Automated emails</strong></div><div><span>Customer tracking</span><i>Inbox / spreadsheet</i><strong>Organized lead management</strong></div><div><span>Analytics</span><i>Often ignored</i><strong>Tracked and reviewed</strong></div><div><span>After launch</span><i>You are on your own</i><strong>Ongoing management</strong></div></div></div></section>

    <section className="pricingAddons shell"><div className="pricingSectionHead"><p className="kicker">Expand when needed</p><h2>Add capabilities<br/>as you grow.</h2></div><div>{addOns.map(([name,price]) => <article key={name}><span>{name}</span><b>{price}</b></article>)}</div></section>

    <section className="pricingFaq shell"><div><p className="kicker">Straight answers</p><h2>How it works.</h2></div><div>
      <details open><summary>What does the setup fee pay for?</summary><p>The setup fee covers discovery, design, development, configuration, integrations, testing, and launching your initial business system.</p></details>
      <details><summary>What does the monthly fee cover?</summary><p>Your monthly plan covers the ongoing services listed in your package, including maintenance, technical support, analytics, included changes, and management of the systems we build for you.</p></details>
      <details><summary>Do I own my website?</summary><p>Yes. Your project is built for your business. Third-party services remain subject to their own accounts, subscriptions, and terms.</p></details>
      <details><summary>Are third-party fees included?</summary><p>No. Domains, payment processing, paid APIs, premium email services, booking subscriptions, and unusually high hosting usage are separate when they are required. You will know about those costs before they are added.</p></details>
      <details><summary>Can I cancel the monthly plan?</summary><p>Monthly service can be ended according to your service agreement. If you leave, we can provide a handoff of the website and the systems you own, while third-party services may need to be transferred to your accounts.</p></details>
      <details><summary>Can you build something more advanced?</summary><p>Yes. Customer portals, ecommerce, payments, dashboards, AI workflows, internal tools, and custom applications can be added when your business needs them.</p></details>
    </div></section>

    <section className="pricingCta"><div className="shell"><p>STOP BUYING A WEBSITE THAT JUST SITS THERE</p><h2>Build a digital system<br/>that helps run<br/><em>your business.</em></h2><a className="button primary" href="/#contact">Start my project <span>↗</span></a></div></section>
    <footer className="footer"><div className="shell"><a className="brand" href="/"><img src="/vong-logo.svg" alt="Vong Digital Works" className="brandLogo" /></a><p>Balance design and technology.</p><div><a href="/login">Client login</a> · <a href="/">Home ↑</a></div></div></footer>
  </main>;
}
