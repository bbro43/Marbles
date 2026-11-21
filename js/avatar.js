// Your character, built from the New Vestroia game's character-creator parts (pack/creator).
// Each part is its own model on the same skeleton in its rest pose, so loading them together assembles the body.
// Colors are texture swaps: a material whose texture is e.g. "hair_00_00" gets "hair_03_02" (style 3, color 2).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// what you can change, how many styles and colors each has (from pack/creator/catalog.json)
export const PARTS = {
  hair:    { styles: 16, colors: 12, label: 'Hair' },   // styles 10-15 are our own (scripts/girlhair.mjs); colors 6-11 are the bright Vestal colors (scripts/haircolors.py)
  cap:     { styles: 6, colors: 6, label: 'Hat', optional: true },
  glasses: { styles: 6, colors: 4, label: 'Glasses', optional: true },
  eye:     { styles: 6, colors: 12, label: 'Eyes' },   // 6-11: same colors with a tinted pupil instead of black, for Vestals (scripts/vestaleyes.py)
  eyeblow: { styles: 8, colors: 12, label: 'Eyebrows' },   // 6-7 are softer (scripts/softbrows.py)
  facial:  { styles: 6, colors: 5, label: 'Face' },
  top:     { styles: 8, colors: 6, label: 'Top' },
  down:    { styles: 10, colors: 6, label: 'Pants' },   // 8-9 are skirts (scripts/girlskirt.mjs)
  shoes:   { styles: 4, colors: 6, label: 'Shoes' },
};
export const SKIN_TONES = 5;
// Races (Billy, Nov 20-21). All done here on the existing textures and with one small extra piece, so the pack needs nothing new.
//   human
//   vestal     hazed eyes: no pupil, the iris glows milky toward the center
//   gundalian  gray skin #AFB9BB, grayish-blue marks under the eyes like heavy eye shadow and on the neck (#777087),
//              and a bone plate over the forehead
//   neathian   rounded blue diamond "bug" eyes, a triangular arc on the upper face; skin light blue #D4E4EF (male) or
//              light pink #D2C3D9 (female): look.sex 'm' or 'f'
export const RACES = ['human', 'vestal', 'gundalian', 'neathian'];
export const RACE_LABEL = { human: 'Human', vestal: 'Vestal', gundalian: 'Gundalian', neathian: 'Neathian' };
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const SKIN_OF = L => L.race === 'gundalian' ? hex('#AFB9BB') : L.race === 'neathian' ? hex(L.sex === 'f' ? '#D2C3D9' : '#D4E4EF') : null;
const GUN_MARK = hex('#777087');
// race options (Billy, Nov 21), in the look:
//   marks  Gundalian eye shadow: 'under' (default) or 'around' (all the way around each eye, plus a small chin mark)
//   neye   Neathian diamond eyes: 'blue' (default) or 'tint' (in the Face screen's eye color)
// The Gundalian plate is always the gold band, coming to a point toward the nose, over the hair (hair styles that would
// cover it can't be picked: GUN_HAIR).
const PLATE_GOLD = '#A99A49';
export const RACE_OPT = { marks: ['under', 'around'], neye: ['blue', 'tint'] };
export const opt = (L, k) => L[k] || RACE_OPT[k][0];
// recolor the skin in a texture: skin-like pixels (near the texture's own skin tone) take the new color, keeping their light and shade
function reskin(c, to, reach = 75) {
  const g = c.getContext('2d'), d = g.getImageData(0, 0, c.width, c.height), p = d.data;
  const lum = (r, gg, b) => r * 0.3 + gg * 0.59 + b * 0.11, warm = i => p[i] > p[i + 1] && p[i + 1] >= p[i + 2] - 8 && p[i] - p[i + 2] < 90 && lum(p[i], p[i + 1], p[i + 2]) > 120;
  let n = 0, ref = [0, 0, 0];
  for (let i = 0; i < p.length; i += 4) if (p[i + 3] > 200 && warm(i)) { n++; for (let k = 0; k < 3; k++) ref[k] += p[i + k]; }
  if (!n) return c; ref = ref.map(v => v / n); const rl = lum(...ref), tl = lum(...to);
  for (let i = 0; i < p.length; i += 4) {
    if (!p[i + 3]) continue;
    const dist = Math.hypot(p[i] - ref[0], p[i + 1] - ref[1], p[i + 2] - ref[2]); if (dist > reach) continue;   // eyes, lips, outlines stay
    const k = 1 + (lum(p[i], p[i + 1], p[i + 2]) / rl - 1) * 0.25,   // mostly flat, so the face sheet and the skin sheet match (Billy, Nov 21)
       w = dist < reach - 30 ? 1 : (reach - dist) / 30;
    for (let j = 0; j < 3; j++) p[i + j] = Math.round(p[i + j] * (1 - w) + Math.min(255, to[j] * k * (tl > 0 ? 1 : 1)) * w);
  }
  g.putImageData(d, 0, 0); return c;
}
const toCanvas = img => { const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; c.getContext('2d').drawImage(img, 0, 0); return c; };
const mix = (p, i, col, a) => { for (let k = 0; k < 3; k++) p[i + k] = Math.round(p[i + k] * (1 - a) + col[k] * a); };
// the face sheet: eye frames are the 32x32 tiles of row 2 (y 32-63). Each has a see-through hole where the eye shows.
function eyeTiles(c, fn) {
  const g = c.getContext('2d'), d = g.getImageData(0, 0, c.width, c.height), p = d.data, W = c.width, S = W / 128;
  for (let tx = 0; tx < 4; tx++) {
    const x0 = tx * 32 * S, y0 = 32 * S, T = 32 * S; let hx0 = 1e9, hx1 = -1, hy0 = 1e9, hy1 = -1;
    for (let y = y0; y < y0 + T; y++) for (let x = x0; x < x0 + T; x++) if (p[(y * W + x) * 4 + 3] < 40) { hx0 = Math.min(hx0, x); hx1 = Math.max(hx1, x); hy0 = Math.min(hy0, y); hy1 = Math.max(hy1, y); }
    fn({ p, W, x0, y0, T, hole: hx1 >= 0 ? { x0: hx0, x1: hx1, y0: hy0, y1: hy1 } : null, S });
  }
  g.putImageData(d, 0, 0); return c;
}
// Gundalian: heavy grayish-blue shadow under (and a little around) each eye
function gundalianFace(c, around) {
  if (around) return eyeTiles(c, ({ p, W, x0, y0, T, hole }) => {   // a ring all the way round the eye, heaviest at the outer corner
    const cx = hole ? (hole.x0 + hole.x1) / 2 : x0 + T / 2, cy = hole ? (hole.y0 + hole.y1) / 2 : y0 + T * 0.45;
    const rx = hole ? (hole.x1 - hole.x0) / 2 + T * 0.16 : T * 0.38, ry = hole ? (hole.y1 - hole.y0) / 2 + T * 0.17 : T * 0.3;
    for (let y = y0; y < y0 + T; y++) for (let x = x0; x < x0 + T; x++) {
      const i = (y * W + x) * 4; if (p[i + 3] < 200) continue;
      const r = Math.hypot((x - cx) / rx, (y - cy) / ry); if (r >= 1) continue;
      mix(p, i, GUN_MARK, 0.9 * Math.min(1, (1 - r) * 3.2));
    }
  });
  return eyeTiles(c, ({ p, W, x0, y0, T, hole }) => {
    const cx = hole ? (hole.x0 + hole.x1) / 2 : x0 + T / 2, cy = hole ? hole.y1 : y0 + T * 0.55, rx = hole ? (hole.x1 - hole.x0) / 2 + T * 0.12 : T * 0.35, ry = T * 0.22;
    for (let y = y0; y < y0 + T; y++) for (let x = x0; x < x0 + T; x++) {
      const i = (y * W + x) * 4; if (p[i + 3] < 200) continue;
      const dx = (x - cx) / rx, dy = (y - cy) / ry, r = Math.hypot(dx, dy * (dy < 0 ? 1.8 : 1));   // reaches further down than up
      if (r < 1) mix(p, i, GUN_MARK, 0.85 * Math.min(1, (1 - r) * 2.2));
    }
  });
}
// Neathian: big rounded diamond eyes, blue, no pupil (the eye frame's hole is reshaped; the eye texture is all blue)
function neathianFace(c) {
  return eyeTiles(c, ({ p, W, x0, y0, T, hole }) => {
    if (!hole) return;
    const si = ((y0 + 2) * W + x0 + 2) * 4, sk = [p[si], p[si + 1], p[si + 2]];   // the tile's skin, from its corner
    const cx = (hole.x0 + hole.x1) / 2, cy = (hole.y0 + hole.y1) / 2, hw = Math.max((hole.x1 - hole.x0) / 2, T * 0.2) * 1.05, hh = T * 0.105;   // smaller and slotted (Billy, Nov 21)
    for (let y = y0; y < y0 + T; y++) for (let x = x0; x < x0 + T; x++) {
      const i = (y * W + x) * 4, dx = Math.abs(x - cx) / hw, dy = Math.abs(y - cy) / hh;
      const dm = Math.pow(Math.pow(dx, 1.35) + Math.pow(dy, 1.35), 1 / 1.35);   // a diamond, a little rounded
      if (dm < 0.82) p[i + 3] = 0;                                   // the eye shows through
      else if (dm < 1.08) { p[i] = 28; p[i + 1] = 42; p[i + 2] = 70; p[i + 3] = 255; }   // dark rim
      else if (p[i + 3] < 200) { p[i] = sk[0]; p[i + 1] = sk[1]; p[i + 2] = sk[2]; p[i + 3] = 255; }   // the rest of the old eye hole: skin
    }
  });
}
function neathianEye(img, tint) {
  const c = toCanvas(img), g = c.getContext('2d'), W = c.width, H = c.height;
  let stops = ['#d8f3ff', '#5cc2f2', '#1f6fc0', '#123e7a'];
  if (tint) {   // the eye picture's own color (its most colorful pixels), so the Face screen's color picker picks the diamond's color
    const p = g.getImageData(0, 0, W, H).data; let n = 0; const a = [0, 0, 0];
    for (let i = 0; i < p.length; i += 4) { const mx = Math.max(p[i], p[i + 1], p[i + 2]), mn = Math.min(p[i], p[i + 1], p[i + 2]); if (mx > 40 && (mx - mn) / mx > 0.3) { n++; a[0] += p[i]; a[1] += p[i + 1]; a[2] += p[i + 2]; } }
    if (n) { const m = a.map(v => v / n), mx = Math.max(...m), f = k => `rgb(${m.map(v => Math.round(Math.min(255, v / mx * 255 * k))).join(',')})`, lt = `rgb(${m.map(v => Math.round(230 + 25 * v / mx)).join(',')})`;
      stops = [lt, f(0.95), f(0.6), f(0.35)]; }
  }
  const gr = g.createRadialGradient(W * 0.42, H * 0.38, W * 0.05, W / 2, H / 2, W * 0.62);
  gr.addColorStop(0, stops[0]); gr.addColorStop(0.35, stops[1]); gr.addColorStop(0.8, stops[2]); gr.addColorStop(1, stops[3]);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.fillStyle = 'rgba(255,255,255,.85)'; g.beginPath(); g.ellipse(W * 0.36, H * 0.3, W * 0.1, H * 0.07, -0.5, 0, Math.PI * 2); g.fill();   // shine
  return c;
}
// marks on the head's skin sheet (64x64: the side of the face, the ear and the neck, the face's middle at the left edge)
function gundalianChin(c) {   // a small mark at the bottom middle of the chin (the face's middle is the sheet's left edge)
  const g = c.getContext('2d'), S = c.width / 64; g.save(); g.scale(S, S);
  g.fillStyle = 'rgb(119,112,135)'; g.beginPath(); g.moveTo(0, CHIN[0]); g.lineTo(CHIN[2], CHIN[1] - 1); g.lineTo(0, CHIN[1]); g.closePath(); g.fill();
  g.restore(); return c;
}
const CHIN = [50, 55, 3];   // y top, y bottom, width (found with a test grid)
function gundalianNeck(c) {
  const g = c.getContext('2d'), S = c.width / 64; g.save(); g.scale(S, S);
  g.strokeStyle = 'rgba(119,112,135,.85)'; g.lineCap = 'round';
  for (const [x, w] of [[30.6, 0.9], [33.4, 0.7]]) { g.lineWidth = w; g.beginPath(); g.moveTo(x, 30); g.quadraticCurveTo(x + 0.8, 44, x - 0.4, 60); g.stroke(); }   // x≈32 is the side of the neck (found with a test grid)
  g.restore(); return c;
}
// Neathian: the triangular arc on the upper face, drawn over each eye on the face sheet's eye tiles (a line rising from the
// outer corner over the eye and down toward the nose: the two eyes together make the arc)
function neathianArc(c, L) {
  const col = L.sex === 'f' ? [140, 100, 165] : [70, 110, 170];
  return eyeTiles(c, ({ p, W, x0, y0, T, hole }) => {
    const g0 = hole ? hole.y0 : y0 + T * 0.35, top = Math.max(y0 + 1, g0 - T * 0.28);
    // the line rises toward the inner corner, so the two halves meet over the nose
    const pts = []; for (let t = 0; t <= 1; t += 0.01) { const x = x0 + T * (0.98 - 0.96 * t), y = g0 - 3 - (g0 - 3 - top) * t ** 1.15; pts.push([x, y]); }
    for (const [x, y] of pts) for (let dy = -0.6; dy <= 0.6; dy += 0.6) { const xi = Math.round(x), yi = Math.round(y + dy); const i = (yi * W + xi) * 4; if (p[i + 3] > 200) mix(p, i, col, 0.9); }
  });
}
// what a race does to one texture (null: nothing)
function raceTexture(name, img, L) {
  const r = L.race || 'human', to = SKIN_OF(L);
  if (/^eye_/.test(name)) { if (r === 'vestal') return hazeEye(img); if (r === 'neathian') return neathianEye(img, opt(L, 'neye') === 'tint'); if (to) return reskin(toCanvas(img), to); return null; }
  if (/^eyeblow_/.test(name)) { if (r !== 'neathian') return null; const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; return c; }   // Neathians have no eyebrows (Billy, Nov 21)
  if (!to) return null;
  if (/^facial_/.test(name)) { const c = reskin(toCanvas(img), to); return r === 'gundalian' ? gundalianFace(c, opt(L, 'marks') === 'around') : neathianFace(c); }
  // the skin sheet is all skin, so it takes a wider reach (the ear is pinker than the face)
  if (/^skin_/.test(name)) { const c = reskin(toCanvas(img), to, 140); return r === 'gundalian' ? (opt(L, 'marks') === 'around' ? gundalianChin(gundalianNeck(c)) : gundalianNeck(c)) : c; }
  return null;
}
// the head model's skull: the Head bone, and the skull as a sphere (the model's box also holds the neck)
function skull(head) {
  head.updateMatrixWorld(true);
  let bone = null, mesh = null; head.traverse(o => { if (o.isBone && /Head$/.test(o.name)) bone = o; if (o.isSkinnedMesh && !mesh) mesh = o; });
  if (!bone || !mesh) return null;
  const box = new THREE.Box3().setFromObject(mesh, true), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  const rx = size.x / 2, rz = size.z / 2;
  return { bone, mesh, c, rx, rz, cy: box.max.y - rx * 0.95 };
}
// the Gundalian forehead plate: a gold band over the forehead, coming to a point toward the nose, fixed to the head bone so it
// moves with the head. It sits a little out from the skull so it lies over the hair.
function foreheadPlate(head) {
  const k = skull(head); if (!k) return; const { bone, c, rx, rz, cy } = k;
  const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(PLATE_GOLD), side: THREE.DoubleSide });
  const WS = 48, HS = 10, P0 = Math.PI / 2 - Math.PI * 0.3, PL = Math.PI * 0.6, T0 = PLATE.top * Math.PI;
  const geo = new THREE.SphereGeometry(1, WS, HS), pos = geo.attributes.position;
  for (let iy = 0; iy <= HS; iy++) for (let ix = 0; ix <= WS; ix++) {
    const u = ix / WS, v = iy / HS, phi = P0 + u * PL, off = Math.abs(phi - Math.PI / 2) / (PL / 2);   // off: 0 at the front, 1 at the ends
    const bot = (PLATE.bot + PLATE.peak * Math.max(0, 1 - off / PLATE.peakW) ** 1.3) * Math.PI, th = T0 + v * (bot - T0);
    pos.setXYZ(iy * (WS + 1) + ix, -Math.cos(phi) * Math.sin(th), Math.cos(th), Math.sin(phi) * Math.sin(th));
  }
  geo.computeVertexNormals();
  const plate = new THREE.Mesh(geo, mat);
  plate.scale.set(rx * PLATE.out, rx * PLATE.out, rz * (PLATE.out - 0.02)); plate.position.set(c.x, cy, c.z - rz * 0.02);
  plate.updateMatrixWorld(true); bone.attach(plate);
}
const PLATE = { top: 0.22, bot: 0.36, peak: 0.14, peakW: 0.45, out: 1.12 };   // tuned with test renders
// hair styles a Gundalian can have: the others hang over the forehead and would hide the plate
export const GUN_HAIR = [2, 4, 6, 7, 9, 10, 11, 12, 13, 14, 15];   // 0, 1, 3, 5 and 8 have bangs over the forehead
// The skirts (down_08 / down_09, our own parts from scripts/girlskirt.mjs) came out too wide at the top. Reshape them here as they
// load (Billy, Nov 21): the top sits on the body's waist, then a gentle A-line to the hem. Same ring layout as girlskirt.mjs.
export function cinchSkirt(root) {
  const NU = 48, NV = 5, lerp = (a, b, t) => a + (b - a) * t;
  root.traverse(o => {
    if (!o.isMesh || o.geometry.attributes.position.count !== (NU + 1) * (NV + 1)) return;   // the skirt piece (the legs have 196 points)
    const P = o.geometry.attributes.position;
    for (let j = 0; j <= NV; j++) for (let i = 0; i <= NU; i++) {
      const t = j / NV, th = i / NU * 2 * Math.PI, pleat = 1 + 0.06 * t * t * Math.abs(Math.sin(12 * th));   // pleats open toward the hem
      const rx = lerp(0.054, 0.083, Math.pow(t, 0.9)) * pleat, rz = lerp(0.042, 0.066, Math.pow(t, 0.9)) * pleat;
      const y = lerp(0.478, 0.355, t) + (j === NV ? 0.004 * Math.sin(12 * th) : 0);
      P.setXYZ(j * (NU + 1) + i, Math.sin(th) * rx, y, 0.004 + Math.cos(th) * rz);
    }
    P.needsUpdate = true; o.geometry.computeVertexNormals(); o.geometry.computeBoundingSphere();
  });
}
function hazeEye(img) {
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const g = c.getContext('2d'); g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height), p = d.data, W = c.width, H = c.height;
  const lum = i => p[i] * 0.3 + p[i + 1] * 0.59 + p[i + 2] * 0.11, spread = i => Math.max(p[i], p[i + 1], p[i + 2]) - Math.min(p[i], p[i + 1], p[i + 2]);
  const pts = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4; if (p[i + 3] && !(lum(i) > 190 && spread(i) < 60)) pts.push([x, y, i]); }   // not the skin
  if (!pts.length) return c;
  const cx = pts.reduce((a, q) => a + q[0], 0) / pts.length, cy = pts.reduce((a, q) => a + q[1], 0) / pts.length;
  const R = Math.max(...pts.map(q => Math.hypot(q[0] - cx, q[1] - cy))) || 1;
  const sat = [...pts].sort((a, b) => spread(b[2]) - spread(a[2])).slice(0, Math.max(4, pts.length / 6 | 0));
  const ir = [0, 1, 2].map(k => sat.reduce((a, q) => a + p[q[2] + k], 0) / sat.length);   // the iris color
  for (const [x, y, i] of pts) {
    const dd = Math.hypot(x - cx, y - cy) / R; if (dd > 0.78 || lum(i) > 200) continue;   // keep the outline ring and the highlight
    const mix = 0.12 + 0.45 * Math.max(0, 1 - dd / 0.78);
    for (let k = 0; k < 3; k++) p[i + k] = Math.round(ir[k] + (255 - ir[k]) * mix);
  }
  g.putImageData(d, 0, 0); return c;
}
// the gauntlet's color is an attribute: textures gauntlet_<attribute> (made in scripts/menuart.py)
export const BAND = { pyrus: 0, aquos: 1, subterra: 2, haos: 3, darkus: 4, ventus: 5 };
// a starting look (Liam-like: brown hair, black top, blue jeans)
export const DEFAULT_LOOK = { hair: [0, 0], cap: [-1, 0], glasses: [-1, 0], eye: [0, 0], eyeblow: [0, 0], facial: [0, 0],
  top: [1, 1], down: [0, 2], shoes: [0, 1], skin: 0, band: 'pyrus' };
const two = n => String(n).padStart(2, '0');
export function randomLook() {
  const r = n => Math.floor(Math.random() * n), L = { skin: r(SKIN_TONES) };
  for (const [k, p] of Object.entries(PARTS)) L[k] = [p.optional && Math.random() < 0.6 ? -1 : r(p.styles), r(p.colors)];
  L.eyeblow[1] = L.hair[1];
  L.race = Math.random() < 0.2 ? 'vestal' : 'human';   // random looks stay Human or Vestal
  L.band = Object.keys(BAND)[r(6)];
  return L;
}

// which models make up a look
// the hair style to build: a Gundalian never gets one that covers the forehead band (the nearest allowed one instead)
const hairOf = L => { const h = L.hair[0]; return L.race === 'gundalian' && !GUN_HAIR.includes(h) ? GUN_HAIR.reduce((a, b) => Math.abs(b - h) < Math.abs(a - h) ? b : a) : h; };
function models(L) {
  const m = ['head_00', 'top_' + two(L.top[0]), 'down_' + two(L.down[0]), 'shoes_' + two(L.shoes[0])];
  m.push(L.cap[0] >= 0 ? 'cap_' + two(L.cap[0]) : 'hair_' + two(hairOf(L)));      // a hat comes with the hair under it
  if (L.glasses[0] >= 0) m.push('glasses_' + two(L.glasses[0]));
  return m;
}
// the texture a material should use, given the texture it was built with
function variantFor(texName, L) {
  if (texName === 'gauntlet') return L.band && L.band !== 'pyrus' ? `gauntlet_${L.band}` : null;   // the gauntlet's attribute color
  const m = /^([a-z]+)_(\d\d)_(\d\d)$/.exec(texName || ''); if (!m) return null;
  const kind = m[1], s = m[2];
  switch (kind) {
    case 'hair': return `hair_${two(hairOf(L))}_${two(L.hair[1])}`;
    case 'caphair': return `caphair_${s}_${two(L.hair[1])}`;
    case 'cap': return `cap_${s}_${two(L.cap[1])}`;
    case 'glass': return `glass_${s}_${two(Math.min(4, L.glasses[1]))}`;
    case 'glassf': return `glassf_${s}_${two(Math.min(3, L.glasses[1]))}`;
    case 'eye': return `eye_${two(L.eye[0])}_${two(L.eye[1])}`;
    case 'eyeblow': return `eyeblow_${two(L.eyeblow[0])}_${two(L.eyeblow[1])}`;
    case 'facial': return `facial_${two(L.facial[0])}_${two(Math.min(4, L.skin || 0))}`;   // the face is drawn in the skin tone
    case 'skin': return `skin_00_${two(Math.min(4, L.skin))}`;
    case 'top': return `top_${s}_${two(L.top[1])}`;
    case 'band': return `band_00_${two(L.top[1])}`;   // the gloves follow the top's color
    case 'down': return `down_${s}_${two(L.down[1])}`;
    case 'shoes': return `shoes_${s}_${two(L.shoes[1])}`;
  }
  return null;
}

// url(path in pack) -> fetchable URL. Returns a THREE.Group with the whole character, feet at y = 0.
export async function buildAvatar(L, url) {
  const loader = new GLTFLoader(), texLoader = new THREE.TextureLoader(), group = new THREE.Group();
  const texCache = new Map();
  const raced = (L.race || 'human') !== 'human';
  const tex = async name => {
    if (!texCache.has(name)) texCache.set(name, (async () => {
      const src = await url(`creator/textures/${name}.png`);
      let t = null;
      if (raced && /^(eye|eyeblow|facial|skin)_/.test(name)) { const im = new Image(); im.src = src; await im.decode(); const c = raceTexture(name, im, L); if (c) t = new THREE.CanvasTexture(c); }
      if (!t) t = await texLoader.loadAsync(src);
      t.flipY = false; t.colorSpace = THREE.SRGBColorSpace; t.magFilter = THREE.NearestFilter; return t;
    })().catch(() => { console.warn('no texture', name); return null; }));
    return texCache.get(name);
  };
  const scenes = await Promise.all(models(L).map(async m => { const sc = (await loader.loadAsync(await url(`creator/models/${m}/${m}.glb`))).scene;
    if (/^down_0[89]$/.test(m)) cinchSkirt(sc); if (m === 'head_00' && L.race === 'gundalian') foreheadPlate(sc); return sc; }));
  const jobs = [];
  for (const sc of scenes) {
    sc.traverse(o => {
      if (!o.isMesh) return;
      o.frustumCulled = false;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const mat of mats) {
        const old = mat.map; if (!old) continue;
        const want = variantFor(old.name, L) || old.name; if (want === old.name && !(raced && /^(eye|eyeblow|facial|skin)_/.test(old.name))) continue;
        jobs.push(tex(want).then(t => { if (t) { t.wrapS = old.wrapS; t.wrapT = old.wrapT; mat.map = t; mat.needsUpdate = true; } }));
      }
    });
    group.add(sc);
  }
  await Promise.all(jobs);
  // the parts are in a T-pose: a relaxed stance instead (arms down, elbows a little bent).
  // Each part has its own skeleton with its own bone axes, so the arms are aimed in world space (same result for every part).
  relaxArms(group);
  const bones = []; group.traverse(o => { if (o.isBone) bones.push({ o, base: o.quaternion.clone() }); });
  group.updateMatrixWorld(true);
  group.traverse(o => { if (o.isSkinnedMesh) o.skeleton.update(); });
  const box = new THREE.Box3().setFromObject(group, true);
  const k = 1 / (box.max.y - box.min.y);                     // 1 unit tall, feet on the floor, centered
  const wrap = new THREE.Group(); group.scale.setScalar(k);
  const c = box.getCenter(new THREE.Vector3());
  group.position.set(-c.x * k, -box.min.y * k + 0.02, -c.z * k);   // a little above the floor so the shoes sit on the rug
  wrap.add(group);
  wrap.userData.bones = bones; wrap.userData.phase = Math.random() * 10;
  return wrap;
}
// Arms down from a T-pose, aimed in world space: upper arm down and a little out, forearm bent forward.
export function relaxArms(root) {
  root.updateMatrixWorld(true);
  const W = o => o.getWorldPosition(new THREE.Vector3());
  const skels = []; root.traverse(o => { if (o.isBone && /L_UpperArm$/.test(o.name)) skels.push(o.parent); });
  for (const top of skels) {
    // the root that holds this skeleton: walk up to the highest bone
    let r = top; while (r.parent && r.parent.isBone) r = r.parent;
    const find = re => { let f = null; r.traverse(o => { if (!f && o.isBone && re.test(o.name)) f = o; }); return f; };
    const lh = find(/L_(Hand|Forearm)$/), rh = find(/R_(Hand|Forearm)$/); if (!lh || !rh) continue;
    const left = W(lh).sub(W(rh)).setY(0).normalize(), up = new THREE.Vector3(0, 1, 0);
    const fwd = new THREE.Vector3().crossVectors(left, up).normalize();
    for (const side of [1, -1]) {
      const tag = side > 0 ? 'L' : 'R', out = left.clone().multiplyScalar(side);
      const ua = find(new RegExp(`${tag}_UpperArm$`)), fa = find(new RegExp(`${tag}_Forearm$`)), hd = find(new RegExp(`${tag}_Hand$`));
      if (ua && fa) aim(ua, fa, new THREE.Vector3(0, -1, 0).addScaledVector(out, 0.2).addScaledVector(fwd, 0.04));
      if (fa && hd) aim(fa, hd, new THREE.Vector3(0, -1, 0).addScaledVector(out, 0.05).addScaledVector(fwd, 0.42));
    }
  }
  function aim(bone, child, dir) {
    bone.updateMatrixWorld(true);
    const cur = W(child).sub(W(bone)).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(cur, dir.normalize());
    const bw = bone.getWorldQuaternion(new THREE.Quaternion()), pw = bone.parent.getWorldQuaternion(new THREE.Quaternion());
    bone.quaternion.copy(pw.invert().multiply(q).multiply(bw));
    bone.updateMatrixWorld(true);
  }
}
// idle: breathing, a little sway, looking around (call every frame with seconds)
const _q = new THREE.Quaternion(), _e = new THREE.Euler();
const IDLE = [
  [/Spine$/, t => [0, 0, 0.025 * Math.sin(t * 1.7)]],
  [/Head$/, t => [0.16 * Math.sin(t * 0.45) + 0.05 * Math.sin(t * 1.3), 0, 0.03 * Math.sin(t * 0.8)]],
  [/Neck$/, t => [0.05 * Math.sin(t * 0.45), 0, 0]],
  [/L_UpperArm$/, t => [0, 0.03 * Math.sin(t * 0.9), 0.05 * Math.sin(t * 1.7 + 0.4)]],
  [/R_UpperArm$/, t => [0, -0.03 * Math.sin(t * 0.9), -0.05 * Math.sin(t * 1.7 + 0.4)]],
  [/Forearm$/, t => [0, 0, 0.04 * Math.sin(t * 1.1)]],
  [/Pelvis$/, t => [0, 0.03 * Math.sin(t * 0.6), 0.012 * Math.sin(t * 0.8)]],
];
export function idle(wrap, t) {
  const bones = wrap && wrap.userData.bones; if (!bones) return;
  t += wrap.userData.phase;
  for (const b of bones) {
    const r = IDLE.find(([re]) => re.test(b.o.name));
    b.o.quaternion.copy(b.base);
    if (r) { const [x, y, z] = r[1](t); b.o.quaternion.multiply(_q.setFromEuler(_e.set(x, y, z))); }
  }
}
