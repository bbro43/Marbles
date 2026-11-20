// The login (Billy, Nov 20): opening Story mode, you glide down a bright corridor lined with 8 glass pods (4 a side) to your
// own pod. Your character stands inside, and once the page has loaded he's digitized into the world from the feet up:
// a scan ring rises, the body below it is gone, and glowing data cubes stream upward (Tron / Code Lyoko style).
// Then a white flash into The Commons. Lasts at least ~4.5 s, or as long as loading really takes. Our own simple shapes.
import * as THREE from 'three';
import { idle } from './avatar.js';

const WALK_MS = 2300, DIG_MS = 2300, FLASH_MS = 550;
const LEN = 50, W = 7, H = 6;                 // corridor length, half-width, height
const POD_X = W - 1.9, POD_R = 1.35, POD_H = 4.6, POD_ZS = [-8, -18, -28, -38];
const MY_POD = { x: -POD_X, z: -28 };         // yours: left side, third pod
const AV_H = 3.1;                             // your character's height in the pod

function corridor(scene) {
  const white = new THREE.MeshLambertMaterial({ color: 0xf4f8fc, emissive: 0xaebccb }), trim = new THREE.MeshLambertMaterial({ color: 0xc7d4e2, emissive: 0x5a6878 });
  const glow = new THREE.MeshBasicMaterial({ color: 0xbfeaff });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, LEN + 20), new THREE.MeshPhongMaterial({ color: 0xeaf1f8, emissive: 0x8a98a8, shininess: 90, specular: 0x9fb4c8 }));
  floor.rotation.x = -Math.PI / 2; floor.position.z = -LEN / 2 + 6; scene.add(floor);
  const line = new THREE.Mesh(new THREE.PlaneGeometry(0.12, LEN + 20), new THREE.MeshBasicMaterial({ color: 0x5fd0ff, transparent: true, opacity: 0.7 }));
  line.rotation.x = -Math.PI / 2; line.position.set(0, 0.01, -LEN / 2 + 6); scene.add(line);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, LEN + 20), white); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, -LEN / 2 + 6); scene.add(ceil);
  for (let z = 4; z > -LEN; z -= 5) { const p = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.2, 1.4), glow); p.rotation.x = Math.PI / 2; p.position.set(0, H - 0.01, z); scene.add(p); }
  for (const s of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(LEN + 20, H), white); wall.rotation.y = -s * Math.PI / 2; wall.position.set(s * W, H / 2, -LEN / 2 + 6); scene.add(wall);
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, LEN + 20), trim); base.position.set(s * (W - 0.15), 0.25, -LEN / 2 + 6); scene.add(base);
  }
  // 8 pods: a glass tube, a base and a lid with glowing rings. Empty ones hold a glowing light column.
  const glass = new THREE.MeshPhongMaterial({ color: 0xcfefff, transparent: true, opacity: 0.22, shininess: 120, specular: 0xffffff, depthWrite: false, side: THREE.DoubleSide });
  const cores = [];
  for (const z of POD_ZS) for (const s of [-1, 1]) {
    const x = s * POD_X, mine = x === MY_POD.x && z === MY_POD.z;
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(POD_R, POD_R, POD_H, 32, 1, true), glass); tube.position.set(x, 0.5 + POD_H / 2, z); tube.renderOrder = 2; scene.add(tube);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(POD_R + 0.25, POD_R + 0.35, 0.5, 32), trim); base.position.set(x, 0.25, z); scene.add(base);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(POD_R + 0.25, POD_R + 0.25, 0.5, 32), trim); lid.position.set(x, 0.75 + POD_H, z); scene.add(lid);
    for (const y of [0.52, 0.5 + POD_H]) { const ring = new THREE.Mesh(new THREE.TorusGeometry(POD_R + 0.05, 0.06, 8, 48), new THREE.MeshBasicMaterial({ color: mine ? 0xffcf3a : 0x39b6ff })); ring.rotation.x = Math.PI / 2; ring.position.set(x, y, z); scene.add(ring); }
    if (!mine) { const core = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, POD_H - 0.4, 12), new THREE.MeshBasicMaterial({ color: 0x6fd6ff, transparent: true, opacity: 0.6 }));
      core.position.set(x, 0.5 + POD_H / 2, z); core.userData.ph = z * 0.13 + s; scene.add(core); cores.push(core); }
  }
  // the door at the end with a ring emblem
  const endZ = -LEN;
  const frame = new THREE.Mesh(new THREE.BoxGeometry(W * 2, H, 0.4), trim); frame.position.set(0, H / 2, endZ - 0.2); scene.add(frame);
  for (const s of [-1, 1]) {
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(3.2, 5, 0.3), new THREE.MeshLambertMaterial({ color: 0xdfe8f2, emissive: 0x8090a0 })); leaf.position.set(s * 1.6, 2.5, endZ + 0.25); scene.add(leaf);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.25, 1.55, 40, 1, s < 0 ? Math.PI / 2 : -Math.PI / 2, Math.PI), new THREE.MeshBasicMaterial({ color: 0x39b6ff, side: THREE.DoubleSide }));
    ring.position.set(0, 2.7, endZ + 0.42); scene.add(ring);
  }
  return { cores };
}

// the digitize effect: a scan ring that rises up your pod, and data cubes that stream upward from where it passes
function digitizer(scene) {
  const g = new THREE.Group(); g.position.set(MY_POD.x, 0.5, MY_POD.z); g.visible = false; scene.add(g);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 8, 48), new THREE.MeshBasicMaterial({ color: 0x9fe4ff }));
  ring.rotation.x = Math.PI / 2; g.add(ring);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.95, 40), new THREE.MeshBasicMaterial({ color: 0x39b6ff, transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false }));
  disc.rotation.x = -Math.PI / 2; g.add(disc);
  // the data cubes: born across the body's outline as the ring passes, then drift up, spin and shrink away
  const N = 520;
  const cubes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 0.07, 0.07), new THREE.MeshBasicMaterial({ color: 0x6fe0ff, transparent: true, opacity: 0.95, depthWrite: false }), N);
  cubes.instanceMatrix.setUsage(THREE.DynamicDrawUsage); g.add(cubes);
  const P = [];
  for (let i = 0; i < N; i++) {
    const y = Math.random() * AV_H, wid = y < AV_H * 0.48 ? 0.32 : y < AV_H * 0.82 ? 0.5 : 0.24;   // legs, body + arms, head
    P.push({ x: (Math.random() - 0.5) * 0.4, y, z: (Math.random() - 0.5) * 2 * wid, vy: 0.9 + Math.random() * 1.6, vz: (Math.random() - 0.5) * 0.25, s: 0.6 + Math.random() * 0.9 });
  }
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pos = new THREE.Vector3(), eu = new THREE.Euler();
  const rate = (AV_H + 0.3) / (DIG_MS / 1000);   // scan speed, units a second
  function update(h, d) {   // h: scan height, d: seconds since the scan began
    ring.position.y = disc.position.y = Math.min(h, AV_H + 0.3);
    for (let i = 0; i < N; i++) {
      const p = P[i], age = d - p.y / rate;
      if (age < 0) { sc.setScalar(0); pos.set(0, -10, 0); }
      else { const life = Math.min(1, age / 1.3); sc.setScalar(p.s * (1 - life)); pos.set(p.x, p.y + age * 0.4 + p.vy * age * age * 0.9, p.z + p.vz * age); }
      q.setFromEuler(eu.set(age * 3, age * 2, 0)); m.compose(pos, q, sc); cubes.setMatrixAt(i, m);
    }
    cubes.instanceMatrix.needsUpdate = true;
  }
  return { g, update };
}

// opts.ready: resolves when the page has loaded. Returns { done: Promise, setAvatar(promise of an avatar Group, or null) }.
export function playLogin({ ready = Promise.resolve(), title = 'Bakugan Interspace' } = {}) {
  const root = document.createElement('div');
  root.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#fff;transition:opacity ' + FLASH_MS + 'ms ease';
  root.innerHTML = `<div class="lgFlash" style="position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:2"></div>
    <div style="position:absolute;left:0;right:0;bottom:calc(36px + env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:center;gap:8px;font:700 13px system-ui;color:#0e3a5c;text-shadow:0 1px 0 #fff;z-index:3">
      <div style="font:900 18px system-ui;letter-spacing:.06em">${title}</div>
      <div class="lgS">Connecting…</div>
      <div style="width:min(78vw,420px);height:12px;border-radius:6px;background:#ffffffcc;border:1px solid #39b6ff;overflow:hidden;box-shadow:0 0 12px #39b6ff66">
        <i class="lgB" style="display:block;height:100%;width:0;background:linear-gradient(90deg,#39b6ff,#9fe4ff)"></i></div>
      <div class="lgP" style="font-size:11px;opacity:.8">0%</div></div>`;
  document.body.appendChild(root);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.setSize(innerWidth, innerHeight); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.localClippingEnabled = true;
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  root.prepend(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0xf2f7fc); scene.fog = new THREE.Fog(0xf2f7fc, 20, 70);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc8d6e6, 1.6));
  const dl = new THREE.DirectionalLight(0xffffff, 0.9); dl.position.set(4, 8, 2); scene.add(dl);
  const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 200);
  const { cores } = corridor(scene), dig = digitizer(scene);
  const onResize = () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); };
  addEventListener('resize', onResize);

  // your character in your pod; everything below the scan plane is clipped away
  const clip = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);   // keeps y >= -constant
  let avatar = null, avatarState = 'waiting';                       // waiting | ok | none
  const setAvatar = p => {
    if (avatarState !== 'waiting') return;
    if (!p) { avatarState = 'none'; return; }
    p.then(av => { if (!av) { avatarState = 'none'; return; }
      av.updateMatrixWorld(true); const real = new THREE.Box3().setFromObject(av, true).getSize(new THREE.Vector3()).y || 1;
      av.scale.setScalar(AV_H / real); av.position.set(MY_POD.x, 0.5, MY_POD.z); av.rotation.y = Math.PI / 2;   // facing the corridor
      av.traverse(o => { if (!o.isMesh) return; for (const mm of [].concat(o.material)) { mm.clippingPlanes = [clip]; mm.needsUpdate = true; } });
      scene.add(av); avatar = av; avatarState = 'ok';
    }, () => { avatarState = 'none'; }); };
  let loaded = false;
  ready.catch(() => {}).then(() => { loaded = true; setTimeout(() => { if (avatarState === 'waiting') avatarState = 'none'; }, 6000); });
  // the glide: from the entrance to the spot in front of your pod
  const camA = new THREE.Vector3(0, 2.7, 6), lookA = new THREE.Vector3(0, 2.4, -LEN);
  // stand back in the corridor so the whole pod fits on a phone screen (further back when the screen is narrow)
  const back = innerWidth < innerHeight ? 10.6 : 7.5;
  const camB = new THREE.Vector3(MY_POD.x + back, 3.0, MY_POD.z + 2.2), lookB = new THREE.Vector3(MY_POD.x, 2.5, MY_POD.z);
  const look = new THREE.Vector3();
  const msgs = ['Connecting…', 'Checking your Brawler ID…', 'Scanning your Brawler…'];
  const t0 = performance.now();
  let digAt = null, flashAt = null, resolveDone;
  const done = new Promise(r => { resolveDone = r; });
  renderer.setAnimationLoop(() => {
    const now = performance.now(), t = now - t0;
    const k = Math.min(1, t / WALK_MS), e = k * k * (3 - 2 * k);
    camera.position.lerpVectors(camA, camB, e); camera.position.y += Math.sin(t / 260) * 0.02 * (1 - e);
    look.lerpVectors(lookA, lookB, Math.min(1, e * 1.15)); camera.lookAt(look);
    for (const c of cores) c.material.opacity = 0.45 + 0.35 * Math.sin(t / 400 + c.userData.ph);
    if (avatar) idle(avatar, t / 1000);
    let prog;
    if (digAt === null) {
      prog = Math.min(0.75, (t / WALK_MS) * 0.6 + (loaded ? 0.15 : 0));
      root.querySelector('.lgS').textContent = msgs[Math.min(msgs.length - 1, Math.floor(k * msgs.length))];
      if (k >= 1 && loaded && avatarState !== 'waiting') { digAt = now; dig.g.visible = true; root.querySelector('.lgS').textContent = 'Digitizing…'; }
    } else {
      const d = (now - digAt) / 1000, f = Math.min(1, d / (DIG_MS / 1000)), h = f * (AV_H + 0.3);
      clip.constant = -(0.5 + h);                                   // hide everything below the scan line
      dig.update(h, d);
      prog = 0.75 + 0.25 * f;
      if (f >= 1 && d > DIG_MS / 1000 + 0.5 && flashAt === null) { flashAt = now; root.querySelector('.lgS').textContent = 'Welcome to Interspace!'; }
    }
    if (flashAt !== null) {
      const fk = Math.min(1, (now - flashAt) / FLASH_MS);
      root.querySelector('.lgFlash').style.opacity = String(fk);
      if (fk >= 1 && root.style.opacity !== '0') {
        root.style.opacity = '0';
        setTimeout(() => { renderer.setAnimationLoop(null); renderer.dispose(); removeEventListener('resize', onResize); root.remove(); resolveDone(); }, FLASH_MS);
      }
    }
    root.querySelector('.lgB').style.width = (prog * 100).toFixed(1) + '%';
    root.querySelector('.lgP').textContent = Math.floor(prog * 100) + '%';
    renderer.render(scene, camera);
  });
  return { done, setAvatar };
}
