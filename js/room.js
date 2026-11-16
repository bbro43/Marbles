// My Room: Info (Tips, Ranking, Statistics), Save (6 profiles), Deck, Closet (character creator) and the Bakugan collection.
import * as THREE from 'three';
import { Pack } from './pack.js';
import { buildAvatar, idle, PARTS, SKIN_TONES, DEFAULT_LOOK, randomLook } from './avatar.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as P from './profiles.js';
import { setupTeams, GATE_COLORS, AB_COLORS } from './setup.js';
import { STARTERS } from './aiteams.js';
import { isCoded } from './abilities.js';

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pack, M, urls = new Map();
const art = k => urls.get(M.files[k]) || '';
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
const prof = () => { const d = P.load(); const p = d.active !== null ? d.slots[d.active] : null; if (p && (p.bp === undefined || !p.owned)) { P.ensureShop(p); P.save(d); } return p; };
const act = () => P.load().active;
function go(s, ...a) { if (s !== 'shop') { inShop = false; if (shop3d) shop3d.visible = false; holder.visible = true; } screen = s; $('topUI').innerHTML = ''; $('bot').innerHTML = ''; ({ room, closet, deck, save, info, tips, ranking, stats, starter, shop, shopList, upgrade, trapShop })[s](...a); }

// My Room: the DS carousel
const ROOM = [['info', 'INFO', 'You can check your statistics on the computer.'], ['save', 'SAVE', 'Switch players or start a new one (up to 6).'],
  ['deck', 'DECK', 'View and edit your deck.'], ['closet', 'CLOSET', 'Change your look and your name.'], ['shop', 'SHOP', 'Spend your BP on Bakugan, cards and upgrades.'],
  ['collection', 'BAKUGAN', 'Look through every Bakugan — models, stats and colors.']];
function room() {
  const p = prof();
  if (!p) return go('save');
  if (!p.deck && !Object.keys(p.owned.toys).length) return go('starter');
  top3d(true); setView('full'); showAvatar(p.look);
  $('topUI').innerHTML = `<div class="bubble"><b>${esc(p.name)}</b>${roomSel === 3 ? 'I should change my look.' : roomSel === 2 ? 'I should reorganize my deck.' : roomSel === 1 ? 'I should save my progress.' : 'What should I do?'}</div>`;
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
  backBtn(() => { location.href = './'; });
}

// Closet: the character creator
const CAT = { Head: ['hair', 'cap', 'glasses', 'eye', 'skin'], 'Upper body': ['top', 'band'], 'Lower body': ['down', 'shoes'] };
const ICON = { hair: 'hair', cap: 'cap', glasses: 'glasses', eye: 'face', top: 'top', down: 'bottom', shoes: 'shoes', skin: 'skin' };
const LABEL = { band: 'Gauntlet', hair: 'Hair', cap: 'Hat', glasses: 'Glasses', eye: 'Face', skin: 'Skin', top: 'Upper body', down: 'Pants', shoes: 'Shoes' };
const VIEW_OF = { band: 'upper', hair: 'head', cap: 'head', glasses: 'head', eye: 'head', skin: 'full', top: 'upper', down: 'lower', shoes: 'lower' };
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
  $('bot').querySelectorAll('[data-style]').forEach(b => b.onclick = () => {
    const v = +b.dataset.style; if (editPart === 'skin') look.skin = v; else look[editPart][0] = v;
    if (editPart === 'eye') look.eyeblow[0] = v;
    go('closet');
  });
  $('bot').querySelectorAll('[data-color]').forEach(b => b.onclick = () => {
    const c = +b.dataset.color; look[editPart][1] = c; if (editPart === 'hair') look.eyeblow[1] = c;
    go('closet');
  });
  if ($('cName')) $('cName').onclick = () => askName(name).then(n => { if (n) { closetName = n; if (p && !isNew) P.update(P.load().active, q => { q.name = n; }); } go('closet'); });
  if ($('cDone')) $('cDone').onclick = async () => {
    await building;
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
function deck() {
  const p = prof(); if (!p) return go('save');
  top3d(false, `url(${art('arena_top')}) 0 0 / 256px 192px`);
  const cat = pack.catalog, d = p.deck, toyBy = new Map(cat.toys.map(t => [t.id, t])), cardBy = new Map(cat.cards.map(c => [c.id, c]));
  let total = 0, pics = '';
  if (d) {
    d.toys.forEach((x, i) => { const t = toyBy.get(x.id); if (!t) return; total += t.baseG || 0;
      const th = (t.thumbs || {})[x.attr]; pics += th ? `<img data-src="${th}" style="left:${10 + i * 28}px;top:58px;width:28px;height:28px" alt="">` : ''; });
    [...GATE_COLORS.map(c => d.gates[c]), ...AB_COLORS.map(c => d.abilities[c])].forEach((id, i) => { const c = cardBy.get(id); if (c && c.art) pics += `<img data-src="${c.art}" style="left:${96 + i * 25}px;top:54px;width:22px;height:30px" alt="">`; });
  }
  $('topUI').innerHTML = img('banner_team', 56, 7) +
    `<div class="txt" style="left:16px;top:38px;font:italic 900 10px system-ui">CURRENT DECK</div><div class="box" style="left:6px;top:50px;width:244px;height:40px"></div>${pics}` +
    `<div class="txt" style="left:0;right:0;top:104px;text-align:center;color:#ffd54a">Total G-Power</div><div class="txt" style="left:0;right:0;top:118px;text-align:center;font-size:20px;line-height:22px;color:#ffd54a">${d ? total : '—'}</div>`;
  { const t = (p.owned.traps || []).find(x => x.uid === (d || {}).trap), td = t && (pack.catalog.traps || []).find(x => x.id === t.id);
    if (td && (td.thumbs || {})[t.color]) $('topUI').insertAdjacentHTML('beforeend', `<img data-src="${td.thumbs[t.color]}" style="left:220px;top:92px;width:30px;height:30px" alt=""><div class="txt" style="left:206px;top:122px;font-size:7px">TRAP</div>`); }
  $('topUI').querySelectorAll('[data-src]').forEach(async im => { im.src = await pack.url(im.dataset.src); });
  $('bot').innerHTML = img('arena_bot', 0, 0) +
    `<div class="pill tap sel" id="dEdit" style="left:40px;top:40px;width:176px">Edit deck</div>` +
    `<div class="pill tap" id="dAuto" style="left:40px;top:70px;width:176px">Auto-Create</div>` +
    `<div class="pill tap" id="dReset" style="left:40px;top:100px;width:176px">Reset</div>` +
    `<div class="pill tap" id="dTrap" style="left:40px;top:130px;width:176px">Trap: ${esc(trapLabel(p))}</div>`;
  bar(d ? 'Use these to change your deck.' : 'You have no deck yet — tap Edit deck or Auto-Create.');
  const edit = async (start) => {
    $('ds').style.visibility = 'hidden';
    const r = await setupTeams(cat, pack, [{ id: 'you', name: p.name }, null], start || d || { name: p.name }, p.owned);
    $('ds').style.visibility = '';
    if (r.deck) P.update(P.load().active, q => { q.deck = { toys: r.deck.toys, gates: r.deck.gates, abilities: r.deck.abilities, trap: (q.deck || {}).trap || null }; });
    go('deck');
  };
  $('dEdit').onclick = () => edit();
  $('dAuto').onclick = () => edit({ name: p.name, toys: [], gates: {}, abilities: {}, auto: true });
  $('dTrap').onclick = () => {
    const list = p.owned.traps || [];
    if (!list.length) { bar('You have no Traps yet. Buy one in the Shop.'); return; }
    const ids = [null, ...list.map(t => t.uid)], cur = ids.indexOf((p.deck || {}).trap || null);
    P.update(act(), q => { if (q.deck) q.deck.trap = ids[(cur + 1) % ids.length]; }); go('deck');
  };
  $('dReset').onclick = () => { P.update(P.load().active, q => { q.deck = null; }); go('deck'); };
  backBtn(() => go('room'));
}

function trapLabel(p) {
  const t = (p.owned.traps || []).find(x => x.uid === (p.deck || {}).trap); if (!t) return 'none';
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
  ['julio', 83400], ['komba', 83300], ['billy', 80100], ['marduk', 76000], ['akira', 52000], ['shuji', 50500], ['jenny', 48000], ['jewls', 46500]];
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
  go(q && ['save', 'closet', 'deck', 'info'].includes(q) && prof() ? q : prof() ? 'room' : 'save');
  window.ROOM = { go, get screen() { return screen; }, prof };
})();


// ---------- Starter deck: a new player picks an attribute and gets that starter deck (3 Bakugan + 6 cards)
const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];
const STARTER_OF = { pyrus: 'dan', aquos: 'marucho', subterra: 'julie', haos: 'runo', darkus: 'masquerade', ventus: 'shun' };
const ATTR_HEX = { pyrus: '#e53935', aquos: '#1e88e5', subterra: '#b07a3c', haos: '#f2e7b8', darkus: '#7b3fa8', ventus: '#3fa34d' };
const cap = s => s[0].toUpperCase() + s.slice(1);
function starterDeck(attr) {
  const t = STARTERS[attr];
  return { toys: t.toys.map(x => ({ id: x.id, attr: x.attr })), gates: Object.fromEntries(GATE_COLORS.map(k => [k, t.gates[k].id])), abilities: Object.fromEntries(AB_COLORS.map(k => [k, t.abilities[k].id])) };
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
    P.update(act(), q => { P.ensureShop(q); q.deck = d; if (q.look && !q.look.band) q.look.band = sel; for (const x of d.toys) q.owned.toys[P.key(x.id, x.attr)] ||= { g: 0, st: {} };
      q.owned.cards = [...new Set([...q.owned.cards, ...Object.values(d.gates), ...Object.values(d.abilities)])]; });
    go('room');
  };
}

// ---------- Shop: Alice behind the counter, Bakugan / Card / Upgrade
let shop3d = null, alice = null, shopSel = 0;
async function loadShop() {
  if (shop3d) return;
  const L = new GLTFLoader();
  const [s, a] = await Promise.all([L.loadAsync(await pack.url(M.files.shop3d)), L.loadAsync(await pack.url(M.files.alice3d))]);
  shop3d = s.scene; shop3d.scale.setScalar(0.0028); shop3d.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  alice = a.scene; alice.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
  alice.updateMatrixWorld(true);
  const hp = new THREE.Vector3(), fp = new THREE.Vector3();
  alice.getObjectByName('Bip01_Head').getWorldPosition(hp); (alice.getObjectByName('Bip01_L_Foot') || alice.getObjectByName('Bip01_L_Toe0')).getWorldPosition(fp);
  const k = 0.88 / (hp.y - fp.y); alice.scale.setScalar(k);
  alice.traverse(o => { if (o.isBone && /UpperArm$/.test(o.name)) o.rotateOnAxis(new THREE.Vector3(0, 0, -1), (o.name.includes('_L_') ? 1 : -1) * 1.24); });
  const al = new THREE.Group(); alice.position.set(-hp.x * k, -fp.y * k + 0.03, -hp.z * k); al.add(alice);
  al.position.set(-0.95, 0, 0.15); al.rotation.y = 4.71; alice = al;
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
  $('topUI').innerHTML = `<div class="bubble"><b>Alice</b>${SHOP[shopSel][2]}</div>`;
  const n = SHOP.length, L = (shopSel + n - 1) % n, R = (shopSel + 1) % n;
  $('bot').innerHTML = img('shop_bot', 0, 0) + bpBar(p.bp, 4, 22) +
    `<img src="${art('shop_' + (SHOP[L][0] === 'trap' ? 'bakugan' : SHOP[L][0]))}" class="tap" id="sL" style="left:2px;top:66px" alt="">` +
    `<img src="${art('shop_' + (SHOP[shopSel][0] === 'trap' ? 'bakugan' : SHOP[shopSel][0]) + '_on')}" class="tap" id="sC" style="left:88px;top:54px;${SHOP[shopSel][0] === 'trap' ? 'filter:hue-rotate(180deg) saturate(.4)' : ''}" alt="">` +
    `<img src="${art('shop_' + (SHOP[R][0] === 'trap' ? 'bakugan' : SHOP[R][0]))}" class="tap" id="sR" style="left:198px;top:66px" alt="">` +
    `<div style="position:absolute;left:0;right:0;top:140px;height:14px;background:linear-gradient(#2f7fe8,#1146a8);border-top:1px solid #9fd0ff;border-bottom:1px solid #0a2a66;text-align:center;font:900 10px/14px system-ui;letter-spacing:1px;text-shadow:0 1px 0 #000">${SHOP[shopSel][1]}</div>`;
  bar('Select the type of item you want to buy.');
  $('sL').onclick = () => { shopSel = L; shop(); };
  $('sR').onclick = () => { shopSel = R; shop(); };
  $('sC').onclick = () => { listTab = 0; listTop = 0; const k = SHOP[shopSel][0]; go(k === 'upgrade' ? 'upgrade' : k === 'trap' ? 'trapShop' : 'shopList', k); };
  backBtn(() => { shopTop(false); go('room'); });
}
const bpBar = (bp, x, y) => `<div style="position:absolute;left:${x}px;top:${y}px;width:96px;height:14px;border-radius:7px;background:linear-gradient(90deg,#0a3b7a,#06204a);border:2px solid #39b8ff;
  font:900 9px/10px system-ui;padding:0 6px;display:flex;justify-content:space-between"><span style="color:#8fe3ff">BP</span><span>${bp}</span></div>`;
// stat panel for the top screen (like the DS shop): name, picture, Speed / Defense / Magnet, G-Power
function statTop(title, kind, picUrl, st, g, level, extra = '') {
  shopTop(false); top3d(false, 'linear-gradient(115deg,#5a0b1e 0%,#b0122a 45%,#5a0b2e 100%)');
  const bar5 = (k, v) => `<div style="margin:0 0 5px"><div style="display:flex;justify-content:space-between;font:900 9px/11px system-ui;color:#9fd4ff"><span>${k}</span><b style="color:#fff">${v}</b></div>
    <div style="height:6px;background:#5c1426;border:1px solid #120610"><i style="display:block;height:100%;width:${v * 20}%;background:linear-gradient(#ffe0b0,#f59a3c)"></i></div></div>`;
  $('topUI').innerHTML = `<div style="position:absolute;left:0;right:0;top:0;height:22px;background:linear-gradient(#b0122a,#6b0d22);border-bottom:1px solid #fff5;font:900 11px/22px system-ui;text-align:center">
      <span style="position:absolute;left:4px;font:italic 900 7px/22px system-ui;color:#fffa">${kind} ››</span>${esc(title)}</div>
    ${picUrl ? `<img src="${picUrl}" style="left:14px;top:34px;width:96px;height:96px;image-rendering:auto" alt="">` : ''}
    ${level ? `<div class="txt" style="left:30px;top:136px;font-size:12px">LV ${level}</div>` : ''}
    ${st ? `<div style="position:absolute;left:126px;top:32px;width:118px;background:#2a0b1fcc;padding:6px;border-radius:3px">${bar5('SPEED', st.speed)}${bar5('DEFENSE', st.defense)}${bar5('MAGNET', st.magnet)}</div>` : ''}
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
      .map(t => ({ id: t.id, name: t.name, attr: a, price: P.toyPrice(t), g: t.baseG, owned: !!p.owned.toys[P.key(t.id, a)], t, pic: (t.thumbs || {})[a] }));
  } else {
    const c = CARD_TABS[listTab];
    items = cat.cards.filter(x => x.color === c && (x.type === 'gate' ? x.bonus : isCoded(x))).map(x => ({ id: x.id, name: x.name, price: P.cardPrice(x), owned: p.owned.cards.includes(x.id), c: x, pic: x.art }));
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
      <div style="position:absolute;right:4px;bottom:1px;font:800 9px/11px system-ui;color:${x.owned ? '#8fe3ff' : p.bp >= x.price ? '#ff6b6b' : '#888'}">${x.owned ? 'OWNED' : 'BP ' + x.price}</div></div>`;
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
    if (p.bp < x.price) { bar(`You need ${x.price - p.bp} more BP. Win battles as You to earn BP.`); return; }
    shopList(kind, x);
  });
  $('lUp').onclick = () => { listSel = Math.max(0, listSel - 1); listTop = Math.min(listTop, listSel); shopList(kind); };
  $('lDn').onclick = () => { listSel = Math.min(items.length - 1, listSel + 1); if (listSel > listTop + 2) listTop = listSel - 2; shopList(kind); };
  if (confirmItem) {
    $('cNo').onclick = () => shopList(kind);
    $('cYes').onclick = () => {
      P.update(act(), q => { P.ensureShop(q); if (q.bp < confirmItem.price) return; q.bp -= confirmItem.price;
        if (kind === 'bakugan') q.owned.toys[P.key(confirmItem.id, confirmItem.attr)] = { g: 0, st: {} }; else q.owned.cards.push(confirmItem.id); });
      shopList(kind); bar(`Thanks! ${confirmItem.name} is yours. Put it in your deck from My Room > Deck.`);
    };
  }
  backBtn(() => go('shop'));
}
// Upgrade: G-Power (+10G) and Level (+1 Speed, Defense or Magnet)
function upgrade(sel = 0) {
  const p = prof(), toyBy = new Map(pack.catalog.toys.map(t => [t.id, t]));
  const mine = Object.keys(p.owned.toys).map(k => { const [id, attr] = k.split(':'); return { k, id, attr, t: toyBy.get(id) }; }).filter(x => x.t);
  if (!mine.length) { bar('You have no Bakugan yet.'); return go('shop'); }
  sel = Math.min(sel, mine.length - 1);
  const x = mine[sel], u = p.owned.toys[x.k], up = P.upgraded(x.t, x.attr, p.owned), gN = u.g || 0;
  const gCost = P.gPrice(gN), lvCost = P.levelPrice(up.level), gMax = up.g >= P.G_CAP;
  statTop(x.t.name, 'UPGRADE', null, up.stats, up.g, up.level);
  if ((x.t.thumbs || {})[x.attr]) pack.url(x.t.thumbs[x.attr]).then(url => { const im = document.createElement('img'); im.src = url; im.style.cssText = 'left:14px;top:34px;width:96px;height:96px'; $('topUI').append(im); });
  const statBtn = (k, i) => { const max = up.stats[k] >= P.STAT_CAP;
    return `<div class="pill tap ${max ? 'off' : ''}" data-st="${k}" style="left:${8 + i * 82}px;top:118px;width:76px;height:30px;line-height:13px">${cap(k)} ${up.stats[k]}${max ? '<br>MAX' : '<br>+1'}</div>`; };
  $('bot').innerHTML = img('list_bot', 0, 0) +
    mine.map((m, i) => `<img src="" data-src="${(m.t.thumbs || {})[m.attr] || ''}" class="tap" data-pick="${i}" style="left:${6 + (i % 9) * 27}px;top:${20 + Math.floor(i / 9) * 27}px;width:24px;height:24px;${i === sel ? 'outline:2px solid #4cc3ff' : 'opacity:.75'}" alt="">`).join('') +
    `<div class="pill tap ${gMax ? 'off' : ''}" id="uG" style="left:8px;top:86px;width:240px">${gMax ? 'G-Power is at 600G (max)' : `G-Power +10G  (${up.g}G → ${up.g + 10}G) — ${gCost} BP`}</div>` +
    `<div class="txt" style="left:8px;top:104px;font-size:9px">Level up — ${lvCost} BP, pick a stat:</div>` + ['speed', 'defense', 'magnet'].map(statBtn).join('') +
    bpBar(p.bp, 60, 166);
  bar('Raise G-Power, or level up to raise Speed, Defense or Magnet.');
  $('bot').querySelectorAll('img[data-src]').forEach(async im => { if (im.dataset.src) im.src = await pack.url(im.dataset.src); });
  $('bot').querySelectorAll('[data-pick]').forEach(b => b.onclick = () => upgrade(+b.dataset.pick));
  const spend = (cost, fn) => { if (p.bp < cost) { bar(`You need ${cost - p.bp} more BP.`); return; } P.update(act(), q => { q.bp -= cost; fn(q.owned.toys[x.k]); }); upgrade(sel); };
  $('uG').onclick = () => { if (!gMax) spend(gCost, t => { t.g = (t.g || 0) + 1; }); };
  $('bot').querySelectorAll('[data-st]').forEach(b => b.onclick = () => { const k = b.dataset.st; if (up.stats[k] >= P.STAT_CAP) return; spend(lvCost, t => { t.st = t.st || {}; t.st[k] = (t.st[k] || 0) + 1; }); });
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
  const need = slots || 2, n = trapPick.attrs.length, ready = slots ? n === slots : n >= 2;
  const price = P.trapPrice(Math.max(need, n)), mine = (p.owned.traps || []);
  shopTop(false); top3d(false, 'linear-gradient(115deg,#5a0b1e 0%,#b0122a 45%,#5a0b2e 100%)');
  $('topUI').innerHTML = `<div style="position:absolute;left:0;right:0;top:0;height:22px;background:linear-gradient(#b0122a,#6b0d22);border-bottom:1px solid #fff5;font:900 11px/22px system-ui;text-align:center">
      <span style="position:absolute;left:4px;font:italic 900 7px/22px system-ui;color:#fffa">TRAP ››</span>${esc(T.name)}</div>
    <div style="position:absolute;left:126px;top:30px;width:120px;background:#2a0b1fcc;padding:6px;border-radius:3px;font:600 8.5px/12px system-ui">
      0G of its own. Once per game, add it to a battle like an Ability card: it gets the Gate card's bonus for <b>each</b> of its attributes.${T.maxus ? `<div style="margin-top:4px;color:#9fd4ff">A piece of Maxus ${T.maxus === 'sp00_01' ? 'Dragonoid' : 'Helios'}.</div>` : ''}
      <div style="margin-top:6px;color:#9fd4ff">${slots === 6 ? 'Has all 6 attributes' : slots === 1 ? 'Has 1 attribute' : slots ? `Has exactly ${slots} attributes` : 'Pick 2 or more attributes'}</div>
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
  $('bot').querySelectorAll('[data-ta]').forEach(b => b.onclick = () => { if (slots === 6) return; const a = b.dataset.ta, k = trapPick.attrs.indexOf(a); if (k >= 0) trapPick.attrs.splice(k, 1); else trapPick.attrs.push(a); trapShop(); });
  $('tBuy').onclick = () => {
    if (!ready) { bar(slots ? `${T.name} has exactly ${slots} attributes.` : 'A Trap needs 2 or more attributes.'); return; }
    if (p.bp < price) { bar(`You need ${price - p.bp} more BP.`); return; }
    const uid = 't' + Date.now().toString(36), attrs = ATTRS.filter(a => trapPick.attrs.includes(a));
    P.update(act(), q => { P.ensureShop(q); q.owned.traps = q.owned.traps || []; q.bp -= price; q.owned.traps.push({ uid, id: T.id, color, attrs });
      if (q.deck && !q.deck.trap) q.deck.trap = uid; });
    trapPick.attrs = []; trapShop(); bar(`Thanks! ${T.name} (${attrs.map(cap).join(', ')}) is yours. Choose your Trap in My Room > Deck.`);
  };
  backBtn(() => go('shop'));
}
