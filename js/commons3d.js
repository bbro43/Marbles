// The Commons: our own round campus, built from simple shapes (no outside art).
// A central plaza with a fountain and a floating ring, ring roads and spoke paths,
// landmark buildings you tap to visit, and filler buildings around the rings.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { modelFor } from './people.js';

const R = 100;                       // island radius
const SKY = {                        // by time slot
  Morning:   { top: 0x7fc8f0, bot: 0xd9f1ff, sun: 0xfff2d8, amb: 1.25, sunI: 2.2, dir: [-1, 1.2, 0.6] },
  Afternoon: { top: 0x3f9be0, bot: 0xbfe6ff, sun: 0xffffff, amb: 1.3, sunI: 2.2, dir: [0.4, 1.6, 0.5] },
  Evening:   { top: 0x2b2f6e, bot: 0xf2a36b, sun: 0xffc48a, amb: 1.1, sunI: 1.6, dir: [1, 0.5, -0.4] },
};

// Landmarks: place key, label, angle (degrees, 0 = toward the camera), ring distance, builder
export const LANDMARKS = [
  { key: 'arena1', label: 'Arena 1', ang: -45, dist: 62, kind: 'stadium', color: 0xd9533f },
  { key: 'arena2', label: 'Arena 2', ang: 45, dist: 62, kind: 'stadium', color: 0x3f7fd9 },
  { key: 'arena3', label: 'Arena 3', ang: 135, dist: 62, kind: 'stadium', color: 0x47a85e },
  { key: 'arena4', label: 'Arena 4', ang: -135, dist: 62, kind: 'stadium', color: 0x8a5cc7 },
  { key: 'shop', label: 'The Shop', ang: 0, dist: 40, kind: 'shop', color: 0xf2a33a },
  { key: 'standings', label: 'Standings', ang: 180, dist: 40, kind: 'tower', color: 0x39b6ff },
  { key: 'calendar', label: 'Event Hall', ang: 90, dist: 40, kind: 'hall', color: 0xe8d24a },
  { key: 'messages', label: 'Mail', ang: -90, dist: 40, kind: 'kiosk', color: 0x5ad1c8 },
  { key: 'inventory', label: 'My Room', ang: -22, dist: 84, kind: 'dorm', color: 0xe07aa8 },
  { key: 'teamroom', label: 'Team Rooms', ang: 22, dist: 84, kind: 'teams', color: 0x39b6ff },
];

const rad = d => d * Math.PI / 180;
const STAND = { stadium: 19, shop: 13, tower: 9, hall: 15, kiosk: 11, dorm: 10, teams: 14 };   // how far in front of each kind of building people stand
const at = (ang, dist) => new THREE.Vector3(Math.sin(rad(ang)) * dist, 0, Math.cos(rad(ang)) * dist);
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const mat = (c, o = {}) => new THREE.MeshLambertMaterial({ color: c, ...o });
const WALL = mat(0xeef2f7), WALL2 = mat(0xc9d3e0), GLASS = mat(0x7fc3ef), DARK = mat(0x2a3448), TRIM = mat(0x9aa8b8);
let NIGHT = 0;   // window glow, set per mount from the time slot

// ---------- facade textures: one window cell (about 2.5 wide x 3 tall), repeated over each wall
const CELL = 2.5, FLOOR = 3, texCache = {};
function cellCanvas(style, wall, glass, lit) {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const hex = n => '#' + n.toString(16).padStart(6, '0');
  g.fillStyle = lit ? '#000' : hex(wall); g.fillRect(0, 0, 64, 64);
  const win = (x, y, w, h) => {
    if (lit) { g.fillStyle = Math.random() < 0.55 ? '#ffd98a' : '#000'; g.fillRect(x, y, w, h); return; }
    const gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, hex(glass)); gr.addColorStop(1, '#1c3550');
    g.fillStyle = gr; g.fillRect(x, y, w, h);
    g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.moveTo(x + w * 0.15, y + h); g.lineTo(x + w * 0.45, y); g.lineTo(x + w * 0.6, y); g.lineTo(x + w * 0.3, y + h); g.fill();
    g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(x, y + h, w, 2);   // sill
  };
  if (style === 'office') { win(2, 6, 60, 50); g.fillStyle = lit ? '#000' : hex(wall); g.fillRect(30, 6, 4, 50); }
  else if (style === 'apt') { win(14, 14, 36, 34); if (!lit) { g.fillStyle = '#ffffff'; g.fillRect(8, 50, 48, 4); g.fillStyle = '#b8c4d4'; for (let x = 10; x < 56; x += 6) g.fillRect(x, 42, 2, 8); } }
  else if (style === 'shop') { win(4, 8, 56, 48); }
  else { win(18, 16, 28, 30); }   // house / small
  if (!lit) { g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(0, 60, 64, 4); }   // floor line
  return c;
}
function facadeTex(style, wall, glass, lit) {
  const k = [style, wall, glass, lit].join(); if (!texCache[k]) {
    const t = new THREE.CanvasTexture(cellCanvas(style, wall, glass, lit)); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; texCache[k] = t; }
  return texCache[k];
}
function wallMat(style, wall, glass, wReal, hReal) {
  const rep = (t) => { t = t.clone(); t.needsUpdate = true; t.repeat.set(Math.max(1, Math.round(wReal / CELL)), Math.max(1, Math.round(hReal / FLOOR))); return t; };
  const m = new THREE.MeshLambertMaterial({ map: rep(facadeTex(style, wall, glass, false)) });
  if (NIGHT) { m.emissiveMap = rep(facadeTex(style, wall, glass, true)); m.emissive = new THREE.Color(0xffffff); m.emissiveIntensity = NIGHT; }
  return m;
}
// a box building with windowed walls and a plain top
function block(w, h, d, { style = 'office', wall = 0xeef2f7, glass = 0x8cc8f0, roof = 0xc9d3e0 } = {}) {
  const front = wallMat(style, wall, glass, w, h), side = wallMat(style, wall, glass, d, h), top = mat(roof);
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [side, side, top, top, front, front]); m.position.y = h / 2; return m;
}
function roundBlock(r, h, { style = 'office', wall = 0xeef2f7, glass = 0x8cc8f0, roof = 0xc9d3e0 } = {}) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 28), [wallMat(style, wall, glass, Math.PI * 2 * r, h), mat(roof), mat(roof)]); m.position.y = h / 2; return m;
}
// parapet edge and rooftop units on a flat roof
function roofTop(g, w, d, h, r) {
  const p = mat(0xdfe5ee), t = 0.4;
  for (const [x, z, ww, dd] of [[0, d / 2, w, t], [0, -d / 2, w, t], [w / 2, 0, t, d], [-w / 2, 0, t, d]]) { const e = box(ww + t, 0.7, dd + t, p); e.position.set(x, h, z); g.add(e); }
  const n = 1 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) { const u = box(0.8 + r() * 1.4, 0.6 + r() * 0.8, 0.8 + r() * 1.2, TRIM); u.position.set((r() - 0.5) * (w - 2), h, (r() - 0.5) * (d - 2)); g.add(u); }
}
function door(g, w, z, h = 2.6) {
  const f = box(w + 0.6, h + 0.4, 0.3, mat(0xf7f9fc)); f.position.z = z; g.add(f);
  const d = box(w, h, 0.32, mat(0x30455f)); d.position.z = z + 0.02; g.add(d);
  const c = box(w + 1.6, 0.25, 1.6, mat(0xf7f9fc)); c.position.set(0, h + 0.5, z + 0.8); g.add(c);   // canopy
}
function prism(w, len, hgt, m) {   // pitched roof along x
  const sh = new THREE.Shape(); sh.moveTo(-w / 2, 0); sh.lineTo(w / 2, 0); sh.lineTo(0, hgt); sh.lineTo(-w / 2, 0);
  const g = new THREE.ExtrudeGeometry(sh, { depth: len, bevelEnabled: false }); g.translate(0, 0, -len / 2);
  const mesh = new THREE.Mesh(g, m); mesh.rotation.y = Math.PI / 2; return mesh;
}

function box(w, h, d, m) { const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); g.position.y = h / 2; return g; }
function cyl(r, h, m, seg = 24) { const g = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), m); g.position.y = h / 2; return g; }
function dome(r, m, seg = 24) { return new THREE.Mesh(new THREE.SphereGeometry(r, seg, 12, 0, Math.PI * 2, 0, Math.PI / 2), m); }
function vault(w, len, m) {   // half-cylinder roof lying on its side
  const g = new THREE.Mesh(new THREE.CylinderGeometry(w / 2, w / 2, len, 20, 1, false, 0, Math.PI), m);
  g.rotation.z = Math.PI / 2; g.rotation.y = Math.PI / 2; return g;
}
const at0 = (o, x, y, z) => { o.position.set(x, o.position.y + y, z); return o; };

// ---------- landmark builders (each returns a Group sitting on y = 0, facing +z = toward the plaza)
const BUILD = {
  stadium(c) {
    const g = new THREE.Group(), roof = mat(c), r = rng(c);
    g.add(cyl(14, 0.6, mat(0xd8dee8), 40));                                         // plinth
    const wall = roundBlock(13, 6, { style: 'shop', wall: 0xf2f5f9, glass: 0x9fd2f2 }); wall.position.y = 3.6; g.add(wall);
    for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, f = box(0.5, 7, 1, mat(0xffffff)); f.position.set(Math.sin(a) * 13.3, 0.6, Math.cos(a) * 13.3); f.rotation.y = a; g.add(f); }   // fins
    const band = cyl(13.6, 1.4, roof, 40); band.position.y = 6.6; g.add(band);
    const top = dome(13.2, roof, 40); top.scale.y = 0.42; top.position.y = 7.3; g.add(top);
    const sky = dome(5, mat(0xbfe6ff, { transparent: true, opacity: 0.85 }), 24); sky.scale.y = 0.5; sky.position.y = 10.6; g.add(sky);   // skylight
    for (let i = 0; i < 12; i++) { const rib = new THREE.Mesh(new THREE.TorusGeometry(13.2, 0.16, 4, 24, Math.PI / 2), mat(0xffffff)); rib.rotation.set(0, i * Math.PI / 6, Math.PI / 2); rib.scale.y = 0.42; rib.position.y = 7.3; g.add(rib); }
    const gate = new THREE.Group(); gate.add(block(8, 5, 3, { style: 'shop', wall: 0xffffff })); const sign = box(8.4, 1.2, 3.4, roof); sign.position.y = 5; gate.add(sign);
    gate.position.set(0, 0.6, 13.5); g.add(gate);
    return g;
  },
  shop(c) {
    const g = new THREE.Group(), r = rng(7);
    g.add(block(18, 7, 11, { style: 'shop', wall: 0xfff6ea, glass: 0xa8dcf5 }));
    const v = vault(11, 18.4, mat(c)); v.position.y = 7; g.add(v);
    const awn = box(16, 0.4, 3, mat(c)); awn.position.set(0, 3.4, 6.8); awn.rotation.x = -0.3; g.add(awn);
    for (let x = -7; x <= 7; x += 2) { const st = box(1, 0.42, 3.05, mat(0xffffff)); st.position.set(x, 3.4, 6.8); st.rotation.x = -0.3; g.add(st); }   // awning stripes
    door(g, 3, 5.6);
    const sign = box(9, 2.4, 0.5, mat(0xffffff)); sign.position.set(0, 9.6, 4.2); g.add(sign);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(1.5, 24, 16), mat(c)); ball.position.set(0, 12.6, 4.2); g.add(ball);
    const seam = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.12, 6, 24), mat(0xffffff)); seam.position.copy(ball.position); g.add(seam);
    return g;
  },
  tower(c) {
    const g = new THREE.Group();
    g.add(block(12, 5, 10, { style: 'shop', wall: 0xe6ecf4 })); roofTop(g, 12, 10, 5, rng(3));
    const t = block(6, 26, 6, { style: 'office', wall: 0xdfe7f1, glass: 0x7fbce8 }); g.add(t);
    const board = box(11, 6.5, 0.8, DARK); board.position.set(0, 20, 3.4); g.add(board);
    const glow = box(10, 5.5, 0.2, mat(c, { emissive: c, emissiveIntensity: 0.7 })); glow.position.set(0, 20.5, 3.9); g.add(glow);
    for (let i = 0; i < 4; i++) { const ln = box(8, 0.4, 0.1, mat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.6 })); ln.position.set(0, 21.8 + i * 1.1 - 2.2, 4.05); g.add(ln); }
    const cap = box(7, 1, 7, mat(c)); cap.position.y = 26; g.add(cap);
    const mast = cyl(0.25, 6, TRIM, 6); mast.position.y = 27; g.add(mast);
    return g;
  },
  hall(c) {
    const g = new THREE.Group();
    g.add(block(20, 7, 12, { style: 'office', wall: 0xf4f1e6 }));
    const v = vault(12, 20.4, mat(c)); v.position.y = 7; g.add(v);
    const porch = box(14, 0.5, 4, mat(0xf7f9fc)); porch.position.set(0, 6.4, 7.8); g.add(porch);
    for (let i = -3; i <= 3; i++) { const col = cyl(0.45, 6.4, mat(0xffffff), 10); col.position.set(i * 2.2, 0, 9.4); g.add(col); }
    const steps = box(14, 0.5, 2, mat(0xd8dee8)); steps.position.set(0, 0, 10.6); g.add(steps);
    door(g, 4, 6.05, 3.6);
    return g;
  },
  kiosk(c) {
    const g = new THREE.Group();
    g.add(roundBlock(6.5, 6, { style: 'shop', wall: 0xf2f5f9 }));
    const d = dome(6.7, mat(c)); d.scale.y = 0.55; d.position.y = 6; g.add(d);
    const mast = cyl(0.3, 10, TRIM, 6); mast.position.y = 6; g.add(mast);
    const dish = new THREE.Mesh(new THREE.SphereGeometry(2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 3), mat(0xffffff, { side: THREE.DoubleSide }));
    dish.position.y = 16.5; dish.rotation.x = Math.PI * 0.75; g.add(dish);
    door(g, 2.4, 6.4);
    const box1 = box(1.4, 2.2, 1, mat(c)); box1.position.set(4, 0, 7.4); g.add(box1);   // mailbox
    return g;
  },
  teams(c) {   // Team Rooms: a round white hall with a glass band, a colored dome and a floating ring
    const g = new THREE.Group();
    g.add(cyl(9.5, 0.6, mat(0xd8dee8), 40));
    const body = roundBlock(8.5, 9, { style: 'office', wall: 0xf6f9fc, glass: 0x9fd2f2 }); body.position.y = 0.6; g.add(body);
    const band = cyl(8.7, 0.8, mat(c, { emissive: c, emissiveIntensity: 0.35 }), 40); band.position.y = 9.6; g.add(band);
    const top = dome(8.4, mat(0xffffff), 40); top.scale.y = 0.45; top.position.y = 10.4; g.add(top);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(5, 0.35, 10, 48), mat(c, { emissive: c, emissiveIntensity: 0.8 })); ring.rotation.x = Math.PI / 2; ring.position.y = 17; g.add(ring);
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, pod = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 10), mat(0xffffff)); pod.position.set(Math.sin(a) * 5, 17, Math.cos(a) * 5); g.add(pod); }
    door(g, 3, 8.7, 3.2);
    return g;
  },
  dorm(c) {
    const g = new THREE.Group(), r = rng(11);
    const a = block(10, 15, 9, { style: 'apt', wall: 0xfbeef3 }); g.add(a); roofTop(g, 10, 9, 15, r);
    const b = block(10, 9, 9, { style: 'apt', wall: 0xf2f5f9 }); b.position.x = 10; g.add(b); roofTop(g, 20, 9, 9, r);
    const band = box(10.4, 0.6, 9.4, mat(c)); band.position.y = 15.2; g.add(band);
    door(g, 2.6, 4.6);
    return g;
  },
};

// ---------- filler: offices, apartments, houses, warehouses, round towers (seeded, same every visit)
const FILL_ROOFS = [0xe8823a, 0xd9533f, 0x3f7fd9, 0x5aa0e0, 0xe8a43a, 0x8fa3b8, 0x47a85e];
const WALLS = [0xf4f6fa, 0xeef2f7, 0xfaf3e6, 0xe9eef5, 0xf6ecec];
function filler(r, ring) {
  const pick = a => a[Math.floor(r() * a.length)];
  const rc = pick(FILL_ROOFS), roof = mat(rc), wall = pick(WALLS), k = r(), g = new THREE.Group();
  if (ring === 0 && k < 0.5 || k < 0.2) {   // office / glass tower
    const w = 6 + r() * 5, d = 5 + r() * 4, h = 9 + Math.round(r() * 4) * 3;
    g.add(block(w, h, d, { style: 'office', wall: r() < 0.5 ? 0xdfe7f1 : wall, glass: pick([0x7fbce8, 0x8fd0e0, 0x9cb6e8]) })); roofTop(g, w, d, h, r);
    const top = box(w + 0.3, 0.8, d + 0.3, roof); top.position.y = h + 0.1; if (r() < 0.5) g.add(top);
  } else if (k < 0.45) {   // apartments
    const w = 8 + r() * 4, d = 6 + r() * 2, h = 6 + Math.round(r() * 3) * 3;
    g.add(block(w, h, d, { style: 'apt', wall })); roofTop(g, w, d, h, r);
    const band = box(w + 0.2, 0.5, d + 0.2, roof); band.position.y = h - 0.25; g.add(band);
  } else if (k < 0.72) {   // house with a pitched roof
    const w = 5 + r() * 3, d = 4 + r() * 2, h = 3 + (r() < 0.4 ? 3 : 0);
    g.add(block(w, h, d, { style: 'house', wall }));
    const p = prism(d + 0.8, w + 0.8, 2 + r(), roof); p.position.y = h; g.add(p);
    const dr = box(1.2, 2, 0.2, mat(0x6b4a3a)); dr.position.z = d / 2 + 0.05; g.add(dr);
  } else if (k < 0.87) {   // warehouse / workshop with a curved roof
    const w = 9 + r() * 5, d = 6 + r() * 3, h = 4;
    g.add(block(w, h, d, { style: 'house', wall: 0xe4e9f0 }));
    const v = vault(d, w, roof); v.position.y = h; v.scale.x = 0.55; g.add(v);
    const roll = box(3, 3, 0.2, mat(0x8fa3b8)); roll.position.z = d / 2 + 0.05; g.add(roll);
  } else {   // round tower with a dome or cone
    const rr = 3 + r() * 2, h = 6 + r() * 8;
    g.add(roundBlock(rr, h, { style: 'office', wall }));
    if (r() < 0.5) { const dd = dome(rr + 0.2, roof); dd.scale.y = 0.6; dd.position.y = h; g.add(dd); }
    else { const c = new THREE.Mesh(new THREE.ConeGeometry(rr + 0.4, 3, 24), roof); c.position.y = h + 1.5; g.add(c); }
  }
  return g;
}

function ground(scene) {
  const grass = new THREE.Mesh(new THREE.CircleGeometry(R, 96), mat(0x7cc95a)); grass.rotation.x = -Math.PI / 2; scene.add(grass);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.97, 6, 96, 1, true), mat(0x9aa8b8)); rim.position.y = -3; scene.add(rim);
  const path = mat(0xe9dcc0), y = 0.05;
  const ring = (r0, r1) => { const m = new THREE.Mesh(new THREE.RingGeometry(r0, r1, 96), path); m.rotation.x = -Math.PI / 2; m.position.y = y; scene.add(m); };
  ring(0, 22); ring(29, 33); ring(50, 53); ring(73, 76); ring(94, 96);
  const plaza = new THREE.Mesh(new THREE.RingGeometry(16, 22, 64), mat(0xd3c6a6)); plaza.rotation.x = -Math.PI / 2; plaza.position.y = y + 0.02; scene.add(plaza);
  for (let i = 0; i < 8; i++) {   // spokes
    const a = rad(i * 45 + 22.5), m = new THREE.Mesh(new THREE.PlaneGeometry(4, R - 22), path);
    m.rotation.x = -Math.PI / 2; m.rotation.z = -a; m.position.set(Math.sin(a) * (R + 22) / 2, y + 0.01, Math.cos(a) * (R + 22) / 2); scene.add(m);
  }
  // little trees along the ring roads
  const r = rng(77), leaf = mat(0x4f9e3f), trunk = mat(0x8a6a4a);
  for (const rr of [26, 46, 69, 90]) for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2 + r() * 0.05; if (r() < 0.35) continue;
    const t = new THREE.Group(); const s = 0.7 + r() * 0.6;
    const tr = cyl(0.25 * s, 1.2 * s, trunk, 6); t.add(tr);
    const l = new THREE.Mesh(new THREE.SphereGeometry(1.1 * s, 8, 6), leaf); l.position.y = 1.9 * s; t.add(l);
    t.position.set(Math.sin(a) * rr, 0, Math.cos(a) * rr); scene.add(t);
  }
}

function plazaCenter(scene) {
  const g = new THREE.Group();
  const pool = cyl(8, 0.8, WALL2, 40); g.add(pool);
  const water = new THREE.Mesh(new THREE.CircleGeometry(7.3, 40), mat(0x5ab8ef, { emissive: 0x1a5a8a, emissiveIntensity: 0.4 }));
  water.rotation.x = -Math.PI / 2; water.position.y = 0.82; g.add(water);
  const pillar = cyl(1, 6, WALL, 12); g.add(pillar);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.35, 10, 48), mat(0x7fdcff, { emissive: 0x39b6ff, emissiveIntensity: 1 }));
  ring.position.y = 9; g.add(ring);
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), mat(0xffffff, { emissive: 0x7fdcff, emissiveIntensity: 0.9 }));
  core.position.y = 9; g.add(core);
  scene.add(g);
  return { ring, core };
}

function skyDome(scene, slot) {
  const s = SKY[slot] || SKY.Afternoon;
  const geo = new THREE.SphereGeometry(400, 32, 16), top = new THREE.Color(s.top), bot = new THREE.Color(s.bot), cols = [];
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { const t = Math.max(0, p.getY(i) / 400); const c = bot.clone().lerp(top, Math.pow(t, 0.6)); cols.push(c.r, c.g, c.b); }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, depthWrite: false })));
  // the grid dome over the campus
  const grid = new THREE.Mesh(new THREE.SphereGeometry(R * 1.35, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.12, depthWrite: false }));
  grid.position.y = -R * 0.35; scene.add(grid);
  scene.fog = new THREE.Fog(s.bot, 220, 420);
}

// ---------- floating boards over the plaza (our own: see-through green screens with live text)
function boardTexture(b) {
  const W = 512, H = 340, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const accent = '#' + b.color.toString(16).padStart(6, '0');
  g.fillStyle = 'rgba(40,190,120,0.55)'; g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(200,255,220,0.25)'; g.lineWidth = 1;
  for (let x = 0; x < W; x += 32) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  for (let y = 0; y < H; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.strokeStyle = '#d9ffe8'; g.lineWidth = 8; g.strokeRect(4, 4, W - 8, H - 8);
  g.fillStyle = accent; g.fillRect(8, 8, W - 16, 58);
  g.fillStyle = '#fff'; g.font = 'italic 900 36px system-ui, sans-serif'; g.textBaseline = 'middle'; g.fillText(b.title.toUpperCase(), 24, 38);
  g.font = '700 25px system-ui, sans-serif';
  (b.lines || []).slice(0, 6).forEach((ln, i) => {
    const y = 96 + i * 40;
    g.fillStyle = i % 2 ? 'rgba(0,60,30,0.25)' : 'rgba(255,255,255,0.12)'; g.fillRect(16, y - 18, W - 32, 36);
    g.fillStyle = ln.hot ? '#ffe36b' : '#ffffff'; g.fillText(String(ln.text || ln).slice(0, 34), 28, y);
  });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
function addBoards(scene, list) {
  const out = [];
  list.forEach((b, i) => {
    const a = (i / list.length) * Math.PI * 2 + 0.4, rr = 34, y = 48 + (i % 2) * 10;
    const grp = new THREE.Group(); grp.position.set(Math.sin(a) * rr, y, Math.cos(a) * rr);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(34, 22.6), new THREE.MeshBasicMaterial({ map: boardTexture(b), transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    m.userData.key = 'board:' + b.key; m.renderOrder = 5; grp.add(m);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.6, y - 9, 6, 1, true), new THREE.MeshBasicMaterial({ color: 0x7fffc0, transparent: true, opacity: 0.18, depthWrite: false }));
    beam.position.y = -(y - 9) / 2 - 11; grp.add(beam); b.beam = beam;   // a faint light beam down to the plaza
    scene.add(grp); out.push({ grp, m, y, ph: i * 1.7, beam });
  });
  return out;
}

// ---------- mount
// opts: { slot, counts: {place: n}, highlight: key, onPick(key) }
export function mountCommons(host, opts) {
  const w = host.clientWidth, h = host.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.setSize(w, h); renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  NIGHT = opts.slot === 'Evening' ? 0.9 : 0;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene(), s = SKY[opts.slot] || SKY.Afternoon;
  skyDome(scene, opts.slot);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x6a8a5a, s.amb));
  const sun = new THREE.DirectionalLight(s.sun, s.sunI); sun.position.set(...s.dir).normalize().multiplyScalar(160); scene.add(sun);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -110, right: 110, top: 110, bottom: -110, near: 10, far: 400 }); sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.6;
  ground(scene);
  const fx = plazaCenter(scene);
  const boards = addBoards(scene, opts.boards || []);

  // landmarks
  const picks = [], labels = [];
  for (const L of LANDMARKS) {
    const g = BUILD[L.kind](L.color), p = at(L.ang, L.dist);
    g.position.copy(p); g.rotation.y = rad(L.ang) + Math.PI;   // face the plaza
    g.traverse(o => { if (o.isMesh) o.userData.key = L.key; });
    scene.add(g); picks.push(g);
    const el = document.createElement('button'); el.className = 'pin'; el.dataset.key = L.key;
    el.innerHTML = `<span>${L.label}</span>${opts.counts?.[L.key] ? `<i>${opts.counts[L.key]}</i>` : ''}`;
    if (opts.highlight === L.key) el.classList.add('hot');
    el.onclick = e => { e.stopPropagation(); opts.onPick(L.key); };
    host.appendChild(el);
    const top = new THREE.Box3().setFromObject(g).max.y;
    labels.push({ el, pos: new THREE.Vector3(p.x, top + 2, p.z) });
  }
    // people: each brawler stands in front of the place they are at right now (Story's presence list)
  const loader = new GLTFLoader(), people = [];
  for (const L of LANDMARKS) {
    const ids = opts.people?.[L.key] || [];
    const home = at(L.ang, L.dist - STAND[L.kind]);   // in front of the building, toward the plaza
    ids.forEach(async (id, i) => {
      const path = await modelFor(id);
      if (!path || !opts.url) return;                 // not in people.json, or set to null
      try {
        const g = (await loader.loadAsync(await opts.url(path))).scene;
        const size = new THREE.Box3().setFromObject(g).getSize(new THREE.Vector3());
        g.scale.setScalar(3 / size.y);                // everyone about 3 units tall
        const side = (i - (ids.length - 1) / 2) * 2.2;   // spread out in a row, side by side
        g.position.copy(home).add(new THREE.Vector3(Math.cos(rad(L.ang)) * side, 0, -Math.sin(rad(L.ang)) * side));
        g.rotation.y = rad(L.ang) + Math.PI;          // face the plaza, like the buildings
        g.traverse(o => { if (o.isMesh) o.castShadow = true; });
        g.userData.rot0 = g.rotation.y; g.userData.ph = Math.random() * 6.28;   // their facing, and their own timing
        scene.add(g); people.push(g);
      } catch (e) { console.warn('person', id, e); }
    });
  }
  // filler: scatter on the rings, keeping clear of landmarks and spokes
  const r = rng(2026), taken = LANDMARKS.map(L => ({ p: at(L.ang, L.dist), r: L.kind === 'stadium' ? 16 : 13 }));
  for (const [r0, r1, n] of [[35, 48, 46], [55, 71, 70], [78, 92, 96]]) for (let i = 0; i < n; i++) {
    const a = r() * 360, d = r0 + r() * (r1 - r0), p = at(a, d);
    if (Math.abs(((a - 22.5) % 45 + 45) % 45 - 22.5) * Math.PI / 180 * d < 4.5) continue;   // spoke
    if (taken.some(t => t.p.distanceTo(p) < t.r + 4)) continue;
    const f = filler(r, r0 < 40 ? 0 : 1); f.position.copy(p); f.rotation.y = rad(a) + Math.PI;
    const sz = new THREE.Box3().setFromObject(f).getSize(new THREE.Vector3());
    const rr = Math.max(sz.x, sz.z) / 2; if (taken.some(t => t.p.distanceTo(p) < t.r + rr)) continue;
    taken.push({ p, r: rr }); scene.add(f);
  }

  const flat = ['PlaneGeometry', 'RingGeometry', 'CircleGeometry'];
  scene.traverse(o => { if (!o.isMesh || o.material.wireframe || o.material.side === THREE.BackSide) return;
    o.receiveShadow = true; o.castShadow = !flat.includes(o.geometry.type) && !o.material.transparent; if (o.material.transparent) o.receiveShadow = false; });

  // camera: orbit around the plaza, drag to turn, pinch / wheel to zoom
  const cam = new THREE.PerspectiveCamera(50, w / h, 1, 1200);
  let yaw = opts.yaw ?? 0, dist = 190 * Math.max(1, (h / w) * 0.9), pitch = 0.78;
  const place = () => { cam.position.set(Math.sin(yaw) * Math.cos(pitch) * dist, Math.sin(pitch) * dist, Math.cos(yaw) * Math.cos(pitch) * dist); cam.lookAt(0, 0, 0); };
  place();
  const ptr = new Map(); let moved = 0, pinch0 = 0;
  const el = renderer.domElement; el.style.touchAction = 'none';
  el.addEventListener('pointerdown', e => { ptr.set(e.pointerId, [e.clientX, e.clientY]); moved = 0; if (ptr.size === 2) { const [a, b] = [...ptr.values()]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); } });
  el.addEventListener('pointermove', e => {
    if (!ptr.has(e.pointerId)) return; const [x0, y0] = ptr.get(e.pointerId); ptr.set(e.pointerId, [e.clientX, e.clientY]);
    if (ptr.size === 1) { yaw -= (e.clientX - x0) * 0.008; pitch = Math.min(1.35, Math.max(0.35, pitch + (e.clientY - y0) * 0.004)); moved += Math.abs(e.clientX - x0) + Math.abs(e.clientY - y0); }
    else if (ptr.size === 2) { const [a, b] = [...ptr.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); dist = Math.min(260, Math.max(80, dist * pinch0 / d)); pinch0 = d; moved = 99; }
    place();
  });
  const up = e => {
    const was = ptr.size; ptr.delete(e.pointerId);
    if (was === 1 && moved < 6 && e.type === 'pointerup') {   // a tap: pick a building
      const rc = new THREE.Raycaster(), b = el.getBoundingClientRect();
      rc.setFromCamera(new THREE.Vector2((e.clientX - b.left) / b.width * 2 - 1, -(e.clientY - b.top) / b.height * 2 + 1), cam);
      const hit = rc.intersectObjects([...boards.map(b => b.m), ...picks], true).find(x => x.object.userData.key);
      if (hit) opts.onPick(hit.object.userData.key);
    }
  };
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  el.addEventListener('wheel', e => { e.preventDefault(); dist = Math.min(260, Math.max(80, dist * (1 + e.deltaY * 0.001))); place(); }, { passive: false });

  let alive = true, t0 = performance.now();
  const v = new THREE.Vector3();
  function frame() {
    if (!alive) return;
    if (host.hidden || !host.isConnected || document.body.classList.contains('scene-on')) { requestAnimationFrame(frame); return; }   // not on screen, or a scene is playing (the picture freezes): don't draw
    const t = (performance.now() - t0) / 1000;
    fx.ring.rotation.x = Math.PI / 2 + Math.sin(t * 0.7) * 0.25; fx.ring.rotation.z = t * 0.6; fx.core.rotation.y = t; fx.core.position.y = 9 + Math.sin(t * 1.5) * 0.4;
    for (const g of people) {   // a little life: a slow turn left and right, and a slight sway
      g.rotation.y = g.userData.rot0 + Math.sin(t * 0.4 + g.userData.ph) * 0.25;
      g.rotation.z = Math.sin(t * 1.2 + g.userData.ph) * 0.02;
    }
    for (const b of boards) {   // face the camera, bob gently
      b.grp.quaternion.copy(cam.quaternion);   // always face the screen
      b.m.material.opacity = Math.min(1, Math.max(0.12, (dist - 110) / 60));   // fade out when zoomed in on the plaza
      b.grp.position.y = b.y + Math.sin(t * 0.8 + b.ph) * 0.8;
      b.beam.quaternion.copy(cam.quaternion).invert();   // keep the beam pointing straight down
    }
    renderer.render(scene, cam);
    const W = el.clientWidth, H = el.clientHeight;
    for (const L of labels) {
      v.copy(L.pos).project(cam);
      const show = v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1;
      L.el.style.display = show ? '' : 'none';
      L.el.style.transform = `translate(-50%,-100%) translate(${(v.x + 1) / 2 * W}px,${(1 - v.y) / 2 * H}px)`;
      L.el.style.zIndex = String(1000 - Math.round(v.z * 500));
    }
    requestAnimationFrame(frame);
  }
  frame();
  const onResize = () => { const W = host.clientWidth, H = host.clientHeight; renderer.setSize(W, H); cam.aspect = W / H; cam.updateProjectionMatrix(); };
  addEventListener('resize', onResize);
  return {
    get yaw() { return yaw; },
    dispose() { alive = false; removeEventListener('resize', onResize); renderer.dispose(); host.innerHTML = ''; },
  };
}
