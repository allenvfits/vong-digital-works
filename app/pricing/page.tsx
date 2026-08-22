export const metadata = {
  title: "Website Pricing | Vong Digital Works",
  description: "Founding-client website packages from Vong Digital Works: custom, responsive business websites designed to stand apart.",
};

const packages = [
  {
    label: "01 / ONE-PAGE LAUNCH",
    name: "Launch",
    price: "$299",
    timeline: "3–4 week turnaround",
    description: "A focused, high-impact website for a new business, service, campaign, or personal brand that needs to look established from day one.",
    features: ["One custom scrolling page", "Mobile-first responsive design", "Secure project inquiry form", "Services and call-to-action sections", "Social links and contact details", "Basic search-engine setup", "Deployment to your live domain", "One revision round"],
  },
  {
    label: "02 / SMALL BUSINESS STARTER",
    name: "Starter",
    price: "$499",
    timeline: "4–6 week turnaround",
    description: "A complete small-business presence with room to explain your services, establish trust, and turn visitors into real inquiries.",
    features: ["Up to four custom pages", "Distinct visual direction", "Mobile-first responsive design", "Secure project inquiry form", "Google Maps and social links", "Basic search-engine setup", "Deployment to your live domain", "Two revision rounds"],
    featured: true,
  },
];

const addOns = [
  ["Additional page", "$100"], ["Booking integration", "$150"], ["Motion upgrade", "$150"],
  ["Website copywriting", "$150–$300"], ["Logo design", "$200"], ["Rush delivery", "$200"],
  ["Monthly care", "$49–$99/mo"], ["Advanced systems", "Custom quote"],
];

export default function PricingPage() {
  return <main className="pricingPage">
    <nav className="nav shell" aria-label="Primary navigation">
      <a className="brand" href="/"><span>V</span> VONG / DIGITAL WORKS</a>
      <div className="navLinks"><a href="/showcase">Explore work</a><a href="/#services">Services</a><a href="/#process">Process</a><a href="/pricing" aria-current="page">Pricing</a><a href="/login">Client login</a></div>
      <a className="navCta" href="/#contact">Start a project <span>↗</span></a>
    </nav>

    <section className="pricingHero shell">
      <div><p className="kicker">Founding client pricing / limited availability</p><h1>Custom work.<br/><em>Starter pricing.</em></h1></div>
      <div><p>Most entry-level websites force your business into the same recycled template. Vong Digital Works brings custom visual thinking, responsive development, secure forms, and a foundation that can grow with your business.</p><a className="button primary" href="/#contact">Reserve a project spot <span>↗</span></a></div>
    </section>

    <section className="pricingProof"><div className="shell pricingProofGrid">
      <article><span>01</span><b>Designed around you</b><p>Your colors, goals, customers, and personality shape the website—not a prebuilt industry theme.</p></article>
      <article><span>02</span><b>Built beyond the surface</b><p>Responsive code, secure inquiry handling, deployment, and a technical foundation prepared for future features.</p></article>
      <article><span>03</span><b>One accountable partner</b><p>Strategy, design, development, testing, and launch stay connected from the first conversation to the live website.</p></article>
    </div></section>

    <section className="pricingPackages shell">
      <div className="pricingSectionHead"><p className="kicker">Choose your starting point</p><h2>A serious first impression<br/>without the agency price.</h2></div>
      <div className="pricingCards">{packages.map(item => <article className={item.featured ? "featured" : ""} key={item.name}>
        {item.featured && <strong>BEST FOR GROWING BUSINESSES</strong>}<small>{item.label}</small><h3>{item.name}</h3><div className="packagePrice"><b>{item.price}</b><span>ONE-TIME<br/>PROJECT PRICE</span></div><p>{item.description}</p><ul>{item.features.map(feature => <li key={feature}>✓ {feature}</li>)}</ul><div className="packageBottom"><span>{item.timeline}</span><a href="/#contact">Choose {item.name} ↗</a></div>
      </article>)}</div>
      <p className="pricingLimit">Founding-client pricing is limited to the first 10 qualifying projects. A 50% nonrefundable deposit reserves your position; the remaining 50% is due before launch. Clients provide final text and images unless copywriting is added.</p>
    </section>

    <section className="pricingCompare"><div className="shell compareGrid"><div><p className="kicker">Why Vong Digital Works</p><h2>Not another<br/>five-minute template.</h2><p>A cheap website is expensive when it looks forgettable, confuses visitors, or cannot grow. This offer keeps the first version focused while giving your business the same design care and technical discipline shown throughout our portfolio.</p></div><div className="compareTable"><div><span></span><b>TYPICAL BUDGET SITE</b><b>VONG DIGITAL WORKS</b></div><div><span>Visual direction</span><i>Reused template</i><strong>Custom to your business</strong></div><div><span>Mobile experience</span><i>Basic resizing</i><strong>Designed responsively</strong></div><div><span>Lead capture</span><i>Generic or missing</i><strong>Secure inquiry flow</strong></div><div><span>Future growth</span><i>Often boxed in</i><strong>Expandable foundation</strong></div><div><span>Support</span><i>Multiple handoffs</i><strong>One project partner</strong></div></div></div></section>

    <section className="pricingAddons shell"><div className="pricingSectionHead"><p className="kicker">Build beyond the package</p><h2>Add only what<br/>your business needs.</h2></div><div>{addOns.map(([name,price]) => <article key={name}><span>{name}</span><b>{price}</b></article>)}</div></section>

    <section className="pricingFaq shell"><div><p className="kicker">Straight answers</p><h2>Before we begin.</h2></div><div><details open><summary>Why is the turnaround longer?</summary><p>The lower founding-client price is paired with a flexible production queue. You receive a clear estimated window and progress updates while the project is being designed and built.</p></details><details><summary>Is hosting included?</summary><p>Deployment is included. Domain registration, hosting plans, paid software, and third-party subscriptions are billed separately so you always know what you own and what renews.</p></details><details><summary>Can I request more revisions?</summary><p>Yes. Launch includes one round and Starter includes two. Additional revisions or new requests are quoted before work begins, so there are no surprise charges.</p></details><details><summary>Can the website grow later?</summary><p>Yes. Booking, payments, customer portals, ecommerce, dashboards, and advanced interactive experiences can be added as separate phases when your business is ready.</p></details></div></section>

    <section className="pricingCta"><div className="shell"><p>THE FIRST TEN PROJECTS GET FOUNDING-CLIENT PRICING</p><h2>Your competition can use<br/>the same template.<br/><em>You don&apos;t have to.</em></h2><a className="button primary" href="/#contact">Claim a project spot <span>↗</span></a></div></section>
    <footer className="footer"><div className="shell"><a className="brand" href="/"><span>V</span> VONG / DIGITAL WORKS</a><p>Bold design. Powerful systems. Built as one.</p><div><a href="/login">Client login</a> · <a href="/">Home ↑</a></div></div></footer>
  </main>;
}
