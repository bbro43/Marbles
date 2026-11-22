// Bakugan index: scroll the list, spin the model, open/close it, see stats and switch attribute colors.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Pack } from './pack.js';
import { controlOf } from './control.js';
import { fitToy } from './toyfit.js';

const $ = id => document.getElementById(id);
const ATTR_COLOR = { pyrus: '#e53935', aquos: '#1e88e5', subterra: '#b07a3c', haos: '#f2e7b8', darkus: '#7b3fa8', ventus: '#3fa34d' };
const ALL = Object.keys(ATTR_COLOR);
const cap = s => s[0].toUpperCase() + s.slice(1);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MAXUS_G = {};

// ---- 3D stage ----
const stage = $('stage');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
stage.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xffffff, 1.6));
const sun = new THREE.DirectionalLight(0xffffff, 1.2); sun.position.set(2, 4, 3); scene.add(sun);
const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
camera.position.set(0, 0.35, 3); camera.lookAt(0, 0, 0);
const pivot = new THREE.Group(); scene.add(pivot);
const loader = new GLTFLoader();

// one camera for every toy (the closed ball is 1 unit across): it fits anything that spins within FIT_R of the middle;
// only a toy wider than that open (a long tail) moves the camera back
const FIT_R = 1.5;
let fitR = FIT_R;
function frame() {
  const halfW = Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
  const halfH = THREE.MathUtils.degToRad(camera.fov / 2);
  // wide enough for the spin, tall enough for the ground (-0.5) up to about 1.4
  const dist = Math.max(fitR / Math.tan(halfW), 1.05 / Math.tan(halfH)) * 1.08;
  camera.position.set(0, 0.45 + dist * 0.08, dist); camera.lookAt(0, 0.4, 0);
}
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); frame();
}
addEventListener('resize', resize);

// free rotate: drag spins around the screen's up and side axes
let drag = null, idle = true, lastTouch = 0;
renderer.domElement.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; idle = false; renderer.domElement.setPointerCapture(e.pointerId); });
renderer.domElement.addEventListener('pointermove', e => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag = { x: e.clientX, y: e.clientY };
  const q = new THREE.Quaternion();
  q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * 0.012); pivot.quaternion.premultiply(q);
  q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * 0.012); pivot.quaternion.premultiply(q);
});
const endDrag = () => { drag = null; lastTouch = performance.now(); };
renderer.domElement.addEventListener('pointerup', endDrag);
renderer.domElement.addEventListener('pointercancel', endDrag);
renderer.domElement.addEventListener('dblclick', () => { pivot.quaternion.identity(); idle = true; });

let cur = null;      // { obj, mixer, action, dur, from, to, open, target }
let loadSeq = 0;
function setOpen(t, v) { t.open = v; if (t.action) { t.action.time = (t.from + v * (t.to - t.from)) * t.dur; t.mixer.update(0); } if (t.fit) t.obj.position.y = t.fit.y0 + t.fit.lift * v; }
function bounds(obj) {
  obj.updateMatrixWorld(true); obj.traverse(o => { if (o.isSkinnedMesh) o.skeleton.update(); });
  return new THREE.Box3().setFromObject(obj, true);
}

async function show(d, attr) {
  const seq = ++loadSeq; $('msg').textContent = 'Loading…'; $('msg').hidden = false;
  const g = await loader.loadAsync(await pack.url(d.model));
  if (seq !== loadSeq) return;
  const obj = g.scene;
  obj.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  if (attr && d.attributes?.[attr] && !isOriginal(d, attr)) {
    const tex = await new THREE.TextureLoader().loadAsync(await pack.url(d.attributes[attr]));
    if (seq !== loadSeq) return;
    tex.flipY = false; tex.colorSpace = THREE.SRGBColorSpace; tex.magFilter = THREE.NearestFilter;
    obj.traverse(o => { if (o.isMesh && o.material.map) { tex.wrapS = o.material.map.wrapS; tex.wrapT = o.material.map.wrapT; o.material.map = tex; o.material.needsUpdate = true; } });
  }
  const t = { obj, open: 0, target: cur?.target ?? 0, from: 0, to: 0.999 };
  if (g.animations.length) {
    t.mixer = new THREE.AnimationMixer(obj); t.action = t.mixer.clipAction(g.animations[0]);
    t.action.play(); t.action.paused = true; t.dur = g.animations[0].duration;
    if (/^dc_sp(06_2\d|13)$/.test(d.id)) { t.from = 0; t.to = 0.34; }   // Maxus Helios pieces and Wired: built like Traps, closed at the start
    else if (/^dc_sp\d+(_\d+)?$/.test(d.id) && !MAXUS_G[d.name]) { t.from = 0.22; t.to = 0.46; }   // New Vestroia Bakugan clips roll the ball in first
  }
  // the same size and place as in battles (js/toyfit.js): closed ball 1 unit across, open toys standing on the same ground
  t.fit = fitToy(obj, v => { if (t.action) { t.action.time = (t.from + v * (t.to - t.from)) * t.dur; t.mixer.update(0); } }, 1);
  setOpen(t, 1);
  const ob = bounds(obj), xs = Math.max(Math.abs(ob.min.x), Math.abs(ob.max.x)), zs = Math.max(Math.abs(ob.min.z), Math.abs(ob.max.z));
  fitR = Math.max(FIT_R, 1.1 * Math.max(xs, zs));
  setOpen(t, t.target); frame();
  if (cur) pivot.remove(cur.obj);
  pivot.add(obj); cur = t;
  $('openBtn').disabled = !t.action; $('openBtn').textContent = t.target ? 'Close' : 'Open';
  $('msg').hidden = true;
}

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  if (cur?.action && cur.open !== cur.target) {
    const step = dt / 0.5, v = cur.target > cur.open ? Math.min(cur.target, cur.open + step) : Math.max(cur.target, cur.open - step);
    setOpen(cur, v);
  }
  if (!drag && (idle || performance.now() - lastTouch > 4000)) pivot.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), dt * 0.5);
  renderer.render(scene, camera);
});
$('openBtn').addEventListener('click', () => {
  if (!cur?.action) return;
  cur.target = cur.target ? 0 : 1; $('openBtn').textContent = cur.target ? 'Close' : 'Open';
});

// ---- data ----
let pack, items = [], sel = null, selAttr = null, tab = 'all';
const isOriginal = (d, a) => !(d.attributesMade || []).includes(a);
const origAttr = d => Object.keys(d.attributes || {}).find(a => isOriginal(d, a)) || Object.keys(d.attributes || {})[0] || null;

function setStats(d, attr) {
  const st = d.stats || {};
  for (const [k, id] of [['speed', 'Spd'], ['defense', 'Def'], ['magnet', 'Mag'], ['control', 'Ctl']]) {
    const v = k === 'control' && d.stats ? controlOf(d) : st[k];
    $('s' + id).textContent = v ?? '–';
    $('m' + id).style.width = v ? (v / 5 * 100) + '%' : '0';
  }
  $('name').textContent = d.name;
  $('gVal').textContent = d.trap ? '0G' : (d.baseG ?? MAXUS_G[d.name] ?? '–') + (d.baseG || MAXUS_G[d.name] ? 'G' : '');
  document.documentElement.style.setProperty('--c', ATTR_COLOR[attr] || '#888');
  $('attrs').innerHTML = Object.keys(d.attributes || {}).map(a =>
    `<button class="ad ${a === attr ? 'on' : ''}" data-a="${a}" title="${cap(a)}" style="background:${ATTR_COLOR[a]}"></button>`).join('');
}
$('attrs').addEventListener('click', e => {
  const a = e.target.dataset.a; if (!a || !sel) return;
  selAttr = a; setStats(sel, a); show(sel, a); renderList();
});

function pick(d) {
  sel = d; selAttr = tab !== 'all' && tab !== 'traps' && d.attributes?.[tab] ? tab : origAttr(d);
  setStats(d, selAttr); show(d, selAttr); renderList();
}

function renderTabs() {
  const tabs = [['all', 'All', '#93a2b2'], ...ALL.map(a => [a, cap(a), ATTR_COLOR[a]]), ['traps', 'Traps', '#cfd8dc']];
  $('tabs').innerHTML = tabs.map(([k, n, c]) => `<button class="tab ${k === tab ? 'on' : ''}" data-t="${k}" style="--c:${c}">${n}</button>`).join('');
}
$('tabs').addEventListener('click', e => {
  const t = e.target.dataset.t; if (!t) return; tab = t; renderTabs();
  if (sel && sel.attributes?.[t] && t !== selAttr) { selAttr = t; setStats(sel, t); show(sel, t); }   // the shown Bakugan follows the color tab
  renderList();
});
$('search').addEventListener('input', renderList);

function renderList() {
  const q = $('search').value.trim().toLowerCase();
  const shown = items.filter(d => (tab === 'all' ? !d.trap : tab === 'traps' ? d.trap : !d.trap && d.attributes?.[tab]) && (!q || d.name.toLowerCase().includes(q)));
  $('list').innerHTML = shown.map(d => {
    const a = d === sel ? selAttr : (tab !== 'all' && d.attributes?.[tab] ? tab : origAttr(d));
    const th = d.thumbs?.[a];
    const st = d.stats ? `Spd ${d.stats.speed} · Def ${d.stats.defense} · Mag ${d.stats.magnet} · Ctl ${controlOf(d)}` : d.trap ? 'Trap' : '';
    const g = d.trap ? '0G' : d.baseG ? d.baseG + 'G' : MAXUS_G[d.name] ? MAXUS_G[d.name] + 'G' : '';
    return `<button class="it ${d === sel ? 'on' : ''}" data-id="${d.id}" style="--c:${ATTR_COLOR[a] || '#888'}">
      ${th ? `<img data-src="${th}" alt="">` : '<span class="ph"></span>'}<div><b>${esc(d.name)}</b><span>${st}</span></div><span class="g">${g}</span></button>`;
  }).join('') || '<div style="color:var(--dim);padding:12px">No Bakugan match.</div>';
  $('list').querySelectorAll('img[data-src]').forEach(async im => { im.src = await pack.url(im.dataset.src); });
}
$('list').addEventListener('click', e => { const b = e.target.closest('.it'); if (b) pick(items.find(d => d.id === b.dataset.id)); });

(async () => {
  resize();
  pack = await Pack.fromDevice();
  if (!pack) { $('msg').textContent = 'No asset pack yet — load it from Home.'; return; }
  const cat = pack.catalog;
  const toys = cat.toys.filter(t => t.model && (t.baseG || MAXUS_G[t.name]));
  const traps = (cat.traps || []).filter(t => t.model).map(t => ({ ...t, trap: true }));
  items = [...toys, ...traps];
  renderTabs(); pick(items[0]);
  window.VIEWER = { items, pick: i => pick(items[i]), open: () => $('openBtn').click(), get cur() { return cur; } };
})();
