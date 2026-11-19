// Battle screen: arena, toys, Gate cards, swipe-to-throw, and the battle count-up.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Pack } from './pack.js';
import * as R from './rules.js';
import { setupTeams, GATE_COLORS, AB_COLORS } from './setup.js';
import * as Profiles from './profiles.js';
import { AI_TEAMS, UPGRADE_G } from './aiteams.js';

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
const DIR = [new THREE.Vector3(1, 0, 1).normalize(), new THREE.Vector3(-1, 0, -1).normalize(), new THREE.Vector3(1, 0, -1).normalize(), new THREE.Vector3(-1, 0, 1).normalize()];
const START = (MAT - RADIUS - 2) * Math.SQRT2;   // distance from center to the throw spot in the corner
const SETTLE_SPEED = 70;                          // below this the ball eases onto its base
const FRICTION = 260;     // units/s^2
// Toy stats, 1-5 like the original DS game: 1 = terrible, 3 = average, 5 = maxed.
//   speed   -> the hardest it can be thrown
//   defense -> how well it holds its ground when crashed into (knockouts)
//   magnet  -> how well it grabs a Gate card it's rolling over
// Every toy is 3/3/3 until per-Bakugan base stats are added.
const STAT_MIN = 1, STAT_MAX = 5, STAT_AVG = 3;
const lv = (st, k) => Math.min(STAT_MAX, Math.max(STAT_MIN, st[k] ?? STAT_AVG));
const maxSpeed = st => 340 + 30 * (lv(st, 'speed') - 1);              // 340 / 370 / 400 / 430 / 460
// Hits on a standing Bakugan (Billy's rule):
//   Speed (of whoever hits) < Defense (of the one hit)  -> it doesn't move; the hitter bounces off at half speed.
//   Speed >= Defense -> it's pushed: push = hit speed x 0.4 x (half / three quarters / full for a gap of 0 / 1 / 2+).
//   Magnet = its grip on the card: how fast the slide stops. Slide distance = push^2 / (2 x grip).
const PUSH_SHARE = 0.4, GAP_PUSH = [0.5, 0.75, 1], WALL_BOUNCE = 0.5;
const standGrip = st => 600 + 300 * (lv(st, 'magnet') - 1);            // 600 / 900 / 1200 / 1500 / 1800
const MAGNET_SPEED = 160;                                              // magnet works below this speed, over a card
const magnetBrake = st => 110 * (lv(st, 'magnet') - 1);                // 0 .. 440 extra slowdown
const magnetPull = st => 15 * (lv(st, 'magnet') - 1);                  // 0 .. 60 pull toward card center
const statsOf = (p, t) => state.players[p].toys[t].stats || {};
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
let pack, state, toysMesh = [[], [], [], []], gateMesh = new Map(), busy = false, selected = null;
const loader = new GLTFLoader();

// ---------- computer opponent
// aiLevel[p] = 'easy' | 'normal' | 'hard' for a computer player, null for a person on this device.
let aiLevel = [null, null, null, null];
const isAI = p => !!aiLevel[p];
// the camera stays behind the one person on this device (if there is exactly one); otherwise it follows the turn
const viewOf = p => { if (!isAI(p) || !state) return p; const people = state.players.map((_, q) => q).filter(q => !isAI(q)); return people.length === 1 ? people[0] : p; };
const sameTeam = (a, b) => R.sameTeam(state, a, b);
const foesOf = p => R.opponents(state, p);
// how far off a throw can be: angle (radians) and distance (fraction), as a spread
const AI_AIM = { easy: { ang: 0.17, dist: 0.28 }, normal: { ang: 0.08, dist: 0.13 }, hard: { ang: 0.035, dist: 0.06 } };
const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const bonusFor = (card, attr) => ((card && card.bonus) || {})[attr] || 0;
// which Gate card to set: Easy any, otherwise the one that helps its Bakugan the most
function aiGateIndex(p) {
  const pl = state.players[p], hand = pl.gateHand;
  if (!hand.length) return null;
  if (aiLevel[p] === 'easy') return Math.floor(Math.random() * hand.length);
  const attrs = pl.unused.map(t => pl.toys[t].attr);
  let best = 0, bv = -1;
  hand.forEach((c, i) => { const v = attrs.reduce((n, a) => n + bonusFor(c, a), 0) + Math.random(); if (v > bv) { bv = v; best = i; } });
  return best;
}
// where to set it: Easy anywhere, otherwise the spot closest to its own throwing corner
function aiPlaceCell(p, cells) {
  if (aiLevel[p] === 'easy') return cells[Math.floor(Math.random() * cells.length)];
  const home = DIR[p].clone().multiplyScalar(START);
  return [...cells].sort((a, b) => cellCenter(a).distanceTo(home) - cellCenter(b).distanceTo(home))[0];
}
// pick a Bakugan and a Gate card to throw at
function aiPlan(p) {
  const lvl = aiLevel[p], pl = state.players[p], home = DIR[p].clone().multiplyScalar(START);
  const options = [];
  for (const t of pl.unused) for (let k = 0; k < state.field.length; k++) {
    const f = state.field[k], toy = pl.toys[t];
    const theirs = f.toys.filter(x => !sameTeam(x.p, p)), mine = f.toys.filter(x => sameTeam(x.p, p));
    const gOf = x => { const o = state.players[x.p].toys[x.t]; return o.g + (lvl === 'hard' ? bonusFor(f.card, o.attr) : 0); };
    const myG = toy.g + (lvl === 'hard' ? bonusFor(f.card, toy.attr) : 0) + mine.reduce((n, x) => n + gOf(x), 0);
    let v;
    if (theirs.length) {
      const oG = Math.max(...[...new Set(theirs.map(x => R.teamOf(state, x.p)))].map(tm => theirs.filter(x => R.teamOf(state, x.p) === tm).reduce((n, x) => n + gOf(x), 0)));
      v = myG > oG ? 100 + (myG - oG) / 5 : myG === oG ? 10 : -60 + (myG - oG) / 5;
    } else if (mine.length) v = lvl === 'hard' ? 120 : 70;          // two of mine there: take the card
    else v = 30 + bonusFor(f.card, toy.attr) / 10 + (state.earlyVictory === p ? 120 : 0);   // Early Victory: an empty card wins it
    v -= cellCenter(f.cell).distanceTo(home) / (lvl === 'hard' ? 60 : 30);   // far cards are harder to hit
    v += Math.random() * (lvl === 'normal' ? 40 : 10);
    options.push({ t, k, v });
  }
  if (!options.length) return null;
  if (lvl === 'easy') return options[Math.floor(Math.random() * options.length)];
  return options.sort((a, b) => b.v - a.v)[0];
}
async function aiThrow(p) {
  await sleep(600);
  const plan = aiPlan(p);
  if (!plan || state.turn !== p) return;
  select(plan.t);
  say(`${state.players[p].name} aims ${state.players[p].toys[plan.t].name} at ${state.field[plan.k].card.name}…`);
  await sleep(900);
  const aim = AI_AIM[aiLevel[p]], tm = toysMesh[p][selected], from = tm.holder.position, to = cellCenter(state.field[plan.k].cell);
  const d = new THREE.Vector3(to.x - from.x, 0, to.z - from.z);
  const dist = Math.max(10, d.length() * (1 + gauss() * aim.dist));
  d.applyAxisAngle(new THREE.Vector3(0, 1, 0), gauss() * aim.ang);
  throwToy(d.setLength(Math.sqrt(2 * FRICTION * dist) * 0.97));
}
// during a battle: play the card that turns it around (Easy rarely, Hard whenever it helps)
function aiAbility(p, bt, opts) {
  const lvl = aiLevel[p], hand = state.players[p].abilityHand;
  const gap = c => { const me = c.sides.find(x => x.p === p), op = c.sides.find(x => x.p !== p); return me.total - op.total; };
  const now = gap(R.computeBattle(state, bt));
  if (now > 0 && lvl !== 'hard') return -1;
  const scored = opts.map(i => ({ i, g: gap(R.computeBattle(state, { ...bt, plays: [...bt.plays, { p, card: hand[i] }] })) })).sort((a, b) => b.g - a.g);
  if (lvl === 'easy') return now <= 0 && Math.random() < 0.35 ? opts[Math.floor(Math.random() * opts.length)] : -1;
  const best = scored[0];
  if (!best || best.g <= now) return -1;
  if (lvl === 'normal') return Math.random() < 0.75 ? best.i : -1;
  return now > 0 && now > 120 ? -1 : best.i;      // hard: saves cards when already well ahead
}
// ---------- the computer's before-throw and after-throw Ability cards
// how likely each level is to look for one: Easy sometimes, Normal often, Hard always
const AI_FIELD_CHANCE = { easy: 0.3, normal: 0.7, hard: 1 };
function aiFieldCard(p, phase, landing) {
  const lvl = aiLevel[p] || 'normal';
  if (Math.random() > AI_FIELD_CHANCE[lvl]) return null;
  const pl = state.players[p], hand = pl.abilityHand, opts = R.fieldCardOptions(state, phase, landing, p);
  const has = n => opts.find(i => hand[i].name === n);
  const power = (q, t, card) => state.players[q].toys[t].g + bonusFor(card, state.players[q].toys[t].attr);
  const stand = q => state.field.map((f, k) => ({ f, k, x: f.toys.find(y => y.p === q) })).filter(o => o.x && !o.f.toys.some(y => !sameTeam(y.p, q)));
  if (phase === 'pre') {
    // pull a weaker opponent Bakugan onto one of my cards
    if (has('Surprise Attack') !== undefined) {
      let best = null;
      for (const m of stand(p)) for (const o of foesOf(p).flatMap(stand)) {
        if (m.k === o.k) continue;
        const gap = power(p, m.x.t, m.f.card) - power(o.x.p, o.x.t, m.f.card);
        if (gap > 0 && (!best || gap > best.gap)) best = { gap, m, o };
      }
      if (best) return { i: has('Surprise Attack'), ai: { mine: best.m.f.cell, theirs: best.o.f.cell } };
    }
    if (has('Another Throw') !== undefined && pl.unused.length >= 2 && (lvl === 'hard' || Math.random() < 0.5)) return { i: has('Another Throw') };
    if (has('Early Victory') !== undefined && state.field.some(f => !f.toys.length) && lvl !== 'easy') return { i: has('Early Victory') };
    if (has('Invulnerable') !== undefined && foesOf(p).some(q => state.players[q].unused.length)) {
      const mine = stand(p).sort((a, b) => power(p, b.x.t, b.f.card) - power(p, a.x.t, a.f.card))[0];
      if (mine) return { i: has('Invulnerable'), ai: { cell: mine.f.cell } };
    }
    return null;
  }
  // after the throw: missed, or about to lose the battle where it stopped
  const missed = landing.fieldIdx === null || !postCtx.stands;
  if (missed) return has('Second Chance') !== undefined ? { i: has('Second Chance') } : null;
  const f = state.field[landing.fieldIdx], foe = f.toys.find(y => !sameTeam(y.p, p));
  if (!foe) return null;
  const gap = power(p, landing.t, f.card) - power(foe.p, foe.t, f.card);
  if (gap > 0) return null;
  if (has('Trickster') !== undefined) {
    const t2 = pl.unused.filter(t => t !== landing.t).sort((a, b) => power(p, b, f.card) - power(p, a, f.card))[0];
    if (t2 !== undefined && power(p, t2, f.card) > power(foe.p, foe.t, f.card)) return { i: has('Trickster'), ai: { t2 } };
  }
  if (has('Sleight of Hand') !== undefined) {
    const swing = c => power(p, landing.t, c) - power(foe.p, foe.t, c);
    const gi = pl.gateHand.map((c, k) => k).sort((a, b) => swing(pl.gateHand[b]) - swing(pl.gateHand[a]))[0];
    if (gi !== undefined && swing(pl.gateHand[gi]) > 0) return { i: has('Sleight of Hand'), ai: { gi } };
  }
  if (gap < -100 && has('Second Chance') !== undefined) return { i: has('Second Chance') };
  if (gap < -100 && has('Road Trip') !== undefined && lvl === 'hard') return { i: has('Road Trip') };
  return null;
}
// before throwing: returns true if the turn ended (Surprise Attack battles instead of a throw)
async function aiPreCards(p) {
  for (let k = 0; k < (aiLevel[p] === 'hard' ? 2 : 1); k++) {
    const c = aiFieldCard(p, 'pre', null);
    if (!c) break;
    await sleep(500);
    if (await useFieldCard(c.i, c.ai) === 'ended') return true;
    await sleep(700);
  }
  return false;
}
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
  const t = { holder, obj, open: 0, anim: null, from: 0, to: 0.999 };
  if (g.animations.length) {
    t.mixer = new THREE.AnimationMixer(obj); t.action = t.mixer.clipAction(g.animations[0]);
    t.action.play(); t.action.paused = true; t.dur = g.animations[0].duration;
  }
  // New Vestroia (DotC) models are about 30x smaller, sit on their base, and their animation first rolls the
  // ball in, then opens it (closed at ~22% of the clip, open from ~46%). Size and center them like the others.
  // Battle Trainer Bakugan (bt_) are built the same way but their clip is just the opening (closed -> open)
  if (/^(dc|bt)_/.test(spec.id || '') && t.action) {
    // the Maxus Helios pieces and Wired were built as Traps: their clip starts closed and is open by about 34%
    if ((spec.id || '').startsWith('bt_')) { t.from = 0; t.to = 0.999; } else if (/^dc_sp(06_2\d|13)$/.test(spec.id)) { t.from = 0; t.to = 0.34; } else { t.from = 0.22; t.to = 0.46; }
    obj.scale.setScalar(1); setOpen(t, 0);
    obj.updateMatrixWorld(true); obj.traverse(o => { if (o.isSkinnedMesh) o.skeleton.update(); });
    const box = new THREE.Box3().setFromObject(obj, true), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    const k = TOY_D / Math.max(size.x, size.z);
    obj.scale.setScalar(k); obj.position.set(-c.x * k, -c.y * k, -c.z * k);
    // spin around the ball's own center (like the Classic Bakugan): put the offset model inside a wrapper that rolls
    const spin = new THREE.Group(); holder.add(spin); spin.add(obj); t.obj = spin;
  }
  setOpen(t, 0);
  return t;
}
function setOpen(t, v) {
  t.open = v;
  if (t.action) { t.action.time = (t.from + v * (t.to - t.from)) * t.dur; t.mixer.update(0); }
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
  // face up: the card's picture from the DS game replaces the bonus list once it has loaded
  if (faceUp && card.art && pack) pack.url(card.art).then(u => {
    const im = new Image();
    im.onload = () => {
      const h = 300, w = Math.round(im.width * h / im.height);
      x.fillStyle = '#15191e'; x.fillRect(0, 0, 256, 300);
      x.imageSmoothingEnabled = false; x.drawImage(im, (256 - w) / 2, 0, w, h);
      tex.needsUpdate = true;
    };
    im.src = u;
  }).catch(() => {});
  return tex;
}
// Gate cards sit parallel to the walls on a grid of card-sized spots (see rules.js: cell [c, r]).
// The opening four spots make a rectangle around the mat's center.
function cellCenter(cell) { return new THREE.Vector3((cell[0] + 0.5) * GATE_W, 0.6, (cell[1] + 0.5) * GATE_D); }
const cellAt = pos => [Math.floor(pos.x / GATE_W), Math.floor(pos.z / GATE_D)];
// Position relative to a card: along = the card's long side (z), across = its short side (x).
function cardLocal(f, pos) {
  const c = cellCenter(f.cell);
  return { along: pos.z - c.z, across: pos.x - c.x };
}
// Each player's color = their main attribute (the one most of their toys share; ties -> first toy's).
function mainAttr(pl) {
  const n = {}; pl.toys.forEach(t => n[t.attr] = (n[t.attr] || 0) + 1);
  return pl.toys.map(t => t.attr).sort((a, b) => n[b] - n[a])[0];
}
const playerColor = p => ATTR_COLOR[mainAttr(state.players[p])];
const BORDER = 0.35 * CM;   // colored frame around a player's Gate cards
function addGateMesh(card, owner, cell) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(GATE_W, GATE_D), new THREE.MeshBasicMaterial({ map: gateBack || cardTexture(card, false) }));
  m.rotation.x = -Math.PI / 2; if (owner === 1) m.rotation.z = Math.PI;   // card set by p reads right-way-up for p
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(GATE_W + 2 * BORDER, GATE_D + 2 * BORDER),
    new THREE.MeshBasicMaterial({ color: playerColor(owner) }));
  frame.position.z = -0.15; m.add(frame);                                  // sits just under the card
  m.position.copy(cellCenter(cell)); scene.add(m); gateMesh.set(card, m);
}
function flipGate(card) { const m = gateMesh.get(card); if (m) { m.material.map = cardTexture(card, true); m.material.needsUpdate = true; } }
function removeGate(card) { const m = gateMesh.get(card); if (m) { scene.remove(m); gateMesh.delete(card); } }
let inFlight = null;   // the thrown toy while its throw is being resolved
function cardAt(pos) { const i = fieldIndexAt(pos); return i === null ? null : state.field[i].card; }
function fieldIndexAt(pos) {
  for (let i = 0; i < state.field.length; i++) {
    const l = cardLocal(state.field[i], pos);
    if (Math.abs(l.across) <= GATE_W / 2 + RADIUS * 0.3 && Math.abs(l.along) <= GATE_D / 2 + RADIUS * 0.3) return i;
  }
  return null;
}
// Where the thrown toy landed: any card it stopped over, even partly (the most-overlapped one).
function landingIndexAt(pos) {
  let best = null, bestOut = Infinity;
  state.field.forEach((f, i) => {
    const l = cardLocal(f, pos);
    const out = Math.max(Math.abs(l.across) - GATE_W / 2, Math.abs(l.along) - GATE_D / 2);   // <0 = center is on the card
    if (out < RADIUS && out < bestOut) { best = i; bestOut = out; }
  });
  return best;
}
// The nearest spot fully on that card.
function onCardSpot(f, pos) {
  const c = cellCenter(f.cell), mx = GATE_W / 2 - RADIUS * 0.9, mz = GATE_D / 2 - RADIUS * 0.9;
  return new THREE.Vector3(c.x + Math.max(-mx, Math.min(mx, pos.x - c.x)), RADIUS, c.z + Math.max(-mz, Math.min(mz, pos.z - c.z)));
}
function standSpot(cell, k) {                   // only used when the rules move a toy to another card
  const c = cellCenter(cell);
  return new THREE.Vector3(c.x + (k === 0 ? -1 : 1) * (GATE_W / 2 - RADIUS * 0.9), RADIUS, c.z);
}

// ---------- HUD
// Life Gauge like the anime's: five slanted segments, red next to the face through green at the far end
const LG_COLORS = ['#e8322b', '#f2701f', '#f2c12e', '#9cc93b', '#3fae46'];
function hud() {
  state.players.forEach((pl, p) => {
    $('p' + p + 'name').textContent = pl.name;
    $('p' + p + 'gates').innerHTML = state.nv
      ? `<div class="lg">${LG_COLORS.map((c, i) => { const per = R.START_LIFE / 5, w = Math.max(0, Math.min(1, (pl.life - i * per) / per));
          return `<i><b style="width:${w * 100}%;background:${c}"></b></i>`; }).join('')}</div><small>${pl.life} Life</small>`
      : [0, 1, 2].map(i => `<span class="dot ${i < pl.captured.length ? 'on' : ''}"></span>`).join('');
    $('p' + p).hidden = false; $('p' + p).classList.toggle('out', !!pl.out);
    document.querySelector('.top').classList.toggle('four', state.players.length > 2);
    $('p' + p).classList.toggle('active', state.turn === p && state.winner === null);
    $('p' + p).classList.toggle('nv', !!state.nv);
    requestAnimationFrame(placeMsg);
    $('p' + p).style.setProperty('--pc', playerColor(p));
  });
}
function say(msg) { $('msg').textContent = msg; placeMsg(); }
// keep the message just under the player boxes (they get taller with faces and Life Gauges)
function placeMsg() {
  const v = $('view').getBoundingClientRect(), b = Math.max(...[...document.querySelectorAll('.top .pl')].filter(x => !x.hidden).map(x => x.getBoundingClientRect().bottom));
  $('msg').style.top = Math.round(b - v.top + 8) + 'px';
}
addEventListener('resize', placeMsg);
function flash(text) {
  const f = $('flash'); f.textContent = text; f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
}
// pictures in the pickers: <img data-pic="path"> filled in from the asset pack once the bar is drawn
const picCache = new Map();
function fillPics(root) {
  if (!pack) return;
  root.querySelectorAll('img[data-pic]').forEach(im => {
    const k = im.dataset.pic; im.removeAttribute('data-pic');
    if (!picCache.has(k)) picCache.set(k, pack.url(k).catch(() => ''));
    picCache.get(k).then(u => { if (u) im.src = u; else im.remove(); });
  });
}
// Bakugan pictures: a snapshot of each player's own 3D Bakugan (ball form), taken once when the match loads
const toySnap = [[], [], [], []];
function snapToys() {
  const W = 128, r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); r.setSize(W, W); r.outputColorSpace = THREE.SRGBColorSpace;
  const sc = new THREE.Scene(); sc.add(new THREE.AmbientLight(0xffffff, 1.6)); const l = new THREE.DirectionalLight(0xffffff, 2.2); l.position.set(1, 2, 3); sc.add(l);
  const cam = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
  toysMesh.forEach((list, p) => list.forEach((t, i) => {
    const h = t.holder, parent = h.parent, vis = h.visible, pos = h.position.clone(), rot = h.rotation.clone();
    try {
      sc.add(h); h.visible = true; h.position.set(0, 0, 0); h.rotation.set(0, 0.6, 0); h.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(h, true), c = box.getCenter(new THREE.Vector3()), d = box.getSize(new THREE.Vector3()).length();
      cam.position.set(c.x, c.y + d * 0.35, c.z + d * 1.7); cam.lookAt(c); r.render(sc, cam);
      toySnap[p][i] = r.domElement.toDataURL('image/png');
    } catch {}
    if (parent) parent.add(h); h.visible = vis; h.position.copy(pos); h.rotation.copy(rot);
  }));
  r.dispose();
}
const toyPic = (p, t) => toySnap[p][t] ? `<img class="tpic" src="${toySnap[p][t]}" alt="">` : '';
const cardPic = card => card.art ? `<img class="cart" data-pic="${card.art}" alt="">` : '';
function showPicker() {
  const p = state.turn, pl = state.players[p];
  $('picker').innerHTML = pl.unused.map(t => {
    const toy = pl.toys[t];
    return `<button class="chip withart" data-t="${t}" style="--c:${ATTR_COLOR[toy.attr]}">${toyPic(p, t)}<span class="ctext"><b>${toy.name}</b><span>${toy.g}G · ${toy.attr}</span><span class="st">Spd ${lv(toy.stats || {}, 'speed')} · Def ${lv(toy.stats || {}, 'defense')} · Mag ${lv(toy.stats || {}, 'magnet')}</span></span></button>`;
  }).join('');
  fillPics($('picker'));
  $('picker').querySelectorAll('button').forEach(b => b.onclick = () => select(+b.dataset.t));
  armed = null;
  if (pl.unused.length === 1) select(pl.unused[0]);
  fieldPhase = 'pre'; refreshAbilityButton();
  if (isAI(p)) { $('picker').classList.add('off'); aiPreCards(p).then(ended => { if (!ended) aiThrow(p); }); return; }
  $('picker').classList.remove('off');
  if (promptOn() && !promptedPre && R.fieldCardOptions(state, 'pre').length) {
    promptedPre = true;
    askUse('Use an Ability card before you throw?', ASK_SECONDS).then(yes => { if (yes && fieldPhase === 'pre') openAbilityPanel(); });
  }
}
let promptedPre = false;
// Red "before you throw" cards that work with the selected toy, shown after the toys. Tap to arm, tap again to cancel.
let armed = null;   // index into the Ability hand of the armed Red card
function showThrowCards() {
  $('picker').querySelectorAll('.chip.red').forEach(b => b.remove());
  if (selected === null) return;
  const hand = state.players[state.turn].abilityHand;
  for (const i of R.throwOptions(state, selected)) {
    const b = document.createElement('button');
    b.className = 'chip red' + (armed === i ? ' sel' : ''); b.dataset.a = i; b.style.setProperty('--c', ABILITY_COLOR.red);
    b.innerHTML = `<b>${hand[i].name}</b><span>Red · play with this throw</span><span class="st">${hand[i].text || ''}</span>`;
    b.onclick = () => { armed = armed === i ? null : i; showThrowCards(); };
    $('picker').append(b);
  }
}
function select(t) {
  if (busy) return;
  const p = state.turn;
  if (selected !== null) { const prev = toysMesh[p][selected]; if (!isStanding(p, selected)) prev.holder.visible = false; }
  selected = t;
  $('picker').querySelectorAll('button[data-t]').forEach(b => b.classList.toggle('sel', +b.dataset.t === t));
  armed = null; showThrowCards();
  const tm = toysMesh[p][t]; setOpen(tm, 0);
  tm.holder.position.copy(DIR[p]).multiplyScalar(START).setY(RADIUS);
  tm.holder.rotation.set(0, Math.atan2(-DIR[p].x, -DIR[p].z), 0);    // facing the center
  tm.obj.quaternion.identity();
  tm.holder.visible = true;
  if (!isAI(p)) say(`${state.players[p].name}: swipe up to throw ${state.players[p].toys[t].name}`);
}
const isStanding = (p, t) => state.field.some(f => f.toys.some(x => x.p === p && x.t === t));

// ---------- turn flow
async function nextTurn() {
  promptedPre = false;
  cameraFor(viewOf(state.turn)); hud(); selected = null;
  // Opening (first turn, or the field is empty again): everyone picks a Gate card for their opening spot.
  const picks = {};
  for (const p of R.openingPlayers(state)) {
    const glow = showSpots([R.openingCell(state, p)], p);
    picks[p] = await chooseGate(p, `${state.players[p].name}: pick a Gate card to set in the glowing spot`, false);
    clearSpots(glow);
  }
  const ev = R.startTurn(state, p => picks[p]);
  for (const e of ev) {
    if (e.type === 'gateSet') addGateMesh(e.card, e.p, e.cell);
    if (e.type === 'pickUp') {
      toysMesh[e.p].forEach(tm => { if (tm.holder.visible) { tm.holder.visible = false; setOpen(tm, 0); } });
      say(`All of ${state.players[e.p].name}'s Bakugan were standing, so they pick them back up`);
    } else if (e.type === 'recycle') say(`${state.players[e.p].name}'s Bakugan come back from the used pile`);
  }
  if (ev.some(e => e.type === 'gateSet')) { say('Gate cards — set!'); await sleep(900); }
  // After the opening: may set one more Gate card next to one already on the field.
  if (R.placeCells(state).length) {
    const pl = state.players[state.turn];
    let i = await chooseGate(state.turn, `${pl.name}: set another Gate card? Pick one, or skip`, true);
    while (i !== null) {
      const cells = R.placeCells(state), glow = showSpots(cells, state.turn);
      say('Tap a glowing spot to set it there (or pick another card)');
      const r = isAI(state.turn) ? (await sleep(500), aiPlaceCell(state.turn, cells))
        : await tapSpot(cells, () => chooseGate(state.turn, null, true).then(j => ({ again: j })));
      clearSpots(glow);
      if (r.again !== undefined) { i = r.again; continue; }
      const e = R.placeGate(state, i, r)[0];
      addGateMesh(e.card, e.p, e.cell); say(`${e.card.name} — set!`); await sleep(600);
      break;
    }
  }
  hud(); showPicker();
}

// ---------- choosing Gate cards and spots
const COLOR_HEX = { gold: '#e2b84a', silver: '#c9d1da', copper: '#c67a43' };
function gateChip(card, i) {
  const top = Object.entries(card.bonus || {}).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([a, v]) => `${a[0].toUpperCase() + a.slice(1)} +${v}`).join(' · ');
  return `<button class="chip withart" data-g="${i}" style="--c:${COLOR_HEX[card.color] || '#888'}">${cardPic(card)}<span class="ctext"><b>${card.name}</b><span>${card.color || ''} Gate</span><span class="st">${top || card.text || 'effect card'}</span></span></button>`;
}
// Shows player p's Gate cards in the bottom bar. Resolves with the hand index, or null for Skip.
// msg = null keeps the current message and the current bar (used while a spot is being picked).
let gateResolve = null;
function chooseGate(p, msg, canSkip) {
  if (isAI(p)) {
    if (msg !== null) say(msg.replace(/^.*?: /, `${state.players[p].name} is choosing: `));
    $('picker').innerHTML = ''; $('picker').classList.add('off');
    const i = aiGateIndex(p);
    const skip = canSkip && (i === null || (aiLevel[p] === 'easy' && Math.random() < 0.5));
    return sleep(800).then(() => skip ? null : i);
  }
  return new Promise(res => {
    gateResolve = res;
    if (msg !== null) {
      say(msg);
      const hand = state.players[p].gateHand;
      $('picker').innerHTML = hand.map(gateChip).join('') + (canSkip ? `<button class="chip skip" data-g="-1"><b>Skip</b><span>throw a Bakugan</span></button>` : '');
      fillPics($('picker')); $('picker').classList.remove('off');
    }
    $('picker').querySelectorAll('button').forEach(b => b.onclick = () => {
      $('picker').querySelectorAll('button').forEach(x => x.classList.toggle('sel', x === b && b.dataset.g !== '-1'));
      const r = gateResolve; gateResolve = null; if (r) r(+b.dataset.g < 0 ? null : +b.dataset.g);
    });
  });
}
// Glowing spots on the mat.
const spotMeshes = [];
function showSpots(cells, p) {
  const ms = cells.map(cell => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(GATE_W - 0.4 * CM, GATE_D - 0.4 * CM),
      new THREE.MeshBasicMaterial({ color: playerColor(p), transparent: true, opacity: 0.45, depthWrite: false }));
    m.rotation.x = -Math.PI / 2; m.position.copy(cellCenter(cell)).setY(0.5); scene.add(m); spotMeshes.push(m);
    return m;
  });
  return ms;
}
function clearSpots(ms) { for (const m of ms) { scene.remove(m); spotMeshes.splice(spotMeshes.indexOf(m), 1); } }
// Waits for a tap on one of the cells. other() = a competing promise (e.g. picking a different card).
let spotTap = null;
function tapSpot(cells, other) {
  return new Promise(res => {
    let done = false;
    const finish = v => { if (!done) { done = true; spotTap = null; gateResolve = null; res(v); } };
    spotTap = { cells, finish };
    if (other) other().then(finish);
  });
}
const raycaster = new THREE.Raycaster(), matPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
function tapToCell(e) {
  const r = renderer.domElement.getBoundingClientRect();
  raycaster.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
  const hit = new THREE.Vector3();
  return raycaster.ray.intersectPlane(matPlane, hit) ? cellAt(hit) : null;
}

// ---------- throwing
let roll = null;   // { ball: body, stands: [body] } while a throw is in motion
// A body: { tm, pos, vel, p, t, kind: 'ball' | 'stand', card (stands only), moved, done }
const STAND_R = RADIUS * 1.15; // open toys are a bit wider than the closed ball
const levelOf = (b, k) => lv(statsOf(b.p, b.t), k);
// A settled ball, and the thrower's own standing toys, act like walls: you can't knock your own toys around.
const isInvulnerable = b => !!state.invulnerable && state.invulnerable.p === b.p && state.invulnerable.t === b.t;
// never moves when hit: a settled ball, the thrower's own Bakugan, an Invulnerable one
const fixed = b => (b.kind === 'ball' && b.done) || (b.kind === 'stand' && (b.p === state.turn || isInvulnerable(b)));
let pointer = null;
renderer.domElement.addEventListener('pointerdown', e => {
  if (spotTap) {
    const c = tapToCell(e), hit = c && spotTap.cells.find(x => x[0] === c[0] && x[1] === c[1]);
    if (hit) spotTap.finish(hit);
    return;
  }
  if (busy || selected === null || state.winner !== null || isAI(state.turn)) return;
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
  const top = maxSpeed(statsOf(state.turn, selected));
  if (vel.length() > top) vel.setLength(top);
  busy = true; $('picker').classList.add('off');
  if (armed !== null) { const card = state.players[state.turn].abilityHand[armed]; R.playBeforeThrow(state, armed, selected); armed = null; flash(card.name); }
  const tm = toysMesh[state.turn][selected];
  const ball = { tm, pos: tm.holder.position.clone(), vel, p: state.turn, t: selected, kind: 'ball' };
  const stands = state.field.flatMap(f => f.toys.map(x => {
    const stm = toysMesh[x.p][x.t];
    return { tm: stm, pos: stm.holder.position.clone(), vel: new THREE.Vector3(), p: x.p, t: x.t, kind: 'stand', card: f.card, moved: false };
  }));
  roll = { ball, stands };
  // for Second Chance: where everything was before the throw
  snapshot = { t: selected, toys: state.players.map((_, p) => p).flatMap(p => toysMesh[p].map((m, t) => ({ m, pos: m.holder.position.clone(), q: m.obj.quaternion.clone(), vis: m.holder.visible, open: m.open }))) };
  fieldPhase = null; refreshAbilityButton();
  say('');
}
let snapshot = null;
// Settle the thrown Bakugan onto the card it stopped over, open it, and say what happened.
async function standAndShow(ball, knocked) {
  const { tm, t } = ball, p = state.turn, name = state.players[p].toys[t].name;
  let k = landingIndexAt(ball.pos);
  if (k !== null && knocked.some(b => b.card === state.field[k].card)) k = null;   // that card goes to the knockout
  if (k === null) { say(`${name} missed the Gate cards — back to your hand.`); return; }
  const f = state.field[k], spot = onCardSpot(f, ball.pos);
  if (spot.distanceTo(new THREE.Vector3(ball.pos.x, RADIUS, ball.pos.z)) > 0.5) await glide(tm, spot, 250);
  tm.obj.quaternion.copy(UPRIGHT); ball.pos.copy(tm.holder.position);
  await animateOpen(tm, 1);
  const theirs = f.toys.find(x => !sameTeam(x.p, p)), mine = f.toys.find(x => sameTeam(x.p, p));
  say(theirs ? `${name} opens on ${f.card.name} — battle with ${state.players[theirs.p].toys[theirs.t].name}!`
    : mine ? (mine.p === p ? `${name} opens next to your other Bakugan on ${f.card.name}!` : `${name} teams up with ${state.players[mine.p].name}'s ${state.players[mine.p].toys[mine.t].name} on ${f.card.name}!`)
    : `${name} opens on the Gate card!`);
}
async function rollStopped() {
  const { ball, stands } = roll; roll = null;
  let { tm, pos, t } = ball;
  const p = state.turn;
  inFlight = tm;
  // 1. Knockouts are shown right away (they count after the Ability card window, so Second Chance can undo them).
  const knockedNow = () => stands.filter(b => !sameTeam(b.p, p) && b.moved && cardAt(b.pos) !== b.card && !isInvulnerable(b));
  for (const b of knockedNow()) { flash('KNOCKOUT!'); await animateOpen(b.tm, 0, 300); b.tm.holder.visible = false; }
  // 2. The thrown Bakugan settles onto the card it stopped over and opens, with the result on screen.
  await standAndShow(ball, knockedNow());
  // 3. Now the Ability card window and its timer (Second Chance, Trickster, Sleight of Hand, Road Trip)
  const post = await postThrowCards(ball, stands);
  if (post === 'redo') return;
  ({ tm, pos, t } = ball); inFlight = tm;
  // 4. Knockouts count now
  const knocked = knockedNow().map(b => ({ p: b.p, t: b.t, card: b.card }));
  if (knocked.length) {
    for (const e of R.knockOff(state, knocked, t)) { if (e.type === 'capture') await captured(e); if (e.type === 'damage') await damaged(e); if (e.type === 'out') await knockedOut(e); }
    if (state.winner !== null) { inFlight = null; return afterTurn(); }
  }
  const fieldIdx = landingIndexAt(pos);
  if (fieldIdx === null && tm.open > 0) await animateOpen(tm, 0, 250);   // its card was just won by knockout
  // Landed on a card with your own toy: take the card, or move to a touching card.
  let moveTo = null;
  const f = fieldIdx === null ? null : state.field[fieldIdx];
  if (f && !isAI(p) && f.toys.some(x => sameTeam(x.p, p)) && !f.toys.some(x => !sameTeam(x.p, p))) {
    const opts = R.moveOptions(state, fieldIdx);
    if (opts.length) {
      await animateOpen(tm, 1);
      const glow = showSpots(opts.map(k => state.field[k].cell), p);
      say('Two of your Bakugan here — take the card, or tap a glowing card to move to');
      $('picker').classList.remove('off');
      $('picker').innerHTML = `<button class="chip" data-g="-2" style="--c:${playerColor(p)}"><b>Take the card</b><span>${f.card.name}</span></button>`;
      const cell = await tapSpot(opts.map(k => state.field[k].cell), () => new Promise(res => { gateResolve = res; $('picker').querySelector('button').onclick = () => { const r = gateResolve; gateResolve = null; r && r('take'); }; }));
      clearSpots(glow); $('picker').classList.add('off');
      moveTo = cell === 'take' ? null : state.field.findIndex(g => g.cell[0] === cell[0] && g.cell[1] === cell[1]);
    }
  }
  const res = R.land(state, t, fieldIdx, () => moveTo);
  inFlight = null;
  for (const e of res.events) {
    if (e.type === 'miss') { tm.holder.visible = false; }
    if (e.type === 'stand' && tm.open < 1) { await animateOpen(tm, 1); }
    if (e.type === 'moved') { say('Moving to the touching Gate card.'); await sleep(500); await glide(tm, standSpot(e.cell, e.slot)); await animateOpen(tm, 1); await sleep(400); }
    if (e.type === 'capture') await captured(e);
    if (e.type === 'usedUp') await usedUp(e);
  }
  if (res.battle) await runBattle(res.battle.fieldIdx);
  if (res.events.some(e => e.type === 'extraThrow')) { say(`Another Throw — ${state.players[p].name} throws again!`); await sleep(900); }
  afterTurn();
}
async function runBattle(fieldIdx) {
  {
    const bt = R.startBattle(state, fieldIdx);
    flipGate(state.field[bt.fieldIdx].card); await sleep(700);
    for (const e of bt.events) if (e.type === 'regain') {
      say(`${state.players[e.p].name} gets ${e.cards.map(c => c.name).join(', ')} back`); await sleep(1200);
    }
    const before = await abilityPhase(bt);
    const b = R.computeBattle(state, bt);
    await showBattle(b, before);
    if (b.result !== 'tie') {   // story mode: Bakugan beaten and Gate cards won, for BP
      const win = [...new Set(b.sides.filter(x => R.teamOf(state, x.p) === b.result).map(x => x.p))], lost = b.sides.filter(x => R.teamOf(state, x.p) !== b.result).length;
      for (const q of win) { storyStats[q].beaten += lost / win.length; storyStats[q].gates += 1 / win.length; }
    }
    const ev = R.resolveBattle(state, b);
    for (const e of ev) {
      if (e.type === 'capture') await captured(e, b);
      if (e.type === 'damage') await damaged(e);
      if (e.type === 'out') await knockedOut(e);
      if (e.type === 'usedUp') await usedUp(e, b);
      if (e.type === 'tie' && state.nv) { say('Tie — no damage.'); await sleep(900); continue; }
      if (e.type === 'tie') { clearGate(b.card, b.sides); say(`Tie — nobody wins. ${b.card.name} goes back to ${state.players[e.returnedTo].name}.`); await sleep(1300); }
    }
  }
}
const knockouts = [0, 0, 0, 0];
const storyStats = [0, 0, 0, 0].map(() => ({ beaten: 0, gates: 0 }));
let storyMatch = null;   // set when the match comes from story mode (story.html)
let matchPicked = null;   // the characters from the menu (to record a profile's statistics)
async function captured(e, b) {
  const card = e.card;
  if (e.how === 'knockout') knockouts[e.p]++;
  const how = e.how === 'uncontested' ? ' (uncontested)' : e.how === 'knockout' ? ' by knockout' : e.how === 'early victory' ? ' — Early Victory!' : '';
  say(`${state.players[e.p].name} wins ${card.name}${how}!`);
  clearGate(card, b && b.sides);
  hud(); await sleep(1300);
}
// New Vestroia rules: Life Gauge damage, Gate cards used up, Bakugan straight back to the hand
async function damaged(e) {
  flash(`-${e.amount}`);
  say(`${state.players[e.p].name} takes ${e.amount} damage${e.how === 'knockout' ? ' from a knockout' : ''}! Life ${e.life}`);
  hud(); await sleep(1300);
}
// 3-4 players: someone's Life Gauge hit 0 — they're out, their Bakugan leave the field
async function knockedOut(e) {
  toysMesh[e.p].forEach(tm => { tm.holder.visible = false; setOpen(tm, 0); });
  say(`${state.players[e.p].name} is out!`); flash('OUT!'); hud(); await sleep(1400);
}
async function usedUp(e, b) {
  clearGate(e.card, b && b.sides);
  if (e.how === 'uncontested') say(`${e.card.name} is used up; ${state.players[e.p].name}'s Bakugan come back.`);
  hud(); await sleep(e.how === 'uncontested' ? 1200 : 400);
}
// A Trap played in a battle: its model drops onto the Gate card beside your Bakugan and opens
const trapMeshes = [];
async function placeTrap(card, p, bt) {
  const d = (pack.catalog.traps || []).find(x => x.id === card.trapId); if (!d) return;
  const f = state.field[bt.fieldIdx], mine = f.toys.find(x => x.p === p); if (!mine) return;
  const tm = await loadToy({ id: d.id, model: d.model, attrTexture: (d.attributes || {})[card.trapColor] });
  const at = toysMesh[p][mine.t].holder.position, c = cellCenter(f.cell);
  const side = new THREE.Vector3(at.x - c.x, 0, at.z - c.z); if (side.lengthSq() < 1) side.set(1, 0, 0);
  const spot = c.clone().add(side.normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2).multiplyScalar(GATE_W * 0.28));
  tm.holder.position.set(spot.x, at.y + 25, spot.z); tm.holder.rotation.y = toysMesh[p][mine.t].holder.rotation.y; tm.holder.scale.setScalar(1.6); tm.holder.visible = true;
  trapMeshes.push({ tm, card: f.card });
  const panel = $('battle'), op = panel.style.opacity; panel.style.opacity = '0.12';
  say(`${state.players[p].name} sets ${card.name.replace('Trap: ', '')} on ${f.card.name}!`);
  await glide(tm, new THREE.Vector3(spot.x, at.y, spot.z), 450);
  await animateOpen(tm, 1, 500); await sleep(700);
  panel.style.opacity = op;
}
function clearGate(card) {
  removeGate(card);
  for (let i = trapMeshes.length - 1; i >= 0; i--) if (trapMeshes[i].card === card) { scene.remove(trapMeshes[i].tm.holder); trapMeshes.splice(i, 1); }
  // toys that were on that card leave the field
  for (const p of state.players.keys()) toysMesh[p].forEach((tm, t) => { if (tm !== inFlight && tm.holder.visible && !isStanding(p, t)) { tm.holder.visible = false; setOpen(tm, 0); } });
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

// ---------- Ability card button: cards used outside battle
// 'pre' = before you throw, 'post' = after your Bakugan stops (stands or misses), before it opens / battles.
let fieldPhase = null, postCtx = null, postResolve = null, pickWait = false;
const promptOn = () => { try { return localStorage.getItem('marbles-prompt-abilities') !== '0'; } catch { return true; } };
const setPrompt = on => { try { localStorage.setItem('marbles-prompt-abilities', on ? '1' : '0'); } catch {} };
const fieldOpts = () => fieldPhase ? R.fieldCardOptions(state, fieldPhase, postCtx && postCtx.landing) : [];
// One countdown at a time, shown in #timer. onDone runs when it hits zero.
let timer = null;
function startTimer(sec, label, onDone) {
  stopTimer();
  const el = $('timer'), end = performance.now() + sec * 1000;
  const tick = () => {
    const left = Math.ceil((end - performance.now()) / 1000);
    if (left <= 0) { stopTimer(); onDone(); return; }
    el.hidden = false; el.textContent = `${label} ${left}s`;
    timer = setTimeout(tick, 200);
  };
  tick();
}
function stopTimer() { clearTimeout(timer); timer = null; $('timer').hidden = true; }
// Yes / No question with a countdown (No when time runs out)
function askUse(text, sec) {
  return new Promise(res => {
    $('ask').hidden = false; $('askText').textContent = text;
    const done = v => { stopTimer(); $('ask').hidden = true; res(v); };
    $('askYes').onclick = () => done(true); $('askNo').onclick = () => done(false);
    startTimer(sec, 'Continuing in', () => done(false));
  });
}
const PANEL_SECONDS = 45, ASK_SECONDS = 10, WAIT_SECONDS = 5, NOCARD_SECONDS = 3;

function refreshAbilityButton() {
  const b = $('abtn'); if (!b || !state) return;
  b.disabled = !fieldPhase || isAI(state.turn);
  b.classList.toggle('ready', fieldOpts().length > 0);
}
function openAbilityPanel() {
  const p = state.turn, hand = state.players[p].abilityHand, opts = fieldOpts();
  const when = fieldPhase === 'pre' ? 'before you throw' : fieldPhase === 'post' ? 'after your Bakugan stopped' : '';
  $('apanel').hidden = false;
  $('alist').innerHTML = `<div class="ahead">${state.players[p].name}: Ability cards ${when}</div>` +
    (hand.length ? hand.map((c, i) => `<button class="chip ${opts.includes(i) ? '' : 'dim'}" data-a="${i}" style="--c:${ABILITY_COLOR[c.color]}" ${opts.includes(i) ? '' : 'disabled'}><b>${c.name}</b><span class="st">${c.text || ''}</span></button>`).join('')
      : '<div class="ahead" style="font-weight:400">No Ability cards left.</div>');
  $('aprompt').checked = promptOn();
  $('aclose').textContent = fieldPhase === 'post' ? 'Continue' : 'Close';
  $('alist').querySelectorAll('button[data-a]').forEach(b => b.onclick = () => useFieldCard(+b.dataset.a));
  startTimer(PANEL_SECONDS, 'Time left', closeAbilityPanel);
}
function closeAbilityPanel() {
  stopTimer();
  $('apanel').hidden = true;
  if (fieldPhase === 'post' && postResolve) { const r = postResolve; postResolve = null; r('continue'); }
}
async function useFieldCard(i, ai = null) {
  const p = state.turn, card = state.players[p].abilityHand[i];
  stopTimer(); $('apanel').hidden = true;
  const phase = fieldPhase, landing = phase === 'post' ? postCtx.landing : null;
  // find the card again at play time (the hand can change while the player is picking)
  const play = target => { const r = R.playFieldCard(state, state.players[p].abilityHand.indexOf(card), phase, landing, target); flash(card.name); return r; };
  const myCells = q => state.field.filter(f => f.toys.some(x => x.p === q)).map(f => f.cell);
  const cellIdx = cell => state.field.findIndex(f => f.cell[0] === cell[0] && f.cell[1] === cell[1]);
  switch (card.name) {
    case 'Another Throw': play(); say('You get another throw after this one.'); break;
    case 'Early Victory': play(); say('If this throw stands on an empty Gate card, you win it.'); break;
    case 'Invulnerable': {
      let cell = ai && ai.cell;
      if (!cell) { say('Tap the Gate card with your Bakugan to protect'); const glow = showSpots(myCells(p), p); cell = await tapSpot(myCells(p)); clearSpots(glow); }
      const f = state.field[cellIdx(cell)], x = f.toys.find(y => y.p === p);
      play({ t: x.t }); say(`${state.players[p].toys[x.t].name} can't be knocked off until your next turn.`); break;
    }
    case 'Surprise Attack': {
      let mine = ai && ai.mine, theirs = ai && ai.theirs, glow;
      if (!mine) { say('Tap your Gate card to battle on'); glow = showSpots(myCells(p), p); mine = await tapSpot(myCells(p)); clearSpots(glow); }
      const theirCells = foesOf(p).flatMap(q => myCells(q)).filter(c => c[0] !== mine[0] || c[1] !== mine[1]);
      if (!theirCells.length) { say('No other opponent Bakugan to pull in.'); break; }
      if (!theirs) { say("Tap the opponent's Bakugan to pull in"); glow = showSpots(theirCells, foesOf(p)[0]); theirs = await tapSpot(theirCells); clearSpots(glow); }
      const fi = cellIdx(theirs), victim = state.field[fi].toys.find(y => !sameTeam(y.p, p)), ot = victim.t;
      const r = play({ mine: cellIdx(mine), theirs: { t: ot, fieldIdx: fi } });
      const ev = r.events.find(e => e.type === 'surprise');
      busy = true; fieldPhase = null; refreshAbilityButton(); $('picker').classList.add('off');
      say('Surprise Attack!'); await glide(toysMesh[victim.p][ot], standSpot(mine, ev.slot)); await sleep(400);
      await runBattle(r.battle.fieldIdx);
      afterTurn(); return 'ended';
    }
    case 'Second Chance': play(); if (postResolve) { const r = postResolve; postResolve = null; r('redo'); } return;
    case 'Trickster': {
      const pl = state.players[p], others = pl.unused.filter(t => t !== postCtx.ball.t);
      let t2 = ai ? ai.t2 : undefined;
      if (t2 === undefined) {
        say('Pick the Bakugan to switch in');
        $('picker').classList.remove('off');
        $('picker').innerHTML = others.map(t => `<button class="chip withart" data-t="${t}" style="--c:${ATTR_COLOR[pl.toys[t].attr]}">${toyPic(p, t)}<span class="ctext"><b>${pl.toys[t].name}</b><span>${pl.toys[t].g}G</span></span></button>`).join('');
        fillPics($('picker'));
        pickWait = true;
        t2 = await new Promise(res => $('picker').querySelectorAll('button').forEach(b => b.onclick = () => res(+b.dataset.t)));
        pickWait = false;
        $('picker').classList.add('off');
      }
      play();
      const b = postCtx.ball, old = b.tm, tm2 = toysMesh[p][t2];
      tm2.holder.position.copy(old.holder.position); tm2.obj.quaternion.copy(UPRIGHT); tm2.holder.visible = true; setOpen(tm2, old.open);
      old.holder.visible = false; setOpen(old, 0);
      b.tm = tm2; b.t = t2; inFlight = tm2;
      say(`Switched to ${pl.toys[t2].name}!`);
      break;
    }
    case 'Sleight of Hand': {
      const gh = state.players[p].gateHand;
      let gi = ai ? ai.gi : undefined;
      if (gi === undefined) {
        say('Pick one of your Gate cards to switch in');
        $('picker').classList.remove('off'); $('picker').innerHTML = gh.map(gateChip).join('');
        pickWait = true;
        gi = await new Promise(res => $('picker').querySelectorAll('button').forEach(b => b.onclick = () => res(+b.dataset.g)));
        pickWait = false;
        $('picker').classList.add('off');
      }
      const r = play({ gateIdx: gi, fieldIdx: landing.fieldIdx });
      const e = r.events.find(x => x.type === 'gateSwapped');
      removeGate(e.old); addGateMesh(e.card, p, state.field[e.fieldIdx].cell);
      say(`${e.old.name} goes back to ${state.players[e.returnedTo].name}.`);
      break;
    }
    case 'Road Trip': {
      play();
      const others = state.field.map((f, k) => k).filter(k => k !== landing.fieldIdx), k = others[Math.floor(Math.random() * others.length)];
      say('Road Trip!');
      const to = cellCenter(state.field[k].cell).setY(RADIUS);
      await animateOpen(postCtx.ball.tm, 0, 200);
      await glide(postCtx.ball.tm, to, 600);
      postCtx.ball.pos.copy(to); landing.fieldIdx = k;
      await standAndShow(postCtx.ball, []);
      break;
    }
  }
  refreshAbilityButton();
  if (fieldPhase === 'post' && !isAI(p)) {            // keep the window open: more cards, or Continue
    if (!fieldOpts().length) { if (postResolve) { const r = postResolve; postResolve = null; r('continue'); } }
    else if (promptOn()) openAbilityPanel(); else showContinue();
  }
}
// Shown in the bottom bar after a throw when prompts are off and a card could be used.
function showContinue() {
  $('picker').classList.remove('off');
  $('picker').innerHTML = `<button class="chip skip" id="contBtn"><b>Continue ▶</b><span>or tap Ability cards first</span></button>`;
  const go = () => { stopTimer(); $('picker').classList.add('off'); $('picker').innerHTML = ''; if (postResolve) { const r = postResolve; postResolve = null; r('continue'); } };
  $('contBtn').onclick = go;
  startTimer(WAIT_SECONDS, 'Continuing in', go);
}
async function postThrowCards(ball, stands) {
  postCtx = { ball, stands, landing: { t: ball.t, fieldIdx: landingIndexAt(ball.pos) } };
  fieldPhase = 'post'; refreshAbilityButton();
  if (!fieldOpts().length) {   // nothing playable: short pause, then go on
    fieldPhase = null; refreshAbilityButton();
    await new Promise(res => startTimer(NOCARD_SECONDS, 'Next in', res));
    return 'continue';
  }
  const done = new Promise(res => { postResolve = res; });
  if (isAI(state.turn)) {          // the computer decides on its own
    (async () => {
      const p = state.turn; await sleep(600);
      for (let k = 0; k < 2 && postResolve; k++) {
        const c = aiFieldCard(p, 'post', postCtx.landing);
        if (!c) break;
        await useFieldCard(c.i, c.ai); await sleep(600);
      }
      if (postResolve) { const r = postResolve; postResolve = null; r('continue'); }
    })();
  } else if (promptOn()) {
    askUse('Use an Ability card before the turn goes on?', ASK_SECONDS).then(yes => {
      if (yes) openAbilityPanel(); else if (postResolve) { const r = postResolve; postResolve = null; r('continue'); }
    });
  } else showContinue();
  const how = await done;
  stopTimer(); $('ask').hidden = true; if ($('contBtn')) $('picker').innerHTML = '';
  $('apanel').hidden = true; $('picker').classList.add('off');
  fieldPhase = null; refreshAbilityButton();
  if (how === 'redo') {
    // Second Chance: everything goes back to where it was; throw again
    for (const x of snapshot.toys) { x.m.holder.position.copy(x.pos); x.m.obj.quaternion.copy(x.q); x.m.holder.visible = x.vis; x.m.anim = null; setOpen(x.m, x.open ?? 0); }
    inFlight = null; busy = false; say('Second Chance — throw again!');
    $('picker').classList.remove('off'); showPicker(); select(snapshot.t);
    return 'redo';
  }
  ball.pos.copy(ball.tm.holder.position);
  return 'continue';
}

// ---------- battle overlay with the count-up
// ---------- Ability cards during a battle: active player first, then back and forth until both pass.
const ABILITY_COLOR = { red: '#d9534f', blue: '#4a8fe0', green: '#4caf6a', trap: '#b0b8c4' };
let abilityResolve = null;
async function abilityPhase(bt) {
  const o = $('battle'); o.hidden = false; $('bnext').hidden = true;
  const g = state.field[bt.fieldIdx];
  // 1. the Gate card that just flipped, with its picture
  let pic = ''; try { if (g.card.art) pic = await pack.url(g.card.art); } catch {}
  $('bcard').innerHTML = (pic ? `<img class="gpic" src="${pic}" alt="">` : '') + `<div>Gate card: ${g.card.name}</div>`;
  // 2. each Bakugan's base G-Power, then the Gate card bonus counts in
  const c0 = R.computeBattle(state, { ...bt, plays: [] });
  const head = (sd, i, total) => `<div class="side" id="side${i}"><div class="who">${state.players[sd.p].name}</div>
      <div class="toy"><span class="attr" style="background:${ATTR_COLOR[sd.attr]}"></span>${sd.name}</div>
      <div class="g" id="g${i}">${total}G</div><div class="steps" id="steps${i}"></div></div>`;
  $('bplay').innerHTML = '';
  $('bbody').classList.toggle('multi', c0.sides.length > 2);
  $('bbody').innerHTML = c0.sides.map((sd, i) => head(sd, i, sd.start)).join(`<div class="vs">vs</div>`);
  await sleep(900);
  for (let i = 0; i < c0.sides.length; i++) {
    const sd = c0.sides[i];
    for (const st of sd.steps) {
      const line = document.createElement('div'); line.className = 'step';
      line.textContent = `${st.label.replace(/^Gate card: .*/, 'Gate bonus')}  ${st.amount >= 0 ? '+' : ''}${st.amount}`;
      $('steps' + i).append(line);
      await countUp($('g' + i), st.from, st.to); await sleep(200);
    }
  }
  await sleep(600);
  const before = Object.fromEntries(c0.sides.map(sd => [sd.p, sd.total]));
  before.labels = Object.fromEntries(c0.sides.map(sd => [sd.p, sd.steps.map(st => st.label)]));
  const gateLines = Object.fromEntries(c0.sides.map(sd => [sd.p, sd.steps.map(st => `${st.label.replace(/^Gate card: .*/, 'Gate bonus')}  ${st.amount >= 0 ? '+' : ''}${st.amount}`)]));
  // 3. then the Ability cards, back and forth
  // live G-Power (Billy): after every card, each Bakugan's G counts up or down to its new total, like the show
  const shown = c0.sides.map(sd => before[sd.p]);
  const preview = async () => {
    const c = R.computeBattle(state, bt);    // shows attributes and totals after any changes
    const col = (sd, i) => `<div class="side"><div class="who">${state.players[sd.p].name}</div>
      <div class="toy"><span class="attr" style="background:${ATTR_COLOR[sd.attr]}"></span>${sd.name}</div>
      <div class="g" id="lg${i}">${shown[i] ?? sd.total}G</div>
      <div class="steps">${gateLines[sd.p].map(t => `<div class="step">${t}</div>`).join('')}${bt.plays.filter(x => x.p === sd.p).map(x => `<div class="step">${x.card.name}</div>`).join('')}</div></div>`;
    $('bbody').innerHTML = c.sides.map((sd, i) => col(sd, i)).join(`<div class="vs">vs</div>`);
    const target = c.sides.map(sd => bt.plays.length ? sd.total : before[sd.p]);
    await Promise.all(target.map((t, i) => (shown[i] ?? t) !== t ? countUp($('lg' + i), shown[i], t) : null));
    target.forEach((t, i) => { shown[i] = t; });
  };
  // card pictures for the picker
  const artOf = new Map();
  for (const p0 of new Set(c0.sides.map(sd => sd.p))) for (const card of state.players[p0].abilityHand)
    if (card.art && !artOf.has(card)) { try { artOf.set(card, await pack.url(card.art)); } catch {} }
  while (!R.abilityDone(bt)) {
    await preview();
    const p = bt.next, opts = R.abilityOptions(state, bt);
    if (!opts.length) { R.passAbility(state, bt); continue; }
    const hand = state.players[p].abilityHand;
    if (isAI(p)) {
      $('bplay').innerHTML = `<div class="who2">${state.players[p].name} is thinking…</div>`;
      await sleep(900);
      const i = aiAbility(p, bt, opts);
      if (i < 0) R.passAbility(state, bt); else { const card = hand[i]; R.playAbility(state, bt, i); flash(card.name); await sleep(700); if (card.type === 'trap') await placeTrap(card, p, bt); }
      continue;
    }
    $('bplay').innerHTML = `<div class="who2">${state.players[p].name}: play an Ability card?</div>` +
      opts.map(i => {
        // what it would do: change in the G-Power gap, worked out with the card added
        const gap = c => { const mine = c.teamTotal[R.teamOf(state, p)] || 0; return mine - Math.max(...Object.entries(c.teamTotal).filter(([tm]) => +tm !== R.teamOf(state, p)).map(([, v]) => v)); };
        const now = R.computeBattle(state, bt), next = R.computeBattle(state, { ...bt, plays: [...bt.plays, { p, card: hand[i] }] });
        const d = gap(next) - gap(now);
        // green helps you, red hurts you, yellow changes something without moving the gap
        const moved = next.sides.some((sd, k) => sd.total !== now.sides[k].total) || next.result !== now.result
          || /return|instead|draw|discard|remove|block|cancel|move|switch|nullif|ignore|win the|loses? the|back to/i.test(hand[i].text || '');
        const [tag, tone] = d > 0 ? [`+${d} for you`, 'up'] : d < 0 ? [`${d} for you`, 'down'] : moved ? ['changes the battle', 'mid'] : ['no change right now', 'none'];
        const art = artOf.get(hand[i]);
        return `<button class="chip withart" data-a="${i}" style="--c:${ABILITY_COLOR[hand[i].color] || '#888'}">${art ? `<img class="cart" src="${art}" alt="">` : ''}<span class="ctext"><b>${hand[i].name} <em class="${tone}">${tag}</em></b><span class="st">${hand[i].text || ''}</span></span></button>`;
      }).join('') +
      `<button class="chip skip" data-a="-1"><b>Pass</b></button>`;
    const i = await new Promise(res => {
      abilityResolve = res;
      $('bplay').querySelectorAll('button').forEach(b => b.onclick = () => { abilityResolve = null; res(+b.dataset.a); });
    });
    if (i < 0) R.passAbility(state, bt);
    else { const card = hand[i]; R.playAbility(state, bt, i); flash(card.name); await sleep(500); if (card.type === 'trap') await placeTrap(card, p, bt); }
  }
  await preview();
  $('bplay').innerHTML = '';
  return before;
}

// The result: totals already shown (base + Gate bonus), the Ability cards played, then the final count.
async function showBattle(b, before = null) {
  const o = $('battle'); o.hidden = false;
  const col = (sd, i) => `<div class="side" id="side${i}">
      <div class="who">${state.players[sd.p].name}</div>
      <div class="toy"><span class="attr" style="background:${ATTR_COLOR[sd.attr]}"></span>${sd.name}</div>
      <div class="g" id="g${i}">${before ? before[sd.p] : sd.start}G</div>
      <div class="steps" id="steps${i}"></div>
      <div class="winner" id="win${i}"></div></div>`;
  $('bbody').classList.toggle('multi', b.sides.length > 2);
  $('bbody').innerHTML = b.sides.length > 2 ? b.sides.map((sd, i) => col(sd, i)).join('') + `<div class="vs" id="vs" hidden></div>` : col(b.sides[0], 0) + `<div class="vs" id="vs">vs</div>` + col(b.sides[1], 1);
  if (!before) $('bcard').textContent = `Gate card: ${b.card.name}`;
  $('bnext').hidden = true;
  await sleep(500);
  for (let i = 0; i < b.sides.length; i++) {
    const sd = b.sides[i], counted = before ? [...before.labels[sd.p]] : [];
    const gateStep = st => { const k = counted.indexOf(st.label); if (k < 0) return false; counted.splice(k, 1); return true; };
    let shown = before ? before[sd.p] : sd.start;
    for (const st of sd.steps) {
      const line = document.createElement('div'); line.className = 'step';
      const amt = st.amount ? '  ' + (st.amount > 0 ? '+' : '') + st.amount : '';
      const label = st.label.replace(/^Gate card: .*/, 'Gate bonus');
      line.textContent = st.note ? `${label} (${st.note})${amt}` : `${label}${amt || '  +0'}`;
      $('steps' + i).append(line);
      if (before && gateStep(st)) continue;          // already counted in before the Ability cards
      await countUp($('g' + i), shown, shown + st.amount); shown += st.amount;
      await sleep(250);
    }
    if (shown !== sd.total) await countUp($('g' + i), shown, sd.total);   // the Gate bonus changed after Ability cards
  }
  if (b.sides.length === 2) {
    const [x, y] = b.sides.map(s => s.total);
    $('vs').textContent = x > y ? '>' : x < y ? '<' : '=';
    $('vs').classList.add('big');
  }
  // teams: their Bakugan add up (shown under each), the highest team wins
  b.sides.forEach((sd, i) => {
    const tm = R.teamOf(state, sd.p), mates = b.sides.filter(x => R.teamOf(state, x.p) === tm).length;
    $('win' + i).textContent = b.result === 'tie' ? 'TIE' : tm === b.result ? 'WINNER' : '';
    if (mates > 1) $('win' + i).insertAdjacentHTML('beforebegin', `<div class="team">Team total ${b.teamTotal[tm]}G</div>`);
  });
  $('bnext').hidden = false;
  await new Promise(res => $('bnext').onclick = res);
  o.hidden = true;
}
async function countUp(el, from, to) {
  const dir = to >= from ? 10 : -10;
  for (let v = from; dir > 0 ? v <= to : v >= to; v += dir) { el.textContent = v + 'G'; await sleep(35); }
  el.textContent = to + 'G';
}

function gameOver() {
  const w = state.winner;
  $('over').hidden = false;
  const names = w === 'draw' ? [] : state.players.map((pl, q) => q).filter(q => R.teamOf(state, q) === w).map(q => state.players[q].name);
  $('overText').textContent = w === 'draw' ? 'Draw!' : `${names.join(' & ')} win${names.length > 1 ? '' : 's'}!`;
  say('');
  // story mode: hand the result back to The Commons
  if (storyMatch) {
    const res = { key: storyMatch.key, winner: w, players: state.players.map((pl, q) => ({
      team: R.teamOf(state, q), beaten: Math.round(storyStats[q].beaten), gates: Math.round(storyStats[q].gates),
      life: pl.life, dealt: state.nv ? state.players.filter((o, r) => !sameTeam(q, r)).reduce((n, o) => n + (R.START_LIFE - Math.max(0, o.life)), 0) : 0 })) };
    try { sessionStorage.setItem('marbles-story-result', JSON.stringify(res)); } catch {}
    $('again').textContent = 'Back to The Commons'; $('again').onclick = () => { location.href = 'story.html'; };
  }
  // your profile's statistics (My Room > Info > Statistics)
  if (matchPicked) matchPicked.forEach((c, p) => {
    if (c && c.profile !== undefined && c.profile !== null) {
      const opp = matchPicked[foesOf(p)[0] ?? state.players.findIndex((_, q) => !sameTeam(q, p))] || {};
      const bp = Profiles.record(c.profile, { opponent: opp.id, won: w !== 'draw' && R.teamOf(state, p) === w, gates: state.players[p].captured.length, knockouts: knockouts[p], level: opp.level || 'normal' });
      $('overText').textContent += `  ${c.name} +${bp} BP`;
    }
  });
}

// ---------- render loop
const lim = MAT - RADIUS;
function bounceRails(b, r) {
  const L = MAT - r;
  if (Math.abs(b.pos.x) > L) { b.pos.x = Math.sign(b.pos.x) * L; b.vel.x *= -0.6; }
  if (Math.abs(b.pos.z) > L) { b.pos.z = Math.sign(b.pos.z) * L; b.vel.z *= -0.6; }
}
function stepPhysics(dt) {
  const { ball, stands } = roll;
  // 1) the thrown ball rolls
  if (!ball.done) {
    const { tm, pos, vel } = ball;
    const sp = vel.length();
    let decel = sp < SETTLE_SPEED ? FRICTION * 0.8 + sp * 1.2 : FRICTION;
    // Magnet: over a Gate card and slowing down -> brakes harder and drifts toward the card's center.
    const st = statsOf(ball.p, ball.t), under = sp < MAGNET_SPEED ? fieldIndexAt(pos) : null;
    if (under !== null && lv(st, 'magnet') > 1) {
      decel += magnetBrake(st);
      const c = cellCenter(state.field[under].cell);
      vel.add(new THREE.Vector3(c.x - pos.x, 0, c.z - pos.z).normalize().multiplyScalar(magnetPull(st) * dt));
    }
    const ns = Math.max(0, vel.length() - decel * dt);
    const sp2 = vel.length();
    if (sp2 > 0) vel.multiplyScalar(ns / sp2);
    pos.addScaledVector(vel, dt); bounceRails(ball, RADIUS);
    tm.holder.position.copy(pos);
    if (ns > 0) tm.obj.rotateOnWorldAxis(new THREE.Vector3(vel.z, 0, -vel.x).normalize(), (ns * dt) / RADIUS);
    if (ns < SETTLE_SPEED) {                               // ease onto its base as it slows
      const k = 1 - ns / SETTLE_SPEED;
      tm.obj.quaternion.slerp(UPRIGHT, Math.min(1, 0.05 + k * k * 0.35));
    }
    if (ns < 3) { tm.obj.quaternion.copy(UPRIGHT); vel.set(0, 0, 0); ball.done = true; }
  }
  // 2) standing toys that were hit slide and slow down quickly
  for (const b of stands) {
    const sp = b.vel.length(); if (sp === 0) continue;
    const ns = Math.max(0, sp - standGrip(statsOf(b.p, b.t)) * dt);
    b.vel.multiplyScalar(sp ? ns / sp : 0);
    b.pos.addScaledVector(b.vel, dt); bounceRails(b, STAND_R);
    b.tm.holder.position.copy(b.pos);
  }
  // 3) toys are solid: bounce off each other
  const all = [ball, ...stands];
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
    const a = all[i], c = all[j];
    const ra = a.kind === 'ball' ? RADIUS : STAND_R, rc = c.kind === 'ball' ? RADIUS : STAND_R;
    const n = new THREE.Vector3(c.pos.x - a.pos.x, 0, c.pos.z - a.pos.z); const d = n.length();
    if (d === 0 || d >= ra + rc) continue;
    n.divideScalar(d);
    // who is doing the hitting: the one moving harder toward the other
    const va = a.vel.dot(n), vc = -c.vel.dot(n);
    const m = va >= vc ? a : c, t = m === a ? c : a, nn = m === a ? n : n.clone().negate();
    const vm = Math.max(0, m.vel.dot(nn) - t.vel.dot(nn));
    const overlap = ra + rc - d;
    const wall = fixed(t) || (t.kind === 'stand' && levelOf(m, 'speed') < levelOf(t, 'defense'));
    // one push per pair per throw: a follow-up touch just stops the hitter (no pushing a Bakugan along)
    const key = (m.kind + m.p + m.t) + '>' + (t.kind + t.p + t.t);
    const again = !wall && t.kind === 'stand' && roll.pushed && roll.pushed.has(key);
    if (wall || again || fixed(m) && fixed(t)) {
      m.pos.addScaledVector(nn, -overlap);                 // push the hitter out
      if (vm > 0) m.vel.addScaledVector(nn, -(1 + (again ? 0 : WALL_BOUNCE)) * vm);
    } else {
      m.pos.addScaledVector(nn, -overlap / 2); t.pos.addScaledVector(nn, overlap / 2);
      if (vm > 0) {
        if (t.kind === 'ball') {                           // a slid Bakugan bumping the rolling ball
          t.vel.addScaledVector(nn, vm * 0.6); m.vel.addScaledVector(nn, -vm * 0.6);
        } else {
          const T = GAP_PUSH[Math.min(2, levelOf(m, 'speed') - levelOf(t, 'defense'))];
          t.vel.addScaledVector(nn, vm * PUSH_SHARE * T);
          m.vel.addScaledVector(nn, -vm * 0.8 * T);        // the hitter loses what it handed over
          (roll.pushed ||= new Set()).add(key);
        }
      }
    }
    for (const b of [a, c]) { if (b.kind === 'stand') b.moved = true; b.tm.holder.position.copy(b.pos); }
  }
  // 4) done when everything has stopped
  if (ball.done && stands.every(b => b.vel.lengthSq() < 1)) rollStopped();
}
const clock = new THREE.Clock();
const UPRIGHT = new THREE.Quaternion();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  camera.position.lerp(camGoal, 0.08);
  camera.lookAt(camTarget);
  hideOccluders();
  if (roll) stepPhysics(dt);
  for (const tm of [...toysMesh.flat(), ...trapMeshes.map(x => x.tm)]) {
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

// ---------- setup: teams are picked on the setup screen (setup.js)
function wireAbilityButton() {
  $('abtn').onclick = () => { if (fieldPhase) { $('ask').hidden = true; openAbilityPanel(); } };
  $('aclose').onclick = closeAbilityPanel;
  $('aprompt').onchange = e => setPrompt(e.target.checked);
}

let arenaDef = null; const arenaMeshes = [];
// Some attribute arenas have scenery between the camera and the mat (the Pyrus volcano): hide whatever blocks the view of the mat.
const _occ = new THREE.Raycaster(); let _occN = 0;
function hideOccluders() {
  if (!arenaMeshes.length || ++_occN % 10) return;
  const dir = camTarget.clone().sub(camera.position), dist = dir.length(); _occ.set(camera.position, dir.normalize()); _occ.far = dist - 20;
  for (const h of _occ.intersectObjects(arenaMeshes, false)) h.object.visible = false;
}
async function start() {
  wireAbilityButton();
  try { pack = await Pack.fromDevice(); } catch (e) { pack = null; }
  if (!pack) { $('loading').textContent = 'No asset pack on this device yet. Go back and load it first.'; return; }
  $('loading').textContent = 'Loading arena…';
  let match0 = null; try { match0 = JSON.parse(sessionStorage.getItem('marbles-match') || 'null'); } catch {}
  arenaDef = pack.catalog.arenas.find(a => match0 && a.id === match0.arena) || pack.catalog.arenas[0];
  const arena = await loader.loadAsync(await pack.url(arenaDef.model));
  arena.scene.traverse(o => { if (o.isMesh) { o.frustumCulled = false; arenaMeshes.push(o); } });
  scene.add(arena.scene);
  const backPath = (pack.catalog.cardBacks || {}).gate;
  if (backPath) {
    gateBack = await new THREE.TextureLoader().loadAsync(await pack.url(backPath));
    gateBack.colorSpace = THREE.SRGBColorSpace; gateBack.anisotropy = 4;
  }
  const cat = pack.catalog;
  $('loading').hidden = true;
  let match = null; try { match = JSON.parse(sessionStorage.getItem('marbles-match') || 'null'); } catch {}
  const picked = match && match.players && match.players.length >= 2 && match.players.length <= 4 ? match.players : null;
  const TEAMS = picked && picked.length > 2 ? (match.teams || picked.map((_, i) => i)) : null;   // Tag Team [0,1,0,1], Battle Royale [0,1,2,3]
  // a character comes with its deck at the level picked (Easy / Normal / Hard); "You" builds your own
  const NV = !!(match && match.rules === 'nv');
  matchPicked = picked;
  storyMatch = match && match.story || null;
  // You: your profile's name, face and deck (built in My Room)
  if (picked) picked.forEach(c => {
    if (c.profile === undefined || c.profile === null) return;
    const pr = Profiles.load().slots[c.profile]; if (!pr) return;
    c.name = pr.name; c.face = pr.face || c.face;
    const d = NV ? (pr.deckNV || pr.deck) : pr.deck;   // each rule set has its own deck
    if (d && d.toys && d.toys.length === 3 && GATE_COLORS.every(k => d.gates[k]) && AB_COLORS.every(k => d.abilities[k]))
      c.team = { upgrades: 0, toys: d.toys, gates: Object.fromEntries(GATE_COLORS.map(k => [k, { id: d.gates[k] }])), abilities: Object.fromEntries(AB_COLORS.map(k => [k, { id: d.abilities[k] }])),
        extra: Object.fromEntries(AB_COLORS.map(k => [k, ((d.extra || {})[k] || []).map(id => ({ id }))])) };
  });
  if (picked) picked.forEach((c, p) => {
    const lvl = c.level || (typeof c.ai === 'string' ? c.ai : null);
    if (lvl && AI_TEAMS[c.id] && !c.team) c.team = AI_TEAMS[c.id][lvl];   // story mode passes its own team (with that season's upgrades)
    if (c.ai) aiLevel[p] = lvl || 'normal';
  });
  const { players, first } = await setupTeams(cat, pack, picked, null, null, NV);
  // computer upgrades: each adds UPGRADE_G to every Bakugan on its team, up to the 600G cap
  players.forEach((pl, p) => { const up = picked && picked[p].team ? picked[p].team.upgrades : 0; if (up) pl.toys.forEach(t => { t.g = Math.min(600, t.g + up * UPGRADE_G); }); });
  // your Bakugan's upgrades from the Shop (G-Power and levels)
  players.forEach((pl, p) => {
    const c = picked && picked[p]; if (!c || c.profile === undefined || c.profile === null) return;
    const pr = Profiles.load().slots[c.profile]; if (!pr || !pr.owned) return;
    pl.toys.forEach(t => { const d = cat.toys.find(x => x.id === t.id); if (!d) return; const u = Profiles.upgraded(d, t.attr, pr.owned); t.g = u.g; t.stats = { ...t.stats, ...u.stats }; });
  });
  // a profile without a deck yet keeps the one just built
  if (picked) picked.forEach((c, p) => { if (c.profile !== undefined && c.profile !== null && !c.team) Profiles.update(c.profile, q => { q.deck = {
    toys: players[p].toys.map(t => ({ id: t.id, attr: t.attr })), gates: Object.fromEntries(GATE_COLORS.map((k, i) => [k, players[p].gates[i].id])),
    abilities: Object.fromEntries(AB_COLORS.map((k, i) => [k, players[p].abilities[i].id])) }; }); });
  if (picked) for (let p = 0; p < picked.length; p++) { try { const u = picked[p].face && picked[p].face.startsWith('data:') ? picked[p].face : await pack.url(picked[p].face); $('p' + p + 'name').insertAdjacentHTML('beforebegin', `<img class="face" src="${u}" alt="">`); } catch {} }
  $('loading').hidden = false;
  // a New Vestroia character's own Trap (js/aiteams.js)
  players.forEach((pl, p) => {
    const tr = NV && picked && picked[p] && picked[p].team && picked[p].team.trap; if (!tr) return;   // Traps are for New Vestroia rules
    pl.trap = { type: 'trap', color: 'trap', id: 'ai-' + tr.id, trapId: tr.id, trapColor: tr.color, name: `Trap: ${tr.name}`, attrs: tr.attrs,
      text: `Adds the Gate bonus for ${tr.attrs.map(a => a[0].toUpperCase() + a.slice(1)).join(', ')}.` };
  });
  // your Trap from My Room > Deck (one per game, played like an Ability card in a battle)
  players.forEach((pl, p) => {
    const c = picked && picked[p]; if (!c || c.profile === undefined || c.profile === null) return;
    const pr = Profiles.load().slots[c.profile]; const dk = pr && (pr.deckNV || pr.deck); const tr = NV && dk && dk.trap && (pr.owned.traps || []).find(x => x.uid === dk.trap);
    const d = tr && (cat.traps || []).find(x => x.id === tr.id);
    if (d) pl.trap = { type: 'trap', color: 'trap', id: tr.uid, trapId: d.id, trapColor: tr.color, name: `Trap: ${d.name}`, attrs: tr.attrs,
      text: `Adds the Gate bonus for ${tr.attrs.map(a => a[0].toUpperCase() + a.slice(1)).join(', ')}.` };
  });
  state = R.newMatch(players, { first, nv: NV, teams: TEAMS, arena: arenaDef.attr || null });
  if (arenaDef.attr) say(`${arenaDef.name}: ${arenaDef.attr[0].toUpperCase() + arenaDef.attr.slice(1)} Bakugan get +${R.ARENA_BONUS}G`);
  $('loading').textContent = 'Loading Bakugan…';
  for (let p = 0; p < state.players.length; p++) for (const t of state.players[p].toys) toysMesh[p].push(await loadToy(t));
  snapToys();
  cameraFor(viewOf(first)); camera.position.copy(camGoal);
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
    const to = cellCenter(state.field[fieldIdx].cell); const d = new THREE.Vector3(to.x - from.x, 0, to.z - from.z);
    const dist = d.length() + overshoot; throwToy(d.setLength(Math.sqrt(2 * FRICTION * dist) * 0.97));
  },
  select, get busy() { return busy; },
  // tap a choice in the bottom bar (Gate card index, or -1 = Skip) / tap a spot on the mat
  get choosing() { return pickWait ? 'pick' : spotTap ? 'spot' : gateResolve ? 'gate' : null; },
  get fieldPhase() { return fieldPhase; },
  get asking() { return !$('ask').hidden; },
  answer: yes => $(yes ? 'askYes' : 'askNo').click(),
  get fieldOptions() { return fieldOpts(); },
  useFieldCard: i => useFieldCard(i),
  project: (p, t) => { const v = toysMesh[p][t].holder.position.clone().project(camera); const r = renderer.domElement.getBoundingClientRect(); return [Math.round((v.x + 1) / 2 * r.width + r.left), Math.round((1 - v.y) / 2 * r.height + r.top)]; },
  toyMesh: (p, t) => toysMesh[p][t],
  debugToy: p => toysMesh[p].map(m => ({ vis: m.holder.visible, pos: m.holder.position.toArray().map(Math.round), open: m.open, scale: m.holder.scale.x })),
  giveCard: (p, name) => { const c = pack.catalog.cards.find(x => x.name === name); if (c) state.players[p].abilityHand.push(c); return !!c; },
  closePanel: () => closeAbilityPanel(),
  pickGate: i => { const b = $('picker').querySelector(`[data-g="${i}"]`); if (b) b.click(); },
  get abilityChoices() { return abilityResolve ? [...$('bplay').querySelectorAll('button')].map(b => +b.dataset.a) : null; },
  playAbility: i => { const b = $('bplay').querySelector(`[data-a="${i}"]`); if (b) b.click(); },
  armThrowCard: () => { const b = $('picker').querySelector('.chip.red'); if (b) { b.click(); return true; } return false; },
  takeCard: () => { const b = $('picker').querySelector('[data-g="-2"]'); if (b) b.click(); },
  get spots() { return spotTap ? spotTap.cells : []; },
  tapSpot: cell => spotTap && spotTap.finish(cell),
  setStats: (p, t, st) => { state.players[p].toys[t].stats = { ...state.players[p].toys[t].stats, ...st }; },
};
start();
