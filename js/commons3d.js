// The Commons: our own round campus, built from simple shapes (no outside art).
// A central plaza with a fountain and a floating ring, ring roads and spoke paths,
// landmark buildings you tap to visit, and filler buildings around the rings.
import * as THREE from 'three';

const R = 100;                       // island radius
const SKY = {                        // by time slot
  Morning:   { top: 0x7fc8f0, bot: 0xd9f1ff, sun: 0xfff2d8, amb: 1.5, sunI: 2.2, dir: [-1, 1.2, 0.6] },
  Afternoon: { top: 0x3f9be0, bot: 0xbfe6ff, sun: 0xffffff, amb: 1.7, sunI: 2.4, dir: [0.4, 1.6, 0.5] },
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
];

const rad = d => d * Math.PI / 180;
const at = (ang, dist) => new THREE.Vector3(Math.sin(rad(ang)) * dist, 0, Math.cos(rad(ang)) * dist);
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const mat = (c, o = {}) => new THREE.MeshLambertMaterial({ color: c, ...o });
const WALL = mat(0xeef2f7), WALL2 = mat(0xc9d3e0), GLASS = mat(0x7fc3ef), DARK = mat(0x2a3448);

function box(w, h, d, m) { const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); g.position.y = h / 2; return g; }
function cyl(r, h, m, seg = 24) { const g = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), m); g.position.y = h / 2; return g; }
function dome(r, m, seg = 24) { return new THREE.Mesh(new THREE.SphereGeometry(r, seg, 12, 0, Math.PI * 2, 0, Math.PI / 2), m); }
function vault(w, len, m) {   // half-cylinder roof lying on its side
  const g = new THREE.Mesh(new THREE.CylinderGeometry(w / 2, w / 2, len, 16, 1, false, 0, Math.PI), m);
  g.rotation.z = Math.PI / 2; g.rotation.y = Math.PI / 2; return g;
}

// ---------- landmark builders (each returns a Group sitting on y = 0, facing +z = toward the plaza)
const BUILD = {
  stadium(c) {
    const g = new THREE.Group(), roof = mat(c);
    const base = cyl(13, 5, WALL, 32); g.add(base);
    const band = cyl(13.3, 1.2, roof, 32); band.position.y = 4.4; g.add(band);
    const top = dome(12.5, roof, 32); top.scale.y = 0.45; top.position.y = 5; g.add(top);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(12.6, 0.35, 6, 40), WALL); ring.rotation.x = Math.PI / 2; ring.position.y = 5.1; g.add(ring);
    for (let i = 0; i < 8; i++) { const s = new THREE.Mesh(new THREE.TorusGeometry(12.5, 0.18, 4, 24, Math.PI / 2.3), WALL); s.rotation.set(0, i * Math.PI / 4, Math.PI / 2); s.scale.y = 0.45; s.position.y = 5; g.add(s); }
    const door = box(5, 3.2, 1, DARK); door.position.z = 12.8; g.add(door);
    return g;
  },
  shop(c) {
    const g = new THREE.Group();
    g.add(box(16, 5, 10, WALL));
    const front = box(14, 3.4, 0.4, GLASS); front.position.z = 5.1; g.add(front);
    const awn = box(16.5, 0.5, 3, mat(c)); awn.position.set(0, 4.2, 6); awn.rotation.x = -0.25; g.add(awn);
    const v = vault(10, 16, mat(c)); v.position.y = 5; g.add(v);
    const sign = box(7, 2, 0.4, mat(0xffffff)); sign.position.set(0, 8.2, 3.5); g.add(sign);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 12), mat(c)); ball.position.set(0, 10.6, 3.5); g.add(ball);
    return g;
  },
  tower(c) {
    const g = new THREE.Group();
    g.add(box(8, 4, 8, WALL2));
    const t = cyl(3, 22, WALL, 6); g.add(t);
    const board = box(10, 6, 1, DARK); board.position.set(0, 19, 3.3); g.add(board);
    const glow = box(9, 5, 0.2, mat(c, { emissive: c, emissiveIntensity: 0.6 })); glow.position.set(0, 19, 3.9); g.add(glow);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(3.4, 4, 6), mat(c)); cap.position.y = 24; g.add(cap);
    return g;
  },
  hall(c) {
    const g = new THREE.Group();
    g.add(box(18, 6, 11, WALL));
    const v = vault(11, 18, mat(c)); v.position.y = 6; g.add(v);
    for (let i = -2; i <= 2; i++) { const col = cyl(0.5, 6, WALL2, 8); col.position.set(i * 3.6, 3, 6.2); g.add(col); }
    const front = box(16, 4, 0.3, GLASS); front.position.z = 5.6; g.add(front);
    return g;
  },
  kiosk(c) {
    const g = new THREE.Group();
    g.add(cyl(6, 5, WALL, 20));
    const d = dome(6.2, mat(c)); d.scale.y = 0.6; d.position.y = 5; g.add(d);
    const mast = cyl(0.3, 9, WALL2, 6); mast.position.y = 7; g.add(mast);
    const dish = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3), mat(0xffffff, { side: THREE.DoubleSide }));
    dish.position.y = 16.5; dish.rotation.x = Math.PI * 0.8; g.add(dish);
    const front = box(5, 3, 0.3, GLASS); front.position.z = 6; g.add(front);
    return g;
  },
  dorm(c) {
    const g = new THREE.Group();
    const a = box(9, 12, 9, WALL); g.add(a);
    const b = box(9, 8, 9, WALL2); b.position.x = 9; g.add(b);
    for (let y = 2; y < 12; y += 3) for (const x of [-2.5, 0, 2.5]) { const w = box(1.6, 1.4, 0.2, GLASS); w.position.set(x, y, 4.6); g.add(w); }
    const r1 = vault(9, 9, mat(c)); r1.position.y = 12; r1.rotation.y = 0; g.add(r1);
    const r2 = vault(9, 9, mat(c)); r2.position.set(9, 8, 0); r2.rotation.y = 0; g.add(r2);
    return g;
  },
};

// filler buildings: a few shapes, seeded so the town is the same every visit
const FILL_ROOFS = [0xe8823a, 0xd9533f, 0x3f7fd9, 0x5aa0e0, 0xe8a43a, 0x8fa3b8, 0x47a85e];
function filler(r) {
  const roof = mat(FILL_ROOFS[Math.floor(r() * FILL_ROOFS.length)]), k = r(), g = new THREE.Group();
  const w = 5 + r() * 6, d = 4 + r() * 5, h = 2.5 + r() * 5;
  if (k < 0.35) { g.add(box(w, h, d, WALL)); const v = vault(d, w, roof); v.rotation.y = 0; v.position.y = h; g.add(v); }
  else if (k < 0.55) { g.add(cyl(d * 0.6, h, WALL, 16)); const dd = dome(d * 0.62, roof); dd.scale.y = 0.6; dd.position.y = h; g.add(dd); }
  else if (k < 0.75) { g.add(box(w, h, d, WALL)); const t = box(w + 0.4, 0.6, d + 0.4, roof); t.position.y = h; g.add(t); }
  else if (k < 0.88) { g.add(box(w, h * 1.6, d, GLASS)); const t = box(w + 0.3, 0.5, d + 0.3, WALL); t.position.y = h * 1.6; g.add(t); }
  else { const t = cyl(d * 0.5, h * 1.2, WALL2, 16); g.add(t); const c = new THREE.Mesh(new THREE.ConeGeometry(d * 0.55, 2.5, 16), roof); c.position.y = h * 1.2 + 1.25; g.add(c); }
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

// ---------- mount
// opts: { slot, counts: {place: n}, highlight: key, onPick(key) }
export function mountCommons(host, opts) {
  const w = host.clientWidth, h = host.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.setSize(w, h); renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene(), s = SKY[opts.slot] || SKY.Afternoon;
  skyDome(scene, opts.slot);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x6a8a5a, s.amb));
  const sun = new THREE.DirectionalLight(s.sun, s.sunI); sun.position.set(...s.dir); scene.add(sun);
  ground(scene);
  const fx = plazaCenter(scene);

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
  // filler: scatter on the rings, keeping clear of landmarks and spokes
  const r = rng(2026), taken = LANDMARKS.map(L => ({ p: at(L.ang, L.dist), r: L.kind === 'stadium' ? 16 : 13 }));
  for (const [r0, r1, n] of [[35, 48, 46], [55, 71, 70], [78, 92, 96]]) for (let i = 0; i < n; i++) {
    const a = r() * 360, d = r0 + r() * (r1 - r0), p = at(a, d);
    if (Math.abs(((a - 22.5) % 45 + 45) % 45 - 22.5) * Math.PI / 180 * d < 4.5) continue;   // spoke
    if (taken.some(t => t.p.distanceTo(p) < t.r + 4)) continue;
    const f = filler(r); f.position.copy(p); f.rotation.y = rad(a) + Math.PI;
    const sz = new THREE.Box3().setFromObject(f).getSize(new THREE.Vector3());
    const rr = Math.max(sz.x, sz.z) / 2; if (taken.some(t => t.p.distanceTo(p) < t.r + rr)) continue;
    taken.push({ p, r: rr }); scene.add(f);
  }

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
      const hit = rc.intersectObjects(picks, true).find(x => x.object.userData.key);
      if (hit) opts.onPick(hit.object.userData.key);
    }
  };
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  el.addEventListener('wheel', e => { e.preventDefault(); dist = Math.min(260, Math.max(80, dist * (1 + e.deltaY * 0.001))); place(); }, { passive: false });

  let alive = true, t0 = performance.now();
  const v = new THREE.Vector3();
  function frame() {
    if (!alive) return;
    const t = (performance.now() - t0) / 1000;
    fx.ring.rotation.x = Math.PI / 2 + Math.sin(t * 0.7) * 0.25; fx.ring.rotation.z = t * 0.6; fx.core.rotation.y = t; fx.core.position.y = 9 + Math.sin(t * 1.5) * 0.4;
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
