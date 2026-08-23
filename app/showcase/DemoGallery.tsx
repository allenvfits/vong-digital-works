"use client";

const projects = [
  { number:"01", sector:"REAL ESTATE", title:"Vanta Properties", image:"/concept-estate.png", href:"/demo/real-estate", summary:"A luxury property experience designed to turn browsing into qualified private-tour requests.", features:["Property collection", "Individual residence details", "Tour inquiry flow"] },
  { number:"02", sector:"FITNESS", title:"BAMFIT Atlas", image:"/bamfit-atlas-hero.webp", href:"https://bamfit.onrender.com", summary:"A live coaching platform combining training, nutrition, bookings, client accounts, and payments in one focused experience.", features:["Client coaching portal", "Nutrition and bookings", "Integrated payments"] },
  { number:"03", sector:"HOSPITALITY", title:"Kodo Open Fire", image:"/concept-restaurant.png", href:"/demo/restaurant", summary:"An editorial restaurant site that builds atmosphere while making menu exploration and reservations easy.", features:["Interactive menu", "Dining story", "Reservation request"] },
  { number:"04", sector:"ECOMMERCE", title:"Vector Audio", image:"/concept-commerce.png", href:"/demo/ecommerce", summary:"A premium product storefront balancing technical specifications, product storytelling, and a working demo bag.", features:["Product collection", "Detailed specifications", "Add-to-bag interaction"] },
];

export default function DemoGallery(){
  return <div className="workGrid">{projects.map(project=><article className="workCard" key={project.title}>
    <a className="workVisual" href={project.href}><img src={project.image} alt={`${project.title} interactive website concept`}/><span>{project.number} / {project.sector}</span><b>OPEN INTERACTIVE DEMO ↗</b></a>
    <div className="workInfo"><p>{project.sector} EXPERIENCE</p><h2>{project.title}</h2><p>{project.summary}</p><ul>{project.features.map(feature=><li key={feature}>✓ {feature}</li>)}</ul><div><a href={project.href}>Explore the full concept ↗</a><a href="mailto:contact@vongdigitalworks.com?subject=Project inquiry inspired by the interactive portfolio">Discuss a similar project ↗</a></div></div>
  </article>)}</div>;
}
