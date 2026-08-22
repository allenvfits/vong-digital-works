"use client";

import { useMemo, useState } from "react";

type Slug = "real-estate" | "fitness" | "restaurant" | "ecommerce";
type View = "home" | "explore" | "detail" | "about" | "contact";

const configs = {
  "real-estate": {
    brand: "VANTA",
    eyebrow: "PRIVATE RESIDENCES / SCOTTSDALE",
    title: "Rare space.\nExactly placed.",
    copy: "A curated collection of architecturally significant homes for people who refuse the expected.",
    image: "/concept-estate.png",
    accent: "#ff5a24",
    items: [
      {
        name: "Canyon Glass House",
        meta: "Paradise Valley · 5 bd · 7 ba",
        price: "$6.85M",
        image: "/estate-collection.webp",
        position: "left center",
      },
      {
        name: "Sonoran Horizon",
        meta: "Scottsdale · 4 bd · 5 ba",
        price: "$4.20M",
        image: "/estate-collection.webp",
        position: "center",
      },
      {
        name: "Desert Courtyard",
        meta: "Carefree · 3 bd · 4 ba",
        price: "$3.75M",
        image: "/estate-collection.webp",
        position: "right center",
      },
    ],
    cta: "Book private tour",
    stat: "24",
    statLabel: "CURATED PROPERTIES",
  },
  fitness: {
    brand: "FORGE",
    eyebrow: "PERFORMANCE COACHING / PHOENIX",
    title: "Outwork\nyesterday.",
    copy: "Elite programming, measurable progress, and coaching built around the person—not the template.",
    image: "/concept-fitness.png",
    accent: "#ff4d00",
    items: [
      {
        name: "Strength System",
        meta: "12 weeks · 4 sessions/week",
        price: "$149",
        image: "/fitness-collection.webp",
        position: "left center",
      },
      {
        name: "Hybrid Athlete",
        meta: "8 weeks · strength + conditioning",
        price: "$119",
        image: "/fitness-collection.webp",
        position: "center",
      },
      {
        name: "1:1 Performance",
        meta: "Custom plan · weekly coaching",
        price: "$299",
        image: "/fitness-collection.webp",
        position: "right center",
      },
    ],
    cta: "Start assessment",
    stat: "92%",
    statLabel: "CLIENT ADHERENCE",
  },
  restaurant: {
    brand: "KODO",
    eyebrow: "OPEN FIRE KITCHEN / DOWNTOWN",
    title: "Control\nthe flame.",
    copy: "A modern dining room centered on live fire, seasonal ingredients, and the energy of an open kitchen.",
    image: "/concept-restaurant.png",
    accent: "#e9592f",
    items: [
      {
        name: "Ember Tasting",
        meta: "Seven courses · chef's counter",
        price: "$145",
        image: "/restaurant-collection.webp",
        position: "left center",
      },
      {
        name: "Coal-Roasted Ribeye",
        meta: "28 day dry-aged · smoked marrow",
        price: "$68",
        image: "/restaurant-collection.webp",
        position: "center",
      },
      {
        name: "Desert Citrus",
        meta: "Mesquite honey · preserved lemon",
        price: "$18",
        image: "/restaurant-collection.webp",
        position: "right center",
      },
    ],
    cta: "Reserve a table",
    stat: "4.9",
    statLabel: "GUEST RATING",
  },
  ecommerce: {
    brand: "VECTOR",
    eyebrow: "PRECISION AUDIO / SERIES 01",
    title: "Pure\nsignal.",
    copy: "Reference-grade sound engineered for focus, movement, and the spaces between every note.",
    image: "/concept-commerce.png",
    accent: "#00d9ff",
    items: [
      {
        name: "V/01 Studio",
        meta: "Graphene driver · spatial audio",
        price: "$349",
        image: "/audio-collection.webp",
        position: "left center",
      },
      {
        name: "V/02 Transit",
        meta: "Adaptive ANC · 48-hour battery",
        price: "$249",
        image: "/audio-collection.webp",
        position: "center",
      },
      {
        name: "Signal Dock",
        meta: "Lossless wireless · aluminum",
        price: "$129",
        image: "/audio-collection.webp",
        position: "right center",
      },
    ],
    cta: "Shop the system",
    stat: "48H",
    statLabel: "BATTERY LIFE",
  },
} as const;

export default function DemoSite({ slug }: { slug: string }) {
  const key = slug as Slug;
  const cfg = configs[key];
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState(0);
  const [cart, setCart] = useState(0);
  const [notice, setNotice] = useState("");
  const nav = useMemo(
    () =>
      key === "restaurant"
        ? ["Menu", "Experience", "Private dining"]
        : key === "fitness"
          ? ["Programs", "Method", "Results"]
          : key === "ecommerce"
            ? ["Products", "Technology", "Journal"]
            : ["Residences", "Neighborhoods", "Journal"],
    [key],
  );
  function choose(index: number) {
    setSelected(index);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(
      key === "restaurant"
        ? "Your demo reservation request is ready."
        : "Thanks—this demo request was captured locally.",
    );
    e.currentTarget.reset();
  }
  return (
    <main
      className={`conceptSite concept-${key}`}
      style={{ "--concept-accent": cfg.accent } as React.CSSProperties}
    >
      <div className="conceptNotice">
        <span>INTERACTIVE CONCEPT BY VONG DIGITAL WORKS</span>
        <a href="mailto:contact@vongdigitalworks.com">
          contact@vongdigitalworks.com
        </a>
        <a href="/">← Return to portfolio</a>
      </div>
      <nav className="conceptNav">
        <button className="conceptBrand" onClick={() => setView("home")}>
          {cfg.brand}
          <i>.</i>
        </button>
        <div>
          {nav.map((item, i) => (
            <button
              key={item}
              onClick={() => {
                setView(i === 0 ? "explore" : i === 1 ? "about" : "contact");
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="conceptAction" onClick={() => setView("contact")}>
          {cfg.cta} ↗
        </button>
        {key === "ecommerce" && (
          <button
            className="conceptCart"
            onClick={() =>
              setNotice(`${cart} demo item${cart === 1 ? "" : "s"} in your bag`)
            }
          >
            BAG ({cart})
          </button>
        )}
      </nav>

      {view === "home" && (
        <>
          <section className="conceptHero">
            <img
              src={cfg.items[selected].image}
              alt={cfg.items[selected].name}
              style={{ objectPosition: cfg.items[selected].position }}
            />
            <div className="conceptShade" />
            <div className="conceptHeroCopy">
              <p>{cfg.eyebrow}</p>
              <h1>
                {cfg.title.split("\n").map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </h1>
              <p>{cfg.copy}</p>
              <button onClick={() => setView("explore")}>
                Explore collection <b>↗</b>
              </button>
            </div>
            <div className="conceptStat">
              <b>{cfg.stat}</b>
              <span>{cfg.statLabel}</span>
            </div>
            <div className="conceptScroll">SCROLL TO DISCOVER ↓</div>
          </section>
          <section className="conceptIntro">
            <p>01 / SELECTED</p>
            <h2>
              {key === "real-estate"
                ? "Homes with a point of view."
                : key === "fitness"
                  ? "Built for measurable change."
                  : key === "restaurant"
                    ? "Fire, season, restraint."
                    : "Engineered around listening."}
            </h2>
            <p>
              {cfg.copy} Explore the complete interactive concept to see how a
              polished customer experience moves from discovery to action.
            </p>
          </section>
          <ItemGrid cfg={cfg} choose={choose} />
        </>
      )}

      {view === "explore" && (
        <section className="conceptPage">
          <header>
            <p>EXPLORE / 01</p>
            <h1>{nav[0]}</h1>
            <span>
              Browse the collection, open details, and try the working
              interactions.
            </span>
          </header>
          <ItemGrid cfg={cfg} choose={choose} />
        </section>
      )}

      {view === "detail" && (
        <section className="conceptDetail">
          <div className="conceptDetailImage">
            <img src={cfg.image} alt="" />
            <button onClick={() => setView("explore")}>← Back</button>
          </div>
          <div className="conceptDetailCopy">
            <p>FEATURED / 0{selected + 1}</p>
            <h1>{cfg.items[selected].name}</h1>
            <span>{cfg.items[selected].meta}</span>
            <b>{cfg.items[selected].price}</b>
            <p>
              {key === "real-estate"
                ? "Natural materials, expansive glazing, and quiet desert views create a residence that feels both grounded and cinematic."
                : key === "fitness"
                  ? "Progressive training, recovery guidance, performance tracking, and direct coach feedback in one focused system."
                  : key === "restaurant"
                    ? "A precise expression of smoke, texture, acidity, and season prepared in view of the dining room."
                    : "Low-distortion acoustics, adaptive control, and meticulous industrial design deliver detail without fatigue."}
            </p>
            <div className="conceptSpecs">
              <span>PERSONALIZED</span>
              <span>PREMIUM ACCESS</span>
              <span>FULL SUPPORT</span>
            </div>
            <button
              className="conceptAction"
              onClick={() =>
                key === "ecommerce"
                  ? (setCart((x) => x + 1),
                    setNotice("Added to your demo bag."))
                  : setView("contact")
              }
            >
              {key === "ecommerce" ? "Add to bag" : "Request information"} ↗
            </button>
          </div>
        </section>
      )}

      {view === "about" && (
        <section className="conceptStory">
          <p>OUR APPROACH / 02</p>
          <h1>
            {key === "real-estate"
              ? "Local intelligence. Global perspective."
              : key === "fitness"
                ? "Train with intent, not noise."
                : key === "restaurant"
                  ? "An elemental approach to modern dining."
                  : "Less interference. More emotion."}
          </h1>
          <div>
            <p>{cfg.copy}</p>
            <p>
              This concept demonstrates editorial storytelling, service
              education, conversion strategy, responsive interaction, and an
              elevated visual system that can expand into a complete digital
              platform.
            </p>
          </div>
          <div className="conceptNumbers">
            <span>
              <b>01</b>DISCOVER
            </span>
            <span>
              <b>02</b>PERSONALIZE
            </span>
            <span>
              <b>03</b>EXPERIENCE
            </span>
          </div>
        </section>
      )}

      {view === "contact" && (
        <section className="conceptContact">
          <div>
            <p>START / 03</p>
            <h1>
              {key === "restaurant"
                ? "Your table awaits."
                : key === "fitness"
                  ? "Your next level starts here."
                  : key === "real-estate"
                    ? "Request a private introduction."
                    : "Experience the system."}
            </h1>
            <p>
              This is an interactive portfolio concept. Submit the form to
              preview the experience—nothing will be sent or booked.
            </p>
          </div>
          <form onSubmit={submit}>
            <label>
              Name
              <input required placeholder="Your name" />
            </label>
            <label>
              Email
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label>
              {key === "restaurant"
                ? "Guests and preferred date"
                : "What are you interested in?"}
              <input
                required
                placeholder={
                  key === "restaurant"
                    ? "2 guests · Friday evening"
                    : "Tell us what caught your attention"
                }
              />
            </label>
            <button className="conceptAction">{cfg.cta} ↗</button>
            {notice && <p className="conceptSuccess">✓ {notice}</p>}
          </form>
        </section>
      )}
      {notice && view !== "contact" && (
        <button className="conceptToast" onClick={() => setNotice("")}>
          {notice} ×
        </button>
      )}
      <footer className="conceptFooter">
        <b>
          {cfg.brand}
          <i>.</i>
        </b>
        <span>INTERACTIVE CONCEPT — NOT A REAL BUSINESS</span>
        <a href="/#contact">Build something like this ↗</a>
      </footer>
    </main>
  );
}

function ItemGrid({
  cfg,
  choose,
}: {
  cfg: (typeof configs)[Slug];
  choose: (index: number) => void;
}) {
  return (
    <section className="conceptGrid">
      {cfg.items.map((item, index) => (
        <button key={item.name} onClick={() => choose(index)}>
          <div>
            <img
              src={item.image}
              alt={item.name}
              style={{ objectPosition: item.position }}
            />
            <span>0{index + 1}</span>
          </div>
          <p>{item.meta}</p>
          <h3>{item.name}</h3>
          <b>{item.price} ↗</b>
        </button>
      ))}
    </section>
  );
}
