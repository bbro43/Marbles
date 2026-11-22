import { baseStats, STATS } from './control.js';
// Saved players: 6 slots like the DS. Each has a name, a look (js/avatar.js), a face picture, a deck and statistics.
// Kept on this device (localStorage), saved every time something changes.
const KEY = 'marbles-profiles';
export const SLOTS = 6;
const blank = () => ({ active: null, slots: Array(SLOTS).fill(null) });
export function load() {
  try { const d = JSON.parse(localStorage.getItem(KEY) || 'null'); if (d && Array.isArray(d.slots)) { while (d.slots.length < SLOTS) d.slots.push(null); return d; } } catch {}
  return blank();
}
export function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} }
export function active(d = load()) { return d.active !== null && d.slots[d.active] ? d.slots[d.active] : null; }
export const newStats = () => ({ matches: 0, wins: 0, losses: 0, gates: 0, knockouts: 0, streak: 0, best: 0, vs: {} });
export function create(d, slot, name, look) {
  d.slots[slot] = { name: name || 'Brawler', look, face: null, deck: null, stats: newStats(), made: Date.now(), bp: START_BP, owned: { toys: {}, cards: [], traps: [] } };
  d.active = slot; save(d); return d.slots[slot];
}
export function update(slot, fn) { const d = load(); if (!d.slots[slot]) return; fn(d.slots[slot]); save(d); }

// ---------- Each profile has its own Story save (Billy, Nov 22). The main menu's My Room, both Shops and the Battle Arena
// all use that profile's Story character, deck, collection and BP, so it's one character everywhere.
const OLD_STORY = 'marbles-story';
export const activeSlot = (d = load()) => d.active !== null && d.active !== undefined && d.slots[d.active] ? d.active : null;
export const storyKey = (slot = activeSlot()) => slot === null || slot === undefined ? null : `marbles-story-${slot}`;
export function loadStory(slot = activeSlot()) { const k = storyKey(slot); if (!k) return null; try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } }
export function saveStory(st, slot = activeSlot()) { const k = storyKey(slot); if (!k) return; try { localStorage.setItem(k, JSON.stringify(st)); } catch {} }
export const hasStory = (slot = activeSlot()) => { const st = loadStory(slot); return !!(st && st.you && st.season && st.you.coll); };
export function dropStory(slot) { const k = storyKey(slot); if (k) try { localStorage.removeItem(k); } catch {} }
// once: the single Story save from before goes to the active profile (no profile yet: a new one is made from it)
export function migrateStory() {
  let old = null; try { old = localStorage.getItem(OLD_STORY); } catch {} if (!old) return;
  const d = load(); let slot = activeSlot(d);
  if (slot === null) { let st = null; try { st = JSON.parse(old); } catch {} const y = (st && st.you) || {};
    slot = d.slots.findIndex(x => !x); if (slot < 0) slot = 0; create(d, slot, y.name || 'Brawler', y.look || null); }
  try { if (!localStorage.getItem(storyKey(slot))) localStorage.setItem(storyKey(slot), old); localStorage.removeItem(OLD_STORY); } catch {}
}
// a Story deck ({ id, name } objects) as My Room's deck (plain ids, and a Trap's uid)
const GATE_C = ['gold', 'silver', 'copper'], AB_C = ['red', 'blue', 'green'];
export function storyDeckIds(y) {
  const d = y.deck; if (!d) return null;
  const id = x => x && (x.id || x), tr = d.trap && (y.coll.traps || []).find(t => t.id === d.trap.id && (t.attrs || []).join() === (d.trap.attrs || []).join());
  return { toys: d.toys.map(x => ({ id: x.id, attr: x.attr })), gates: Object.fromEntries(GATE_C.map(c => [c, id(d.gates[c])])),
    abilities: Object.fromEntries(AB_C.map(c => [c, id(d.abilities[c])])), extra: Object.fromEntries(AB_C.map(c => [c, ((d.extra || {})[c] || []).map(id)])), trap: tr ? tr.uid : null,
    gear: d.gear || null, nano: d.nano || null };   // Battle Gear and BakuNano: their uids
}
// a profile as everything outside Story sees it: with a Story save, its name, look, deck, BP and collection come from there
export function view(p, slot) {
  const st = loadStory(slot); if (!p || !st || !st.you || !st.season || !st.you.coll) return p;
  const y = st.you, w = st.season.B.you, dk = storyDeckIds(y);
  return { ...p, name: y.name || p.name, look: y.look || p.look, deck: dk, deckNV: dk, bp: w.wallet, story: true,
    owned: { toys: Object.fromEntries(Object.keys(y.coll.toys).map(k => [k, { g: 0, st: {}, ...JSON.parse(JSON.stringify(y.coll.toys[k] || {})) }])), cards: [...y.coll.cards], traps: [...y.coll.traps], gear: [...(y.coll.gear || [])], nano: [...(y.coll.nano || [])] } };
}
// titles by number of wins (the DS's ranks)
export const TITLES = [[0, 'Rookie'], [5, 'Beginner'], [15, 'Intermediate'], [30, 'Advanced'], [50, 'Bakugan Pro'], [80, 'Bakugan Master'], [120, 'Bakugan Emperor'], [200, 'Ultimate Brawler']];
export const titleFor = wins => TITLES.filter(([n]) => wins >= n).at(-1)[1];
// after a match: who you played, did you win, Gate cards you won, knockouts you made
export function record(slot, { opponent, won, gates = 0, knockouts = 0, level = 'normal' }) {
  let earned = 0;
  update(slot, p => {
    ensureShop(p); earned = won ? (BP_WIN[level] || BP_WIN.normal) : BP_LOSS;
    // with a Story save the BP go to its wallet (spendable in both Shops), not to the season's BP ranking
    const st = loadStory(slot); if (st && st.season && st.season.B && st.season.B.you) { st.season.B.you.wallet += earned; saveStory(st, slot); } else p.bp += earned;
    const s = p.stats = { ...newStats(), ...(p.stats || {}) };
    s.matches++; if (won) { s.wins++; s.streak++; s.best = Math.max(s.best, s.streak); } else { s.losses++; s.streak = 0; }
    s.gates += gates; s.knockouts += knockouts;
    if (opponent) { const v = s.vs[opponent] || (s.vs[opponent] = { w: 0, l: 0 }); won ? v.w++ : v.l++; }
  });
  return earned;
}

// ---------- Shop: BP, what you own, upgrades
export const START_BP = 500;
export const BP_WIN = { easy: 100, normal: 200, hard: 400 }, BP_LOSS = 25;
export const G_STEP = 10, G_CAP = 600, STAT_CAP = 5, LEVEL_UPS = 5;   // Billy, Nov 20: 5 stat upgrades per Bakugan, no stat above 5
// prices (BP), close to the DS shop: a 190G Bakugan is 1,100, a 200G one 1,200
export const toyPrice = t => Math.max(800, Math.round((t.baseG || 250) * 6 / 100) * 100);
export const CARD_PRICE = { gold: 250, silver: 200, copper: 150, red: 300, blue: 300, green: 300 };
export const cardPrice = c => CARD_PRICE[c.color] || 250;
// Traps: the more attributes, the more it costs (2 attributes 1,500; each more +1,000)
// Some Traps have a set number of attributes (Billy's B.xlsx). Traps not listed (Wired and the Maxus Helios pieces): pick 2 or more.
export const TRAP_SLOTS = { 'Scorpion': 2, 'Hylash': 2, 'Tripod Epsilon': 3, 'Baliton': 2, 'Falcon Fly': 2, 'Piercian': 3,
  'Metalfencer': 2, 'Tripod Theta': 3, 'Hexados': 6, 'Dynamo': 3, 'Fortress': 2,
  'Spyder Fencer': 1, 'Grakas Hound': 2, 'Dark Hound': 2, 'Grafias': 1, 'Brachium': 1, 'Spitarm': 2 };
export const trapPrice = n => n <= 1 ? 1000 : 1500 + 1000 * (n - 2);
// G-Power: +10G each. The stronger the Bakugan already is, and the more boosts it has had, the more the next one costs (Billy, Nov 16):
// a 250G Bakugan's first boost is 300 BP; a 400G one's is 750 BP; each boost bought adds 60 BP on top (prices tripled, Billy).
export const gPrice = (n, g = 250) => 3 * (Math.max(100, g - 150) + 20 * n);
// Level: each level adds 1 to Speed, Defense or Magnet (your pick). Level 1 = no stat points added.
export const levelPrice = lv => 300 * lv;
export const key = (id, attr) => `${id}:${attr}`;
// owned: { toys: { 'bb_00:pyrus': { g: upgrades bought, st: { speed, defense, magnet } } }, cards: [ids] }
export function ensureShop(p) {
  if (p.bp === undefined) p.bp = START_BP;
  if (p.owned && !p.owned.traps) p.owned.traps = [];
  if (p.owned && !p.owned.gear) p.owned.gear = [];   // Battle Gear and BakuNano (js/gear.js): { uid, id, color }
  if (p.owned && !p.owned.nano) p.owned.nano = [];
  // the Maxus Helios pieces (build 58) and Wired (build 60) became Bakugan: Traps bought as those are refunded
  const GONE = ['dc_spt_fencer', 'dc_spt_foxbat', 'dc_spt_leefram', 'dc_spt_scraper', 'dc_spt_spindle', 'dc_spt_klawgor', 'dc_spt11'];
  if (p.owned && p.owned.traps.some(t => GONE.includes(t.id))) {
    for (const t of p.owned.traps.filter(t => GONE.includes(t.id))) {
      p.bp += trapPrice((t.attrs || []).length);
      for (const d of [p.deck, p.deckNV]) if (d && d.trap === t.uid) d.trap = null;
    }
    p.owned.traps = p.owned.traps.filter(t => !GONE.includes(t.id));
  }
  if (!p.owned) {
    p.owned = { toys: {}, cards: [], traps: [] };
    if (p.deck) {   // a player made before the Shop keeps the deck they had
      for (const x of p.deck.toys || []) p.owned.toys[key(x.id, x.attr)] = { g: 0, st: {} };
      p.owned.cards = [...Object.values(p.deck.gates || {}), ...Object.values(p.deck.abilities || {})];
    }
  }
  return p;
}
export const levelOf = u => 1 + Object.values((u && u.st) || {}).reduce((a, b) => a + b, 0);
// a Bakugan's G and stats with its upgrades
export function upgraded(t, attr, owned) {
  const u = owned && owned.toys[key(t.id, attr)] || { g: 0, st: {} }, base = baseStats(t);
  const st = {}; for (const k of STATS) st[k] = Math.min(STAT_CAP, (base[k] || 3) + ((u.st || {})[k] || 0));
  return { g: Math.min(G_CAP, (t.baseG || 250) + (u.g || 0) * G_STEP), stats: st, level: levelOf(u) };
}

// last, once everything above is defined: move an old single Story save over to its profile
migrateStory();
