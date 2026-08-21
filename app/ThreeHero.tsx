"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHero() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element || !window.WebGLRenderingContext) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, .1, 100);
    camera.position.set(0, .1, 8.6);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !reduced, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);

    const world = new THREE.Group(); scene.add(world);
    const core = new THREE.Group(); world.add(core);
    const cyan = new THREE.MeshStandardMaterial({ color: 0x071217, metalness: .88, roughness: .18, emissive: 0x003c46, emissiveIntensity: .7 });
    const orange = new THREE.MeshStandardMaterial({ color: 0xff4d00, metalness: .55, roughness: .25, emissive: 0x7a1600, emissiveIntensity: .8 });
    const bar = new THREE.BoxGeometry(.52, 4.4, .58, 2, 8, 2);
    const left = new THREE.Mesh(bar, cyan); left.position.set(-.89, .28, 0); left.rotation.z = -.43;
    const right = new THREE.Mesh(bar, cyan); right.position.set(.89, .28, 0); right.rotation.z = .43;
    core.add(left, right);
    const accent = new THREE.Mesh(new THREE.BoxGeometry(.13, 3.1, .66), orange); accent.position.set(.98, .62, .08); accent.rotation.z = .43; core.add(accent);
    [left, right].forEach(mesh => { const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({ color: 0x00e7ff, transparent: true, opacity: .55 })); edges.position.copy(mesh.position); edges.rotation.copy(mesh.rotation); core.add(edges); });

    const rings = new THREE.Group(); world.add(rings);
    [3.1, 4.2, 5.25].forEach((radius, index) => { const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, .012, 6, 140), new THREE.MeshBasicMaterial({ color: index === 1 ? 0xff4d00 : 0x00e7ff, transparent: true, opacity: index === 1 ? .4 : .22 })); ring.rotation.set(Math.PI / 2.4 + index * .17, index * .33, index * .2); rings.add(ring); });

    const nodes = new THREE.Group(); world.add(nodes);
    const nodeGeo = new THREE.IcosahedronGeometry(.13, 0);
    for (let index = 0; index < 18; index++) { const angle = index * 2.399; const radius = 3.3 + (index % 4) * .72; const node = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: index % 5 === 0 ? 0xff4d00 : 0x00e7ff, wireframe: index % 3 === 0, transparent: true, opacity: .35 + (index % 4) * .12 })); node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * .72, (index % 5) - 2); node.scale.setScalar(.55 + (index % 3) * .35); nodes.add(node); }

    const count = 700; const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { positions[i*3]=(Math.random()-.5)*16; positions[i*3+1]=(Math.random()-.5)*10; positions[i*3+2]=(Math.random()-.5)*9; }
    const pointsGeo = new THREE.BufferGeometry(); pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(pointsGeo, new THREE.PointsMaterial({ color: 0x65f3ff, size: .018, transparent: true, opacity: .48 })); scene.add(points);
    scene.add(new THREE.AmbientLight(0x6cddea, 1.15));
    const key = new THREE.PointLight(0x00e7ff, 34, 16); key.position.set(-4, 3, 5); scene.add(key);
    const rim = new THREE.PointLight(0xff4d00, 45, 14); rim.position.set(4, -2, 4); scene.add(rim);

    let targetX = 0, targetY = 0, frame = 0, visible = true;
    const resize = () => { const { width, height } = element.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); };
    const move = (event: PointerEvent) => { targetX = (event.clientX / window.innerWidth - .5) * .75; targetY = (event.clientY / window.innerHeight - .5) * .45; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && !frame && !reduced) frame = requestAnimationFrame(tick); }, { threshold: .01 });
    const clock = new THREE.Clock();
    function tick() { frame = 0; if (!visible) return; const time = clock.getElapsedTime(); core.rotation.y += (targetX - core.rotation.y) * .035; core.rotation.x += (-targetY - core.rotation.x) * .035; core.position.y = Math.sin(time * .55) * .12; rings.rotation.z = time * .035; rings.rotation.y = time * -.028; nodes.rotation.z = time * -.018; points.rotation.y = time * .008; camera.position.x += (targetX * .65 - camera.position.x) * .018; camera.position.y += (-targetY * .35 - camera.position.y) * .018; camera.lookAt(0, 0, 0); renderer.render(scene, camera); frame = requestAnimationFrame(tick); }
    resize(); observer.observe(element); window.addEventListener("resize", resize); window.addEventListener("pointermove", move, { passive: true });
    if (reduced) renderer.render(scene, camera); else frame = requestAnimationFrame(tick);
    return () => { observer.disconnect(); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); if (frame) cancelAnimationFrame(frame); renderer.dispose(); scene.traverse(object => { if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) { object.geometry?.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(material => material?.dispose()); } }); element.replaceChildren(); };
  }, []);

  return <div className="threeHero" ref={host} aria-hidden="true"><span className="threeFallback">V</span></div>;
}
