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
  L.band = Object.keys(BAND)[r(6)];
  return L;
}

// which models make up a look
function models(L) {
  const m = ['head_00', 'top_' + two(L.top[0]), 'down_' + two(L.down[0]), 'shoes_' + two(L.shoes[0])];
  m.push(L.cap[0] >= 0 ? 'cap_' + two(L.cap[0]) : 'hair_' + two(L.hair[0]));      // a hat comes with the hair under it
  if (L.glasses[0] >= 0) m.push('glasses_' + two(L.glasses[0]));
  return m;
}
// the texture a material should use, given the texture it was built with
function variantFor(texName, L) {
  if (texName === 'gauntlet') return L.band && L.band !== 'pyrus' ? `gauntlet_${L.band}` : null;   // the gauntlet's attribute color
  const m = /^([a-z]+)_(\d\d)_(\d\d)$/.exec(texName || ''); if (!m) return null;
  const kind = m[1], s = m[2];
  switch (kind) {
    case 'hair': return `hair_${two(L.hair[0])}_${two(L.hair[1])}`;
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
  const tex = async name => {
    if (!texCache.has(name)) texCache.set(name, (async () => {
      const t = await texLoader.loadAsync(await url(`creator/textures/${name}.png`));
      t.flipY = false; t.colorSpace = THREE.SRGBColorSpace; t.magFilter = THREE.NearestFilter; return t;
    })().catch(() => { console.warn('no texture', name); return null; }));
    return texCache.get(name);
  };
  const scenes = await Promise.all(models(L).map(async m => (await loader.loadAsync(await url(`creator/models/${m}/${m}.glb`))).scene));
  const jobs = [];
  for (const sc of scenes) {
    sc.traverse(o => {
      if (!o.isMesh) return;
      o.frustumCulled = false;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const mat of mats) {
        const old = mat.map; if (!old) continue;
        const want = variantFor(old.name, L); if (!want || want === old.name) continue;
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
