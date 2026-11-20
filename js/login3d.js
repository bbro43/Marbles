// The login corridor (Billy, Nov 20): every time you open Story mode you walk down a bright corridor with tall glass tubes on
// both sides toward a big door, while a loading bar fills. It lasts at least MIN_MS, or as long as the page really needs to
// load, then the door slides open and the corridor fades into The Commons. Built from our own simple shapes.
import * as THREE from 'three';

const MIN_MS = 4000, OPEN_MS = 900, FADE_MS = 450;
const LEN = 70, W = 7, H = 6;   // corridor length, half-width, height

function corridor(scene) {
  const white = new THREE.MeshLambertMaterial({ color: 0xf4f8fc, emissive: 0xaebccb }), trim = new THREE.MeshLambertMaterial({ color: 0xc7d4e2, emissive: 0x5a6878 });
  const glow = new THREE.MeshBasicMaterial({ color: 0xbfeaff });
  // floor with a cyan light line down the middle
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, LEN + 20), new THREE.MeshPhongMaterial({ color: 0xeaf1f8, emissive: 0x8a98a8, shininess: 90, specular: 0x9fb4c8 }));
  floor.rotation.x = -Math.PI / 2; floor.position.z = -LEN / 2; scene.add(floor);
  const line = new THREE.Mesh(new THREE.PlaneGeometry(0.12, LEN + 20), new THREE.MeshBasicMaterial({ color: 0x5fd0ff, transparent: true, opacity: 0.7 }));
  line.rotation.x = -Math.PI / 2; line.position.set(0, 0.01, -LEN / 2); scene.add(line);
  // ceiling with light panels
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, LEN + 20), white); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, -LEN / 2); scene.add(ceil);
  for (let z = 4; z > -LEN; z -= 5) { const p = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.2, 1.4), glow); p.rotation.x = Math.PI / 2; p.position.set(0, H - 0.01, z); scene.add(p); }
  // side walls
  for (const s of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(LEN + 20, H), white); wall.rotation.y = -s * Math.PI / 2; wall.position.set(s * W, H / 2, -LEN / 2); scene.add(wall);
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, LEN + 20), trim); base.position.set(s * (W - 0.15), 0.25, -LEN / 2); scene.add(base);
  }
  // tall glass tubes along both walls, each with a glowing core
  const glass = new THREE.MeshPhongMaterial({ color: 0xcfefff, transparent: true, opacity: 0.32, shininess: 120, specular: 0xffffff, depthWrite: false });
  const cores = [];
  for (let z = -2, i = 0; z > -LEN + 4; z -= 6, i++) for (const s of [-1, 1]) {
    const x = s * (W - 1.3);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, H - 0.8, 24, 1, true), glass); tube.position.set(x, H / 2, z); scene.add(tube);
    for (const y of [0.25, H - 0.25]) { const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.5, 24), trim); cap.position.set(x, y, z); scene.add(cap); }
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, H - 1.2, 10), new THREE.MeshBasicMaterial({ color: 0x6fd6ff, transparent: true, opacity: 0.85 }));
    core.position.set(x, H / 2, z); core.userData.ph = i * 0.7 + (s > 0 ? 0.35 : 0); scene.add(core); cores.push(core);
  }
  // the door at the end: a frame, two sliding halves, a glowing ring emblem
  const endZ = -LEN;
  const back = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, H), new THREE.MeshBasicMaterial({ color: 0xffffff })); back.position.set(0, H / 2, endZ - 0.6); scene.add(back);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(W * 2, H, 0.4), trim);
  const hole = new THREE.Mesh(new THREE.BoxGeometry(6.4, 5, 0.5), new THREE.MeshBasicMaterial({ color: 0xffffff })); hole.position.set(0, 2.5, endZ + 0.05);
  frame.position.set(0, H / 2, endZ - 0.2); scene.add(frame, hole);
  const halves = [];
  for (const s of [-1, 1]) {
    const half = new THREE.Group();
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(3.2, 5, 0.3), new THREE.MeshLambertMaterial({ color: 0xdfe8f2, emissive: 0x8090a0 })); leaf.position.set(s * 1.6, 2.5, 0); half.add(leaf);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.25, 1.55, 40, 1, s < 0 ? Math.PI / 2 : -Math.PI / 2, Math.PI), new THREE.MeshBasicMaterial({ color: 0x39b6ff, side: THREE.DoubleSide }));
    ring.position.set(0, 2.7, 0.17); half.add(ring);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 5, 0.32), new THREE.MeshBasicMaterial({ color: 0x9fe4ff })); edge.position.set(s * 0.04, 2.5, 0); half.add(edge);
    half.position.z = endZ + 0.25; half.userData.s = s; scene.add(half); halves.push(half);
  }
  const arch = new THREE.Mesh(new THREE.BoxGeometry(7, 0.25, 0.3), new THREE.MeshBasicMaterial({ color: 0x39b6ff })); arch.position.set(0, 5.2, endZ + 0.3); scene.add(arch);
  return { cores, halves };
}

// opts.ready: a promise that resolves when the page has finished loading. Returns a promise that resolves once the corridor is gone.
export function playLogin({ ready = Promise.resolve(), title = 'Bakugan Interspace', minMs = MIN_MS } = {}) {
  const root = document.createElement('div');
  root.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#fff;transition:opacity ' + FADE_MS + 'ms ease';
  root.innerHTML = `<div style="position:absolute;left:0;right:0;bottom:calc(36px + env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:center;gap:8px;font:700 13px system-ui;color:#0e3a5c;text-shadow:0 1px 0 #fff">
      <div class="lgT" style="font:900 18px system-ui;letter-spacing:.06em">${title}</div>
      <div class="lgS">Connecting…</div>
      <div style="width:min(78vw,420px);height:12px;border-radius:6px;background:#ffffffcc;border:1px solid #39b6ff;overflow:hidden;box-shadow:0 0 12px #39b6ff66">
        <i class="lgB" style="display:block;height:100%;width:0;background:linear-gradient(90deg,#39b6ff,#9fe4ff)"></i></div>
      <div class="lgP" style="font-size:11px;opacity:.8">0%</div></div>`;
  document.body.appendChild(root);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.setSize(innerWidth, innerHeight); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  root.prepend(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0xf2f7fc); scene.fog = new THREE.Fog(0xf2f7fc, 18, 78);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc8d6e6, 1.6));
  const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(2, 8, 4); scene.add(dl);
  const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 200);
  const { cores, halves } = corridor(scene);
  const onResize = () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); };
  addEventListener('resize', onResize);
  const msgs = ['Connecting…', 'Checking your Brawler ID…', 'Loading your Bakugan…', 'Opening The Commons…'];
  let done = false; ready.then(() => { done = true; }, () => { done = true; });
  const t0 = performance.now();
  return new Promise(resolve => {
    let openAt = null;
    renderer.setAnimationLoop(() => {
      const now = performance.now(), t = now - t0;
      // walk: ease toward the door; the bar can't finish until the page is ready
      const p = Math.min(1, t / minMs), prog = done ? p : Math.min(p, 0.92);
      const walk = 1 - Math.pow(1 - Math.min(1, t / (minMs + 600)), 2);
      camera.position.set(Math.sin(t / 900) * 0.08, 2.6 + Math.sin(t / 260) * 0.03, 6 - walk * (LEN - 16));
      camera.lookAt(0, 2.5, -LEN);
      for (const c of cores) c.material.opacity = 0.55 + 0.4 * Math.sin(t / 400 + c.userData.ph);
      root.querySelector('.lgB').style.width = (prog * 100).toFixed(1) + '%';
      root.querySelector('.lgP').textContent = Math.floor(prog * 100) + '%';
      root.querySelector('.lgS').textContent = msgs[Math.min(msgs.length - 1, Math.floor(prog * msgs.length))];
      if (done && p >= 1 && openAt === null) { openAt = now; root.querySelector('.lgS').textContent = 'Welcome!'; }
      if (openAt !== null) {
        const k = Math.min(1, (now - openAt) / OPEN_MS), e = k * k * (3 - 2 * k);
        for (const h of halves) h.position.x = h.userData.s * e * 3.4;
        camera.position.z -= e * 6;
        if (k >= 1 && root.style.opacity !== '0') {
          root.style.opacity = '0';
          setTimeout(() => { renderer.setAnimationLoop(null); renderer.dispose(); removeEventListener('resize', onResize); root.remove(); resolve(); }, FADE_MS);
        }
      }
      renderer.render(scene, camera);
    });
  });
}
