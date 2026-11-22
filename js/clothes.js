// More clothes for the character creator (Billy, Nov 21). Our own generic designs, built here as the avatar loads, so the pack
// needs nothing new: each new style starts from one of the pack's parts (recolored to its own colors) and adds its own pieces.
//   Tops     8 Long coat           top 4 + coat tails to the knees, open at the front
//            9 Vest over shirt     top 2 in white + a vest over it, open at the front
//           10 High-collar jacket  top 6 + a tall collar, open at the front
//           11 Puffed-sleeve top   top 2 + full sleeves from the shoulder, gathered into a cuff above the elbow
//   Bottoms 10 Cargo pants         pants 0 + pockets on the sides of the thighs
//           11 Long skirt          skirt 9 reshaped to the ankles (with a top in the same color it reads as a dress)
//   Shoes    4 Tall boots          shoes 0, and the legs below the knees in the boot color with a cuff at the top
//   Second wave (Billy, Nov 21), all with the accent color for their trim:
//   Tops    12 Open jacket          top 2 as a white shirt + a short-sleeve jacket over it, open at the front, bands on the sleeves
//           13 Biker jacket         top 4 + a wide collar and cuffs at the wrists
//           14 Wrap top             top 2 + a panel crossing over the front, edged in the accent
//           15 Panel jacket         top 6 with the sides and sleeves in the accent
//           16 Utility vest         the vest (9) with two chest pockets
//           17 Fitted top           top 6 in one color with a small collar and wrist cuffs (with the long skirt: a dress)
//   Bottoms 12 Joggers              pants 0 slimmed below the knee into cuffs at the ankles
//           13 Slim pants           pants 0 slimmed below the knee
//   Shoes    5 High-tops            shoes 0 + the legs to just above the ankle, with a cuff
//            6 Ankle boots          shoes 0 + the legs to mid-shin, with a strap
//   Accent   a new part: one more color for trim, cuffs, collars, bands and panels (none = a darker shade of each piece)
//   Gloves   a new part: fingerless or full gloves in their own color (none = they follow the top, as before)
import * as THREE from 'three';
import { BCOLORS } from './outfits.js';

export const XTOP = { 8: { base: 4, add: 'coat', label: 'Long coat' }, 9: { base: 2, add: 'vest', label: 'Vest' }, 10: { base: 6, add: 'collar', label: 'High collar' }, 11: { base: 2, add: 'puff', label: 'Puffed sleeves' },
  12: { base: 2, add: 'open', label: 'Open jacket' }, 13: { base: 4, add: 'biker', label: 'Biker jacket' }, 14: { base: 2, add: 'wrap', label: 'Wrap top' }, 15: { base: 6, add: 'panel', label: 'Panel jacket' },
  16: { base: 2, add: 'utility', label: 'Utility vest' }, 17: { base: 6, add: 'fitted', label: 'Fitted top' } };
export const XDOWN = { 10: { base: 0, add: 'cargo', label: 'Cargo pants' }, 11: { base: 9, add: 'long', label: 'Long skirt' }, 12: { base: 0, add: 'jogger', label: 'Joggers' }, 13: { base: 0, add: 'slim', label: 'Slim pants' } };
export const XSHOES = { 4: { base: 0, add: 'boots', label: 'Tall boots' }, 5: { base: 0, add: 'hightop', label: 'High-tops' }, 6: { base: 0, add: 'ankle', label: 'Ankle boots' } };
export const GLOVE_STYLES = ['Fingerless', 'Full'];

// the colors (6 for each new style)
const DRESS = ['#7b2d4a', '#2d3f7b', '#e6d8c8', '#3d6b4a', '#5a5a66', '#c9862e'];   // the puffed top and the long skirt share these
export const XCOLORS = {
  top8: ['#2b2f3a', '#5b3a29', '#1f4d3a', '#7a1f2b', '#c8c2b4', '#2f4f7a'],
  top9: ['#6b5a3e', '#2f3b2f', '#3a3f4a', '#8a2e2e', '#2e5a7a', '#d6cdb8'],
  top10: ['#20263a', '#4a1f5a', '#1d5c5c', '#a33a1f', '#e0e0e0', '#3c3c3c'],
  top11: DRESS,
  down10: ['#8a7d5c', '#4f5a3a', '#5a5f66', '#2a2a2e', '#2f3d5a', '#6b4a33'],
  down11: DRESS,
  shoes4: ['#3a2a1f', '#1e1e22', '#7a5a3a', '#5a1e24', '#d8d0c0', '#2a3346'],
  gloves: ['#1e1e22', '#6b4a33', '#e6e6e6', '#7a1f2b', '#1f3a5a', '#3c5a3a'],
  top12: ['#3b5f8a', '#6b4a2a', '#2f5a3a', '#8a3a5a', '#4a4a52', '#b08a3a'],
  top13: ['#1e1e22', '#5a2a1e', '#2a3a5a', '#4a5a2a', '#8a8f96', '#6a1f3a'],
  top14: ['#4a2a5a', '#1f3f4a', '#7a3a2a', '#2a2a30', '#5f7a8a', '#9a7a5a'],
  top15: ['#2a4a6a', '#3a3a3a', '#5a2a2a', '#2a5a4a', '#6a5a7a', '#d8d2c4'],
  top16: ['#5a6a3a', '#7a6a4a', '#3a4a5a', '#2a2a2a', '#6a3a2a', '#8a8a7a'],
  top17: DRESS,
  down12: ['#2a2a30', '#4a5a6a', '#6a6a72', '#3a4a3a', '#5a3a4a', '#8a7a6a'],
  down13: ['#1e2430', '#5a4a3a', '#3a3a42', '#6a6a6a', '#2a4a5a', '#4a2a2a'],
  shoes5: ['#e8e4da', '#1e1e22', '#b3262e', '#2a5a9a', '#3c7a4a', '#6a6a72'],
  shoes6: ['#3a2a1f', '#1e1e22', '#6b4a2a', '#4a4a52', '#2a3346', '#7a3a2a'],
  accent: ['#e8e4da', '#1e1e22', '#c9a227', '#b3262e', '#2a6fb0', '#3c8c4a', '#7a4ab0', '#e07a1f', '#8a8f96', '#5b3a29'],
};
const SHIRT = '#e9e6df';   // the shirt under the vest

const two = n => String(n).padStart(2, '0');
// the model to load for a style: a new style loads its base part
export function baseModel(kind, s) {
  const x = { top: XTOP, down: XDOWN, shoes: XSHOES }[kind][s];
  return `${kind}_${two(x ? x.base : s)}`;
}

// --- textures: the base part's texture with its colored areas recolored (grays and whites, like trims, stay)
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
export function tintCloth(img, color, all = false) {
  if (all) return recolorAll(img, color);
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height), p = d.data, to = hex(color);
  const lum = i => p[i] * 0.3 + p[i + 1] * 0.59 + p[i + 2] * 0.11, sat = i => { const mx = Math.max(p[i], p[i + 1], p[i + 2]); return mx ? (mx - Math.min(p[i], p[i + 1], p[i + 2])) / mx : 0; };
  let n = 0, m = 0; for (let i = 0; i < p.length; i += 4) if (p[i + 3] > 100 && sat(i) > 0.25) { n++; m += lum(i); }
  m = n ? m / n : 128;
  for (let i = 0; i < p.length; i += 4) { if (!p[i + 3] || sat(i) <= 0.25) continue; const k = lum(i) / m;
    for (let j = 0; j < 3; j++) p[i + j] = Math.round(Math.min(255, to[j] * k + Math.max(0, k - 1) * 40)); }
  g.putImageData(d, 0, 0); return c;
}
// the texture to use for a part's texture name, or null. Names: x<kind>_<style>_<color>, made by tex() in avatar.js from
// XBASE (which pack texture) and xColor (which color).
export function xVariant(texName, L) {
  const m = /^([a-z]+)_(\d\d)_(\d\d)$/.exec(texName || ''); if (!m) return null;
  const kind = m[1];
  if (kind === 'top' && XTOP[L.top[0]]) return `xtop_${two(L.top[0])}_${two(L.top[1])}`;
  if (kind === 'band' && L.gloves && L.gloves[0] >= 0) return `xglove_00_${two(L.gloves[1])}`;
  if (kind === 'band' && XTOP[L.top[0]]) return `xband_${two(L.top[0])}_${two(L.top[1])}`;
  if (kind === 'down' && L.down && XDOWN[L.down[0]]) return `xdown_${two(L.down[0])}_${two(L.down[1])}`;
  if (kind === 'shoes' && XSHOES[L.shoes[0]]) return `xshoes_${two(L.shoes[0])}_${two(L.shoes[1])}`;
  return null;
}
// for an x... texture name: the pack texture it starts from and its color
export function xSource(name) {
  const m = /^x([a-z]+)_(\d\d)_(\d\d)$/.exec(name); if (!m) return null;
  const [, kind, s, c] = m, si = +s, ci = +c;
  if (kind === 'top') return { src: `top_${two(XTOP[si].base)}_00`, color: [9, 12, 16].includes(si) ? SHIRT : XCOLORS['top' + si][ci], all: si === 11 || si === 17 };   // 11: the sleeve's gray trim goes too, under the puff
  if (kind === 'vest') return { src: `top_${two(XTOP[si].base)}_00`, color: XCOLORS['top' + si][ci] };   // a jacket or vest over the shirt
  if (kind === 'acc') return { src: `top_${two(XTOP[si].base)}_00`, color: XCOLORS.accent[ci], all: true };   // accent panels
  if (kind === 'band') return { src: 'band_00_00', color: XCOLORS['top' + si][ci] };
  if (kind === 'glove') return { src: 'band_00_00', color: XCOLORS.gloves[ci] };
  if (kind === 'down') return { src: `down_${two(XDOWN[si].base)}_00`, color: XCOLORS['down' + si][ci] };
  if (kind === 'shoes') return { src: `shoes_${two(XSHOES[si].base)}_00`, color: XCOLORS['shoes' + si][ci] };
  return null;
}
export const swatches = (kind, s) => XCOLORS[kind + s] || BCOLORS[kind + s] || null;   // Billy's pieces: one swatch (js/outfits.js)

// --- added pieces
// a plain cloth texture: the color, darker toward the bottom (v=1) and the sides (u=0 and 1), with a darker band at the hem
function clothTex(color, hem = true, gathers = 0) {
  const W = 32, H = 32, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'), d = g.createImageData(W, H), to = hex(color);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / (W - 1), v = y / (H - 1), fold = gathers ? 0.85 + 0.15 * Math.abs(Math.sin(u * Math.PI * gathers)) : 0.92 + 0.12 * Math.sin(u * Math.PI);
    const k = 1.1 * fold * (1 - 0.14 * v) * (hem && v > 0.9 ? 0.72 : 1);   // 1.1: matches the recolored pack textures' brightness
    const i = (y * W + x) * 4; for (let j = 0; j < 3; j++) d.data[i + j] = Math.min(255, Math.round(to[j] * k)); d.data[i + 3] = 255;
  }
  g.putImageData(d, 0, 0);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.magFilter = THREE.NearestFilter; return t;
}
const shade = (color, k) => '#' + hex(color).map(v => Math.min(255, Math.round(v * k)).toString(16).padStart(2, '0')).join('');
// the part's skinned mesh (the biggest), its skeleton, and a bone's index by name
function partMesh(sc) { let best = null; sc.traverse(o => { if (o.isSkinnedMesh && (!best || o.geometry.attributes.position.count > best.geometry.attributes.position.count)) best = o; }); return best; }
const boneIx = (mesh, name) => mesh.skeleton.bones.findIndex(b => b.name === name);
// a skinned piece on a part's skeleton: pos (in the part's model space), uv, joints and weights, faces
function addPiece(host, geo, color, opts = {}) {
  const mat = host.material.clone(); mat.map = opts.map || clothTex(color, opts.hem !== false, opts.gathers || 0); mat.side = THREE.DoubleSide; mat.vertexColors = false; mat.color?.set(0xffffff); mat.needsUpdate = true;
  const m = new THREE.SkinnedMesh(geo, mat); m.frustumCulled = false;
  host.parent.add(m); m.position.copy(host.position); m.quaternion.copy(host.quaternion); m.scale.copy(host.scale);
  m.bind(host.skeleton, host.bindMatrix); return m;
}
function ringGeo(nu, nv, at, joints, skip) {   // skip(u, t): leave out that quad   // at(i/nu, j/nv) -> [x, y, z]; joints(i, j, x) -> [[bone, weight] x up to 4]
  const P = [], U = [], J = [], W = [], I = [];
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
    const p = at(i / nu, j / nv); P.push(...p); U.push(i / nu, j / nv);
    const jw = joints(i / nu, j / nv, p).concat([[0, 0], [0, 0], [0, 0], [0, 0]]).slice(0, 4); J.push(...jw.map(q => q[0])); W.push(...jw.map(q => q[1]));
  }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) { if (skip && skip((i + 0.5) / nu, (j + 0.5) / nv)) continue; const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1; I.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
  g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(J, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(W, 4));
  g.setIndex(I); g.computeVertexNormals(); return g;
}
const lerp = (a, b, t) => a + (b - a) * t, clamp = (x, a, b) => Math.max(a, Math.min(b, x));
// the legs: from the pants model, the middle and size of each leg at a height (+x is the left leg)
function legAt(down, y, side, tol = 0.02) {   // the pants are low-poly: widen the search until some points are found
  const P = down.geometry.attributes.position, v = new THREE.Vector3(); let n = 0, sx = 0, sz = 0, r = 0; const pts = [];
  for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); if (Math.abs(v.y - y) < tol && Math.sign(v.x) === side && Math.abs(v.x) > 0.004) { pts.push(v.clone()); sx += v.x; sz += v.z; n++; } }
  if (n < 4) return tol < 0.08 ? legAt(down, y, side, tol + 0.02) : null; const cx = sx / n, cz = sz / n; for (const q of pts) r = Math.max(r, Math.hypot(q.x - cx, q.z - cz));
  return { x: cx, z: cz, r };
}

// L: the look; parts: { top, down, shoes } scenes
export function addClothes(L, parts) {
  const T = XTOP[L.top[0]], D = L.down && XDOWN[L.down[0]], S = XSHOES[L.shoes[0]];
  const top = parts.top && partMesh(parts.top), down = parts.down && partMesh(parts.down), shoes = parts.shoes && partMesh(parts.shoes);
  const W = waistOf(parts.top);   // the top's own width at its hem: the skirts and the coat's belt start there, flush
  const A = L.accent && L.accent[0] >= 0 ? XCOLORS.accent[L.accent[1]] : null, acc = (c, k) => A || shade(c, k);   // the accent, or a darker shade
  if (T && top) {
    const color = XCOLORS['top' + L.top[0]][L.top[1]], ts = two(L.top[0]), tc = two(L.top[1]);
    if (T.add === 'coat' && down) { Object.assign(COAT, { rx0: W.rx, rz0: W.rz, z: W.z }); tuckPants(down); coatTails(down, color, acc(color, 0.6)); }
    if (T.add === 'vest' || T.add === 'utility') vest(parts.top, `xvest_${ts}_${tc}`);
    if (T.add === 'utility') chestPockets(parts.top, top, acc(color, 0.8));
    if (T.add === 'collar') collar(top, color, acc(color, 0.62));
    if (T.add === 'puff') puffs(top, color, acc(color, 0.85));
    if (T.add === 'open') { shell(parts.top, f => !(f.z > 0 && Math.abs(f.x) < 0.026 && f.y > 0.46), `xvest_${ts}_${tc}`, 0.004); sleeveBands(parts.top, top, acc(color, 0.7)); }
    if (T.add === 'biker') { collar(top, color, acc(color, 0.6), BIKER); cuffs(top, acc(color, 0.6)); }
    if (T.add === 'wrap') wrap(parts.top, top, acc(color, 0.6));
    if (T.add === 'panel') shell(parts.top, f => Math.abs(f.x) > 0.042, A ? `xacc_${ts}_${two(L.accent[1])}` : null, 0.0025, shade(color, 0.6));
    if (T.add === 'fitted') { collar(top, acc(color, 0.8), acc(color, 0.6), SMALL); cuffs(top, acc(color, 0.8)); }
  }
  if (D && down) {
    const color = XCOLORS['down' + L.down[0]][L.down[1]];
    if (D.add === 'cargo') pockets(down, color, acc(color, 0.68));
    if (D.add === 'long') { longSkirt(parts.down, W); waistband(down, acc(color, 0.8), W); }
    if (D.add === 'jogger' && !S) { slimLegs(down, JOG); ankleCuffs(down, acc(color, 0.75)); }
    if (D.add === 'slim' && !S) slimLegs(down, SLIM);
  }
  if (S && down) {
    const color = XCOLORS['shoes' + L.shoes[0]][L.shoes[1]], h = { boots: BOOT, hightop: HIGH, ankle: ANKLE }[S.add];
    boots(shoes, down, color, h, acc(color, 0.75));
  }
  if (L.gloves && L.gloves[0] === 1 && top) fullGloves(top, XCOLORS.gloves[L.gloves[1]]);
}
// a layer over the top: its body's faces that keep(face middle {x, y, z}) says, a little bigger. In the pack texture recolored
// (texName, made in avatar.js) or in a plain color.
function bodyOf(topScene) {
  let body = null;
  topScene.traverse(o => { if (!o.isSkinnedMesh || !/^x?top_/.test(o.material.map?.name || '')) return; if (!body || o.geometry.index.count > body.geometry.index.count) body = o; });
  return body;
}
function shell(topScene, keep, texName, out, color) {
  const body = bodyOf(topScene); if (!body) return;
  const g = body.geometry.clone(), P = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); const r = Math.hypot(v.x, v.z) || 1, k = (r + out) / r; P.setXYZ(i, v.x * k, v.y, v.z * k); }
  const idx = g.index.array, kept = [];
  for (let f = 0; f < idx.length; f += 3) { let x = 0, y = 0, z = 0; for (let q = 0; q < 3; q++) { x += P.getX(idx[f + q]); y += P.getY(idx[f + q]); z += P.getZ(idx[f + q]); }
    if (keep({ x: x / 3, y: y / 3, z: z / 3 })) kept.push(idx[f], idx[f + 1], idx[f + 2]); }
  g.setIndex(kept); g.computeVertexNormals();
  if (!texName) return addPiece(body, g, color, { hem: false });
  const mat = body.material.clone(); mat.side = THREE.DoubleSide;
  const m = new THREE.SkinnedMesh(g, mat); m.frustumCulled = false; m.userData.xvest = texName;
  body.parent.add(m); m.position.copy(body.position); m.quaternion.copy(body.quaternion); m.scale.copy(body.scale); m.bind(body.skeleton, body.bindMatrix); return m;
}
// a bone's position in the part's model space
function bonePos(mesh, name) { const b = mesh.skeleton.bones.find(x => x.name === name); if (!b) return null; b.updateWorldMatrix(true, false);
  return new THREE.Vector3().setFromMatrixPosition(b.matrixWorld).applyMatrix4(new THREE.Matrix4().copy(mesh.matrixWorld).invert()); }
// a band round a limb: from a bone toward another, at fraction f0..f1 of the way, radius r
function limbBand(host, from, to, f0, f1, r, color, bone) {
  const a = bonePos(host, from), b = bonePos(host, to); if (!a || !b) return;
  const axis = b.clone().sub(a), len = axis.length(); axis.normalize();
  const up = Math.abs(axis.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0), s1 = new THREE.Vector3().crossVectors(axis, up).normalize(), s2 = new THREE.Vector3().crossVectors(s1, axis).normalize();
  const geo = ringGeo(18, 1, (u, t) => { const an = u * 2 * Math.PI, c = a.clone().addScaledVector(axis, lerp(f0, f1, t) * len); return c.addScaledVector(s1, Math.cos(an) * r).addScaledVector(s2, Math.sin(an) * r).toArray(); }, () => [[boneIx(host, bone || from), 1]]);
  addPiece(host, geo, color, { hem: false });
}
// how far out the top's sleeve reaches along the arm, and its size there
function sleeveEnd(topScene) {
  const body = bodyOf(topScene); if (!body) return null; const P = body.geometry.attributes.position, v = new THREE.Vector3(); let x = 0;
  for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); if (v.x > x && v.y > 0.55) x = v.x; }
  return x;
}
function sleeveBands(topScene, top, color) {
  const end = sleeveEnd(topScene); if (!end) return;
  for (const L of ['L', 'R']) { const a = bonePos(top, `Bip01_${L}_UpperArm`), b = bonePos(top, `Bip01_${L}_Forearm`); if (!a || !b) continue;
    const f = clamp((end - Math.abs(a.x)) / Math.abs(b.x - a.x), 0.2, 1); limbBand(top, `Bip01_${L}_UpperArm`, `Bip01_${L}_Forearm`, f - 0.16, f - 0.02, 0.0215, color); }
}
// cuffs at the wrists
function cuffs(top, color) { for (const L of ['L', 'R']) limbBand(top, `Bip01_${L}_Forearm`, `Bip01_${L}_Hand`, 0.78, 0.98, 0.0165, color); }
// the wrap top: an edge in the accent running from one shoulder down across the front to the other side of the waist,
// laid on the body's surface (found by pointing a ray at it)
function wrap(topScene, top, edge) {
  const body = bodyOf(topScene); if (!body) return;
  const probe = new THREE.Mesh(body.geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })), ray = new THREE.Raycaster();
  const sp = boneIx(top, 'Bip01_Spine2') >= 0 ? boneIx(top, 'Bip01_Spine2') : boneIx(top, 'Bip01_Spine');
  const surf = (x, y) => { ray.set(new THREE.Vector3(x, y, 1), new THREE.Vector3(0, 0, -1)); const h = ray.intersectObject(probe)[0]; return h ? h.point.z : 0.04; };
  const N = 16, P = [], U = [], J = [], Wt = [], I = [];
  for (let i = 0; i <= N; i++) { const t = i / N, y = lerp(WRAP.y1, WRAP.y0, t), x = lerp(WRAP.x1, WRAP.x0, t);
    for (const d of [-WRAP.w, WRAP.w]) { P.push(x + d, y, surf(x + d, y) + WRAP.out); U.push(d > 0 ? 1 : 0, t); J.push(sp, 0, 0, 0); Wt.push(1, 0, 0, 0); } }
  for (let i = 0; i < N; i++) { const a = i * 2; I.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
  g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(J, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(Wt, 4)); g.setIndex(I); g.computeVertexNormals();
  addPiece(top, g, edge, { hem: false });
}
const WRAP = { x1: 0.035, y1: 0.635, x0: -0.05, y0: 0.475, w: 0.0045, out: 0.003 };
// two pockets with flaps on the chest
function chestPockets(topScene, top, color) {
  const body = bodyOf(topScene); if (!body) return; const sp = boneIx(top, 'Bip01_Spine2') >= 0 ? boneIx(top, 'Bip01_Spine2') : boneIx(top, 'Bip01_Spine');
  const P = body.geometry.attributes.position, v = new THREE.Vector3();
  for (const side of [1, -1]) {
    const probe = new THREE.Mesh(body.geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })), ray = new THREE.Raycaster(); ray.set(new THREE.Vector3(side * 0.046, 0.575, 1), new THREE.Vector3(0, 0, -1));
    const z = ray.intersectObject(probe)[0]?.point.z ?? 0.04;   // the chest's front surface
    const x0 = side * 0.046 - 0.014, x1 = side * 0.046 + 0.014, y0 = 0.545, y1 = 0.583, z0 = z + 0.005, z1 = z + 0.012;   // over the vest
    for (const [c, k] of [[[x0, y0, z0, x1, y1, z1], 1], [[x0 - 0.002, y1 - 0.012, z0, x1 + 0.002, y1 + 0.002, z1 + 0.002], 0.8]]) {
      const [a0, b0, c0, a1, b1, c1] = c, C = [[a0, b0, c0], [a1, b0, c0], [a1, b1, c0], [a0, b1, c0], [a0, b0, c1], [a1, b0, c1], [a1, b1, c1], [a0, b1, c1]];
      const F = [[4, 5, 6, 7], [1, 2, 6, 5], [0, 4, 7, 3], [3, 7, 6, 2], [0, 1, 5, 4]], Pp = [], U = [], J = [], Wt = [], I = [];
      F.forEach(f => { const bb = Pp.length / 3; f.forEach((ci, q) => { Pp.push(...C[ci]); U.push(q === 1 || q === 2 ? 1 : 0, 0.5); J.push(sp, 0, 0, 0); Wt.push(1, 0, 0, 0); }); I.push(bb, bb + 1, bb + 2, bb, bb + 2, bb + 3); });
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(Pp, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
      g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(J, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(Wt, 4)); g.setIndex(I); g.computeVertexNormals();
      addPiece(top, g, shade(color, k), { hem: false });
    }
  }
}
// pants slimmed below the knee: the legs pulled in toward their middles, down to r at the ankle
function slimLegs(down, h) {
  const mids = {}; for (const side of [1, -1]) { const lo = legAt(down, 0.055, side), hi = legAt(down, h.y1 - 0.02, side); if (lo && hi) mids[side] = { lo, hi }; }
  const P = down.geometry.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); if (v.y > h.y1) continue; const m = mids[Math.sign(v.x) || 1]; if (!m) continue;
    const t = clamp((v.y - 0.035) / (h.y1 - 0.035), 0, 1), cx = lerp(m.lo.x, m.hi.x, t), cz = lerp(m.lo.z, m.hi.z, t), max = lerp(h.r0, m.hi.r, t ** 1.5);
    const dx = v.x - cx, dz = v.z - cz, d = Math.hypot(dx, dz); if (d > max) P.setXYZ(i, cx + dx / d * max, v.y, cz + dz / d * max); }
  P.needsUpdate = true; down.geometry.computeVertexNormals(); down.userData.mids = mids;
}
const JOG = { y1: 0.26, r0: 0.026 }, SLIM = { y1: 0.3, r0: 0.03 };
function ankleCuffs(down, color) {
  const mids = down.userData.mids || {};
  for (const side of [1, -1]) { const m = mids[side], calf = boneIx(down, side > 0 ? 'Bip01_L_Calf' : 'Bip01_R_Calf'); if (!m) continue;
    addPiece(down, ringGeo(18, 1, (u, t) => { const a = u * 2 * Math.PI, r = JOG.r0 + 0.003; return [m.lo.x + Math.sin(a) * r, lerp(0.07, 0.04, t), m.lo.z + Math.cos(a) * r]; }, () => [[calf, 1]]), color, { hem: false }); }
}
// the top's size at its bottom edge (an oval round the waist): x half-width, z half-depth and middle
function waistOf(sc) {
  const out = { rx: 0.056, rz: 0.046, z: 0 }; if (!sc) return out;
  const v = new THREE.Vector3(); let x = 0, z0 = 9, z1 = -9, n = 0;
  sc.updateMatrixWorld(true);
  sc.traverse(o => { if (!o.isSkinnedMesh) return; const P = o.geometry.attributes.position;
    for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); if (v.y > 0.5 || v.y < 0.455 || Math.abs(v.x) > 0.1) continue; x = Math.max(x, Math.abs(v.x)); z0 = Math.min(z0, v.z); z1 = Math.max(z1, v.z); n++; } });
  if (n) { out.rx = x; out.rz = (z1 - z0) / 2; out.z = (z1 + z0) / 2; }
  return out;
}
// pull the pants' top (and the belt and pouches on it) in under the coat's belt
function tuckPants(down) {
  const P = down.geometry.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); if (v.y < COAT.y0 - 0.075) continue;
    const ex = v.x / (COAT.rx0 - 0.004), ez = (v.z - COAT.z) / (COAT.rz0 - 0.004), d = Math.hypot(ex, ez); if (d > 1) P.setXYZ(i, v.x / d, v.y, COAT.z + (v.z - COAT.z) / d); }
  P.needsUpdate = true; down.geometry.computeVertexNormals();
  down.parent.traverse(o => { if (o.isSkinnedMesh && o !== down && o.material.map?.name !== '' ) { const Q = o.geometry.attributes.position;   // other pieces of the pants part (the pouches)
    for (let i = 0; i < Q.count; i++) { v.fromBufferAttribute(Q, i); if (v.y < COAT.y0 - 0.075) continue; const ex = v.x / (COAT.rx0 - 0.004), ez = (v.z - COAT.z) / (COAT.rz0 - 0.004), d = Math.hypot(ex, ez); if (d > 1) Q.setXYZ(i, v.x / d, v.y, COAT.z + (v.z - COAT.z) / d); }
    Q.needsUpdate = true; } });
}
// coat tails: from the waist to the knees, open at the front, flaring out. They follow the thighs like the skirts.
function coatTails(down, color, beltColor) {
  const pel = boneIx(down, 'Bip01_Pelvis'), lt = boneIx(down, 'Bip01_L_Thigh'), rt = boneIx(down, 'Bip01_R_Thigh'), gap = COAT.gap;
  const th = u => gap + u * (2 * Math.PI - 2 * gap);
  const geo = ringGeo(48, 8, (u, t) => { const a = th(u), rx = lerp(COAT.rx0, COAT.rx1, t ** 0.8), rz = lerp(COAT.rz0, COAT.rz1, t ** 0.8);
    return [Math.sin(a) * rx, lerp(COAT.y0, COAT.y1, t), COAT.z + Math.cos(a) * rz]; },
  (u, t, p) => { const leg = 0.7 * t, left = clamp(0.5 + p[0] / 0.05, 0, 1); return [[pel, 1 - leg], [lt, leg * left], [rt, leg * (1 - left)]]; },
  (u, t) => t > COAT.vent && Math.abs(th(u) - Math.PI) < 0.07);   // a vent at the back
  addPiece(down, geo, color);
  // a belt round the waist where the tails start
  const belt = ringGeo(40, 1, (u, t) => { const a = u * 2 * Math.PI; return [Math.sin(a) * (COAT.rx0 + 0.0015), lerp(COAT.y0 + 0.006, COAT.y0 - 0.008, t), COAT.z + Math.cos(a) * (COAT.rz0 + 0.0015)]; }, () => [[pel, 1]]);
  addPiece(down, belt, beltColor, { hem: false });
}
const COAT = { gap: 0.3, y0: 0.472, y1: 0.22, rx0: 0.054, rx1: 0.09, rz0: 0.043, rz1: 0.07, z: -0.004, vent: 0.45 };
// the vest: the shirt's body, a little bigger, minus a V down the front and the sleeves, in the vest color
function vest(topScene, texName) {
  shell(topScene, f => !(f.z > 0 && Math.abs(f.x) < VEST.v0 + (f.y - VEST.yLow) * VEST.vk) && Math.abs(f.x) <= VEST.arm, texName, VEST.out);
}
const VEST = { out: 0.004, v0: 0.004, yLow: 0.5, vk: 0.22, arm: 0.1 };
// a tall collar standing up round the neck, open at the front
function collar(top, color, lining, C = COLLAR) {
  const sp = boneIx(top, 'Bip01_Spine'), gap = C.gap;
  const ring = r0 => ringGeo(32, 3, (u, t) => { const th = gap + u * (2 * Math.PI - 2 * gap);
      const rx = lerp(C.rx0, C.rx1, t) + r0, rz = lerp(C.rz0, C.rz1, t) + r0, y = lerp(C.y0, C.y1, t) - (1 - Math.sin(u * Math.PI)) * C.dip * t;
      return [Math.sin(th) * rx, y, C.z + Math.cos(th) * rz]; }, () => [[sp, 1]]);
  addPiece(top, ring(0.0015), color, { hem: false });    // outside
  addPiece(top, ring(-0.0015), lining, { hem: false });  // the lining
}
const COLLAR = { gap: 0.55, y0: 0.63, y1: 0.685, rx0: 0.05, rx1: 0.062, rz0: 0.042, rz1: 0.054, z: -0.004, dip: 0.022 };
// the biker jacket's collar: lower and wider, folding out over the shoulders; the fitted top's: a small band
const BIKER = { gap: 0.75, y0: 0.625, y1: 0.66, rx0: 0.052, rx1: 0.078, rz0: 0.044, rz1: 0.066, z: -0.004, dip: 0.03 };
const SMALL = { gap: 0.4, y0: 0.632, y1: 0.652, rx0: 0.048, rx1: 0.05, rz0: 0.04, rz1: 0.042, z: -0.002, dip: 0.006 };
// puffed sleeves: a long balloon from the shoulder seam to above the elbow, gathered into a cuff (Billy's mockup, Nov 21)
function puffs(top, color, cuffColor) {
  const pos = n => { const b = top.skeleton.bones.find(x => x.name === n); b.updateWorldMatrix(true, false); return new THREE.Vector3().setFromMatrixPosition(b.matrixWorld).applyMatrix4(new THREE.Matrix4().copy(top.matrixWorld).invert()); };
  for (const side of [1, -1]) {
    const L = side > 0 ? 'L' : 'R', ua = boneIx(top, `Bip01_${L}_UpperArm`), sh = pos(`Bip01_${L}_UpperArm`), el = pos(`Bip01_${L}_Forearm`);
    const axis = el.clone().sub(sh), len = axis.length(); axis.normalize();
    const up = new THREE.Vector3(0, 1, 0), side1 = new THREE.Vector3().crossVectors(axis, up).normalize(), side2 = new THREE.Vector3().crossVectors(side1, axis).normalize();
    // the sleeve's shape along the arm: t 0 at the shoulder seam (a little inside it), 1 at the cuff
    const at = (u, t) => { const a = u * 2 * Math.PI, d = lerp(-PUFF.back, PUFF.end, t) * len, r = PUFF.r0 + (PUFF.rMax - PUFF.r0) * Math.sin(Math.min(1, t / PUFF.peakT) * Math.PI / 2) ** 1.2 - (PUFF.rMax - PUFF.rEnd) * Math.max(0, (t - PUFF.peakT) / (1 - PUFF.peakT)) ** 1.8;
      const c = sh.clone().addScaledVector(axis, d).addScaledVector(up, PUFF.lift * (1 - t)); return c.addScaledVector(side1, Math.cos(a) * r).addScaledVector(side2, Math.sin(a) * r).toArray(); };
    addPiece(top, ringGeo(20, 14, at, () => [[ua, 1]]), color, { hem: false, gathers: 5 });
    // the cuff
    const cuff = ringGeo(20, 1, (u, t) => { const a = u * 2 * Math.PI, d = (PUFF.end - 0.02 + t * PUFF.cuff) * len, r = PUFF.rEnd + 0.002, c = sh.clone().addScaledVector(axis, d);
      return c.addScaledVector(side1, Math.cos(a) * r).addScaledVector(side2, Math.sin(a) * r).toArray(); }, () => [[ua, 1]]);
    addPiece(top, cuff, cuffColor, { hem: false });
  }
}
const PUFF = { back: 0.06, end: 0.8, r0: 0.03, rMax: 0.045, rEnd: 0.019, peakT: 0.5, lift: 0.004, cuff: 0.1 };
// cargo pockets: a box on the outside of each thigh
function pockets(down, color, flap) {
  const box = (C, th, col) => {
    const F = [[1, 2, 6, 5], [2, 3, 7, 6], [0, 1, 5, 4], [0, 3, 2, 1], [4, 5, 6, 7]], P = [], U = [], J = [], W = [], I = [];
    F.forEach(f => { const b = P.length / 3; f.forEach((ci, q) => { P.push(...C[ci]); U.push(q === 1 || q === 2 ? 1 : 0, q >= 2 ? 0.2 : 0.8); J.push(th, 0, 0, 0); W.push(1, 0, 0, 0); }); I.push(b, b + 1, b + 2, b, b + 2, b + 3); });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(J, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(W, 4)); g.setIndex(I); g.computeVertexNormals();
    addPiece(down, g, col, { hem: false });
  };
  for (const side of [1, -1]) {
    const th = boneIx(down, side > 0 ? 'Bip01_L_Thigh' : 'Bip01_R_Thigh'), leg = legAt(down, POCKET.y, side); if (!leg) continue;
    // on the outside of the thigh, turned a little toward the front
    const a = POCKET.turn, ox = Math.cos(a) * side, oz = Math.sin(a), tx = -Math.sin(a) * side, tz = Math.cos(a);   // out, and across
    const at = (o, w, y) => [leg.x + ox * (leg.r + o) + tx * w, y, leg.z + oz * (leg.r + o) + tz * w];
    const cube = (o0, o1, w, y0, y1) => [at(o0, -w, y0), at(o1, -w, y0), at(o1, -w, y1), at(o0, -w, y1), at(o0, w, y0), at(o1, w, y0), at(o1, w, y1), at(o0, w, y1)];
    const y0 = POCKET.y - POCKET.h / 2, y1 = POCKET.y + POCKET.h / 2;
    box(cube(-0.004, POCKET.d, POCKET.w / 2, y0, y1), th, shade(color, 0.85));                          // the pocket
    box(cube(-0.004, POCKET.d + 0.003, POCKET.w / 2 + 0.002, y1 - 0.016, y1 + 0.002), th, flap);   // its flap
  }
}
const POCKET = { y: 0.32, h: 0.06, w: 0.05, d: 0.01, turn: 0.55 };
// the long skirt: skirt 9's skirt reshaped down to the ankles (same ring layout as cinchSkirt in avatar.js)
export function longSkirt(root, W = { rx: 0.05, rz: 0.045, z: 0.004 }) {
  const NU = 48, NV = 5;
  root.traverse(o => {
    if (!o.isMesh) return;
    const P = o.geometry.attributes.position;
    if (P.count !== (NU + 1) * (NV + 1)) {   // the legs: slimmer above the ankles so they stay inside the skirt
      const v = new THREE.Vector3(); for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); if (v.y < 0.1) continue; const cx = Math.sign(v.x) * 0.04, k = 0.7; P.setXYZ(i, cx + (v.x - cx) * k, v.y, v.z * k); }
      P.needsUpdate = true; return;
    }
    for (let j = 0; j <= NV; j++) for (let i = 0; i <= NU; i++) {
      const t = j / NV, th = i / NU * 2 * Math.PI, fold = 1 + 0.05 * t * Math.abs(Math.sin(10 * th));
      const rx = lerp(W.rx, LONG.rx, Math.pow(t, 0.65)) * fold, rz = lerp(W.rz, LONG.rz, Math.pow(t, 0.65)) * fold;   // starts at the top's own width: no ledge
      P.setXYZ(j * (NU + 1) + i, Math.sin(th) * rx, lerp(0.472, LONG.y, t), lerp(W.z, 0.004, t) + Math.cos(th) * rz);
    }
    P.needsUpdate = true; o.geometry.computeVertexNormals(); o.geometry.computeBoundingSphere();
  });
}
const LONG = { y: 0.06, rx: 0.115, rz: 0.1 };
// a thin band at the waist, flush with the top
function waistband(down, color, W) {
  const pel = boneIx(down, 'Bip01_Pelvis');
  addPiece(down, ringGeo(40, 1, (u, t) => { const a = u * 2 * Math.PI; return [Math.sin(a) * (W.rx + 0.0015), lerp(0.478, 0.466, t), W.z + Math.cos(a) * (W.rz + 0.0015)]; }, () => [[pel, 1]]), color, { hem: false });
}
// boot shafts: from the shoe up to below the knee, round each lower leg
function boots(shoes, down, color, B = BOOT, cuffColor = shade(color, 0.75)) {
  // the legs' middles, measured before the pants are tucked in
  const mids = {}; for (const side of [1, -1]) { const lo = legAt(down, B.y0 + 0.02, side), hi = legAt(down, B.y1 - 0.02, side); if (lo && hi) mids[side] = { lo, hi }; }
  const at = (m, y) => { const t = clamp((y - B.y0) / (B.y1 - B.y0), 0, 1); return { x: lerp(m.lo.x, m.hi.x, t), z: lerp(m.lo.z, m.hi.z, t), r: lerp(B.r0, B.r1, t) }; };
  // slim the legs below the knee into a boot shape
  const P = down.geometry.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); if (v.y > B.y1 + 0.005) continue; const m = mids[Math.sign(v.x) || 1]; if (!m) continue;
    const c = at(m, v.y), dx = v.x - c.x, dz = v.z - c.z, d = Math.hypot(dx, dz), max = c.r; if (d > max) P.setXYZ(i, c.x + dx / d * max, v.y, c.z + dz / d * max); }
  P.needsUpdate = true; down.geometry.computeVertexNormals();
  // the boot: the legs' own faces below the knee, in the boot color (the pants' texture recolored, so the shading matches)
  const g = down.geometry.clone(), idx = g.index.array, keep = [], G = g.attributes.position, N = g.attributes.normal;
  for (let f = 0; f < idx.length; f += 3) { const cy = (G.getY(idx[f]) + G.getY(idx[f + 1]) + G.getY(idx[f + 2])) / 3; if (cy < B.y1) keep.push(idx[f], idx[f + 1], idx[f + 2]); }
  for (let i = 0; i < G.count; i++) G.setXYZ(i, G.getX(i) + N.getX(i) * 0.0012, Math.min(G.getY(i), B.y1), G.getZ(i) + N.getZ(i) * 0.0012);   // faces reaching past the top stop there
  g.setIndex(keep);
  const img = down.material.map?.image, map = img ? new THREE.CanvasTexture(recolorAll(img, color)) : null;
  if (map) { map.colorSpace = THREE.SRGBColorSpace; map.magFilter = THREE.NearestFilter; map.flipY = down.material.map.flipY; map.wrapS = down.material.map.wrapS; map.wrapT = down.material.map.wrapT; }
  const boot = addPiece(down, g, color, { map }); boot.userData.keepMap = true;
  // a cuff at the top of each boot
  for (const side of [1, -1]) {
    const calf = boneIx(down, side > 0 ? 'Bip01_L_Calf' : 'Bip01_R_Calf'), m = mids[side]; if (!m || calf < 0) continue;
    const cuff = ringGeo(18, 1, (u, t) => { const a = u * 2 * Math.PI, y = lerp(B.y1 + 0.006, B.y1 - B.cuff, t), c = at(m, B.y1), r = c.r + 0.004; return [c.x + Math.sin(a) * r, y, c.z + Math.cos(a) * r]; }, () => [[calf, 1]]);
    addPiece(down, cuff, cuffColor, { hem: false });
  }
}
// the whole texture in one color, keeping its light and shade
function recolorAll(img, color) {
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height), p = d.data, to = hex(color); let n = 0, m = 0;
  for (let i = 0; i < p.length; i += 4) if (p[i + 3] > 100) { n++; m += p[i] * 0.3 + p[i + 1] * 0.59 + p[i + 2] * 0.11; }
  m = n ? m / n : 128;
  for (let i = 0; i < p.length; i += 4) { const k = 0.55 + 0.45 * (p[i] * 0.3 + p[i + 1] * 0.59 + p[i + 2] * 0.11) / m; for (let j = 0; j < 3; j++) p[i + j] = Math.min(255, Math.round(to[j] * k)); }
  g.putImageData(d, 0, 0); return c;
}
const BOOT = { y0: 0.035, y1: 0.245, r0: 0.026, r1: 0.032, cuff: 0.02 };
const HIGH = { y0: 0.035, y1: 0.095, r0: 0.027, r1: 0.029, cuff: 0.014 }, ANKLE = { y0: 0.035, y1: 0.14, r0: 0.026, r1: 0.029, cuff: 0.01 };   // high-tops, ankle boots
// full gloves: the hands' fingers covered too (fingerless gloves are the band piece in the glove color)
function fullGloves(top, color) {
  top.parent.traverse(o => {
    if (!o.isSkinnedMesh || !/^skin_/.test(o.material.map?.name || '') || o.userData.glove) return;
    const sk = o.geometry.attributes.skinIndex, sw = o.geometry.attributes.skinWeight, names = o.skeleton.bones.map(b => b.name), hand = new Set();
    names.forEach((n, i) => { if (/(Hand|Finger)/.test(n)) hand.add(i); });
    const isHand = i => { let w = 0; for (let k = 0; k < 4; k++) if (hand.has(sk.array[i * 4 + k])) w += sw.array[i * 4 + k]; return w > 0.5; };
    const idx = o.geometry.index.array, keep = [];
    for (let f = 0; f < idx.length; f += 3) if (isHand(idx[f]) && isHand(idx[f + 1]) && isHand(idx[f + 2])) keep.push(idx[f], idx[f + 1], idx[f + 2]);
    if (!keep.length) return;
    const g = o.geometry.clone(); g.setIndex(keep);
    const P = g.attributes.position, N = g.attributes.normal, v = new THREE.Vector3();
    if (N) for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); P.setXYZ(i, v.x + N.getX(i) * 0.002, v.y + N.getY(i) * 0.002, v.z + N.getZ(i) * 0.002); }
    const m = addPiece(o, g, color, { hem: false }); m.userData.glove = true;
  });
}
