// Battle screen: arena, toys, Gate cards, swipe-to-throw, and the battle count-up.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Pack } from './pack.js';
import * as R from './rules.js';

// ---------- real-world scale
// The Arena mat is 56 cm square = 285 model units, so 1 cm = 285/56 ≈ 5.09 units.
const CM = 285 / 56;
const MAT = 28 * CM - 2;               // half-size of the play surface (inside the rails)
const TOY_D = 3.2 * CM;                // a toy is 3.2 cm across
const TOY_SCALE = TOY_D / 11.2;        // DS ball model is 11.2 units across closed
const RADIUS = TOY_D / 2;
const GATE_W = 7 * CM, GATE_D = 9.4 * CM;   // Gate cards are 7 x 9.4 cm
const GATE_Z = GATE_D / 2;             // two cards, tips touching at the center
// Players throw from opposite corners (the openings in the Arena rails).
// DIR[p] points from the center toward player p's corner.
const DIR = [new THREE.Vector3(1, 0, 1).normalize(), new THREE.Vector3(-1, 0, -1).normalize()];
const START = (MAT - RADIUS - 2) * Math.SQRT2;   // distance from center to the throw spot in the corner
const SETTLE_SPEED = 70;                          // below this the ball eases onto its base
const FRICTION = 260;     // units/s^2
const MAX_SPEED = 460;
const FLICK = 115;        // world speed per (screen heights / second)
const ATTR_COLOR = { pyrus: '#e53935', aquos: '#1e88e5', subterra: '#b07a3c', haos: '#f2e7b8', darkus: '#7b3fa8', ventus: '#3fa34d', clear: '#cfd8dc' };
const CARD_COLOR = { gold: '#d4af37', silver: '#b8c0c8', copper: '#c46f3a' };

const $ = id => document.getElementById(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rand = n => Math.floor(Math.random() * n);
const pickN = (arr, n) => { const a = [...arr], out = []; while (out.length < n && a.length) out.push(a.splice(rand(a.length), 1)[0]); return out; };

// ---------- three.js setup
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
$('view').prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1014);
scene.add(new THREE.HemisphereLight(0xffffff, 0x50586a, 2.4));
const sun = new THREE.DirectionalLight(0xffffff, 1.2); sun.position.set(80, 300, 120); scene.add(sun);
const camera = new THREE.PerspectiveCamera(42, 1, 1, 6000);
function resize() {
  const w = $('view').clientWidth, h = $('view').clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe($('view')); resize();

let camTarget = new THREE.Vector3(), camGoal = new THREE.Vector3();
function cameraFor(p) {
  const portrait = camera.aspect < 1;
  // Behind and above the thrower's corner, looking at a point a little in front of the center,
  // so the thrower's corner (with the waiting toy) and both Gate cards are on screen.
  const back = portrait ? 360 : 330, up = portrait ? 380 : 300;
  camGoal.copy(DIR[p]).multiplyScalar(back).setY(up);
  camTarget.copy(DIR[p]).multiplyScalar(portrait ? 45 : 62);
}

// ---------- game state
let gateBack = null;   // card back image from the asset pack (face-down Gate cards)
let pack, state, toysMesh = [[], []], gateMesh = new Map(), busy = false, selected = null;
const loader = new GLTFLoader();
const mixers = new Set();

async function loadToy(spec) {
  const g = await loader.loadAsync(await pack.url(spec.model));
  const obj = g.scene; obj.scale.setScalar(TOY_SCALE);
  obj.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  if (spec.attrTexture) {
    const tex = await new THREE.TextureLoader().loadAsync(await pack.url(spec.attrTexture));
    tex.flipY = false; tex.colorSpace = THREE.SRGBColorSpace; tex.magFilter = THREE.NearestFilter;
    obj.traverse(o => { if (o.isMesh && o.material.map) { tex.wrapS = o.material.map.wrapS; tex.wrapT = o.material.map.wrapT; o.material.map = tex; o.material.needsUpdate = true; } });
  }
  const holder = new THREE.Group(); holder.add(obj); holder.visible = false; scene.add(holder);
  const t = { holder, obj, open: 0, anim: null };
  if (g.animations.length) {
    t.mixer = new THREE.AnimationMixer(obj); t.action = t.mixer.clipAction(g.animations[0]);
    t.action.play(); t.action.paused = true; t.dur = g.animations[0].duration;
  }
  setOpen(t, 0);
  return t;
}
function setOpen(t, v) {
  t.open = v;
  if (t.action) { t.action.time = v * t.dur * 0.999; t.mixer.update(0); }
}
function animateOpen(t, to, ms = 450) {
  return new Promise(res => { t.anim = { from: t.open, to, t0: performance.now(), ms, res }; });
}

// ---------- Gate card visuals (drawn on a canvas so the numbers are readable)
function cardTexture(card, faceUp) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 300;
  const x = c.getContext('2d'); const col = CARD_COLOR[card.color] || '#888';
  x.fillStyle = '#15191e'; x.fillRect(0, 0, 256, 300);
  x.fillStyle = col; x.fillRect(6, 6, 244, 288);
  x.fillStyle = '#15191e'; x.fillRect(14, 14, 228, 272);
  if (!faceUp) {
    x.fillStyle = col; x.font = 'bold 120px system-ui'; x.textAlign = 'center'; x.fillText('?', 128, 190);
    x.font = 'bold 26px system-ui'; x.fillText('GATE', 128, 255);
  } else {
    x.fillStyle = col; x.font = 'bold 24px system-ui'; x.textAlign = 'center';
    const name = card.name.length > 16 ? card.name.slice(0, 15) + '…' : card.name;
    x.fillText(name, 128, 46);
    R.ATTRS.forEach((a, i) => {
      const y = 78 + i * 34;
      x.fillStyle = ATTR_COLOR[a]; x.beginPath(); x.arc(46, y - 8, 11, 0, 7); x.fill();
      x.fillStyle = '#e8edf2'; x.font = '22px system-ui'; x.textAlign = 'left'; x.fillText(a[0].toUpperCase() + a.slice(1), 66, y);
      x.textAlign = 'right'; x.font = 'bold 24px system-ui'; x.fillText('+' + ((card.bonus || {})[a] || 0), 228, y);
    });
  }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return tex;
}
// Gate cards sit on the diagonal between the players, tips touching at the center.
// A player's card goes on the opponent's side.
function gateCenter(owner) { return DIR[1 - owner].clone().multiplyScalar(GATE_Z).setY(0.6); }
// Position relative to a card: along = toward the corners, across = sideways.
function cardLocal(owner, pos) {
  const c = gateCenter(owner), d = DIR[0], dx = pos.x - c.x, dz = pos.z - c.z;
  return { along: dx * d.x + dz * d.z, across: dx * -d.z + dz * d.x };
}
function addGateMesh(card, owner) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(GATE_W, GATE_D), new THREE.MeshBasicMaterial({ map: gateBack || cardTexture(card, false) }));
  m.rotation.order = 'YXZ'; m.rotation.x = -Math.PI / 2;
  m.rotation.y = Math.atan2(DIR[0].x, DIR[0].z) + (owner === 1 ? Math.PI : 0);   // card set by p reads right-way-up for p
  m.position.copy(gateCenter(owner)); scene.add(m); gateMesh.set(card, m);
}
function flipGate(card) { const m = gateMesh.get(card); if (m) { m.material.map = cardTexture(card, true); m.material.needsUpdate = true; } }
function removeGate(card) { const m = gateMesh.get(card); if (m) { scene.remove(m); gateMesh.delete(card); } }
function fieldIndexAt(pos) {
  for (let i = 0; i < state.field.length; i++) {
    const l = cardLocal(state.field[i].owner, pos);
    if (Math.abs(l.across) <= GATE_W / 2 + RADIUS * 0.3 && Math.abs(l.along) <= GATE_D / 2 + RADIUS * 0.3) return i;
  }
  return null;
}
function standSpot(owner, k) {                  // only used when the rules move a toy to the other card
  const c = gateCenter(owner), d = DIR[0], side = new THREE.Vector3(-d.z, 0, d.x);
  return c.clone().addScaledVector(side, (k === 0 ? -1 : 1) * (GATE_W / 2 - RADIUS * 0.9)).setY(RADIUS);
}

// ---------- HUD
function hud() {
  state.players.forEach((pl, p) => {
    $('p' + p + 'name').textContent = pl.name;
    $('p' + p + 'gates').innerHTML = [0, 1, 2].map(i => `<span class="dot ${i < pl.captured.length ? 'on' : ''}"></span>`).join('');
    $('p' + p).classList.toggle('active', state.turn === p && state.winner === null);
  });
}
function say(msg) { $('msg').textContent = msg; }
function showPicker() {
  const p = state.turn, pl = state.players[p];
  $('picker').innerHTML = pl.unused.map(t => {
    const toy = pl.toys[t];
    return `<button class="chip" data-t="${t}" style="--c:${ATTR_COLOR[toy.attr]}"><b>${toy.name}</b><span>${toy.g}G · ${toy.attr}</span></button>`;
  }).join('');
  $('picker').querySelectorAll('button').forEach(b => b.onclick = () => select(+b.dataset.t));
  if (pl.unused.length === 1) select(pl.unused[0]);
}
function select(t) {
  if (busy) return;
  const p = state.turn;
  if (selected !== null) { const prev = toysMesh[p][selected]; if (!isStanding(p, selected)) prev.holder.visible = false; }
  selected = t;
  $('picker').querySelectorAll('button').forEach(b => b.classList.toggle('sel', +b.dataset.t === t));
  const tm = toysMesh[p][t]; setOpen(tm, 0);
  tm.holder.position.copy(DIR[p]).multiplyScalar(START).setY(RADIUS);
  tm.holder.rotation.set(0, Math.atan2(-DIR[p].x, -DIR[p].z), 0);    // facing the center
  tm.obj.quaternion.identity();
  tm.holder.visible = true;
  say(`${state.players[p].name}: swipe up to throw ${state.players[p].toys[t].name}`);
}
const isStanding = (p, t) => state.field.some(f => f.toys.some(x => x.p === p && x.t === t));

// ---------- turn flow
async function nextTurn() {
  const ev = R.startTurn(state, (p, hand) => rand(hand.length));
  for (const e of ev) {
    if (e.type === 'gateSet') addGateMesh(e.card, e.p);
    if (e.type === 'recycle') say(`${state.players[e.p].name}'s toys come back from the used pile`);
  }
  if (ev.some(e => e.type === 'gateSet')) { say('Gate cards — set!'); await sleep(900); }
  cameraFor(state.turn); hud(); selected = null; showPicker();
}

// ---------- throwing
let roll = null;   // { tm, pos, vel }
let pointer = null;
renderer.domElement.addEventListener('pointerdown', e => {
  if (busy || selected === null || state.winner !== null) return;
  pointer = { pts: [{ x: e.clientX, y: e.clientY, t: performance.now() }] };
  renderer.domElement.setPointerCapture(e.pointerId);
});
renderer.domElement.addEventListener('pointermove', e => {
  if (!pointer) return;
  pointer.pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
  if (pointer.pts.length > 30) pointer.pts.shift();
});
renderer.domElement.addEventListener('pointerup', e => {
  if (!pointer) return;
  const now = performance.now(); pointer.pts.push({ x: e.clientX, y: e.clientY, t: now });
  const recent = pointer.pts.filter(q => now - q.t < 110); pointer = null;
  if (recent.length < 2) return;
  const a = recent[0], b = recent.at(-1), dt = Math.max(16, b.t - a.t) / 1000;
  const h = $('view').clientHeight;
  const sx = (b.x - a.x) / h / dt, sy = (b.y - a.y) / h / dt;
  if (sy > -0.4) return;                         // must be an upward flick
  const fwd = DIR[state.turn].clone().negate(), right = new THREE.Vector3(-fwd.z, 0, fwd.x);
  throwToy(right.multiplyScalar(sx * FLICK).addScaledVector(fwd, -sy * FLICK));
});

function throwToy(vel) {
  if (busy || selected === null) return;
  if (vel.length() > MAX_SPEED) vel.setLength(MAX_SPEED);
  busy = true; $('picker').classList.add('off');
  const tm = toysMesh[state.turn][selected];
  roll = { tm, pos: tm.holder.position.clone(), vel, t: selected };
  say('');
}
async function rollStopped() {
  const { tm, pos, t } = roll; roll = null;
  const fieldIdx = fieldIndexAt(pos);
  const p = state.turn;
  const res = R.land(state, t, fieldIdx);
  for (const e of res.events) {
    if (e.type === 'miss') { say('Missed the Gate cards — back to your hand.'); await sleep(900); tm.holder.visible = false; }
    if (e.type === 'stand') { await animateOpen(tm, 1); say(`${state.players[p].toys[t].name} opens on the Gate card!`); await sleep(600); }
    if (e.type === 'moved') { say('Already have a toy there — moves to the other Gate card.'); await sleep(500); await glide(tm, standSpot(e.owner, e.slot)); await animateOpen(tm, 1); await sleep(400); }
    if (e.type === 'capture') await captured(e);
  }
  if (res.battle) {
    const b = R.computeBattle(state, res.battle.fieldIdx);
    flipGate(b.card); await sleep(700);
    await showBattle(b);
    const ev = R.resolveBattle(state, b);
    for (const e of ev) {
      if (e.type === 'capture') await captured(e, b);
      if (e.type === 'tie') { clearGate(b.card, b.sides); say(`Tie — nobody wins. ${b.card.name} goes back to ${state.players[e.returnedTo].name}.`); await sleep(1300); }
    }
  }
  afterTurn();
}
async function captured(e, b) {
  const card = e.card;
  say(`${state.players[e.p].name} wins ${card.name}${e.how === 'uncontested' ? ' (uncontested)' : ''}!`);
  clearGate(card, b && b.sides);
  hud(); await sleep(1300);
}
function clearGate(card) {
  removeGate(card);
  // toys that were on that card leave the field
  for (const p of [0, 1]) toysMesh[p].forEach((tm, t) => { if (tm.holder.visible && !isStanding(p, t)) { tm.holder.visible = false; setOpen(tm, 0); } });
}
function afterTurn() {
  hud();
  if (state.winner !== null) return gameOver();
  busy = false; $('picker').classList.remove('off');
  nextTurn();
}
function glide(tm, to, ms = 350) {
  return new Promise(res => { tm.glide = { from: tm.holder.position.clone(), to, t0: performance.now(), ms, res }; });
}

// ---------- battle overlay with the count-up
async function showBattle(b) {
  const o = $('battle'); o.hidden = false;
  const col = (sd, i) => `<div class="side" id="side${i}">
      <div class="who">${state.players[sd.p].name}</div>
      <div class="toy"><span class="attr" style="background:${ATTR_COLOR[sd.attr]}"></span>${sd.name}</div>
      <div class="g" id="g${i}">${sd.start}G</div>
      <div class="steps" id="steps${i}"></div>
      <div class="winner" id="win${i}"></div></div>`;
  $('bbody').innerHTML = col(b.sides[0], 0) + `<div class="vs" id="vs">vs</div>` + col(b.sides[1], 1);
  $('bcard').textContent = `Gate card: ${b.card.name}`;
  $('bnext').hidden = true;
  await sleep(500);
  for (let i = 0; i < 2; i++) {
    for (const st of b.sides[i].steps) {
      const line = document.createElement('div'); line.className = 'step';
      line.textContent = `${st.label}  +${st.amount}`; $('steps' + i).append(line);
      await countUp($('g' + i), st.from, st.to);
      await sleep(250);
    }
  }
  const [x, y] = b.sides.map(s => s.total);
  $('vs').textContent = x > y ? '>' : x < y ? '<' : '=';
  $('vs').classList.add('big');
  if (b.result === 'tie') { $('win0').textContent = 'TIE'; $('win1').textContent = 'TIE'; }
  else $('win' + (b.sides[0].p === b.result ? 0 : 1)).textContent = 'WINNER';
  $('bnext').hidden = false;
  await new Promise(res => $('bnext').onclick = res);
  o.hidden = true;
}
async function countUp(el, from, to) {
  for (let v = from; v <= to; v += 10) { el.textContent = v + 'G'; await sleep(35); }
  el.textContent = to + 'G';
}

function gameOver() {
  const w = state.winner;
  $('over').hidden = false;
  $('overText').textContent = w === 'draw' ? 'Draw!' : `${state.players[w].name} wins!`;
  say('');
}

// ---------- render loop
const clock = new THREE.Clock();
const UPRIGHT = new THREE.Quaternion();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  camera.position.lerp(camGoal, 0.08);
  camera.lookAt(camTarget);
  if (roll) {
    const { tm, pos, vel } = roll;
    const sp = vel.length();
    const ns = Math.max(0, sp - (sp < SETTLE_SPEED ? FRICTION * 0.8 + sp * 1.2 : FRICTION) * dt);
    if (sp > 0) vel.multiplyScalar(ns / sp);
    pos.addScaledVector(vel, dt);
    const lim = MAT - RADIUS;
    if (Math.abs(pos.x) > lim) { pos.x = Math.sign(pos.x) * lim; vel.x *= -0.6; }
    if (Math.abs(pos.z) > lim) { pos.z = Math.sign(pos.z) * lim; vel.z *= -0.6; }
    tm.holder.position.copy(pos);
    if (ns > 0) {
      const axis = new THREE.Vector3(vel.z, 0, -vel.x).normalize();
      tm.obj.rotateOnWorldAxis(axis, (ns * dt) / RADIUS);
    }
    // Easing onto its base: as it slows, blend the roll back to upright so it stops standing.
    if (ns < SETTLE_SPEED) {
      const k = 1 - ns / SETTLE_SPEED;                    // 0 -> 1 as it comes to rest
      tm.obj.quaternion.slerp(UPRIGHT, Math.min(1, 0.05 + k * k * 0.35));
    }
    if (ns < 3) { tm.obj.quaternion.copy(UPRIGHT); rollStopped(); }
  }
  for (const side of toysMesh) for (const tm of side) {
    if (tm.anim) {
      const k = Math.min(1, (performance.now() - tm.anim.t0) / tm.anim.ms);
      setOpen(tm, tm.anim.from + (tm.anim.to - tm.anim.from) * k);
      if (k >= 1) { const r = tm.anim.res; tm.anim = null; r(); }
    }
    if (tm.glide) {
      const k = Math.min(1, (performance.now() - tm.glide.t0) / tm.glide.ms);
      tm.holder.position.lerpVectors(tm.glide.from, tm.glide.to, k);
      if (k >= 1) { const r = tm.glide.res; tm.glide = null; r(); }
    }
  }
  renderer.render(scene, camera);
});

// ---------- setup: quick match, two players on one device
function randomTeam(cat) {
  const pool = cat.toys.filter(t => t.game === 'bb' && Object.keys(t.attributes || {}).length);
  return pickN(pool, 3).map(t => {
    const attr = pickN(Object.keys(t.attributes), 1)[0];
    return { id: t.id, name: t.name, attr, g: 250, model: t.model, attrTexture: t.attributes[attr] };
  });
}
function randomGates(cat) {
  const gates = cat.cards.filter(c => c.type === 'gate' && c.bonus);
  return ['gold', 'silver', 'copper'].map(col => pickN(gates.filter(c => c.color === col), 1)[0]);
}

async function start() {
  try { pack = await Pack.fromDevice(); } catch (e) { pack = null; }
  if (!pack) { $('loading').textContent = 'No asset pack on this device yet. Go back and load it first.'; return; }
  $('loading').textContent = 'Loading arena…';
  const arena = await loader.loadAsync(await pack.url(pack.catalog.arenas[0].model));
  arena.scene.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  scene.add(arena.scene);
  const backPath = (pack.catalog.cardBacks || {}).gate;
  if (backPath) {
    gateBack = await new THREE.TextureLoader().loadAsync(await pack.url(backPath));
    gateBack.colorSpace = THREE.SRGBColorSpace; gateBack.anisotropy = 4;
  }
  const cat = pack.catalog;
  const players = [0, 1].map(i => ({ name: `Player ${i + 1}`, toys: randomTeam(cat), gates: randomGates(cat) }));
  state = R.newMatch(players);
  $('loading').textContent = 'Loading toys…';
  for (let p = 0; p < 2; p++) for (const t of state.players[p].toys) toysMesh[p].push(await loadToy(t));
  cameraFor(0); camera.position.copy(camGoal);
  $('loading').hidden = true;
  hud(); nextTurn();
}
$('again').onclick = () => location.reload();

// test hook (used by automated checks)
window.MARBLES = {
  get state() { return state; },
  throwWith: (vx, vz) => throwToy(new THREE.Vector3(vx, 0, vz)),
  // aim at a Gate card (or overshoot it) with just enough speed to stop there
  throwAt: (fieldIdx, overshoot = 0) => {
    const tm = toysMesh[state.turn][selected]; const from = tm.holder.position;
    const to = gateCenter(state.field[fieldIdx].owner); const d = new THREE.Vector3(to.x - from.x, 0, to.z - from.z);
    const dist = d.length() + overshoot; throwToy(d.setLength(Math.sqrt(2 * FRICTION * dist) * 0.97));
  },
  select, get busy() { return busy; },
};
start();
