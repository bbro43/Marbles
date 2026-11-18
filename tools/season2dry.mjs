// Dry run of Season 2 (the season you join), with you played by the simulator at Normal level. Usage: node tools/season2dry.mjs [seasons] [catalog.json]
import fs from 'fs';
import { runSeason } from '../js/season.js';
import { setupSeason2 } from '../js/season2.js';
const cat = JSON.parse(fs.readFileSync(process.argv[3] || '/home/claude/pack/catalog.json'));
const s1 = JSON.parse(fs.readFileSync(new URL('../data/season1.json', import.meta.url)));
const N = +(process.argv[2] || 1), agg = {};
let last;
for (let seed = 1; seed <= N; seed++) {
  const S = setupSeason2(s1, { seed, you: { name: 'You', attr: ['pyrus','aquos','subterra','haos','darkus','ventus'][seed % 6] } });
  const r = runSeason(cat, S.roster, S.leagues, { seed, season: 2, events: S.events, promote: S.promote, names: S.names });
  last = { S, r };
  for (const x of r.seasonRanking) { const a = agg[x.id] ||= { rank: 0, m: 0, w: 0, up: 0, titles: 0, promo: 0, lg: x.level };
    a.rank += r.seasonRanking.indexOf(x) + 1; a.m += x.matches; a.w += x.record.w; a.up += x.endUpgrades - x.upgrades; a.titles += x.titles.length; }
  r.nextLeagues.forEach((l, i) => l.forEach(id => { if (agg[id]) agg[id].nl = (agg[id].nl || 0) + (i + 1); }));
}
const { S, r } = last;
console.log('matches', r.matchCount, 'next league sizes', r.nextLeagues.map(l => l.length).join('/'));
console.log('events:'); for (const e of r.events) console.log(' wk', e.week, e.name.padEnd(20), e.format.padEnd(9), e.rules.padEnd(7), String(e.arena || '-').padEnd(9), 'n', e.entrants, 'winner', e.winner.join('&'), e.prizeWon ? `prize ${e.prizeWon.name} (${e.prizeWon.attr} ${e.prizeWon.g}G)` : '');
console.log(`\nover ${N} seasons: id league-level avgRank matches win% upgrades titles avgNextLeague`);
Object.entries(agg).sort((a, b) => a[1].rank - b[1].rank).forEach(([id, a]) => console.log(id.padEnd(11), a.lg.padEnd(7), (a.rank / N).toFixed(1).padStart(5), (a.m / N).toFixed(0).padStart(3), (100 * a.w / a.m).toFixed(0).padStart(4) + '%', ('+' + (a.up / N).toFixed(1)).padStart(5), (a.titles / N).toFixed(2), ((a.nl || 0) / N).toFixed(2)));
