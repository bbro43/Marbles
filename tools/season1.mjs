// Runs Season 1 of Interspace (the pre-season, one year after New Vestroia): the 24 characters from the show.
// Usage: node tools/season1.mjs <catalog.json> [seed]  -> data/season1.json (+ a summary on screen)
import fs from 'fs';
import { runSeason } from '../js/season.js';
import { AI_TEAMS, STORY_START } from '../js/aiteams.js';
const cat = JSON.parse(fs.readFileSync(process.argv[2]));
const seed = +(process.argv[3] || 2026);
const roster = Object.keys(AI_TEAMS).filter(id => !['dan', 'shun', 'marucho'].includes(id)).map(id => ({ id, level: STORY_START[id] }));
const t0 = Date.now();
const s = runSeason(cat, roster, { seed, season: 1 });
fs.writeFileSync(new URL('../data/season1.json', import.meta.url), JSON.stringify(s));
const NAME = { nv_dan: 'Dan', nv_shun: 'Shun', nv_marucho: 'Marucho', chanlee: 'Chan Lee' };
const nm = r => NAME[r.id] || r.name[0].toUpperCase() + r.name.slice(1);
console.log(`Season 1: ${roster.length} brawlers, ${s.matchCount} matches, ${s.events.length} events, ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log('\nSEASON RANKING (points) | rating | W-L-D | level start -> end | titles');
s.seasonRanking.forEach((r, i) => console.log(`${String(i + 1).padStart(2)}. ${nm(r).padEnd(11)} ${String(r.pts).padStart(4)} | ${String(r.elo).padStart(4)} | ${r.record.w}-${r.record.l}-${r.record.d} | ${r.level} -> ${r.endLevel} (${r.upgrades}->${r.endUpgrades}) | ${r.titles.join(', ')}`));
console.log('\nEVENTS');
for (const e of s.events) console.log(`wk ${String(e.week).padStart(2)} ${e.name.padEnd(20)} ${e.tier.padEnd(18)} ${e.format.padEnd(10)} ${e.rules.padEnd(7)} n=${String(e.entrants).padStart(2)} days ${e.day}-${e.endDay}  winner: ${e.winner.join(' & ')}  (runner-up ${e.runnerUp.join(' & ')})`);
