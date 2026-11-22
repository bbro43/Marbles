// Builds js/newbrawlers.js: the 21 brawlers from Billy's Sim sheet (Sim.xlsx, "Characters and Race"), joining in Seasons 3 and 4.
// Same shape as the Interspace brawlers in js/aiteams.js (name, species, attrs, signature, easy / normal / hard).
// Usage: node tools/newbrawlers.mjs <pack-1 catalog.json>
//
// Billy (Nov 22): Season 3 adds the 8 Gundalians, the 7 Neathians and Jason to League 4; Season 4 adds Evelyn, Nina, Kala and
// Olivia. Raymond never joins (he's built, but not on any roster).
// Signatures: each has one tt_ Bakugan of their own (the six single-attribute ones go to a brawler of that attribute). For the 6 Gundalians and 6 Neathians with partners these are STAND-INS
// until Billy's 12 partner Bakugan are in the pack (change SIG below). Where the sheet names a tt_ Bakugan, that one is used.
// Attributes are the sheet's. The sheet's cards are mostly not in the game yet, so cards are picked from the game's set
// like the Season 2 newcomers' (tools/aiteams.mjs). Traps: where the sheet gives one that's in the game.
import fs from 'fs';
import { fitsAttrs, abilityScore, lineBlocked, GATE_COLORS, AB_COLORS } from '../js/setup.js';
import { isCoded, toyMatches } from '../js/abilities.js';
const cat = JSON.parse(fs.readFileSync(process.argv[2]));
const byName = new Map(cat.toys.filter(t => t.baseG).map(t => [t.name, t]));
// id, name, species, attrs (from the sheet), signature (tt_), season they join (0 = never), story start level
const NEW = [
  // Gundalians (Season 3)
  ['brodny', 'Brodny', 'Gundalian', ['subterra'], 'Mantris', 3, 'normal'],
  ['kasimir', 'Kasimir', 'Gundalian', ['haos'], 'Oberus', 3, 'normal'],
  ['pavel', 'Pavel', 'Gundalian', ['ventus'], 'El Condor', 3, 'normal'],
  ['tibor', 'Tibor', 'Gundalian', ['pyrus', 'ventus', 'darkus'], 'Wormquake', 3, 'normal'],
  ['vasek', 'Vasek', 'Gundalian', ['haos'], 'Lars Lion', 3, 'normal'],
  ['vesna', 'Vesna', 'Gundalian', ['pyrus', 'ventus'], 'Jelldon', 3, 'normal'],
  ['zarek', 'Zarek', 'Gundalian', ['aquos', 'subterra'], 'Limulus', 3, 'normal'],
  ['zorro', 'Zorro', 'Gundalian', ['pyrus'], 'Apollonir', 3, 'normal'],
  // Neathians (Season 3)
  ['arcadius', 'Arcadius', 'Neathian', ['pyrus'], 'Exedra', 3, 'normal'],
  ['demitri', 'Demitri', 'Neathian', ['subterra'], 'Tricloid', 3, 'normal'],
  ['eudocia', 'Eudocia', 'Neathian', ['ventus'], 'Hairadee', 3, 'normal'],
  ['ignatios', 'Ignatios', 'Neathian', ['pyrus'], 'Druman', 3, 'normal'],
  ['mousoulios', 'Mousoulios', 'Neathian', ['aquos'], 'Tayghen', 3, 'normal'],
  ['petronas', 'Petronas', 'Neathian', ['darkus'], 'Centorrior', 3, 'normal'],
  ['sophia', 'Sophia', 'Neathian', ['haos'], 'Rabeeder', 3, 'normal'],
  // Humans and Vestals
  ['jason', 'Jason', 'Human', ['ventus'], 'Frosch', 3, 'easy'],
  ['evelyn', 'Evelyn', 'Vestal', ['darkus'], 'Dryoid', 4, 'easy'],
  ['nina', 'Nina', 'Vestal', ['darkus'], 'Rattleoid', 4, 'easy'],
  ['kala', 'Kala', 'Human', ['aquos'], 'Fifth Paladin', 4, 'easy'],
  ['olivia', 'Olivia', 'Human', ['subterra'], 'Clayf', 4, 'easy'],
  ['raymond', 'Raymond', 'Human', ['subterra', 'haos', 'aquos'], 'Alpha Hydranoid', 0, 'easy'],
];
// the sheet's own Bakugan that are in the game and nobody's partner: used before the shared filler pool
const SHEET_EXTRA = { pavel: ['Falconeer'], petronas: ['Ravenoid'], raymond: ['Robotallion'], tibor: ['Scraper'], zorro: ['Saurus'] };
// Traps from the sheet (in the game): [Trap, its attributes]
const SHEET_TRAP = { pavel: ['Metalfencer', ['ventus', 'aquos', 'subterra']], tibor: ['Tripod Epsilon', ['aquos', 'haos', 'subterra']] };
// filler: the Season 2 newcomers' synthetic pool plus the two tt_ Bakugan no one has
const FILL = ['Leefram', 'Robotallion', 'Foxbat', 'Ravenoid', 'Klawgor', 'Reaper', 'Scraper', 'Fear Ripper', 'Monarus', 'Hynoid', 'Spindle', 'Gargonoid',
  'Saurus', 'Fencer', 'Laserman', 'Warius', 'Serpenoid', 'Manion', 'Bee Striker', 'Terrorclaw', 'Griffon', 'Falconeer', 'Stinglash', 'Tuskor', 'Goblin Ball'];
const LEVELS = { easy: { upgrades: 0, rank: 4 }, normal: { upgrades: 5, rank: 1 }, hard: { upgrades: 10, rank: 0 } };
const gates = cat.cards.filter(c => c.type === 'gate' && c.bonus), abilities = cat.cards.filter(c => c.type === 'ability' && isCoded(c));
const problems = [], notes = [];
const goldFor = (g, names) => names.some(n => toyMatches(n, g.name));
function pickGates(names, attr, rank) {
  const gt = {};
  for (const c of GATE_COLORS) {
    let pool = gates.filter(g => g.color === c);
    // Gold: the card of a Bakugan they carry, else (no Gold card for their Bakugan yet) the Gold card best for their attribute
    // and least for the others, like Volt's and Mylene's on Hard (Billy, Nov 22)
    let score = g => (g.bonus[attr] || 0);
    if (c === 'gold') { const mine = pool.filter(g => goldFor(g, names)); if (mine.length) pool = mine;
      else score = g => (g.bonus[attr] || 0) * 3 - Object.entries(g.bonus).filter(([a]) => a !== attr).reduce((n, [, v]) => n + v, 0) / 5; }
    const r = [...pool].sort((a, b) => score(b) - score(a)), g = r[Math.min(c === 'gold' ? 0 : rank, r.length - 1)];
    gt[c] = { id: g.id, name: g.name };
  }
  return gt;
}
const used = Object.fromEntries(FILL.map(n => [n, 0])), sigs = new Set();
const out = {}, start = {}, joins = {};
NEW.forEach(([id, name, species, attrs, sig, season, lvl0], i) => {
  const s = byName.get(sig); if (!s) problems.push(`${id}: no Bakugan ${sig}`); if (sigs.has(sig)) problems.push(`${id}: ${sig} is someone else's`); sigs.add(sig);
  const names = [sig];
  for (const n of SHEET_EXTRA[id] || []) if (names.length < 3 && byName.get(n) && !lineBlocked(names.map(x => ({ id: byName.get(x).id })), byName.get(n).id)) names.push(n);
  const pool = FILL.filter(n => !names.includes(n) && byName.get(n)).sort((a, b) => used[a] - used[b] || ((FILL.indexOf(a) * 7 + i * 5) % FILL.length) - ((FILL.indexOf(b) * 7 + i * 5) % FILL.length));
  for (const n of pool) { if (names.length >= 3) break; if (lineBlocked(names.map(x => ({ id: byName.get(x).id })), byName.get(n).id)) continue; names.push(n); }
  names.slice(1).forEach(n => { if (n in used) used[n]++; });
  const toyAttr = names.map((n, k) => attrs[k % attrs.length]);
  out[id] = { name, species, attrs, signature: sig, joins: season };
  start[id] = lvl0; joins[id] = season;
  for (const [lvl, { upgrades, rank }] of Object.entries(LEVELS)) {
    const team = { attr: attrs[0], upgrades, toys: names.map((n, k) => ({ id: byName.get(n).id, attr: byName.get(n).attributes[toyAttr[k]] ? toyAttr[k] : Object.keys(byName.get(n).attributes)[0], name: n })),
      gates: pickGates(names, attrs[0], rank), abilities: {}, extra: {} };
    for (const c of AB_COLORS) {
      let p = abilities.filter(a => a.name !== 'Early Victory' && a.color === c && fitsAttrs(a, attrs)); if (!p.length) p = abilities.filter(a => a.color === c);
      const r = [...p].sort((a, b) => abilityScore(b, attrs) - abilityScore(a, attrs)), a = r[Math.min(rank, r.length - 1)];
      team.abilities[c] = { id: a.id, name: a.name };
      const more = r.filter(x => x !== a), st = Math.min(rank, Math.max(0, more.length - 2));
      team.extra[c] = more.slice(st, st + 2).map(x => ({ id: x.id, name: x.name }));
    }
    if (SHEET_TRAP[id]) { const [tn, ta] = SHEET_TRAP[id], t = (cat.traps || []).find(x => x.name === tn);
      if (!t) notes.push(`${id}: Trap ${tn} is not in pack 1's catalog (Traps live in pack 2)`); team.trap = { id: t ? t.id : tn, name: tn, color: attrs[0], attrs: [...new Set([attrs[0], ...ta])] }; }
    out[id][lvl] = team;
  }
});
fs.writeFileSync(new URL('../js/newbrawlers.js', import.meta.url), `// The 21 brawlers from Billy's Sim sheet, joining in Seasons 3 and 4. Built by tools/newbrawlers.mjs: edit the table there.
// Importing this file adds them to INTERSPACE and STORY_START (js/aiteams.js), so everything that looks brawlers up finds them.
import { INTERSPACE, STORY_START } from './aiteams.js';
export const NEW_BRAWLERS = ${JSON.stringify(out, null, 1)};
// the season each joins in (0 = never: Raymond)
export const JOINS = ${JSON.stringify(joins)};
export const SEASON3_NEW = Object.keys(JOINS).filter(id => JOINS[id] === 3);
export const SEASON4_NEW = Object.keys(JOINS).filter(id => JOINS[id] === 4);
Object.assign(INTERSPACE, NEW_BRAWLERS);
Object.assign(STORY_START, ${JSON.stringify(start)});
`);
console.log(problems.length ? 'PROBLEMS\n' + problems.join('\n') : 'ok', '| notes:', notes.join('; ') || 'none');
console.log(Object.entries(out).map(([id, x]) => `${id}: ${x.hard.toys.map(t => t.name + ' ' + t.attr).join(', ')} | gold ${x.hard.gates.gold.name}${x.hard.trap ? ' | trap ' + x.hard.trap.name : ''}`).join('\n'));
console.log('filler use:', Object.entries(used).filter(([, v]) => v).map(x => x.join(' ')).join(', '));
