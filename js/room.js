// My Room: Info (Tips, Ranking, Statistics), Save (6 profiles), Deck, Closet (character creator) and the Bakugan collection.
import * as THREE from 'three';
import { Pack } from './pack.js';
import { buildAvatar, idle, relaxArms, PARTS, SKIN_TONES, DEFAULT_LOOK, randomLook, RACES, RACE_LABEL, RACE_OPT, PLATE_COLOR, opt } from './avatar.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as P from './profiles.js';
import { setupTeams, GATE_COLORS, AB_COLORS } from './setup.js';
import { STARTERS } from './aiteams.js';
import { isCoded } from './abilities.js';
import { tierOf, priceOf, isSoldToy, trapAttrCap, discountOn, salesOnDay, saleText } from './storyshop.js';

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pack, M, urls = new Map();
// menu art from the pack; a few pictures live in the app instead (img/creator: the girl hair icons, styles 10-15, rendered
// from their models by tools/hairicons.html in the DS icon style). The pack's own copy wins if it has one.
const APP_ART = new Set(['part_hair10', 'part_hair11', 'part_hair12', 'part_hair13', 'part_hair14', 'part_hair15', 'part_bottom8', 'part_bottom9']);
const art = k => urls.get(M.files[k]) || (APP_ART.has(k) ? `img/creator/${k}.png` : '');
const img = (k, x, y, cls = '', extra = '') => art(k) ? `<img src="${art(k)}" style="left:${x}px;top:${y}px" class="${cls}" ${extra} alt="">` : '';

// ---- the two screens, scaled to the phone
function fit() {
  const w = document.documentElement.clientWidth, h = document.documentElement.clientHeight, s = Math.min(w / 256, h / 384);
  $('ds').style.transform = `translate(${(w - 256 * s) / 2}px, ${(h - 384 * s) / 2}px) scale(${s})`;
  renderer.setPixelRatio(Math.min(4, s * (devicePixelRatio || 1))); renderer.setSize(256, 192, false);
}
function bar(text) {
  $('bar')?.remove();
  const b = document.createElement('div'); b.id = 'bar'; b.innerHTML = '<span id="barText"></span>'; $('bot').append(b);
  const t = $('barText'); t.textContent = text;
  requestAnimationFrame(() => {
    const w = t.offsetWidth;
    if (w > 240) { t.style.setProperty('--to', `-${w}px`); t.style.animationDuration = `${(w + 256) / 40}s`; t.classList.add('run'); }
    else t.style.left = (250 - w) + 'px';
  });
}
const backBtn = (fn) => { $('bot').insertAdjacentHTML('beforeend', `<img src="${art('back')}" class="tap" id="bBack" style="left:223px;top:170px" alt="">`); $('bBack').onclick = fn; };

// ---- 3D: your character on the top screen
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
$('view3d').append(renderer.domElement);
const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xffffff, 2.3));
const camera = new THREE.PerspectiveCamera(30, 256 / 192, 0.01, 50);
const holder = new THREE.Group(); scene.add(holder);
const floor = new THREE.Mesh(new THREE.CircleGeometry(0.35, 40), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 }));
floor.rotation.x = -Math.PI / 2; floor.position.y = 0.002; scene.add(floor);
// the bedroom from the first DS game, around your character
let room3d = null;
async function loadRoom() {
  try {
    const g = await new GLTFLoader().loadAsync(await pack.url(M.files.room3d));
    room3d = g.scene; room3d.scale.setScalar(0.0085); room3d.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
    scene.add(room3d); room3d.visible = showRoom;
  } catch {}
}
let showRoom = true;
let avatar = null, avatarKey = '', building = null, view = 'full', spin = 0, show3d = false;
const VIEWS = { full: [0.5, 2.9], head: [0.86, 1.0], upper: [0.62, 1.5], lower: [0.25, 1.6], side: [0.5, 2.6] };
let camY = 0.5, camD = 2.9;
function setView(v) { view = v; }
async function showAvatar(look) {
  const key = JSON.stringify(look);
  if (key === avatarKey && avatar) return;
  avatarKey = key;
  const job = building = buildAvatar(look, p => pack.url(p));
  const a = await job; if (job !== building) return;
  if (avatar) holder.remove(avatar);
  avatar = a; holder.add(a);
}
let drag = null;
renderer.domElement.addEventListener('pointerdown', e => { drag = e.clientX; });
addEventListener('pointerup', () => { drag = null; });
renderer.domElement.addEventListener('pointermove', e => { if (drag !== null) { spin += (e.clientX - drag) * 0.02; drag = e.clientX; } });
renderer.setAnimationLoop(() => {
  if (!show3d) return;
  const [ty, td] = VIEWS[view] || VIEWS.full; camY += (ty - camY) * 0.15; camD += (td - camD) * 0.15;
  const ox = view === 'full' ? 0.25 : 0;      // the full view shows the desk and shelves beside you, like the DS
  if (inShop) { shopCam(); idle(alice, performance.now() / 1000); }
  else { camera.position.set(ox, camY + 0.12, camD); camera.lookAt(ox * 0.6, camY, 0); }
  holder.rotation.y += (spin - holder.rotation.y) * 0.2;
  idle(avatar, performance.now() / 1000);
  renderer.render(scene, camera);
});
// on: show your character; bg: a picture behind it instead of the bedroom
function top3d(on, bg = '') {
  show3d = on; $('view3d').hidden = !on;
  showRoom = !bg; if (room3d) room3d.visible = showRoom; floor.visible = showRoom;
  $('top').style.background = bg ? bg : '#cfe7ee';
}
const INFO_BG = () => `url(${art('info_top')}) 0 0 / 256px 256px`;
// a face picture for menus and the battle: render the head, cut to the DS face-icon shape
async function faceShot() {
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); r.setSize(128, 128); r.outputColorSpace = THREE.SRGBColorSpace;
  const cam = new THREE.PerspectiveCamera(20, 1, 0.01, 50); cam.position.set(0, 0.86, 0.62); cam.lookAt(0, 0.855, 0);
  const sc = new THREE.Scene(); sc.add(new THREE.AmbientLight(0xffffff, 2.3));
  const keep = [holder.rotation.y, holder.position.x]; holder.rotation.y = 0; holder.position.x = 0; scene.remove(holder); sc.add(holder);
  r.render(sc, cam); sc.remove(holder); scene.add(holder); [holder.rotation.y, holder.position.x] = keep;
  const out = document.createElement('canvas'); out.width = 32; out.height = 32; const x = out.getContext('2d');
  x.imageSmoothingEnabled = true; x.drawImage(r.domElement, 10, 14, 108, 92, 0, 0, 28, 24);
  const mask = new Image(); mask.src = art('face_dan'); await mask.decode();
  x.globalCompositeOperation = 'destination-in'; x.drawImage(mask, 0, 0);
  r.dispose(); return out.toDataURL('image/png');
}

// ---- screens
let screen = 'room', roomSel = 3, slot = null;
const prof = () => { if (STORY) return storyProf(); const d = P.load(); const p = d.active !== null ? d.slots[d.active] : null; if (p && (p.bp === undefined || !p.owned)) { P.ensureShop(p); P.save(d); } return p; };
const act = () => P.load().active;
// ---------- Story mode store (Billy, Nov 20): room.html?story=1 opens this store for story mode, with your story BP,
// your story collection, league locks and the season's sales. The clerk is our own character (not from the show).
const STORY = new URLSearchParams(location.search).has('story');
const SKEY = 'marbles-story';
const sLoad = () => { try { return JSON.parse(localStorage.getItem(SKEY) || 'null'); } catch { return null; } };
const sSave = s => { try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch {} };
const sLeague = s => Math.min(4, s.season.leagues.findIndex(l => l.includes('you')) + 1);
function storyProf() {
  const s = sLoad(), y = s.you, w = s.season.B.you;
  return { name: y.name || 'You', look: y.look || DEFAULT_LOOK, deck: sDeckIds(y), deckNV: sDeckIds(y), bp: w.wallet, owned: { toys: Object.fromEntries(Object.keys(y.coll.toys).map(k => [k, { g: 0, st: {}, ...JSON.parse(JSON.stringify(y.coll.toys[k] || {})) }])), cards: [...y.coll.cards], traps: [...y.coll.traps] } };
}
// story decks store { id, name } objects; My Room's deck screen uses plain ids (and a Trap's uid)
function sDeckIds(y) {
  const d = y.deck; if (!d) return null;
  const id = x => x && (x.id || x), tr = d.trap && (y.coll.traps || []).find(t => t.id === d.trap.id && (t.attrs || []).join() === (d.trap.attrs || []).join());
  return { toys: d.toys.map(x => ({ id: x.id, attr: x.attr })), gates: Object.fromEntries(GATE_COLORS.map(c => [c, id(d.gates[c])])),
    abilities: Object.fromEntries(AB_COLORS.map(c => [c, id(d.abilities[c])])), extra: Object.fromEntries(AB_COLORS.map(c => [c, ((d.extra || {})[c] || []).map(id)])), trap: tr ? tr.uid : null };
}
function sDeckFromIds(d, s) {
  const card = i => { const c = pack.catalog.cards.find(x => x.id === i); return c ? { id: c.id, name: c.name } : null; };
  const tr = d.trap && s.you.coll.traps.find(t => t.uid === d.trap);
  return { toys: d.toys.map(x => ({ id: x.id, attr: x.attr, name: (pack.catalog.toys.find(t => t.id === x.id) || {}).name })),
    gates: Object.fromEntries(GATE_COLORS.map(c => [c, card(d.gates[c])])), abilities: Object.fromEntries(AB_COLORS.map(c => [c, card(d.abilities[c])])),
    extra: Object.fromEntries(AB_COLORS.map(c => [c, ((d.extra || {})[c] || []).map(card).filter(Boolean)])), trap: tr ? { id: tr.id, name: tr.name, attrs: tr.attrs } : null };
}
// apply a purchase: to the active profile, or (story mode) to the story save
function upd(fn) {
  if (!STORY) return P.update(act(), fn);
  const s = sLoad(), q = storyProf(); fn(q);
    s.season.B.you.wallet = q.bp; const nd = q.deckNV || q.deck; if (nd && nd.toys && nd.toys.length === 3) s.you.deck = sDeckFromIds(nd, s);
  for (const k of Object.keys(q.owned.toys)) s.you.coll.toys[k] = q.owned.toys[k];   // each Bakugan's own upgrades (G-Power and stats) live here
  s.you.coll.cards = [...new Set([...s.you.coll.cards, ...q.owned.cards])];
  for (const t of q.owned.traps) if (!s.you.coll.traps.some(x => x.uid === t.uid)) {
    const T = (pack.catalog.traps || []).find(x => x.id === t.id) || {};
    const tr = { uid: t.uid, id: t.id, name: T.name || t.id, attrs: t.attrs, color: t.color };
    s.you.coll.traps.push(tr); if (!s.you.deck.trap) s.you.deck.trap = { id: tr.id, name: tr.name, attrs: tr.attrs };
  }
  sSave(s);
}
// story prices: tier price, less today's sale; null = locked for your league
function sPrice(kind, x, item) {
  const s = sLoad(), base = priceOf(kind, x), off = discountOn(s.season, s.day, item);
  return { price: Math.round(base * (100 - off) / 100), full: base, off, lock: tierOf(kind, x) < sLeague(s) ? tierOf(kind, x) : 0 };
}
const CLERK = { name: 'Alice', look: { hair: [12, 7], cap: [-1, 0], glasses: [-1, 0], eye: [6, 3], eyeblow: [6, 7], facial: [0, 0], top: [3, 4], down: [8, 1], shoes: [1, 2], skin: 1, band: 'aquos' } };
function go(s, ...a) { if (s !== 'shop') { inShop = false; if (shop3d) shop3d.visible = false; holder.visible = true; } screen = s; $('topUI').innerHTML = ''; $('bot').innerHTML = ''; ({ room, closet, deck, save, info, tips, ranking, stats, starter, shop, shopList, upgrade, trapShop, storyBoost })[s](...a); }

// My Room: the DS carousel
const ROOM = [['info', 'INFO', 'You can check your statistics on the computer.'], ['save', 'SAVE', 'Switch players or start a new one (up to 6).'],
  ['deck', 'DECK', 'View and edit your deck.'], ['closet', 'CLOSET', 'Change your look and your name.'], ['shop', 'SHOP', 'Spend your BP on Bakugan, cards and upgrades.'],
  ['collection', 'BAKUGAN', 'Look through every Bakugan — models, stats and colors.']]; if (STORY) { ROOM.splice(0, ROOM.length, ...ROOM.filter(x => ['deck', 'closet', 'shop'].includes(x[0]))); roomSel = 1; }
function room() {
  const p = prof();
  if (!p) return go('save');
  if (!p.deck && !Object.keys(p.owned.toys).length) return go('starter');
  top3d(true); setView('full'); showAvatar(p.look);
  $('topUI').innerHTML = `<div class="bubble"><b>${esc(p.name)}</b>${({ closet: 'I should change my look.', deck: 'I should reorganize my deck.', save: 'I should save my progress.' })[ROOM[roomSel][0]] || 'What should I do?'}</div>`;
  const n = ROOM.length, L = (roomSel + n - 1) % n, R = (roomSel + 1) % n;
  $('bot').innerHTML = img('room_bot', 0, 0) +
    `<img src="${art(ROOM[L][0] === 'shop' ? 'shop_bakugan' : 'room_' + ROOM[L][0])}" class="tap" id="rL" style="left:2px;top:56px" alt="">` +
    `<img src="${art(ROOM[roomSel][0] === 'shop' ? 'shop_bakugan_on' : 'room_' + ROOM[roomSel][0] + '_on')}" class="tap" id="rC" style="left:88px;top:44px" alt="">` +
    `<img src="${art(ROOM[R][0] === 'shop' ? 'shop_bakugan' : 'room_' + ROOM[R][0])}" class="tap" id="rR" style="left:186px;top:56px" alt="">` +
    `<div class="txt" style="left:4px;top:20px;padding:0 6px;border-radius:7px;background:#0a2a66;border:1px solid #39b8ff;font:900 9px/12px system-ui">BP ${p.bp}</div>` +
    `<div style="position:absolute;left:0;right:0;top:132px;height:14px;background:linear-gradient(#2f7fe8,#1146a8);border-top:1px solid #9fd0ff;border-bottom:1px solid #0a2a66;text-align:center;font:900 10px/14px system-ui;letter-spacing:1px;text-shadow:0 1px 0 #000">${ROOM[roomSel][1]}</div>`;
  bar(ROOM[roomSel][2]);
  $('rL').onclick = () => { roomSel = L; go('room'); };
  $('rR').onclick = () => { roomSel = R; go('room'); };
  $('rC').onclick = () => { const k = ROOM[roomSel][0]; if (k === 'collection') location.href = 'viewer.html'; else go(k); };
  backBtn(() => { location.href = STORY ? 'story.html' : './'; });
}

// Closet: the character creator
const CAT = { Head: ['race', 'hair', 'cap', 'glasses', 'eye', 'skin'], 'Upper body': ['top', 'band'], 'Lower body': ['down', 'shoes'] };
const ICON = { hair: 'hair', cap: 'cap', glasses: 'glasses', eye: 'face', top: 'top', down: 'bottom', shoes: 'shoes', skin: 'skin' };
const LABEL = { race: 'Race', band: 'Gauntlet', hair: 'Hair', cap: 'Hat', glasses: 'Glasses', eye: 'Face', skin: 'Skin', top: 'Upper body', down: 'Pants', shoes: 'Shoes' };
const VIEW_OF = { race: 'head', band: 'upper', hair: 'head', cap: 'head', glasses: 'head', eye: 'head', skin: 'full', top: 'upper', down: 'lower', shoes: 'lower' };
let look = null, editCat = null, editPart = null, isNew = false;
function closet(start) {
  const p = prof();
  if (start) { look = start.look; isNew = !!start.isNew; } else if (!look) look = JSON.parse(JSON.stringify(p ? p.look : DEFAULT_LOOK));
  top3d(true); setView(editPart ? VIEW_OF[editPart] : editCat === 'Head' ? 'head' : editCat === 'Upper body' ? 'upper' : editCat === 'Lower body' ? 'lower' : 'full');
  showAvatar(look);
  const name = (p && !isNew) ? p.name : (start && start.name) || closetName;
  $('topUI').innerHTML = `<div style="position:absolute;left:4px;bottom:6px;width:140px;height:14px;border-radius:7px;background:#000c;border:2px solid #1aa3c8;font:800 9px/11px system-ui;padding-left:8px">${esc(name)}</div>`;
  // body figure with the part being edited lit up
  let h = img('edit_bot', 0, 0) + img('edit_panel', 6, 18) + img('edit_figure', 36, 22);
  const right = (html) => h += html;
  if (!editCat) {
    bar('Create your character.');
    ['Random', 'Head', 'Upper body', 'Lower body'].forEach((t, i) => right(`<div class="pill tap ${t === 'Random' ? 'sel' : ''}" data-cat="${t}" style="left:138px;top:${22 + i * 26}px;width:112px">${t}</div>`));
    right(`<div class="pill tap" id="cName" style="left:138px;top:126px;width:112px">Name</div>`);
    right(`<div class="pill gold tap" id="cDone" style="left:138px;top:170px;width:80px">Done</div>`);
  } else if (!editPart) {
    bar(editCat);
    right(`<div class="pill" style="left:138px;top:22px;width:112px">${editCat}</div>`);
    CAT[editCat].forEach((k, i) => right(`<div class="pill tap" data-part="${k}" style="left:144px;top:${48 + i * 22}px;width:106px">${LABEL[k]}</div>`));
  } else if (editPart === 'race') {
    // race (Billy, Nov 21): Human, Vestal, Gundalian, Neathian, then that race's options (see RACE_OPT in avatar.js)
    const r = look.race || 'human';
    bar(r === 'gundalian' ? 'Gundalian: gray skin, eye marks, neck marks and a forehead plate.'
      : r === 'neathian' ? 'Neathian: diamond eyes and an arc on the upper face. Skin: light blue (male) or light pink (female).'
      : r === 'vestal' ? 'Vestal: hazed eyes.' : 'Race');
    right(`<div class="pill" style="left:138px;top:20px;width:112px">Race</div><div class="box" style="left:136px;top:40px;width:116px;height:128px"></div>`);
    RACES.forEach((v, i) => right(`<div class="pill tap ${r === v ? 'sel gold' : ''}" data-race="${v}" style="left:${141 + (i % 2) * 55}px;top:${44 + Math.floor(i / 2) * 20}px;width:52px;height:17px;line-height:17px;font-size:8.5px">${RACE_LABEL[v]}</div>`));
    const ROWS = { gundalian: [['plate', 'Plate', { band: 'Band', horns: 'Horns', none: 'None' }], ['plateColor', 'Color'], ['marks', 'Marks', { under: 'Under', around: 'Around' }], ['ears', 'Ears', { pointed: 'Pointed', round: 'Round' }]],
      neathian: [['sex', 'Body', { m: 'Male', f: 'Female' }], ['neye', 'Eyes', { blue: 'Blue', tint: 'Color', normal: 'Normal' }], ['ears', 'Ears', { pointed: 'Pointed', round: 'Round' }]] }[r] || [];
    ROWS.forEach(([k, label, names], row) => {
      const y = 88 + row * 20, vals = k === 'sex' ? ['m', 'f'] : RACE_OPT[k], cur = k === 'sex' ? (look.sex || 'm') : opt(look, k);
      right(`<div style="position:absolute;left:140px;top:${y + 3}px;width:26px;font:800 7.5px system-ui;color:#fff">${label}</div>`);
      if (k === 'plateColor') vals.forEach((v, i) => right(`<div class="dot tap ${cur === v ? 'sel' : ''}" data-ropt="${k}" data-v="${v}" style="left:${168 + i * 20}px;top:${y + 1}px;background:${PLATE_COLOR[v]}"></div>`));
      else { const w = Math.floor(80 / vals.length) - 2; vals.forEach((v, i) => right(`<div class="pill tap ${cur === v ? 'sel gold' : ''}" data-ropt="${k}" data-v="${v}" style="left:${167 + i * (w + 2)}px;top:${y}px;width:${w}px;height:17px;line-height:17px;font-size:7.5px;padding:0">${names[v]}</div>`)); }
    });
  } else if (editPart === 'band') {
    // the gauntlet: one color per attribute
    bar('Gauntlet');
    right(`<div class="pill" style="left:138px;top:20px;width:112px">Gauntlet</div><div class="box" style="left:136px;top:40px;width:116px;height:128px"></div>`);
    const cur = look.band || 'pyrus';
    ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'].forEach((a, i) => right(`<div class="tap ${cur === a ? 'sel' : ''}" data-band="${a}" style="position:absolute;left:${142 + (i % 3) * 36}px;top:${48 + Math.floor(i / 3) * 52}px;width:32px;height:46px;text-align:center;border-radius:4px;${cur === a ? 'outline:2px solid #ff8a1c;' : ''}">
      <img src="${art('attr_' + a)}" style="position:static;width:24px;height:32px" alt=""><div style="font:800 6.5px/9px system-ui">${a[0].toUpperCase() + a.slice(1)}</div></div>`));
  } else {
    const k = editPart, def = PARTS[k];
    bar(LABEL[k]);
    right(`<div class="pill" style="left:138px;top:20px;width:112px">${LABEL[k]}</div><div class="box" style="left:136px;top:40px;width:116px;height:128px"></div>`);
    const styles = k === 'skin' ? SKIN_TONES : def.styles + (def.optional ? 1 : 0);
    for (let i = 0; i < styles; i++) {
      const v = k === 'skin' ? i : def.optional ? i - 1 : i, cur = k === 'skin' ? look.skin : look[k][0];
      const pic = art(`part_${ICON[k]}${k === 'skin' ? i : def.optional ? i : i}`);
      const cols = styles > 9 ? 4 : 3, sz = cols === 4 ? 27 : 36;
      if (k === 'skin') { right(`<div class="icon tap ${cur === v ? 'sel' : ''}" data-style="${v}" style="left:${140 + (i % 3) * 37}px;top:${44 + Math.floor(i / 3) * 37}px;background:${((M.swatch || {}).skin || [])[i] || '#ccc'};border:3px solid #c9ced4;box-shadow:inset 0 0 0 1px #0006"></div>`); continue; }
      right(`<img src="${pic}" class="icon tap ${cur === v ? 'sel' : ''}" data-style="${v}" style="left:${140 + (i % cols) * (sz + 1)}px;top:${44 + Math.floor(i / cols) * (sz + 1)}px;width:${sz}px;height:${sz}px" alt="">`);
    }
    if (k !== 'skin') {
      const sw = (M.swatch || {})[k === 'eye' ? 'eye' : k] || [];
      for (let c = 0; c < def.colors; c++) right(`<div class="dot tap ${look[k][1] === c ? 'sel' : ''}" data-color="${c}" style="left:${142 + c * 18}px;top:152px;background:${sw[c] || '#888'}"></div>`);
    }
  }
  $('bot').innerHTML = h;
  $('bot').querySelectorAll('[data-cat]').forEach(b => b.onclick = () => {
    if (b.dataset.cat === 'Random') { look = randomLook(); return go('closet'); }
    editCat = b.dataset.cat; go('closet');
  });
  $('bot').querySelectorAll('[data-part]').forEach(b => b.onclick = () => { editPart = b.dataset.part; go('closet'); });
  $('bot').querySelectorAll('[data-band]').forEach(b => b.onclick = () => { look.band = b.dataset.band; go('closet'); });
  $('bot').querySelectorAll('[data-race]').forEach(b => b.onclick = () => { look.race = b.dataset.race; if (look.race === 'neathian' && !look.sex) look.sex = 'm'; go('closet'); });
  $('bot').querySelectorAll('[data-ropt]').forEach(b => b.onclick = () => { look[b.dataset.ropt] = b.dataset.v; go('closet'); });
  $('bot').querySelectorAll('[data-style]').forEach(b => b.onclick = () => {
    const v = +b.dataset.style; if (editPart === 'skin') look.skin = v; else look[editPart][0] = v;
    if (editPart === 'eye') look.eyeblow[0] = v;
    go('closet');
  });
  $('bot').querySelectorAll('[data-color]').forEach(b => b.onclick = () => {
    const c = +b.dataset.color; look[editPart][1] = c; if (editPart === 'hair') look.eyeblow[1] = c;
    go('closet');
  });
  if ($('cName')) $('cName').onclick = () => askName(name).then(n => { if (n) { closetName = n; if (STORY) { const s = sLoad(); s.you.name = n; sSave(s); } else if (p && !isNew) P.update(P.load().active, q => { q.name = n; }); } go('closet'); });
  if ($('cDone')) $('cDone').onclick = async () => {
    await building; if (STORY) { const s = sLoad(); s.you.look = look; sSave(s); look = null; editCat = editPart = null; return go('room'); }
    const face = await faceShot();
    const d = P.load();
    const fresh = isNew;
    if (isNew) { P.create(d, slot, closetName, look); }
    P.update(P.load().active, q => { q.look = look; q.face = face; });
    look = null; isNew = false; editCat = editPart = null; go(fresh ? 'starter' : 'room');
  };
  backBtn(() => {
    if (editPart) { editPart = null; return go('closet'); }
    if (editCat) { editCat = null; return go('closet'); }
    look = null; if (isNew) { isNew = false; return go('save'); } go('room');
  });
}
let closetName = 'Brawler';
function askName(cur) {
  return new Promise(res => {
    const i = document.createElement('input'); i.className = 'name'; i.maxLength = 12; i.value = cur || ''; i.placeholder = 'Your name';
    $('bot').append(i); bar('Type your name, then press Enter.'); i.focus();
    let fin = false; const done = () => { if (fin) return; fin = true; const v = i.value.trim(); i.remove(); res(v || null); };
    i.onkeydown = e => { if (e.key === 'Enter') done(); }; i.onblur = done;
  });
}

// Deck: what you take into battle
// Two decks: Classic (3 Ability cards) and New Vestroia (up to 9 Ability cards + your Trap)
let deckMode = 'classic';
const deckKey = () => deckMode === 'nv' ? 'deckNV' : 'deck';
const deckOf = p => deckMode === 'nv' ? (p.deckNV || (p.deck && { ...p.deck })) : p.deck;
function deck() {
  if (STORY) deckMode = 'nv'; const p = prof(); if (!p) return go('save');
  top3d(false, `url(${art('arena_top')}) 0 0 / 256px 192px`);
  const nv = deckMode === 'nv', cat = pack.catalog, d = deckOf(p), toyBy = new Map(cat.toys.map(t => [t.id, t])), cardBy = new Map(cat.cards.map(c => [c.id, c]));
  let total = 0, pics = '';
  if (d) {
    d.toys.forEach((x, i) => { const t = toyBy.get(x.id); if (!t) return; total += t.baseG || 0;
      const th = (t.thumbs || {})[x.attr]; pics += th ? `<img data-src="${th}" style="left:${10 + i * 28}px;top:58px;width:28px;height:28px" alt="">` : ''; });
    const ab = AB_COLORS.flatMap(c => [d.abilities[c], ...(nv ? ((d.extra || {})[c] || []) : [])]);
    const cards = [...GATE_COLORS.map(c => d.gates[c]), ...ab], w = nv ? 12 : 25;
    cards.forEach((id, i) => { const c = cardBy.get(id); if (c && c.art) pics += `<img data-src="${c.art}" style="left:${96 + i * w}px;top:${nv ? 58 : 54}px;width:${nv ? 11 : 22}px;height:${nv ? 15 : 30}px" alt="">`; });
    if (nv) pics += `<div class="txt" style="left:96px;top:76px;font-size:7px">${ab.filter(Boolean).length} Ability cards</div>`;
  }
  $('topUI').innerHTML = img('banner_team', 56, 7) +
    `<div class="txt" style="left:16px;top:38px;font:italic 900 10px system-ui">${nv ? 'NEW VESTROIA DECK' : 'CLASSIC DECK'}</div><div class="box" style="left:6px;top:50px;width:244px;height:40px"></div>${pics}` +
    `<div class="txt" style="left:0;right:0;top:104px;text-align:center;color:#ffd54a">Total G-Power</div><div class="txt" style="left:0;right:0;top:118px;text-align:center;font-size:20px;line-height:22px;color:#ffd54a">${d ? total : '—'}</div>`;
  if (nv) { const t = (p.owned.traps || []).find(x => x.uid === (d || {}).trap), td = t && (pack.catalog.traps || []).find(x => x.id === t.id);
    if (td && (td.thumbs || {})[t.color]) $('topUI').insertAdjacentHTML('beforeend', `<img data-src="${td.thumbs[t.color]}" style="left:220px;top:92px;width:30px;height:30px" alt=""><div class="txt" style="left:206px;top:122px;font-size:7px">TRAP</div>`); }
  $('topUI').querySelectorAll('[data-src]').forEach(async im => { im.src = await pack.url(im.dataset.src); });
  const tabBtn = (m, label, x) => `<div class="pill tap ${deckMode === m ? 'sel' : ''}" data-mode="${m}" style="left:${x}px;top:22px;width:106px;height:16px;line-height:14px;font-size:9px">${label}</div>`;
  $('bot').innerHTML = img('arena_bot', 0, 0) + tabBtn('classic', 'Classic deck', 18) + tabBtn('nv', 'New Vestroia deck', 132) +
    `<div class="pill tap" id="dEdit" style="left:40px;top:48px;width:176px">Edit deck</div>` +
    `<div class="pill tap" id="dAuto" style="left:40px;top:74px;width:176px">Auto-Create</div>` +
    `<div class="pill tap" id="dReset" style="left:40px;top:100px;width:176px">Reset</div>` +
    (nv ? `<div class="pill tap" id="dTrap" style="left:40px;top:126px;width:176px">Trap: ${esc(trapLabel(p))}</div>` : '');
  bar(nv ? 'New Vestroia rules: up to 3 Ability cards of each color, plus your Trap.' : d ? 'Classic rules: 1 Ability card of each color.' : 'You have no deck yet — tap Edit deck or Auto-Create.');
  $('bot').querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { deckMode = b.dataset.mode; go('deck'); });
  const edit = async (start) => {
    $('ds').style.visibility = 'hidden';
    const r = await setupTeams(cat, pack, [{ id: 'you', name: p.name }, null], start || d || { name: p.name }, p.owned, nv);
    $('ds').style.visibility = '';
    if (r.deck) upd(q => { q[deckKey()] = { toys: r.deck.toys, gates: r.deck.gates, abilities: r.deck.abilities, extra: nv ? r.deck.extra || {} : {}, trap: nv ? (deckOf(q) || {}).trap || null : null }; });
    go('deck');
  };
  $('dEdit').onclick = () => edit();
  $('dAuto').onclick = () => edit({ name: p.name, toys: [], gates: {}, abilities: {}, auto: true });
  if ($('dTrap')) $('dTrap').onclick = () => {
    const list = p.owned.traps || [];
    if (!list.length) { bar('You have no Traps yet. Buy one in the Shop.'); return; }
    const ids = [null, ...list.map(t => t.uid)], cur = ids.indexOf((d || {}).trap || null);
    upd(q => { const dd = deckOf(q); if (dd) { dd.trap = ids[(cur + 1) % ids.length]; q.deckNV = dd; } }); go('deck');
  };
  $('dReset').onclick = () => { upd(q => { q[deckKey()] = null; }); go('deck'); };
  backBtn(() => go('room'));
}

function trapLabel(p) {
  const t = (p.owned.traps || []).find(x => x.uid === ((p.deckNV || p.deck) || {}).trap); if (!t) return 'none';
  const d = (pack.catalog.traps || []).find(x => x.id === t.id); return `${d ? d.name : 'Trap'} · ${t.attrs.map(a => cap(a).slice(0, 3)).join('/')}`;
}
// Save: 6 players
let deleting = false;
function save() {
  top3d(false, INFO_BG());
  const d = P.load();
  $('topUI').innerHTML = `<div class="bubble" style="bottom:20px"><b>Save</b>${d.active === null ? 'Pick a slot to make your character.' : 'Your progress saves by itself. Pick a player, or an empty slot for a new one.'}</div>`;
  let h = img('arena_bot', 0, 0);
  d.slots.forEach((s, i) => {
    const x = 8 + (i % 3) * 82, y = 22 + Math.floor(i / 3) * 76;
    h += `<div class="slot tap ${d.active === i ? 'sel' : ''}" data-slot="${i}" style="left:${x}px;top:${y}px">` +
      (s ? (s.face ? `<img class="face" src="${s.face}" alt="">` : '') + `<div class="nm">${esc(s.name)}</div>` : `<div class="empty">${deleting ? '' : 'NEW'}</div><div class="nm"></div>`) + `</div>`;
  });
  h += `<div class="pill tap ${deleting ? 'sel' : ''}" id="sDel" style="left:8px;top:172px;width:70px;height:16px;line-height:14px">${deleting ? 'Stop' : 'Delete'}</div>`;
  $('bot').innerHTML = h;
  bar(deleting ? 'Tap a player to delete it.' : 'Choose a player.');
  $('bot').querySelectorAll('[data-slot]').forEach(b => b.onclick = async () => {
    const i = +b.dataset.slot, dd = P.load(), s = dd.slots[i];
    if (deleting) { if (s && confirm(`Delete ${s.name}? This can't be undone.`)) { dd.slots[i] = null; if (dd.active === i) dd.active = dd.slots.findIndex(Boolean) >= 0 ? dd.slots.findIndex(Boolean) : null; P.save(dd); } deleting = false; return go('save'); }
    if (s) { dd.active = i; P.save(dd); return go('room'); }
    slot = i; const n = await askName(''); if (!n) return go('save');
    closetName = n; editCat = editPart = null; go('closet', { look: JSON.parse(JSON.stringify(DEFAULT_LOOK)), isNew: true, name: n });
  });
  $('sDel').onclick = () => { deleting = !deleting; go('save'); };
  if (d.active !== null) backBtn(() => go('room')); else backBtn(() => { location.href = './'; });
}

// Info: Tips, Ranking, Statistics
function info() {
  const p = prof(); top3d(true); setView('full'); showAvatar(p.look);
  $('topUI').innerHTML = `<div class="bubble"><b>${esc(p.name)}</b>What should I do?</div>`;
  const items = [['tips', 'TIPS', '💬'], ['ranking', 'RANKING', '🏆'], ['stats', 'STATISTICS', '📄']];
  $('bot').innerHTML = img('room_bot', 0, 0) + img('room_info', 4, 22) + `<div class="txt" style="left:76px;top:40px;font:italic 900 16px system-ui">INFO</div>` +
    items.map(([k, t, e], i) => `<div class="tap" data-i="${k}" style="position:absolute;left:${18 + i * 78}px;top:82px;width:66px;height:52px;border-radius:6px;background:linear-gradient(#0d3b7a,#06204a);border:2px solid #39b8ff;text-align:center;font:22px/34px system-ui">${e}<div style="font:900 7px/10px system-ui;letter-spacing:.5px">${t}</div></div>`).join('');
  bar('You can check your statistics on the computer.');
  $('bot').querySelectorAll('[data-i]').forEach(b => b.onclick = () => go(b.dataset.i));
  backBtn(() => go('room'));
}
// Tips from the Brawlers, about this game's rules
const TIPS = {
  dan: ['Hey! Let me know when you want to learn more about Bakugan!', 'Throw your Bakugan onto a Gate card. If it stops on the card it stands and opens — even if it only stops partly on the card.',
    'Two of your Bakugan on one card? You can take that card, or move one to a card touching it.', 'Win 3 Gate cards and you win the match!'],
  runo: ['Hi! Want some advice?', 'Speed is how hard your Bakugan hits. If it is less than the other Bakugan’s Defense, it just bounces off.',
    'Magnet is how well your Bakugan sticks to the card. High Magnet means it barely slides when it gets hit.', 'Knock an opponent’s Bakugan off its card and you win that card — that’s a knockout!'],
  marucho: ['Let me explain the numbers!', 'When a Gate card flips, each Bakugan gets that card’s bonus for its attribute. Check the card before you throw!',
    'Set your Gate card where your Bakugan are strongest. It has to touch a card that is already on the field.', 'Each Bakugan can go up to 600G with upgrades.'],
  shun: ['Focus.', 'Ability cards are played back and forth in a battle until both players pass. Save your best one for the end.',
    'Red cards are thrown with your Bakugan. Some cards work before you throw or after your Bakugan stops — use the Ability cards button.', 'Your own Bakugan can’t be knocked around by your throw. Use that.'],
  julie: ['Hiii! Want a tip?', 'Pick a character and Easy, Normal or Hard to play their deck. Pick You to play the deck you built in My Room.',
    'Change your look in the Closet. The colors under each part change it too!', 'Your statistics are on the computer in My Room.'],
};
const TIP_FACE = { dan: 'title_pic1', runo: 'title_pic2', marucho: 'title_pic3', shun: 'title_pic0', julie: 'title_pic4' };
function tips(who, n = 0) {
  top3d(false, INFO_BG());
  const names = Object.keys(TIPS), ch = c => M.chars.find(x => x.id === c);
  if (who) {
    const list = TIPS[who];
    $('topUI').innerHTML = img(TIP_FACE[who], 0, -40) + `<div class="bubble tap" id="tNext"><b>${ch(who).name}</b>${esc(list[n % list.length])}</div>`;
    $('tNext').onclick = () => tips(who, n + 1);
  } else $('topUI').innerHTML = `<div class="bubble"><b>Tips</b>Choose a Brawler to talk to.</div>`;
  $('bot').innerHTML = img('arena_bot', 0, 0) + names.map((c, i) => { const x = 10 + (i % 3) * 82, y = 24 + Math.floor(i / 3) * 76;
    return `<div class="slot tap ${who === c ? 'sel' : ''}" data-t="${c}" style="left:${x}px;top:${y}px"><img class="face" src="${urls.get(ch(c).face)}" alt=""><div class="nm">${ch(c).name}</div></div>`; }).join('');
  bar(who ? 'Tap the message to hear more.' : 'Choose who to talk to.');
  $('bot').querySelectorAll('[data-t]').forEach(b => b.onclick = () => tips(b.dataset.t, 1));
  backBtn(() => go('info'));
}
// Ranking: the Battle Brawlers' points. Your RP comes with ranked play (Battle Arena is free play).
const RANK = [['masquerade', 121500], ['shun', 112400], ['dan', 108500], ['klaus', 104200], ['chanlee', 101200], ['runo', 98800], ['marucho', 89500], ['julie', 86700],
  ['julio', 83400], ['komba', 83300], ['billy', 80100], ['akira', 52000], ['shuji', 50500], ['jenny', 48000], ['jewls', 46500]];
let rankTop = 0;
function ranking() {
  const p = prof(), rp = (p.stats && p.stats.rp) || 0, all = [...RANK.map(([id, v]) => ({ name: M.chars.find(c => c.id === id).name, rp: v })), { name: p.name, rp, me: true }].sort((a, b) => b.rp - a.rp);
  const myRank = all.findIndex(x => x.me) + 1;
  top3d(true, INFO_BG()); setView('upper'); showAvatar(p.look);
  $('topUI').innerHTML = `<div style="position:absolute;left:120px;top:24px;width:128px;font:800 10px/14px system-ui">
    <div style="color:#bfe9ff">NAME</div><div style="border-bottom:1px solid #6fd3ff">${esc(p.name)}</div><div style="color:#bfe9ff;margin-top:6px">RANK</div><div style="text-align:right;border-bottom:1px solid #6fd3ff">${myRank}</div>
    <div style="color:#bfe9ff;margin-top:6px">RP</div><div style="text-align:right;border-bottom:1px solid #6fd3ff">${rp}</div></div>
    <div class="txt" style="right:6px;top:4px;font:italic 900 12px system-ui;color:#bfe9ff">RANKING</div>`;
  holder.position.x = -0.32;
  const rows = all.slice(rankTop, rankTop + 7);
  $('bot').innerHTML = img('arena_bot', 0, 0) + img('rank_top', 48, 20) +
    rows.map((r, i) => `<div class="row ${r.me ? 'me' : ''}" style="top:${40 + i * 18}px"><span>${rankTop + i + 1}&nbsp;&nbsp;${esc(r.name)}</span><span>${r.rp}</span></div>`).join('') +
    `<div class="pill tap" id="rUp" style="left:226px;top:40px;width:24px">▲</div><div class="pill tap" id="rDn" style="left:226px;top:142px;width:24px">▼</div>`;
  bar('Ranked play comes later — Battle Arena is free play, so it does not change your RP.');
  $('rUp').onclick = () => { rankTop = Math.max(0, rankTop - 7); ranking(); };
  $('rDn').onclick = () => { rankTop = Math.min(all.length - 1, rankTop + 7); ranking(); };
  backBtn(() => { holder.position.x = 0; rankTop = 0; go('info'); });
}
// Statistics: battle data, title, wins by opponent
function stats() {
  const p = prof(), s = { ...P.newStats(), ...(p.stats || {}) }, pct = s.matches ? Math.round(s.wins / s.matches * 100) : 0;
  top3d(false, INFO_BG());
  const line = (k, v) => `<div style="display:flex;justify-content:space-between;border-bottom:1px solid #6fd3ff;padding:1px 0"><span>${k}</span><span>${v}</span></div>`;
  $('topUI').innerHTML = `<div class="txt" style="right:6px;top:4px;font:italic 900 12px system-ui;color:#bfe9ff">STATISTICS</div>
    <div style="position:absolute;left:14px;right:14px;top:26px;font:700 9px/12px system-ui">
      <div style="color:#ffd54a;font-size:11px;margin-bottom:4px">${esc(p.name)} — ${P.titleFor(s.wins)}</div>
      ${line('Matches', s.matches)}${line('Wins / Losses', `${s.wins}W - ${s.losses}L`)}${line('Win rate', pct + '%')}${line('Best win streak', s.best)}${line('Gate cards won', s.gates)}${line('Knockouts', s.knockouts)}</div>`;
  const vs = Object.entries(s.vs || {}).sort((a, b) => (b[1].w + b[1].l) - (a[1].w + a[1].l)).slice(0, 7);
  $('bot').innerHTML = img('arena_bot', 0, 0) + `<div class="txt" style="left:20px;top:22px;color:#bfe9ff">NUMBER OF WINS</div>` +
    (vs.length ? vs.map(([id, v], i) => { const c = M.chars.find(x => x.id === id); return `<div class="row" style="top:${38 + i * 18}px"><span>${esc(c ? c.name : id)}</span><span>${v.w}W - ${v.l}L</span></div>`; }).join('')
      : `<div class="txt" style="left:20px;top:60px;width:216px;font-weight:600">No matches yet. Play in the Battle Arena as You.</div>`);
  bar('Your battle data. Matches you play as You count here.');
  backBtn(() => go('info'));
}

// ---- start
(async () => {
  addEventListener('resize', fit); fit();
  pack = await Pack.fromDevice();
  if (!pack || !pack.catalog.menu || !pack.catalog.menu.files.room_bot) { document.body.insertAdjacentHTML('beforeend', '<p style="position:fixed;top:40%;left:0;right:0;text-align:center">Update the asset pack from Options first.</p>'); return; }
  M = pack.catalog.menu;
  loadRoom();
  await Promise.all([...new Set([...Object.values(M.files), ...M.chars.map(c => c.face)])].map(async f => { try { urls.set(f, await pack.url(f)); } catch {} }));
  const q = new URLSearchParams(location.search).get('go');
  if (STORY && sLoad()) { const s = sLoad(); if (!s.you.coll) { location.href = 'story.html'; return; } go(new URLSearchParams(location.search).get('to') === 'room' ? 'room' : 'shop'); }
  else go(q && ['save', 'closet', 'deck', 'info'].includes(q) && prof() ? q : prof() ? 'room' : 'save');
  window.ROOM = { go, get screen() { return screen; }, prof };
})();


// ---------- Starter deck: a new player picks an attribute and gets that starter deck (3 Bakugan + 6 cards)
const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];
const STARTER_OF = { pyrus: 'dan', aquos: 'marucho', subterra: 'julie', haos: 'runo', darkus: 'masquerade', ventus: 'shun' };
const ATTR_HEX = { pyrus: '#e53935', aquos: '#1e88e5', subterra: '#b07a3c', haos: '#f2e7b8', darkus: '#7b3fa8', ventus: '#3fa34d' };
const cap = s => s[0].toUpperCase() + s.slice(1);
function starterDeck(attr) {
  const t = STARTERS[attr];
  return { toys: t.toys.map(x => ({ id: x.id, attr: x.attr })), gates: Object.fromEntries(GATE_COLORS.map(k => [k, t.gates[k].id])), abilities: Object.fromEntries(AB_COLORS.map(k => [k, t.abilities[k].id])),
    extra: Object.fromEntries(AB_COLORS.map(k => [k, ((t.extra || {})[k] || []).map(x => x.id)])) };
}
function starter(sel = null) {
  const p = prof(); top3d(true); setView('full'); showAvatar(p.look);
  const toyBy = new Map(pack.catalog.toys.map(t => [t.id, t]));
  const d = sel && starterDeck(sel);
  $('topUI').innerHTML = `<div class="bubble"><b>${esc(p.name)}</b>${d ? `${cap(sel)} starter: ${d.toys.map(x => toyBy.get(x.id).name).join(', ')} and 6 cards. Tap OK to take it.` : 'Which attribute will I brawl with? Pick my starter deck.'}</div>`;
  $('bot').innerHTML = img('arena_bot', 0, 0) + `<div class="txt" style="left:0;right:0;top:24px;text-align:center">Choose your starter deck</div>` +
    ATTRS.map((a, i) => `<div class="tap" data-a="${a}" style="position:absolute;left:${22 + (i % 3) * 74}px;top:${44 + Math.floor(i / 3) * 52}px;width:62px;height:46px;border-radius:6px;
      background:${sel === a ? 'linear-gradient(#35a8f0,#1478c8)' : 'linear-gradient(#123d70,#071f44)'};border:1px solid #8fb4d8;text-align:center">
      <img src="${art('attr_' + a)}" style="position:static;margin-top:3px;width:24px;height:32px" alt=""><div style="font:800 8px/9px system-ui">${cap(a)}</div></div>`).join('') +
    (sel ? `<div class="pill gold tap" id="sOk" style="left:88px;top:152px;width:80px">OK</div>` : '');
  bar('Your starter deck is 3 Bakugan and 6 cards of one attribute. Buy more in the Shop.');
  $('bot').querySelectorAll('[data-a]').forEach(b => b.onclick = () => starter(b.dataset.a));
  if ($('sOk')) $('sOk').onclick = () => {
    P.update(act(), q => { P.ensureShop(q); q.deckNV = d; q.deck = { toys: d.toys, gates: d.gates, abilities: d.abilities, extra: {} }; if (q.look && !q.look.band) q.look.band = sel; for (const x of d.toys) q.owned.toys[P.key(x.id, x.attr)] ||= { g: 0, st: {} };
      q.owned.cards = [...new Set([...q.owned.cards, ...Object.values(d.gates), ...Object.values(d.abilities), ...Object.values(d.extra).flat()])]; });
    go('room');
  };
}

// ---------- Shop: Alice behind the counter, Bakugan / Card / Upgrade
let shop3d = null, alice = null, shopSel = 0;
async function loadShop() {
  if (shop3d) return;
  const L = new GLTFLoader();
  const [s, a] = await Promise.all([L.loadAsync(await pack.url(M.files.shop3d)), STORY ? L.loadAsync(await pack.url(M.files.alice3d)) : L.loadAsync(await pack.url(M.files.alice3d))]);
  shop3d = s.scene; shop3d.scale.setScalar(0.0028); shop3d.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  alice = a.scene; alice.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  alice.updateMatrixWorld(true);
  const hp = new THREE.Vector3(), fp = new THREE.Vector3();
  alice.getObjectByName('Bip01_Head').getWorldPosition(hp); (alice.getObjectByName('Bip01_L_Foot') || alice.getObjectByName('Bip01_L_Toe0')).getWorldPosition(fp);
  const k = 0.88 / (hp.y - fp.y); alice.scale.setScalar(k);
  relaxArms(alice);
  const al = new THREE.Group(); alice.position.set(-hp.x * k, -fp.y * k + 0.03, -hp.z * k); al.add(alice);
  // turn her to face the shop camera (like the DS game), whichever way the model was built facing
  al.updateMatrixWorld(true);
  const wp = n => alice.getObjectByName(n).getWorldPosition(new THREE.Vector3());
  const lft = wp('Bip01_L_Clavicle').sub(wp('Bip01_R_Clavicle')).setY(0), fwd = new THREE.Vector3().crossVectors(lft, new THREE.Vector3(0, 1, 0));
  al.position.set(-0.95, 0, 0.15);
  al.rotation.y = Math.atan2(-2.75 - -0.95, 1.55 - 0.15) - Math.atan2(fwd.x, fwd.z); alice = al;
  alice.userData.bones = []; alice.traverse(o => { if (o.isBone) alice.userData.bones.push({ o, base: o.quaternion.clone() }); }); alice.userData.phase = 2;
  shop3d.add(alice); alice.scale.setScalar(1 / 0.0028); alice.position.multiplyScalar(1 / 0.0028);
  shop3d.visible = false; scene.add(shop3d);
}
// the top screen in the shop: the store (3D) with Alice talking, or a picture/stat panel
let inShop = false;
function shopTop(on) {
  inShop = on;
  if (shop3d) shop3d.visible = on;
  if (on) { show3d = true; $('view3d').hidden = false; showRoom = false; if (room3d) room3d.visible = false; floor.visible = false; holder.visible = false; $('top').style.background = '#9fd3d0'; }
  else holder.visible = true;
}
function shopCam() { camera.position.set(-2.75, 0.8, 1.55); camera.lookAt(-0.35, 0.5, -0.05); }
const SHOP = [['bakugan', 'BAKUGAN', 'Hi there! Pick a Bakugan to buy.'], ['card', 'CARD', 'You can use your BP to buy a new card.'], ['upgrade', 'UPGRADE', 'You can use your BP to upgrade your Bakugan.'],
  ['trap', 'TRAP', 'Traps! Pick its color and its attributes. More attributes cost more.']];
async function shop() {
  const p = prof(); await loadShop(); shopTop(true);
  const sale = STORY ? salesOnDay(sLoad().season, sLoad().day).map(saleText).join(' · ') : '';
  $('topUI').innerHTML = `<div class="bubble"><b>${STORY ? CLERK.name : 'Alice'}</b>${STORY && shopSel === 0 && sLeague(sLoad()) > 1 ? 'Welcome! Stronger stock unlocks as you move up the leagues.' : SHOP[shopSel][2]}${sale ? `<br><span style="color:#c0262e;font-weight:900">${sale}</span>` : ''}</div>`;
  const n = SHOP.length, L = (shopSel + n - 1) % n, R = (shopSel + 1) % n;
  $('bot').innerHTML = img('shop_bot', 0, 0) + bpBar(p.bp, 4, 22) +
    `<img src="${art('shop_' + (SHOP[L][0] === 'trap' ? 'bakugan' : SHOP[L][0]))}" class="tap" id="sL" style="left:2px;top:66px" alt="">` +
    `<img src="${art('shop_' + (SHOP[shopSel][0] === 'trap' ? 'bakugan' : SHOP[shopSel][0]) + '_on')}" class="tap" id="sC" style="left:88px;top:54px;${SHOP[shopSel][0] === 'trap' ? 'filter:hue-rotate(180deg) saturate(.4)' : ''}" alt="">` +
    `<img src="${art('shop_' + (SHOP[R][0] === 'trap' ? 'bakugan' : SHOP[R][0]))}" class="tap" id="sR" style="left:198px;top:66px" alt="">` +
    `<div style="position:absolute;left:0;right:0;top:140px;height:14px;background:linear-gradient(#2f7fe8,#1146a8);border-top:1px solid #9fd0ff;border-bottom:1px solid #0a2a66;text-align:center;font:900 10px/14px system-ui;letter-spacing:1px;text-shadow:0 1px 0 #000">${SHOP[shopSel][1]}</div>`;
  bar('Select the type of item you want to buy.');
  $('sL').onclick = () => { shopSel = L; shop(); };
  $('sR').onclick = () => { shopSel = R; shop(); };
  $('sC').onclick = () => { listTab = 0; listTop = 0; const k = SHOP[shopSel][0]; k === 'upgrade' ? go('upgrade') : go(k === 'trap' ? 'trapShop' : 'shopList', k); };
  backBtn(() => { if (STORY) { location.href = 'story.html'; return; } shopTop(false); go('room'); });
}
const bpBar = (bp, x, y) => `<div style="position:absolute;left:${x}px;top:${y}px;width:96px;height:14px;border-radius:7px;background:linear-gradient(90deg,#0a3b7a,#06204a);border:2px solid #39b8ff;
  font:900 9px/10px system-ui;padding:0 6px;display:flex;justify-content:space-between"><span style="color:#8fe3ff">BP</span><span>${bp}</span></div>`;
// stat panel for the top screen (like the DS shop): name, picture, Speed / Defense / Magnet, G-Power
function statTop(title, kind, picUrl, st, g, level, extra = '') {
  shopTop(false); top3d(false, 'linear-gradient(115deg,#5a0b1e 0%,#b0122a 45%,#5a0b2e 100%)');
  const bar5 = (k, v) => `<div style="margin:0 0 5px"><div style="display:flex;justify-content:space-between;font:900 9px/11px system-ui;color:#9fd4ff"><span>${k}</span><b style="color:#fff" data-n="${k}">${v}</b></div>
    <div style="height:6px;background:#5c1426;border:1px solid #120610"><i data-k="${k}" style="display:block;height:100%;width:${v * 20}%;background:linear-gradient(#ffe0b0,#f59a3c)"></i></div></div>`;
  $('topUI').innerHTML = `<div style="position:absolute;left:0;right:0;top:0;height:22px;background:linear-gradient(#b0122a,#6b0d22);border-bottom:1px solid #fff5;font:900 11px/22px system-ui;text-align:center">
      <span style="position:absolute;left:4px;font:italic 900 7px/22px system-ui;color:#fffa">${kind} ››</span>${esc(title)}</div>
    ${picUrl ? `<img src="${picUrl}" style="left:14px;top:34px;width:96px;height:96px;image-rendering:auto" alt="">` : ''}
    ${level ? `<div class="txt" style="left:30px;top:136px;font-size:12px">LV ${level}</div>` : ''}
    ${st ? `<div style="position:absolute;left:126px;top:32px;width:118px;background:#2a0b1fcc;padding:6px;border-radius:3px">${bar5('SPEED', st.speed)}${bar5('DEFENSE', st.defense)}${bar5('CONTROL', st.control)}${bar5('MAGNET', st.magnet)}</div>` : ''}
    ${g ? `<div class="txt" style="left:0;right:0;top:160px;text-align:center;font:900 15px system-ui;color:#ffcf3a">${g} GP</div>` : ''}${extra}`;
}
let listTab = 0, listTop = 0, listSel = 0;
const CARD_TABS = ['gold', 'silver', 'copper', 'red', 'blue', 'green'];
function shopList(kind, confirmItem = null) {
  const p = prof(), cat = pack.catalog;
  let items;
  if (kind === 'bakugan') {
    const a = ATTRS[listTab];
    items = cat.toys.filter(t => t.baseG && t.attributes && t.attributes[a]).sort((x, y) => x.baseG - y.baseG)
      .filter(t => !STORY || isSoldToy(t))
      .map(t => ({ id: t.id, name: t.name, attr: a, price: P.toyPrice(t), g: t.baseG, owned: !!p.owned.toys[P.key(t.id, a)], t, pic: (t.thumbs || {})[a],
        ...(STORY ? sPrice('bakugan', t, { kind: 'bakugan', attr: a }) : {}) }));
  } else {
    const c = CARD_TABS[listTab];
    items = cat.cards.filter(x => x.color === c && (x.type === 'gate' ? x.bonus : isCoded(x))).map(x => ({ id: x.id, name: x.name, price: P.cardPrice(x), owned: p.owned.cards.includes(x.id), c: x, pic: x.art,
      ...(STORY ? sPrice('card', x, { kind: x.type === 'gate' ? 'gate' : 'ability', color: x.color }) : {}) }));
    if (STORY) items.sort((a, b) => !!a.lock - !!b.lock || a.full - b.full);
  }
  listSel = Math.min(listSel, Math.max(0, items.length - 1));
  const it = items[listSel];
  if (it) {
    if (kind === 'bakugan') { const u = P.upgraded(it.t, it.attr, null); statTop(it.name, 'BAKUGAN', null, u.stats, it.g, 1); }
    else statTop(it.name, it.c.type === 'gate' ? 'GATE CARD' : 'ABILITY CARD', null, null, null, null,
      `<div style="position:absolute;left:126px;top:32px;width:118px;bottom:14px;background:#2a0b1fcc;padding:6px;border-radius:3px;font:600 8.5px/11px system-ui;overflow:hidden">${esc(it.c.text || '')}
        ${it.c.bonus ? `<div style="margin-top:4px;color:#ffd0c8">${ATTRS.map(a => `${cap(a)} +${it.c.bonus[a] || 0}`).join('<br>')}</div>` : ''}</div>`);
    if (it.pic) pack.url(it.pic).then(u => { const im = document.createElement('img'); im.src = u; im.style.cssText = kind === 'bakugan' ? 'left:14px;top:34px;width:96px;height:96px' : 'left:20px;top:28px;width:90px;height:124px'; $('topUI').append(im); });
  }
  const tabs = kind === 'bakugan' ? ATTRS.map((a, i) => `<img src="${art('attr_' + a)}" class="tap ${i === listTab ? 'on' : ''}" data-tab="${i}" style="left:${30 + i * 34}px;top:22px;${i === listTab ? '' : 'opacity:.55'}" alt="">`).join('')
    : CARD_TABS.map((c, i) => `<img src="${art('cardicon_' + c)}" class="tap ${i === listTab ? 'on' : ''}" data-tab="${i}" style="left:${30 + i * 34}px;top:22px;${i === listTab ? '' : 'opacity:.55'}" alt="">`).join('');
  const rows = items.slice(listTop, listTop + 3).map((x, i) => {
    const k = listTop + i, sel = k === listSel;
    return `<div class="tap" data-row="${k}" style="position:absolute;left:26px;top:${60 + i * 34}px;width:200px;height:30px;background:${sel ? '#7a1020' : '#3a0c12'};border:2px solid ${sel ? '#4cc3ff' : '#c0262e'};border-radius:2px">
      <span class="pic" data-src="${x.pic || ''}" style="position:absolute;left:2px;top:1px;width:24px;height:24px"></span>
      <div style="position:absolute;left:32px;top:2px;font:800 10px/12px system-ui">${esc(x.name)}</div>
      ${x.g ? `<div style="position:absolute;right:4px;top:2px;font:800 9px/12px system-ui">GP ${x.g}</div>` : ''}
      <div style="position:absolute;right:4px;bottom:1px;font:800 9px/11px system-ui;color:${x.owned ? '#8fe3ff' : x.lock ? '#ffcf3a' : p.bp >= x.price ? '#ff6b6b' : '#888'}">${x.owned ? 'OWNED' : x.lock ? `LEAGUE ${x.lock}+` : (x.off ? `<s style="color:#aaa;font-weight:600">${x.full}</s> ` : '') + 'BP ' + x.price}</div></div>`;
  }).join('');
  $('bot').innerHTML = img('list_bot', 0, 0) + tabs + rows +
    `<div class="pill tap" id="lUp" style="left:2px;top:60px;width:20px">▲</div><div class="pill tap" id="lDn" style="left:2px;top:128px;width:20px">▼</div>` +
    bpBar(p.bp, 60, 166) + `<div class="txt" style="left:166px;top:168px;font-size:9px">${items.length ? listSel + 1 : 0} / ${items.length}</div>` +
    (confirmItem ? `<div class="box" style="left:28px;top:56px;width:200px;height:96px;z-index:30;background:#0d2140f2;text-align:center;padding-top:10px;font:700 10px/14px system-ui">
      Buy ${esc(confirmItem.name)}${confirmItem.attr ? ` (${cap(confirmItem.attr)})` : ''}<br>for ${confirmItem.price} BP?
      <div class="pill gold tap" id="cYes" style="left:24px;top:62px;width:66px">Yes</div><div class="pill tap" id="cNo" style="left:110px;top:62px;width:66px">No</div></div>` : '');
  bar(kind === 'bakugan' ? 'Select a Bakugan you want to buy.' : 'Select a card you want to buy.');
  $('bot').querySelectorAll('.pic[data-src]').forEach(async e => { if (e.dataset.src) e.innerHTML = `<img src="${await pack.url(e.dataset.src)}" style="position:static;width:24px;height:24px;object-fit:contain" alt="">`; });
  $('bot').querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { listTab = +b.dataset.tab; listTop = 0; listSel = 0; shopList(kind); });
  $('bot').querySelectorAll('[data-row]').forEach(b => b.onclick = () => {
    const k = +b.dataset.row;
    if (k !== listSel) { listSel = k; return shopList(kind); }
    const x = items[k];
    if (x.owned) { bar(kind === 'bakugan' ? 'You already have this Bakugan in this attribute.' : 'You already have this card.'); return; }
    if (x.lock) { bar(`This one unlocks in League ${x.lock}. Win your way up!`); return; }
    if (p.bp < x.price) { bar(`You need ${x.price - p.bp} more BP. Win battles as You to earn BP.`); return; }
    shopList(kind, x);
  });
  $('lUp').onclick = () => { listSel = Math.max(0, listSel - 1); listTop = Math.min(listTop, listSel); shopList(kind); };
  $('lDn').onclick = () => { listSel = Math.min(items.length - 1, listSel + 1); if (listSel > listTop + 2) listTop = listSel - 2; shopList(kind); };
  if (confirmItem) {
    $('cNo').onclick = () => shopList(kind);
    $('cYes').onclick = () => {
      upd(q => { P.ensureShop(q); if (q.bp < confirmItem.price) return; q.bp -= confirmItem.price;
        if (kind === 'bakugan') q.owned.toys[P.key(confirmItem.id, confirmItem.attr)] = { g: 0, st: {} }; else q.owned.cards.push(confirmItem.id); });
      shopList(kind); bar(`Thanks! ${confirmItem.name} is yours. Put it in your deck from My Room${STORY ? ' in The Commons' : ' > Deck'}.`);
    };
  }
  backBtn(() => go('shop'));
}
// Upgrade (DS style, Billy Nov 20): 1) pick a Bakugan from your inventory, 2) confirm the cost (Yes / No),
// 3) pick a stat (a maxed stat is greyed out), 4) the stat meter fills to its new value. G-Power has its own button + confirm.
// Caps: 5 stat upgrades per Bakugan, no stat above 5; story mode: 2 G-Power boosts per Bakugan per season.
let upSel = 0, upTop = 0;
const UP_STATS = ['speed', 'defense', 'control', 'magnet'];   // DS order
function upgrade(stage = 'list', ask = null, grow = null) {
  if (typeof stage !== 'string' || !['list', 'stats'].includes(stage)) stage = 'list';
  const p = prof(), toyBy = new Map(pack.catalog.toys.map(t => [t.id, t]));
  const mine = Object.keys(p.owned.toys).map(k => { const [id, attr] = k.split(':'); return { k, id, attr, t: toyBy.get(id) }; }).filter(x => x.t);
  if (!mine.length) { go('shop'); bar('You have no Bakugan yet.'); return; }
  upSel = Math.max(0, Math.min(upSel, mine.length - 1)); upTop = Math.max(0, Math.min(upTop, upSel, mine.length - 3));
  const sv = STORY ? sLoad() : null, sNo = sv ? (sv.seasonNo || 2) : 0;
  const off = STORY ? discountOn(sv.season, sv.day, { kind: 'upgrades' }) : 0, sale = c => Math.round(c * (100 - off) / 100);
  const info = m => { const u = p.owned.toys[m.k] || {}, up = P.upgraded(m.t, m.attr, p.owned);
    const statsLeft = up.level - 1 < P.LEVEL_UPS && UP_STATS.some(k => up.stats[k] < P.STAT_CAP);
    const gLeft = up.g < P.G_CAP && !(STORY && ((u.gs || {})[sNo] || 0) >= 2);
    return { u, up, statsLeft, gLeft, lvCost: sale(P.levelPrice(up.level)), gCost: sale(P.gPrice(u.g || 0, up.g)) }; };
  const x = mine[upSel], X = info(x);
  // top screen: the selected Bakugan's stats (a just-bought stat grows from its old value)
  statTop(x.t.name, 'UPGRADE', null, grow ? { ...X.up.stats, [grow]: X.up.stats[grow] - 1 } : X.up.stats, X.up.g, X.up.level);
  if (grow) setTimeout(() => { const b = $('topUI').querySelector(`[data-k="${grow.toUpperCase()}"]`), n = $('topUI').querySelector(`[data-n="${grow.toUpperCase()}"]`);
    if (b) { b.style.transition = 'width .7s ease-out'; b.style.width = X.up.stats[grow] * 20 + '%'; } if (n) n.textContent = X.up.stats[grow]; }, 60);
  if ((x.t.thumbs || {})[x.attr]) pack.url(x.t.thumbs[x.attr]).then(url => { const im = document.createElement('img'); im.src = url; im.style.cssText = 'left:14px;top:34px;width:96px;height:96px'; $('topUI').append(im); });
  const pic = m => `<span class="pic" data-src="${(m.t.thumbs || {})[m.attr] || ''}" style="position:absolute;left:2px;top:1px;width:24px;height:24px"></span>`;
  // a DS-style "Available Points / Points / Point Balance" box
  const confirmBox = a => `<div class="box" style="left:20px;top:22px;width:216px;height:124px;z-index:30;background:#3d5a8cf5;border:2px solid #cfd8e6;border-radius:3px;font:700 10px/16px system-ui">
      <div style="position:absolute;left:0;right:0;top:4px;text-align:center;font-size:9px;color:#dfe8f5">${esc(a.what)}</div>
      <div style="position:absolute;left:16px;right:16px;top:24px;display:flex;justify-content:space-between"><span>Available Points</span><span>${p.bp}</span></div>
      <div style="position:absolute;left:16px;right:16px;top:42px;display:flex;justify-content:space-between"><span>Points</span><span>${a.cost}</span></div>
      <div style="position:absolute;left:12px;right:12px;top:62px;border-top:2px solid #fff"></div>
      <div style="position:absolute;left:16px;right:16px;top:68px;display:flex;justify-content:space-between"><span>Point Balance</span><span>${p.bp - a.cost}</span></div>
      <div class="pill gold tap" id="cYes" style="left:22px;top:96px;width:76px">Yes</div><div class="pill tap" id="cNo" style="left:118px;top:96px;width:76px">No</div></div>`;
  let html = img('list_bot', 0, 0);
  if (stage === 'list') {
    html += mine.slice(upTop, upTop + 3).map((m, i) => { const k = upTop + i, sel = k === upSel, I = info(m);
      return `<div class="tap" data-row="${k}" style="position:absolute;left:26px;top:${22 + i * 34}px;width:200px;height:30px;background:${sel ? '#7a1020' : '#3a0c12'};border:2px solid ${sel ? '#4cc3ff' : '#c0262e'};border-radius:2px">
        ${pic(m)}<div style="position:absolute;left:32px;top:2px;font:800 10px/12px system-ui">${esc(m.t.name)}</div>
        <div style="position:absolute;left:32px;bottom:1px;font:800 9px/11px system-ui">LV ${I.up.level}</div>
        <div style="position:absolute;right:4px;top:2px;font:800 9px/12px system-ui">GP ${I.up.g}</div>
        <div style="position:absolute;right:4px;bottom:1px;font:800 9px/11px system-ui;color:${I.statsLeft ? (p.bp >= I.lvCost ? '#ff6b6b' : '#888') : '#8fe3ff'}">${I.statsLeft ? `BP ${I.lvCost}` : 'STATS MAX'}</div></div>`; }).join('') +
      `<div class="pill tap" id="lUp" style="left:2px;top:22px;width:20px">▲</div><div class="pill tap" id="lDn" style="left:2px;top:90px;width:20px">▼</div>` +
      `<div class="pill tap ${X.gLeft ? '' : 'off'}" id="uG" style="left:26px;top:128px;width:200px">${X.up.g >= P.G_CAP ? 'G-Power is at 600G (max)' : !X.gLeft ? '2 G-Power boosts this season (max)' : `G-Power +10G — ${X.gCost} BP`}</div>` +
      bpBar(p.bp, 60, 166) + `<div class="txt" style="left:166px;top:168px;font-size:9px">${upSel + 1} / ${mine.length}</div>`;
  } else {   // stats: DS-style big buttons, a maxed stat greyed out
    html += `<div style="position:absolute;left:8px;top:24px;width:58px;height:58px;background:#9aa7b4;border:2px solid #dfe6ee;border-radius:3px">${pic(x).replace('left:2px;top:1px;width:24px;height:24px', 'left:5px;top:5px;width:48px;height:48px')}</div>
      <div class="txt" style="left:12px;top:88px;font-size:12px">LV ${X.up.level}</div>` +
      UP_STATS.map((k, i) => { const max = X.up.stats[k] >= P.STAT_CAP;
        return `<div class="pill tap ${max ? 'off' : 'gold'}" data-st="${k}" style="left:80px;top:${22 + i * 30}px;width:166px;height:24px;line-height:24px;font:italic 900 12px/24px system-ui;${max ? 'filter:grayscale(1);opacity:.45' : ''}">${k.toUpperCase()} ${max ? 'MAX' : 'UP'}</div>`; }).join('') +
      bpBar(p.bp, 60, 166);
  }
  if (ask) html += confirmBox(ask);
  $('bot').innerHTML = html;
  $('bot').querySelectorAll('.pic[data-src]').forEach(async e => { if (e.dataset.src) { const big = e.style.width === '48px'; e.innerHTML = `<img src="${await pack.url(e.dataset.src)}" style="position:static;width:${big ? 48 : 24}px;height:${big ? 48 : 24}px;object-fit:contain" alt="">`; } });
  const buy = (cost, fn) => { upd(q => { if (q.bp < cost) return; q.bp -= cost; q.owned.toys[x.k] = q.owned.toys[x.k] || { g: 0, st: {} }; fn(q.owned.toys[x.k]); }); };
  if (ask) {
    $('cNo').onclick = () => upgrade('list');
    $('cYes').onclick = () => { if (p.bp < ask.cost) { upgrade('list'); bar(`You need ${ask.cost - p.bp} more BP.`); return; }
      if (ask.kind === 'stat') { upgrade('stats'); bar(`Pick a stat to raise for ${x.t.name}.`); }
      else { buy(ask.cost, t => { t.g = (t.g || 0) + 1; if (STORY) { t.gs = t.gs || {}; t.gs[sNo] = (t.gs[sNo] || 0) + 1; } }); upgrade('list'); bar(`${x.t.name} is now ${Math.min(P.G_CAP, X.up.g + 10)}G!`); } };
    backBtn(() => upgrade('list'));
    if (!grow) bar(ask.kind === 'stat' ? `Upgrade ${x.t.name}'s stats for ${ask.cost} BP?` : `Raise ${x.t.name}'s G-Power for ${ask.cost} BP?`);
    return;
  }
  if (stage === 'list') {
    $('bot').querySelectorAll('[data-row]').forEach(b => b.onclick = () => {
      const k = +b.dataset.row;
      if (k !== upSel) { upSel = k; return upgrade('list'); }
      if (!X.statsLeft) { bar(X.up.level - 1 >= P.LEVEL_UPS ? `${x.t.name} has used all ${P.LEVEL_UPS} stat upgrades.` : `${x.t.name}'s stats are all maxed.`); return; }
      if (p.bp < X.lvCost) { bar(`You need ${X.lvCost - p.bp} more BP.`); return; }
      upgrade('list', { kind: 'stat', cost: X.lvCost, what: `Stat upgrade ${X.up.level} of ${P.LEVEL_UPS}${off ? ` (${off}% off)` : ''}` });
    });
    $('lUp').onclick = () => { upSel = Math.max(0, upSel - 1); upgrade('list'); };
    $('lDn').onclick = () => { upSel = Math.min(mine.length - 1, upSel + 1); if (upSel > upTop + 2) upTop = upSel - 2; upgrade('list'); };
    $('uG').onclick = () => { if (!X.gLeft) return; if (p.bp < X.gCost) { bar(`You need ${X.gCost - p.bp} more BP.`); return; }
      upgrade('list', { kind: 'g', cost: X.gCost, what: `G-Power +10G (${X.up.g}G → ${X.up.g + 10}G)` }); };
    if (!grow) bar(off ? `Sale: ${off}% off upgrades today! Select a Bakugan you want to upgrade.` : 'Select a Bakugan you want to upgrade. Tap it again to upgrade.');
    backBtn(() => go('shop'));
  } else {
    $('bot').querySelectorAll('[data-st]').forEach(b => b.onclick = () => { const k = b.dataset.st; if (X.up.stats[k] >= P.STAT_CAP) return;
      if (p.bp < X.lvCost) { upgrade('list'); bar(`You need ${X.lvCost - p.bp} more BP.`); return; }
      buy(X.lvCost, t => { t.st = t.st || {}; t.st[k] = (t.st[k] || 0) + 1; });
      upgrade('list', null, k); bar(`${x.t.name}'s ${cap(k)} is now ${X.up.stats[k] + 1}!`); });
    backBtn(() => upgrade('list'));
  }
}

// story mode: G-Power boost (+10G to every Bakugan you own, 2 a season), priced like story.js
function storyBoost() {
  const s = sLoad(), w = s.season.B.you, cat = pack.catalog, MAXS = 2;
  const full = s.you.deck.toys.reduce((n, x) => { const d = cat.toys.find(y => y.id === x.id); return n + P.gPrice(w.up, Math.min(P.G_CAP, (d ? d.baseG : 250) + w.up * 10)); }, 0);
  const off = discountOn(s.season, s.day, { kind: 'upgrades' }), cost = Math.round(full * (100 - off) / 100), left = MAXS - (w.up - (w.startUp || 0));
  statTop('G-Power boost', 'UPGRADE', null, null, null, null,
    `<div style="position:absolute;left:14px;right:14px;top:34px;background:#2a0b1fcc;padding:8px;border-radius:3px;font:600 10px/14px system-ui">+10G to every Bakugan you own.<br>Your Bakugan are +${w.up} now.<br>Boosts left this season: ${left}.
      <div style="margin-top:8px;color:#ffcf3a;font:900 13px system-ui">${off ? `<s style="color:#aaa;font-size:10px">${full}</s> ` : ''}${cost} BP</div></div>`);
  $('bot').innerHTML = img('list_bot', 0, 0) + `<div class="pill gold tap ${w.wallet >= cost && left > 0 ? '' : 'off'}" id="bBuy" style="left:60px;top:80px;width:136px">Buy boost</div>` + bpBar(w.wallet, 60, 166);
  bar(left > 0 ? 'Boosts raise every Bakugan you own by 10G.' : 'No boosts left this season.');
  $('bBuy').onclick = () => { const t = sLoad(), b = t.season.B.you; if (b.wallet < cost || left <= 0) { bar(left <= 0 ? 'No boosts left this season.' : `You need ${cost - b.wallet} more BP.`); return; }
    b.wallet -= cost; b.up++; sSave(t); storyBoost(); bar(`Done! Your Bakugan are now +${b.up}.`); };
  backBtn(() => go('shop'));
}

// ---------- Traps: pick the Trap, its color, and 2 or more attributes. One Trap goes in your deck.
let trapPick = { i: 0, color: null, attrs: [] };
function trapShop() {
  const p = prof(), traps = (pack.catalog.traps || []).filter(t => t.attributes);
  const T = traps[trapPick.i] || traps[0], color = trapPick.color || Object.keys(T.attributes).find(a => !(T.attributesMade || []).includes(a)) || 'pyrus';
  const slots = P.TRAP_SLOTS[T.name] || 0;            // 0 = any number from 2
  if (slots === 6) trapPick.attrs = [...ATTRS];
  if (slots && trapPick.attrs.length > slots) trapPick.attrs = trapPick.attrs.slice(-slots);
  // story mode: your league caps how many attributes a Trap can cover (League 4: 1 ... League 1: all 6)
  const sCap = STORY ? trapAttrCap(sLeague(sLoad())) : 6, lockedT = STORY && slots > sCap;
  if (STORY && !slots && trapPick.attrs.length > sCap) trapPick.attrs = trapPick.attrs.slice(-sCap);
  const need = slots || (STORY ? 1 : 2), n = trapPick.attrs.length, ready = !lockedT && (slots ? n === slots : n >= need);
  const sOff = STORY ? discountOn(sLoad().season, sLoad().day, { kind: 'trap' }) : 0;
  const price = Math.round(P.trapPrice(Math.max(need, n)) * (100 - sOff) / 100), mine = (p.owned.traps || []);
  shopTop(false); top3d(false, 'linear-gradient(115deg,#5a0b1e 0%,#b0122a 45%,#5a0b2e 100%)');
  $('topUI').innerHTML = `<div style="position:absolute;left:0;right:0;top:0;height:22px;background:linear-gradient(#b0122a,#6b0d22);border-bottom:1px solid #fff5;font:900 11px/22px system-ui;text-align:center">
      <span style="position:absolute;left:4px;font:italic 900 7px/22px system-ui;color:#fffa">TRAP ››</span>${esc(T.name)}</div>
    <div style="position:absolute;left:126px;top:30px;width:120px;background:#2a0b1fcc;padding:6px;border-radius:3px;font:600 8.5px/12px system-ui">
      0G of its own. Once per game, add it to a battle like an Ability card: it gets the Gate card's bonus for <b>each</b> of its attributes.${T.maxus ? `<div style="margin-top:4px;color:#9fd4ff">A piece of Maxus ${T.maxus === 'sp00_01' ? 'Dragonoid' : 'Helios'}.</div>` : ''}
      <div style="margin-top:6px;color:#9fd4ff">${lockedT ? `<b style="color:#ffcf3a">Unlocks in League ${slots <= 1 ? 4 : slots <= 2 ? 3 : slots <= 3 ? 2 : 1}</b>` : slots === 6 ? 'Has all 6 attributes' : slots === 1 ? 'Has 1 attribute' : slots ? `Has exactly ${slots} attributes` : STORY ? `Pick up to ${sCap} attribute${sCap > 1 ? 's' : ''} (your league)` : 'Pick 2 or more attributes'}</div>
      <div style="margin-top:2px;color:#ffd0c8">${n ? trapPick.attrs.map(cap).join(', ') : ''}</div>
      <div style="margin-top:4px;color:#ffcf3a;font-weight:900">${price} BP</div></div>
    <div class="txt" style="left:8px;top:168px;font-size:9px">You own ${mine.length} Trap${mine.length === 1 ? '' : 's'}</div>`;
  if ((T.thumbs || {})[color]) pack.url(T.thumbs[color]).then(u => { const im = document.createElement('img'); im.src = u; im.style.cssText = 'left:8px;top:30px;width:112px;height:112px'; $('topUI').append(im); });
  const pill = (txt, x, y, w, id, on) => `<div class="pill tap ${on ? 'sel' : ''}" ${id} style="left:${x}px;top:${y}px;width:${w}px;height:16px;line-height:14px;font-size:9px">${txt}</div>`;
  $('bot').innerHTML = img('list_bot', 0, 0) +
    pill('◀', 6, 20, 22, 'id="tPrev"') + `<div class="txt" style="left:32px;top:22px;width:150px;text-align:center">${esc(T.name)} (${trapPick.i + 1}/${traps.length})</div>` + pill('▶', 186, 20, 22, 'id="tNext"') +
    `<div class="txt" style="left:8px;top:44px;font-size:9px">Color</div>` +
    ATTRS.map((a, i) => `<img src="${art('attr_' + a)}" class="tap" data-col="${a}" style="left:${50 + i * 32}px;top:40px;width:18px;height:24px;${a === color ? 'outline:2px solid #ff8a1c' : 'opacity:.6'}" alt="">`).join('') +
    `<div class="txt" style="left:8px;top:76px;font-size:9px">Attrib.</div>` +
    ATTRS.map((a, i) => `<div class="tap" data-ta="${a}" style="position:absolute;left:${50 + i * 32}px;top:70px;width:28px;height:36px;border-radius:4px;text-align:center;background:${trapPick.attrs.includes(a) ? '#1478c8' : '#0d2140'};border:1px solid #8fb4d8">
      <img src="${art('attr_' + a)}" style="position:static;width:15px;height:20px;margin-top:2px" alt=""><div style="font:800 5.5px/8px system-ui">${cap(a)}</div></div>`).join('') +
    `<div class="pill gold tap ${ready && p.bp >= price ? '' : 'off'}" id="tBuy" style="left:60px;top:118px;width:136px">Buy for ${price} BP</div>` +
    bpBar(p.bp, 60, 166);
  bar(slots === 6 ? 'This Trap has every attribute. Pick its color.' : slots ? `Pick its color and ${slots} attributes.` : 'Pick its color and 2 or more attributes.');
  $('tPrev').onclick = () => { trapPick = { i: (trapPick.i + traps.length - 1) % traps.length, color: null, attrs: trapPick.attrs }; trapShop(); };
  $('tNext').onclick = () => { trapPick = { i: (trapPick.i + 1) % traps.length, color: null, attrs: trapPick.attrs }; trapShop(); };
  $('bot').querySelectorAll('[data-col]').forEach(b => b.onclick = () => { trapPick.color = b.dataset.col; trapShop(); });
  $('bot').querySelectorAll('[data-ta]').forEach(b => b.onclick = () => { if (slots === 6) return; const a = b.dataset.ta, k = trapPick.attrs.indexOf(a);
    if (k >= 0) trapPick.attrs.splice(k, 1); else if (!STORY || slots || trapPick.attrs.length < sCap) trapPick.attrs.push(a); else bar(`In your league a Trap can cover ${sCap} attribute${sCap > 1 ? 's' : ''}.`); trapShop(); });
  $('tBuy').onclick = () => {
    if (lockedT) { bar(`${T.name} unlocks in a higher league.`); return; }
    if (!ready) { bar(slots ? `${T.name} has exactly ${slots} attributes.` : `A Trap needs ${need} or more attributes.`); return; }
    if (p.bp < price) { bar(`You need ${price - p.bp} more BP.`); return; }
    const uid = 't' + Date.now().toString(36), attrs = ATTRS.filter(a => trapPick.attrs.includes(a));
    upd(q => { P.ensureShop(q); q.owned.traps = q.owned.traps || []; q.bp -= price; q.owned.traps.push({ uid, id: T.id, color, attrs });
      const dd = q.deckNV || (q.deck && { ...q.deck }); if (dd && !dd.trap) { dd.trap = uid; q.deckNV = dd; } });
    trapPick.attrs = []; trapShop(); bar(`Thanks! ${T.name} (${attrs.map(cap).join(', ')}) is yours. Choose your Trap in My Room > Deck > New Vestroia deck.`);
  };
  backBtn(() => go('shop'));
}
