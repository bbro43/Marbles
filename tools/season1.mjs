// Runs Season 1 of Interspace (the pre-season, one year after New Vestroia): the 24 characters from the show, in 3 leagues of 8.
// LOCKED Nov 16, 2026 (Billy): data/season1.json from seed 2026 is the official Season 1. Re-running overwrites it.
// Usage: node tools/season1.mjs <catalog.json> [seed]  -> data/season1.json (+ a summary on screen)
import fs from 'fs';
import { runSeason } from '../js/season.js';
import { STORY_START } from '../js/aiteams.js';
const cat = JSON.parse(fs.readFileSync(process.argv[2]));
const seed = +(process.argv[3] || 2026);
import { SHOW_RANK } from '../js/showrank.js';
const leagues = [SHOW_RANK.slice(0, 8), SHOW_RANK.slice(8, 16), SHOW_RANK.slice(16)];
const roster = SHOW_RANK.map(id => ({ id, level: STORY_START[id] }));
const s = runSeason(cat, roster, leagues, { seed, season: 1 });
fs.writeFileSync(new URL('../data/season1.json', import.meta.url), JSON.stringify(s));
const NAME = { nv_dan: 'Dan', nv_shun: 'Shun', nv_marucho: 'Marucho', chanlee: 'Chan Lee' };
const nm = id => NAME[id] || id[0].toUpperCase() + id.slice(1);
console.log(`Season 1: ${roster.length} brawlers, ${s.matchCount} matches, ${s.events.length} events`);
for (const L of s.leagues) {
  console.log(`\nLEAGUE ${L.league}  (by BP | by points)`);
  L.byBP.forEach((r, i) => { const p = L.byPts[i];
    console.log(`${i + 1}. ${nm(r.id).padEnd(11)} ${String(r.league.bp).padStart(5)} BP ${r.league.w}-${r.league.l}-${r.league.d}  |  ${nm(p.id).padEnd(11)} ${String(p.league.pts).padStart(2)} pts ${p.league.w}-${p.league.l}-${p.league.d}`); });
}
console.log('\nSEASON RANKING (BP) | Elo | W-L-D | matches | upgrades | titles');
s.seasonRanking.forEach((r, i) => console.log(`${String(i + 1).padStart(2)}. ${nm(r.id).padEnd(11)} ${String(r.bp).padStart(6)} | ${r.elo} | ${r.record.w}-${r.record.l}-${r.record.d} | ${r.matches} | +${r.upgrades} -> +${r.endUpgrades} | ${r.titles.join(', ')}`));
console.log('\nEVENTS');
for (const e of s.events) console.log(`wk ${String(e.week).padStart(2)} ${e.name.padEnd(14)} ${e.format.padEnd(10)} ${e.rules.padEnd(7)} n=${e.entrants}  winner: ${e.winner.map(nm).join(' & ')}  (runner-up ${e.runnerUp.map(nm).join(' & ')})`);
console.log('\nNEXT SEASON (by points):', s.nextLeagues.map(l => l.map(nm).join(', ')).join('  ||  '));
console.log('IF BY BP:               ', s.nextLeaguesIfBP.map(l => l.map(nm).join(', ')).join('  ||  '));
for (const e of s.events.filter(e => e.invited)) {
  const why = {}; for (const [id, r] of Object.entries(e.invited)) if (r !== 'League 1') (why[r] = why[r] || []).push(nm(id));
  console.log(`${e.name} invites beyond League 1:`, Object.entries(why).map(([r, l]) => `${r}: ${l.join(', ')}`).join(' | '));
}
