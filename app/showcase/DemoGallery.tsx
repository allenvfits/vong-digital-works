"use client";
import { useState } from "react";

const demos = [
  { id: "lex", tag: "LIVE AUTOMOTIVE PLATFORM", title: "Lex Auto Work", text: "Toyota and Lexus specialist site built around service, performance, visual upgrades, and direct booking.", metric: "$120", label: "HOURLY LABOR", color: "blue" },
  { id: "fit", tag: "FITNESS EXPERIENCE", title: "Forge Coaching", text: "A client training portal with progress, workouts, and coach check-ins.", metric: "82%", label: "WEEKLY GOAL", color: "pink" },
  { id: "shop", tag: "ECOMMERCE SYSTEM", title: "Rare Supply", text: "A bold storefront concept with product discovery and a frictionless cart.", metric: "$128", label: "CART TOTAL", color: "yellow" },
];

export default function DemoGallery() {
  const [active, setActive] = useState(0); const [count, setCount] = useState(1);
  const demo = demos[active];
  return <div className="demoExplorer">
    <div className="demoTabs" role="tablist">{demos.map((item,index)=><button role="tab" aria-selected={active===index} onClick={()=>{setActive(index);setCount(1)}} key={item.id}><span>0{index+1}</span>{item.title}</button>)}</div>
    <div className={`demoStage ${demo.color}`}>
      <div className="demoChrome"><i/><i/><i/><span>{active === 0 ? "lexautoworks.com" : `${demo.id}.demo`}</span></div>
      <div className="demoApp"><aside><b>{active === 0 ? "LEX." : "VDW."}</b><span>Overview</span><span>{active === 0 ? "Services" : "Activity"}</span><span>{active === 0 ? "Performance" : "Customers"}</span><span>{active === 0 ? "Book service" : "Reports"}</span></aside><section><small>{demo.tag}</small><h2>{demo.title}</h2><p>{demo.text}</p><div className="demoCards"><article><b>{demo.metric}</b><span>{demo.label}</span></article><article><b>{count}</b><span>{active===2?"ITEMS":active===0?"SERVICE REQUESTS":"NEW TODAY"}</span><button onClick={()=>setCount(value=>value+1)}>+ TRY IT</button></article></div><div className="demoChart"><i/><i/><i/><i/><i/><i/></div>{active===0&&<a className="liveDemoLink" href="https://lexautoworks.com/" target="_blank" rel="noreferrer">OPEN LIVE WEBSITE ↗</a>}</section></div>
    </div>
    <p className="demoHint">Interactive concept — switch projects and use the button inside the demo.</p>
  </div>;
}
