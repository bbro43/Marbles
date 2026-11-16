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
// titles by number of wins (the DS's ranks)
export const TITLES = [[0, 'Rookie'], [5, 'Beginner'], [15, 'Intermediate'], [30, 'Advanced'], [50, 'Bakugan Pro'], [80, 'Bakugan Master'], [120, 'Bakugan Emperor'], [200, 'Ultimate Brawler']];
export const titleFor = wins => TITLES.filter(([n]) => wins >= n).at(-1)[1];
// after a match: who you played, did you win, Gate cards you won, knockouts you made
export function record(slot, { opponent, won, gates = 0, knockouts = 0, level = 'normal' }) {
  let earned = 0;
  update(slot, p => {
    ensureShop(p); earned = won ? (BP_WIN[level] || BP_WIN.normal) : BP_LOSS; p.bp += earned;
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
export const G_STEP = 10, G_CAP = 600, STAT_CAP = 5;
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
// G-Power: +10G each, the price goes up with each one bought for that Bakugan
export const gPrice = n => 100 + 20 * n;
// Level: each level adds 1 to Speed, Defense or Magnet (your pick). Level 1 = no stat points added.
export const levelPrice = lv => 300 * lv;
export const key = (id, attr) => `${id}:${attr}`;
// owned: { toys: { 'bb_00:pyrus': { g: upgrades bought, st: { speed, defense, magnet } } }, cards: [ids] }
export function ensureShop(p) {
  if (p.bp === undefined) p.bp = START_BP;
  if (p.owned && !p.owned.traps) p.owned.traps = [];
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
  const u = owned && owned.toys[key(t.id, attr)] || { g: 0, st: {} }, base = t.stats || {};
  const st = {}; for (const k of ['speed', 'defense', 'magnet']) st[k] = Math.min(STAT_CAP, (base[k] || 3) + ((u.st || {})[k] || 0));
  return { g: Math.min(G_CAP, (t.baseG || 250) + (u.g || 0) * G_STEP), stats: st, level: levelOf(u) };
}
