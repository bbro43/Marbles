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
  d.slots[slot] = { name: name || 'Brawler', look, face: null, deck: null, stats: newStats(), made: Date.now() };
  d.active = slot; save(d); return d.slots[slot];
}
export function update(slot, fn) { const d = load(); if (!d.slots[slot]) return; fn(d.slots[slot]); save(d); }
// titles by number of wins (the DS's ranks)
export const TITLES = [[0, 'Rookie'], [5, 'Beginner'], [15, 'Intermediate'], [30, 'Advanced'], [50, 'Bakugan Pro'], [80, 'Bakugan Master'], [120, 'Bakugan Emperor'], [200, 'Ultimate Brawler']];
export const titleFor = wins => TITLES.filter(([n]) => wins >= n).at(-1)[1];
// after a match: who you played, did you win, Gate cards you won, knockouts you made
export function record(slot, { opponent, won, gates = 0, knockouts = 0 }) {
  update(slot, p => {
    const s = p.stats = { ...newStats(), ...(p.stats || {}) };
    s.matches++; if (won) { s.wins++; s.streak++; s.best = Math.max(s.best, s.streak); } else { s.losses++; s.streak = 0; }
    s.gates += gates; s.knockouts += knockouts;
    if (opponent) { const v = s.vs[opponent] || (s.vs[opponent] = { w: 0, l: 0 }); won ? v.w++ : v.l++; }
  });
}
