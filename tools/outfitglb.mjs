// Billy's own outfit pieces (Outfit_Pieces_OBJ.zip, Nov 22) -> rigged GLBs for pack 2's creator/models.
// Each OBJ (T-pose, same scale as our parts) is put on one of our parts' skeletons: every vertex takes the bone weights of
// the nearest vertex of that part. Tops keep our part's hands and gauntlet (top_04 for long sleeves, top_02 for short
// sleeves and vests, whose bare arms come from it). Anything below the waist (coat tails, gown and dress skirts) follows the pelvis.
// The tidy-up pass (fit(), shade()): split each face in four, pull tops and sleeves onto our fitted top_04 (mirrored, so both
// sleeves are long) and pants onto down_00, lower the collars, narrow the coat tails and skirts, and bake shading and folds into the
// vertex colors (the game draws clothes unlit, so shading has to be baked in).
// Billy's v3 set (Nov 22) is already fitted and shaded: convert it with FIX=0.
// Usage: node outfitglb.mjs <unzipped OBJ folder> <pack creator/models folder (templates)> <out folder>
import { NodeIO } from '@gltf-transform/core';
import { KHRMaterialsUnlit } from '@gltf-transform/extensions';
import { prune } from '@gltf-transform/functions';
import fs from 'fs';
const [, , SRC, TPL, OUT] = process.argv;
// FIX=0: skip the tidy-up pass (for pieces already fitted and shaded, like Billy's v3 set)
const FIX = process.env.FIX !== '0';
// ARMS=1: test of the armpit-gap fix: sleeves centered on the arm bone (y 0.612), torso widened under the arms
const ARMS = process.env.ARMS === '1';
function armFix(m) {
  const P = m.pos, sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  for (let i = 0; i < P.length; i += 3) {
    const ax = Math.abs(P[i]), y = P[i + 1];
    // sleeves: down 0.006 (fades in from the shoulder)
    if (y > 0.57) P[i + 1] -= 0.006 * sm(0.07, 0.1, ax);
    // torso sides under the arms: out to about +-0.058 (fades out toward the waist, the shoulders and the middle)
    const k = sm(0.44, 0.5, y) * (1 - sm(0.6, 0.63, y)) * sm(0.02, 0.045, ax) * (1 - sm(0.07, 0.085, ax));
    P[i] *= 1 + 0.18 * k;
  }
}
const io = new NodeIO().registerExtensions([KHRMaterialsUnlit]);

// model name, OBJ, template, kind
export const PIECES = [
  ['top_18', 'Brown_Commander_Jacket/Brown_Commander_Jacket_Top', 'top_04'],
  ['top_19', 'Casual_Field_Jacket/Casual_Field_Jacket_Top', 'top_04'],
  ['top_20', 'Green_Tech_Jacket/Green_Tech_Jacket_Top', 'top_04'],
  ['top_21', 'Red_Biker_Jacket/Red_Biker_Jacket_Top', 'top_04'],
  ['top_22', 'Orange_Field_Jacket/Orange_Field_Jacket_Top', 'top_02'],
  ['top_23', 'Dark_Wrap_Top/Dark_Wrap_Top_Top', 'top_02'],
  ['top_24', 'Utility_Vest_Outfit/Utility_Vest_Outfit_Top', 'top_02'],
  ['top_25', 'Green_Yellow_Ensemble/Green_Yellow_Ensemble_Top', 'top_02'],
  ['top_26', 'Explorer_Vest_Outfit/Explorer_Vest_Outfit_Top', 'top_02'],
  ['top_27', 'Blue_Dueling_Coat/Blue_Dueling_Coat_Coat', 'top_04'],
  ['top_28', 'Blue_Regal_Suit/Blue_Regal_Suit_Coat', 'top_04'],
  ['top_29', 'Navy_Leader_Coat/Navy_Leader_Coat_Coat', 'top_04'],
  ['top_30', 'Formal_Gown/Formal_Gown_Gown', 'top_04'],
  ['top_31', 'High_Uniform_Dress/High_Uniform_Dress_Dress', 'top_04'],
  ...['Blue_Dueling_Coat', 'Blue_Regal_Suit', 'Brown_Commander_Jacket', 'Casual_Field_Jacket', 'Dark_Wrap_Top', 'Explorer_Vest_Outfit',
    'Green_Tech_Jacket', 'Green_Yellow_Ensemble', 'Navy_Leader_Coat', 'Orange_Field_Jacket', 'Red_Biker_Jacket', 'Utility_Vest_Outfit']
    .map((o, i) => [`down_${14 + i}`, `${o}/${o}_Pants`, 'down_00']),
  ...['Blue_Dueling_Coat', 'Blue_Regal_Suit', 'Brown_Commander_Jacket', 'Casual_Field_Jacket', 'Dark_Wrap_Top', 'Explorer_Vest_Outfit',
    'Green_Tech_Jacket', 'Green_Yellow_Ensemble', 'Navy_Leader_Coat', 'Orange_Field_Jacket', 'Red_Biker_Jacket', 'Utility_Vest_Outfit']
    .map((o, i) => [`shoes_${String(7 + i).padStart(2, '0')}`, `${o}/${o}_${['Green_Tech_Jacket'].includes(o) ? 'Shoes' : 'Boots'}`, 'shoes_00']),
  ['shoes_19', 'Formal_Gown/Formal_Gown_Shoes', 'shoes_00'],
  ['shoes_20', 'High_Uniform_Dress/High_Uniform_Dress_Boots', 'shoes_00'],
];

function readObj(path) {
  const V = [], T = [], out = { pos: [], uv: [], idx: [] }, key = new Map();
  for (const line of fs.readFileSync(path, 'utf8').split('\n')) {
    const p = line.trim().split(/\s+/);
    if (p[0] === 'v') V.push(p.slice(1, 4).map(Number));
    else if (p[0] === 'vt') T.push(p.slice(1, 3).map(Number));
    else if (p[0] === 'f') {
      const ids = p.slice(1).map(s => { const [vi, ti] = s.split('/').map(x => x ? +x : 0); const k = vi + '/' + ti;
        if (!key.has(k)) { const v = V[vi < 0 ? V.length + vi : vi - 1], t = ti ? T[ti < 0 ? T.length + ti : ti - 1] : [0, 0];
          key.set(k, out.pos.length / 3); out.pos.push(...v); out.uv.push(t[0], 1 - t[1]); }   // OBJ v is bottom-up, glTF top-down
        return key.get(k); });
      for (let i = 1; i + 1 < ids.length; i++) out.idx.push(ids[0], ids[i], ids[i + 1]);
    }
  }
  return out;
}
// push each vertex out along its normal a hair, so it sits on top of the body (bare arms, pants under boots)
function inflate(m, d) {
  const n = new Float32Array(m.pos.length), P = m.pos;
  for (let f = 0; f < m.idx.length; f += 3) {
    const [a, b, c] = [m.idx[f], m.idx[f + 1], m.idx[f + 2]].map(i => i * 3);
    const u = [P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]], v = [P[c] - P[a], P[c + 1] - P[a + 1], P[c + 2] - P[a + 2]];
    const x = u[1] * v[2] - u[2] * v[1], y = u[2] * v[0] - u[0] * v[2], z = u[0] * v[1] - u[1] * v[0];
    for (const i of [a, b, c]) { n[i] += x; n[i + 1] += y; n[i + 2] += z; }
  }
  // vertices at the same spot (UV seams) share one normal
  const at = new Map();
  for (let i = 0; i < P.length; i += 3) { const k = P.slice(i, i + 3).map(x => x.toFixed(5)).join(); if (!at.has(k)) at.set(k, []); at.get(k).push(i); }
  for (const list of at.values()) { const s = [0, 0, 0]; for (const i of list) for (let k = 0; k < 3; k++) s[k] += n[i + k];
    const l = Math.hypot(...s) || 1; for (const i of list) for (let k = 0; k < 3; k++) P[i + k] += s[k] / l * d; }
}


// split every triangle in four (edge midpoints), so the fitting and the shading have points to work with
function subdivide(m) {
  const mid = new Map(), P = m.pos, U = m.uv, idx = [];
  const at = (a, b) => { const k = a < b ? a + ',' + b : b + ',' + a; if (mid.has(k)) return mid.get(k);
    const i = P.length / 3; for (let c = 0; c < 3; c++) P.push((P[a * 3 + c] + P[b * 3 + c]) / 2); U.push((U[a * 2] + U[b * 2]) / 2, (U[a * 2 + 1] + U[b * 2 + 1]) / 2); mid.set(k, i); return i; };
  for (let f = 0; f < m.idx.length; f += 3) { const [a, b, c] = m.idx.slice(f, f + 3), ab = at(a, b), bc = at(b, c), ca = at(c, a);
    idx.push(a, ab, ca, ab, b, bc, ca, bc, c, ab, bc, ca); }
  m.idx = idx;
}
// triangles of a template part (by material name), optionally only its x <= 0 half mirrored to both sides
async function surface(path, matRe, mirror) {
  const d = await io.read(path), T = [];
  for (const p of d.getRoot().listMeshes()[0].listPrimitives()) { if (!matRe.test(p.getMaterial().getName())) continue;
    const A = p.getAttribute('POSITION'), ix = p.getIndices().getArray(), e = [];
    for (let f = 0; f < ix.length; f += 3) { const t = [0, 1, 2].map(k => [...A.getElement(ix[f + k], e)]);
      if (!mirror) T.push(t); else if (t.every(v => v[0] <= 0.002)) { T.push(t); T.push(t.map(v => [-v[0], v[1], v[2]])); } } }
  return T;
}
function closest(p, [a, b, c]) {   // closest point on a triangle (Ericson)
  const sub = (u, v) => [u[0] - v[0], u[1] - v[1], u[2] - v[2]], dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const add = (u, v, s) => [u[0] + v[0] * s, u[1] + v[1] * s, u[2] + v[2] * s];
  const ab = sub(b, a), ac = sub(c, a), ap = sub(p, a), d1 = dot(ab, ap), d2 = dot(ac, ap); if (d1 <= 0 && d2 <= 0) return a;
  const bp = sub(p, b), d3 = dot(ab, bp), d4 = dot(ac, bp); if (d3 >= 0 && d4 <= d3) return b;
  const vc = d1 * d4 - d3 * d2; if (vc <= 0 && d1 >= 0 && d3 <= 0) return add(a, ab, d1 / (d1 - d3));
  const cp = sub(p, c), d5 = dot(ab, cp), d6 = dot(ac, cp); if (d6 >= 0 && d5 <= d6) return c;
  const vb = d5 * d2 - d1 * d6; if (vb <= 0 && d2 >= 0 && d6 <= 0) return add(a, ac, d2 / (d2 - d6));
  const va = d3 * d6 - d5 * d4; if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) return add(b, sub(c, b), (d4 - d3) / ((d4 - d3) + (d5 - d6)));
  const den = 1 / (va + vb + vc); return add(add(a, ab, vb * den), ac, vc * den);
}
// pull every point that stands more than `gap` off the reference surface in to `gap` (never pushes out); `w(y)` fades the pull
function shrink(m, T, gap, w) {
  const P = m.pos;
  for (let i = 0; i < P.length; i += 3) { const p = [P[i], P[i + 1], P[i + 2]], k = w(p); if (k <= 0) continue;
    let best = null, bd = 1e9; for (const t of T) { const q = closest(p, t), d = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 + (q[2] - p[2]) ** 2; if (d < bd) { bd = d; best = q; } }
    const d = Math.sqrt(bd); if (d <= gap) continue; const s = (1 - gap / d) * k;
    for (let c = 0; c < 3; c++) P[i + c] -= (p[c] - best[c]) * s; }
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
async function fit(m, kind, name) {
  subdivide(m); const P = m.pos;
  if (kind === 'top') {
    // collars: squash everything above the base of the neck
    for (let i = 0; i < P.length; i += 3) if (P[i + 1] > 0.652 && Math.abs(P[i]) < 0.09) P[i + 1] = 0.652 + (P[i + 1] - 0.652) * 0.3;
    // torso and sleeves onto our fitted top (above the hips)
    const T = await surface(`${TPL}/top_04/top_04.glb`, /^top_00$/, true);
    shrink(m, T, 0.006, p => smooth(0.43, 0.47, p[1]));
    // coat tails, gown and dress skirts: narrower front to back and a little at the sides
    let zc = 0, n = 0; for (let i = 0; i < P.length; i += 3) if (P[i + 1] > 0.46 && P[i + 1] < 0.5 && Math.abs(P[i]) < 0.1) { zc += P[i + 2]; n++; } zc = n ? zc / n : 0;
    for (let i = 0; i < P.length; i += 3) { const k = smooth(0.47, 0.40, P[i + 1]); if (k <= 0) continue;
      P[i] *= 1 - 0.12 * k; P[i + 2] = zc + (P[i + 2] - zc) * (1 - 0.22 * k); }
  } else if (kind === 'down') {
    const T = await surface(`${TPL}/down_00/down_00.glb`, /./, false);
    shrink(m, T, 0.004, () => 1);
    // inside the boots: pull each leg in toward its own middle so nothing pokes through
    for (const side of [-1, 1]) { let cx = 0, cz = 0, n = 0;
      for (let i = 0; i < P.length; i += 3) if (P[i] * side > 0 && P[i + 1] < 0.2) { cx += P[i]; cz += P[i + 2]; n++; }
      if (!n) continue; cx /= n; cz /= n;
      for (let i = 0; i < P.length; i += 3) { if (P[i] * side <= 0) continue; const k = smooth(0.24, 0.17, P[i + 1]); if (k <= 0) continue;
        P[i] = cx + (P[i] - cx) * (1 - 0.3 * k); P[i + 2] = cz + (P[i + 2] - cz) * (1 - 0.3 * k); } }
  }
}
// bake light into the vertex colors: a soft key light from the front and above, darker sides and undersides, and darker bands where
// cloth folds (waist, elbows, knees, under the arms) and inside (back faces of open coats get the darker side of DoubleSide anyway)
function shade(m, kind) {
  const P = m.pos, n = new Float32Array(P.length);
  for (let f = 0; f < m.idx.length; f += 3) { const [a, b, c] = m.idx.slice(f, f + 3).map(i => i * 3);
    const u = [P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]], v = [P[c] - P[a], P[c + 1] - P[a + 1], P[c + 2] - P[a + 2]];
    const x = u[1] * v[2] - u[2] * v[1], y = u[2] * v[0] - u[0] * v[2], z = u[0] * v[1] - u[1] * v[0]; for (const i of [a, b, c]) { n[i] += x; n[i + 1] += y; n[i + 2] += z; } }
  const at = new Map(); for (let i = 0; i < P.length; i += 3) { const k = P.slice(i, i + 3).map(x => x.toFixed(5)).join(); if (!at.has(k)) at.set(k, []); at.get(k).push(i); }
  for (const l of at.values()) { const s = [0, 0, 0]; for (const i of l) for (let k = 0; k < 3; k++) s[k] += n[i + k]; for (const i of l) for (let k = 0; k < 3; k++) n[i + k] = s[k]; }
  const L = [-0.35, 0.55, 0.76], C = new Uint8Array(P.length);
  for (let i = 0; i < P.length; i += 3) {
    const len = Math.hypot(n[i], n[i + 1], n[i + 2]) || 1, N = [n[i] / len, n[i + 1] / len, n[i + 2] / len], x = Math.abs(P[i]), y = P[i + 1];
    let s = 0.70 + 0.30 * Math.max(0, N[0] * L[0] + N[1] * L[1] + N[2] * L[2]) - 0.10 * Math.max(0, -N[1]);
    const band = (c, w, d) => d * Math.exp(-(((c - (kind === 'top' && x > 0.12 ? x : y)) / w) ** 2));
    if (kind === 'top') { s -= band(0.47, 0.012, 0.10); if (x > 0.12) s -= band(0.205, 0.012, 0.10); else if (x > 0.07 && x < 0.12) s -= 0.08 * smooth(0.12, 0.09, x) * smooth(0.5, 0.58, y); }
    if (kind === 'down') { s -= band(0.27, 0.012, 0.09) + band(0.45, 0.01, 0.08); if (x < 0.012) s -= 0.08; }
    if (kind === 'shoes') s += 0.08 * smooth(0.03, 0.08, y);
    const v = Math.round(255 * Math.min(1, Math.max(0.45, s))); C[i] = C[i + 1] = C[i + 2] = v;
  }
  return C;
}

fs.mkdirSync(OUT, { recursive: true });
for (const [name, obj, tpl] of PIECES) {
  const doc = await io.read(`${TPL}/${tpl}/${tpl}.glb`), root = doc.getRoot(), mesh = root.listMeshes()[0], buf = root.listBuffers()[0];
  const skin = root.listSkins()[0], joints = skin.listJoints().map(j => j.getName()), pelvis = joints.indexOf('Bip01_Pelvis');
  const prims = mesh.listPrimitives(), isTop = tpl.startsWith('top');
  const cloth = isTop ? prims.find(p => p.getMaterial().getName() === 'top_00') : prims[0];
  // reference vertices for the weights: the cloth and (for tops) the skin
  const refs = isTop ? prims.filter(p => ['top_00', 'skin_00'].includes(p.getMaterial().getName())) : [cloth];
  const ref = []; for (const p of refs) { const A = p.getAttribute('POSITION'), J = p.getAttribute('JOINTS_0'), W = p.getAttribute('WEIGHTS_0'), e = [], j = [], w = [];
    for (const i of new Set(p.getIndices().getArray())) { A.getElement(i, e); J.getElement(i, j); W.getElement(i, w); ref.push([...e, [...j], [...w]]); } }
  const m = readObj(`${SRC}/${obj}.obj`), kind = name.split('_')[0]; if (FIX) await fit(m, kind, name);
  if (ARMS && kind === 'top') armFix(m); inflate(m, isTop ? 0.0018 : tpl.startsWith('shoes') ? 0.0015 : 0.0005);
  const n = m.pos.length / 3, J = new Uint16Array(n * 4), W = new Float32Array(n * 4);
  // tops: our template's left sleeve is short (the gauntlet covers the forearm), so both arms take their weights from the right
  // arm (x <= 0), mirrored, with left and right bones swapped
  const swapJ = joints.map(nm => { const o = nm.replace(/_L_|_R_|L_|R_/, t => t.replace('L', '#').replace('R', 'L').replace('#', 'R')); const k = joints.indexOf(o); return k < 0 ? joints.indexOf(nm) : k; });
  const refL = isTop ? ref.filter(r => r[0] <= 0.002) : ref;
  for (let i = 0; i < n; i++) {
    const x = m.pos[i * 3], y = m.pos[i * 3 + 1], z = m.pos[i * 3 + 2];
    const mir = isTop && x > 0, qx = mir ? -x : x;
    let best = null, bd = 1e9; for (const r of refL) { const d = (r[0] - qx) ** 2 + (r[1] - y) ** 2 + (r[2] - z) ** 2; if (d < bd) { bd = d; best = r; } }
    const w = new Map(); best[3].forEach((jj, k) => { const j2 = mir ? swapJ[jj] : jj; if (best[4][k] > 0) w.set(j2, (w.get(j2) || 0) + best[4][k]); });
    if (isTop && pelvis >= 0) {   // below the waist: the pelvis (blend over the hem)
      const t = Math.min(1, Math.max(0, (0.47 - y) / 0.05));
      if (t > 0) { for (const k of w.keys()) w.set(k, w.get(k) * (1 - t)); w.set(pelvis, (w.get(pelvis) || 0) + t); }
    }
    const top4 = [...w].filter(([, v]) => v > 1e-4).sort((a, b) => b[1] - a[1]).slice(0, 4), s = top4.reduce((a, b) => a + b[1], 0);
    top4.forEach(([jj, v], k) => { J[i * 4 + k] = jj; W[i * 4 + k] = v / s; });
  }
  const acc = (arr, type) => doc.createAccessor().setType(type).setArray(arr).setBuffer(buf);
  const mat = cloth.getMaterial().clone().setName(name).setDoubleSided(true);
  const png = fs.readFileSync(`${SRC}/${obj}.png`);
  mat.setBaseColorTexture(doc.createTexture(`${name}_00`).setURI(`${name}_00.png`).setMimeType('image/png').setImage(png));
  const prim = doc.createPrimitive().setMaterial(mat)
    .setAttribute('POSITION', acc(new Float32Array(m.pos), 'VEC3')).setAttribute('TEXCOORD_0', acc(new Float32Array(m.uv), 'VEC2'))
    .setAttribute('JOINTS_0', acc(J, 'VEC4')).setAttribute('WEIGHTS_0', acc(W, 'VEC4'))
    .setIndices(acc(n > 65535 ? new Uint32Array(m.idx) : new Uint16Array(m.idx), 'SCALAR'));
  prim.setAttribute('COLOR_0', acc(FIX ? shade(m, kind) : new Uint8Array(m.pos.length).fill(255), 'VEC3').setNormalized(true));
  // keep our hands and gauntlet (and, for short sleeves, our bare arms); drop our cloth and the wrist bands
  for (const p of prims) { const mn = p.getMaterial().getName(); if (!isTop || mn === 'top_00' || !['skin_00', 'gauntlet_00'].includes(mn)) mesh.removePrimitive(p); }
  mesh.addPrimitive(prim); mesh.setName(name); root.listNodes().find(x => x.getMesh()).setName(name);
  await doc.transform(prune());
  fs.mkdirSync(`${OUT}/${name}`, { recursive: true }); await io.write(`${OUT}/${name}/${name}.glb`, doc);
  console.log(name, tpl, n, 'verts', (fs.statSync(`${OUT}/${name}/${name}.glb`).size / 1024).toFixed(0) + ' KB');
}
