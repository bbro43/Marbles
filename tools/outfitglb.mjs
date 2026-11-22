// Billy's own outfit pieces (Outfit_Pieces_OBJ.zip, Nov 22) -> rigged GLBs for pack 2's creator/models.
// Each OBJ (T-pose, same scale as our parts) is put on one of our parts' skeletons: every vertex takes the bone weights of
// the nearest vertex of that part. Tops keep our part's hands and gauntlet (top_04 for long sleeves, top_02 for short
// sleeves and vests, whose bare arms come from it). Anything below the waist (coat tails, gown and dress skirts) follows the pelvis.
// Usage: node outfitglb.mjs <unzipped OBJ folder> <pack creator/models folder (templates)> <out folder>
import { NodeIO } from '@gltf-transform/core';
import { KHRMaterialsUnlit } from '@gltf-transform/extensions';
import { prune } from '@gltf-transform/functions';
import fs from 'fs';
const [, , SRC, TPL, OUT] = process.argv;
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
  const m = readObj(`${SRC}/${obj}.obj`); inflate(m, isTop ? 0.0018 : tpl.startsWith('shoes') ? 0.0015 : 0.0005);
  const n = m.pos.length / 3, J = new Uint16Array(n * 4), W = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const x = m.pos[i * 3], y = m.pos[i * 3 + 1], z = m.pos[i * 3 + 2];
    let best = null, bd = 1e9; for (const r of ref) { const d = (r[0] - x) ** 2 + (r[1] - y) ** 2 + (r[2] - z) ** 2; if (d < bd) { bd = d; best = r; } }
    const w = new Map(); best[3].forEach((jj, k) => { if (best[4][k] > 0) w.set(jj, (w.get(jj) || 0) + best[4][k]); });
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
  const C = cloth.getAttribute('COLOR_0'); if (C) prim.setAttribute('COLOR_0', acc(new Float32Array(n * C.getElementSize()).fill(1), C.getType()));
  // keep our hands and gauntlet (and, for short sleeves, our bare arms); drop our cloth and the wrist bands
  for (const p of prims) { const mn = p.getMaterial().getName(); if (!isTop || mn === 'top_00' || !['skin_00', 'gauntlet_00'].includes(mn)) mesh.removePrimitive(p); }
  mesh.addPrimitive(prim); mesh.setName(name); root.listNodes().find(x => x.getMesh()).setName(name);
  await doc.transform(prune());
  fs.mkdirSync(`${OUT}/${name}`, { recursive: true }); await io.write(`${OUT}/${name}/${name}.glb`, doc);
  console.log(name, tpl, n, 'verts', (fs.statSync(`${OUT}/${name}/${name}.glb`).size / 1024).toFixed(0) + ' KB');
}
