// The team room (Billy, Nov 20): a round white room with a big wall screen and floating pod chairs around a central table.
// One pod per team member (up to 6), each with a name tag. Tap a pod or its tag to pick that teammate. Drag to look around.
// Built from our own simple shapes.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { modelFor } from './people.js';

const R = 15, H = 9;   // room radius and height
const POD_COLORS = [0x39b6ff, 0xf2a33a, 0x6be08f, 0xe07aa8, 0xb48cff, 0xff6b6b];

function screenTexture(lines) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, 512); grd.addColorStop(0, '#0b2a4a'); grd.addColorStop(1, '#06182c'); g.fillStyle = grd; g.fillRect(0, 0, 1024, 512);
  g.strokeStyle = '#39b6ff55'; g.lineWidth = 1; for (let x = 0; x < 1024; x += 48) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke(); } for (let y = 0; y < 512; y += 48) { g.beginPath(); g.moveTo(0, y); g.lineTo(1024, y); g.stroke(); }
  g.strokeStyle = '#39b6ff'; g.lineWidth = 8; g.strokeRect(8, 8, 1008, 496);
  g.fillStyle = '#ffffff'; g.font = '900 78px system-ui, sans-serif'; g.textAlign = 'center'; g.fillText(lines[0] || '', 512, 130);
  g.fillStyle = '#9fe4ff'; g.font = '700 46px system-ui, sans-serif';
  lines.slice(1).forEach((l, i) => g.fillText(l, 512, 230 + i * 70));
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function pod(color, you) {
  const g = new THREE.Group();
  const shellMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 80, side: THREE.DoubleSide });
  // an egg-shaped shell, open toward the table (+z)
  const shell = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 20, Math.PI * 0.2, Math.PI * 1.6, 0.15, Math.PI * 0.72), shellMat);
  shell.scale.set(1, 1.25, 1); shell.rotation.y = Math.PI; shell.position.y = 1.6; g.add(shell);
  const seat = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.15, 0.45, 28), new THREE.MeshLambertMaterial({ color })); seat.position.y = 0.95; g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.3, 0.3), new THREE.MeshLambertMaterial({ color })); back.position.set(0, 1.75, -0.95); back.rotation.x = -0.15; g.add(back);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.07, 8, 40), new THREE.MeshBasicMaterial({ color: you ? 0xffcf3a : color })); rim.rotation.x = Math.PI / 2; rim.position.y = 0.7; g.add(rim);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(1.3, 32), new THREE.MeshBasicMaterial({ color: you ? 0xffcf3a : color, transparent: true, opacity: 0.25 }));
  glow.rotation.x = -Math.PI / 2; glow.position.y = 0.02; g.add(glow);   // light on the floor under the floating pod
  return g;
}

// opts: { name, screen: [lines], members: [{ id, name, sub, you }], onPick(id), url(path) }. Returns { dispose }.
export function mountTeamRoom(host, opts) {
  const w = host.clientWidth, h = host.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.setSize(w, h); renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0xeef4fa);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd2deea, 1.5));
  const dl = new THREE.DirectionalLight(0xffffff, 0.7); dl.position.set(4, 12, 6); scene.add(dl);
  // room: white wall with a light band, floor with rings, ceiling light ring
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 64, 1, true), new THREE.MeshLambertMaterial({ color: 0xf6f9fc, emissive: 0x7d8c9c, side: THREE.BackSide })); wall.position.y = H / 2; scene.add(wall);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.05, R - 0.05, 0.25, 64, 1, true), new THREE.MeshBasicMaterial({ color: 0x9fe4ff, side: THREE.BackSide })); band.position.y = 1.2; scene.add(band);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(R, 64), new THREE.MeshPhongMaterial({ color: 0xe9f0f7, emissive: 0x6a7888, shininess: 60 })); floor.rotation.x = -Math.PI / 2; scene.add(floor);
  for (const r of [4.2, 9.5]) { const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.12, 64), new THREE.MeshBasicMaterial({ color: 0xbcd7ec })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.01; scene.add(ring); }
  const ceil = new THREE.Mesh(new THREE.CircleGeometry(R, 64), new THREE.MeshLambertMaterial({ color: 0xf8fbfe })); ceil.rotation.x = Math.PI / 2; ceil.position.y = H; scene.add(ceil);
  const light = new THREE.Mesh(new THREE.RingGeometry(5, 5.6, 64), new THREE.MeshBasicMaterial({ color: 0xffffff })); light.rotation.x = Math.PI / 2; light.position.y = H - 0.02; scene.add(light);
  // the big wall screen (curved to the wall), facing the room
  const scr = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.2, R - 0.2, 4.6, 48, 1, true, -0.55, 1.1), new THREE.MeshBasicMaterial({ map: screenTexture(opts.screen || [opts.name]), side: THREE.BackSide }));
  scr.position.y = 6; scr.rotation.y = Math.PI; scene.add(scr);
  scr.material.map.wrapS = THREE.RepeatWrapping; scr.material.map.repeat.x = -1;   // read left to right from inside
  const frame = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.15, R - 0.15, 4.9, 48, 1, true, -0.57, 1.14), new THREE.MeshLambertMaterial({ color: 0xc7d4e2, side: THREE.BackSide }));
  frame.position.y = 6; frame.rotation.y = Math.PI; scene.add(frame);
  // central table with a glowing edge and a hologram column
  const table = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.2, 1.6, 32), new THREE.MeshLambertMaterial({ color: 0xdfe8f2 })); stem.position.y = 0.8; table.add(stem);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 0.3, 48), new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 90 })); top.position.y = 1.75; table.add(top);
  const edge = new THREE.Mesh(new THREE.TorusGeometry(3, 0.07, 8, 64), new THREE.MeshBasicMaterial({ color: 0x39b6ff })); edge.rotation.x = Math.PI / 2; edge.position.y = 1.9; table.add(edge);
  const holo = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 1.6, 2.6, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0x6fd6ff, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false }));
  holo.position.y = 3.2; table.add(holo);
  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), new THREE.MeshBasicMaterial({ color: 0x9fe4ff, wireframe: true })); orb.position.y = 3.6; table.add(orb);
  scene.add(table);
  // pods around the table, one per member, with HTML name tags
  const members = (opts.members || []).slice(0, 6), pods = [], tags = [];
  const n = Math.max(members.length, 3);
  members.forEach((m, i) => {
    const a = Math.PI + (i - (members.length - 1) / 2) * (Math.PI * 2 / Math.max(n, 7));   // around the table, the first ones on the far side
    const p = pod(POD_COLORS[i % POD_COLORS.length], m.you);
    p.position.set(Math.sin(a) * 5.8, 0, Math.cos(a) * 5.8); p.lookAt(0, 0, 0); p.userData = { id: m.id, base: 0.9, ph: i * 1.3 };
    p.traverse(o => { if (o.isMesh) o.userData.id = m.id; });
    scene.add(p); pods.push(p);
    const el = document.createElement('button'); el.className = 'pin' + (m.you ? ' hot' : '');
    el.innerHTML = `<span>${m.name}</span>${m.sub ? `<i>${m.sub}</i>` : ''}`;
    el.onclick = e => { e.stopPropagation(); opts.onPick && opts.onPick(m.id); };
    host.appendChild(el); tags.push({ el, pod: p });
  });
  // teammates: each one stands in their own pod, facing the table. The model is a child of the pod, so it floats with it.
  const loader = new GLTFLoader();
  members.forEach(async (m, i) => {
    const path = await modelFor(m.id);
    if (!path || !opts.url) return;   // no model for this brawler (or you): just the empty pod
    try {
      const g = (await loader.loadAsync(await opts.url(path))).scene;
      g.updateMatrixWorld(true); g.traverse(o => { if (o.isSkinnedMesh) o.skeleton.update(); });
      const box = new THREE.Box3().setFromObject(g, true), size = box.getSize(new THREE.Vector3());
      const k = 1.9 / size.y; g.scale.setScalar(k);
      g.position.set(0, 1.18 - box.min.y * k, 0.25);   // feet on the seat cushion, a step toward the open side
      g.traverse(o => { if (o.isMesh) o.userData.id = m.id; });   // tapping the person picks them, same as the pod
      pods[i].add(g);
    } catch (e) { console.warn('teammate', m.id, e); }
  });
  // camera: near the door, looking at the table; drag to turn around the room
  const camera = new THREE.PerspectiveCamera(64, w / h, 0.1, 100);
  let yaw = 0, drag = null, moved = 0;
  const place = () => { camera.position.set(Math.sin(yaw) * 13.2, 8.2, Math.cos(yaw) * 13.2); camera.lookAt(-Math.sin(yaw) * 2, 1.6, -Math.cos(yaw) * 2); };
  const el = renderer.domElement;
  el.addEventListener('pointerdown', e => { drag = e.clientX; moved = 0; el.setPointerCapture(e.pointerId); });
  el.addEventListener('pointermove', e => { if (drag === null) return; const dx = e.clientX - drag; drag = e.clientX; moved += Math.abs(dx); yaw = Math.max(-1.1, Math.min(1.1, yaw - dx * 0.006)); });
  el.addEventListener('pointerup', e => {
    const was = drag; drag = null; if (was === null || moved > 6) return;
    const r = el.getBoundingClientRect(), ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
    const hit = ray.intersectObjects(pods, true).find(x => x.object.userData.id);
    if (hit && opts.onPick) opts.onPick(hit.object.userData.id);
  });
  const v = new THREE.Vector3();
  renderer.setAnimationLoop(() => {
    if (host.hidden || !host.isConnected) return;
    const t = performance.now() / 1000;
    place();
    for (const p of pods) p.position.y = p.userData.base + Math.sin(t * 1.4 + p.userData.ph) * 0.15;   // floating
    orb.rotation.y = t * 0.8; orb.rotation.x = t * 0.3; holo.material.opacity = 0.14 + 0.06 * Math.sin(t * 2);
    for (const tg of tags) {
      v.set(tg.pod.position.x, tg.pod.position.y + 3.3, tg.pod.position.z).project(camera);
      tg.el.style.transform = `translate(${(v.x + 1) / 2 * host.clientWidth}px, ${(1 - v.y) / 2 * host.clientHeight}px) translate(-50%, -100%)`;
      tg.el.style.display = v.z < 1 ? '' : 'none';
    }
    renderer.render(scene, camera);
  });
  const onResize = () => { const W = host.clientWidth, Hh = host.clientHeight; if (!W || !Hh) return; renderer.setSize(W, Hh); camera.aspect = W / Hh; camera.updateProjectionMatrix(); };
  addEventListener('resize', onResize);
  return { dispose() { renderer.setAnimationLoop(null); renderer.dispose(); removeEventListener('resize', onResize); tags.forEach(t => t.el.remove()); el.remove(); } };
}
