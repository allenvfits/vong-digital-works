import InquiryForm from "./InquiryForm";
import ThreeHero from "./ThreeHero";

const services = [
  {
    number: "01",
    title: "Custom websites",
    text: "Purpose-built websites shaped around your brand, audience, and business goals—not squeezed into a template.",
    href: "/services#custom-websites",
  },
  {
    number: "02",
    title: "Frontend development",
    text: "Fast, responsive interfaces with thoughtful motion, clear content, and a polished experience on every screen.",
    href: "/services#frontend-development",
  },
  {
    number: "03",
    title: "Backend systems",
    text: "Secure databases, dashboards, authentication, APIs, payments, and the behind-the-scenes tools your business needs.",
    href: "/services#backend-systems",
  },
];

export default function Home() {
  return (
    <main>
      <div className="businessTop">
        <div className="shell">
          <span>VONG DIGITAL WORKS · FULL-STACK WEB STUDIO</span>
          <a href="mailto:contact@vongdigitalworks.com">
            contact@vongdigitalworks.com ↗
          </a>
        </div>
      </div>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Vong Digital Works home">
          <span>V</span> VONG / DIGITAL WORKS
        </a>
        <div className="navLinks">
          <a href="/showcase">Explore work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="/pricing">Pricing</a>
          <a href="/login">Client login</a>
        </div>
        <a className="navCta" href="#contact">
          Start a project <span>↗</span>
        </a>
      </nav>
      <nav className="mobileNav" aria-label="Mobile navigation">
        <a href="/showcase">Work</a>
        <a href="#services">Services</a>
        <a href="/pricing">Pricing</a>
        <a href="/login">Login</a>
        <a href="#contact">Contact</a>
      </nav>

      <section className="impactHero" id="top">
        <ThreeHero />
        <div className="shell impactIntro">
          <div>
            <div className="heroEyebrow">
              <i /> Independent full-stack web studio
            </div>
            <h1>
              Bold design.
              <br />
              Powerful systems.
              <br />
              <em>Built as one.</em>
            </h1>
          </div>
          <div className="impactPitch">
            <p>
              Custom design on the surface. Powerful systems underneath. Every
              project is built to stand out and move your business forward.
            </p>
            <div className="heroActions">
              <a className="button primary" href="/showcase">
                Explore the work <span>↗</span>
              </a>
              <a className="textLink" href="#contact">
                Start a project
              </a>
            </div>
          </div>
        </div>
        <div
          className="heroReel"
          aria-label="Featured website concept previews"
        >
          <a className="reelCard reelEstate" href="/demo/real-estate">
            <img
              src="/concept-estate.png"
              alt="Luxury real estate website concept"
            />
            <div className="reelChrome">
              <i />
              <i />
              <i />
              <span>vanta.properties</span>
            </div>
            <div className="reelCopy">
              <small>01 / REAL ESTATE</small>
              <b>
                RARE SPACE.
                <br />
                EXACTLY PLACED.
              </b>
              <span>EXPLORE CONCEPT ↗</span>
            </div>
          </a>
          <a className="reelCard reelFitness" href="/demo/fitness">
            <img
              src="/concept-fitness.png"
              alt="Fitness coaching platform concept"
            />
            <div className="reelChrome">
              <i />
              <i />
              <i />
              <span>forge.system</span>
            </div>
            <div className="reelCopy">
              <small>02 / FITNESS PLATFORM</small>
              <b>
                OUTWORK
                <br />
                YESTERDAY.
              </b>
              <span>VIEW BUILD ↗</span>
            </div>
          </a>
          <a
            className="reelCard reelLex"
            href="https://lexautoworks.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="reelChrome">
              <i />
              <i />
              <i />
              <span>lexautoworks.com</span>
            </div>
            <div className="reelLexInner">
              <small>LIVE CLIENT PROJECT</small>
              <b>
                LEX
                <br />
                AUTO WORK
              </b>
              <p>TOYOTA + LEXUS SPECIALIST</p>
              <div>
                <span>F SPORT</span>
                <span>2UR V8</span>
                <span>HYBRID</span>
              </div>
            </div>
            <label>VIEW LIVE WEBSITE ↗</label>
          </a>
          <a className="reelCard reelRestaurant" href="/demo/restaurant">
            <img
              src="/concept-restaurant.png"
              alt="Premium restaurant website concept"
            />
            <div className="reelChrome">
              <i />
              <i />
              <i />
              <span>kodo.openfire</span>
            </div>
            <div className="reelCopy">
              <small>03 / HOSPITALITY</small>
              <b>
                CONTROL
                <br />
                THE FLAME.
              </b>
              <span>RESERVE A TABLE ↗</span>
            </div>
          </a>
          <a className="reelCard reelCommerce" href="/demo/ecommerce">
            <img
              src="/concept-commerce.png"
              alt="Technology ecommerce website concept"
            />
            <div className="reelChrome">
              <i />
              <i />
              <i />
              <span>vector.audio</span>
            </div>
            <div className="reelCopy right">
              <small>04 / ECOMMERCE</small>
              <b>
                PURE
                <br />
                SIGNAL.
              </b>
              <span>SHOP THE SYSTEM ↗</span>
            </div>
          </a>
          <a className="reelCard reelMedical" href="#range">
            <img
              src="/concept-medical.png"
              alt="Advanced healthcare website concept"
            />
            <div className="reelChrome">
              <i />
              <i />
              <i />
              <span>nexus.health</span>
            </div>
            <div className="reelCopy">
              <small>05 / HEALTHCARE</small>
              <b>
                CARE,
                <br />
                ENGINEERED.
              </b>
              <span>BOOK CONSULTATION ↗</span>
            </div>
          </a>
        </div>
        <div className="wallTicker">
          <span>STRATEGY</span>
          <i>✦</i>
          <span>DESIGN</span>
          <i>✦</i>
          <span>FRONTEND</span>
          <i>✦</i>
          <span>BACKEND</span>
          <i>✦</i>
          <span>LAUNCH</span>
        </div>
      </section>

      <section className="engineeringProof">
        <div className="shell">
          <div className="proofHeader">
            <p>ENGINEERING CAPABILITY / 2026</p>
            <span>
              ALL SYSTEMS OPERATIONAL <i />
            </span>
          </div>
          <div className="proofGrid">
            <article>
              <small>01 / EXPERIENCE</small>
              <b>
                Interfaces that don&apos;t
                <br />
                look templated.
              </b>
              <p>
                Custom art direction, responsive systems, motion, interaction,
                and accessibility engineered around the brand.
              </p>
            </article>
            <article>
              <small>02 / ARCHITECTURE</small>
              <b>
                Real systems behind
                <br />
                the visuals.
              </b>
              <p>
                Authentication, databases, dashboards, APIs, payments, invoices,
                automation, and deployment—not just a landing page.
              </p>
            </article>
            <article>
              <small>03 / OWNERSHIP</small>
              <b>
                Source code you
                <br />
                actually control.
              </b>
              <p>
                Portable builds prepared for GitHub, Render, Supabase, Stripe,
                and the next phase of your business.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="demoLab" id="range">
        <div className="shell demoLabHead">
          <p className="kicker">Interactive concept lab</p>
          <h2>
            Click in.
            <br />
            Browse around.
          </h2>
          <p>
            These are not static mockups. Open a concept to navigate pages,
            explore products or services, view details, and try working
            interactions.
          </p>
        </div>
        <div className="shell demoLabGrid">
          <a href="/demo/real-estate">
            <span>01 / REAL ESTATE</span>
            <h3>Vanta Properties</h3>
            <p>
              Browse luxury residences, open property details, and request a
              private tour.
            </p>
            <b>LAUNCH DEMO ↗</b>
          </a>
          <a href="/demo/fitness">
            <span>02 / FITNESS</span>
            <h3>Forge Coaching</h3>
            <p>
              Explore training programs, coaching methodology, results, and
              assessment flow.
            </p>
            <b>LAUNCH DEMO ↗</b>
          </a>
          <a href="/demo/restaurant">
            <span>03 / HOSPITALITY</span>
            <h3>Kodo Open Fire</h3>
            <p>
              Browse the menu, discover the dining experience, and test a
              reservation request.
            </p>
            <b>LAUNCH DEMO ↗</b>
          </a>
          <a href="/demo/ecommerce">
            <span>04 / ECOMMERCE</span>
            <h3>Vector Audio</h3>
            <p>
              Explore products, open specifications, add items, and interact
              with a demo bag.
            </p>
            <b>LAUNCH DEMO ↗</b>
          </a>
        </div>
      </section>

      <section className="statement">
        <div className="shell statementGrid">
          <p className="kicker">What I do</p>
          <h2>
            More than a good-looking website. I build complete digital
            experiences that <em>work hard</em> for your business.
          </h2>
        </div>
      </section>

      <section className="services" id="services">
        <div className="shell">
          <div className="sectionHead light">
            <div>
              <p className="kicker">Capabilities</p>
              <h2>
                From first sketch
                <br />
                to full-stack launch.
              </h2>
            </div>
            <p className="sideCopy">
              One collaborative partner for strategy, design, development, and
              the technical systems behind it all.
            </p>
          </div>
          <div className="serviceList">
            {services.map((service) => (
              <a href={service.href} key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <b>LEARN MORE ↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section process shell" id="process">
        <p className="kicker">How we work together</p>
        <div className="processIntro">
          <h2>
            Clear communication.
            <br />
            No mystery.
          </h2>
          <p>
            You stay involved from beginning to end. I explain the decisions,
            share progress often, and build around what your business actually
            needs.
          </p>
        </div>
        <div className="steps">
          <div>
            <span>01</span>
            <h3>Discover</h3>
            <p>
              We define your goals, users, features, timeline, and what success
              looks like.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Design</h3>
            <p>
              I shape the structure and visual direction, then refine it with
              your feedback.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Build</h3>
            <p>
              I develop the frontend and backend, test the experience, and keep
              you updated.
            </p>
          </div>
          <div>
            <span>04</span>
            <h3>Launch</h3>
            <p>
              We go live confidently, with support for the next stage of growth.
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell contactGrid">
          <div>
            <p className="kicker">Start a conversation</p>
            <h2>
              Have an idea?
              <br />
              <em>Let&apos;s build it.</em>
            </h2>
            <p className="contactLead">
              Tell me what you&apos;re working on, even if it&apos;s still just
              an idea. I&apos;ll help you figure out the best next step.
            </p>
            <div className="contactMethods">
              <span>Email me directly</span>
              <a href="mailto:contact@vongdigitalworks.com">
                contact@vongdigitalworks.com ↗
              </a>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>
      <footer className="footer">
        <div className="shell">
          <a className="brand" href="#top">
            <span>V</span> VONG / DIGITAL WORKS
          </a>
          <a className="footerEmail" href="mailto:contact@vongdigitalworks.com">
            contact@vongdigitalworks.com
          </a>
          <div>
            <a href="/showcase">Work</a> · <a href="/pricing">Pricing</a> ·{" "}
            <a href="/login">Client login</a> · <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
