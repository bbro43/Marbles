// Builds js/aiteams.js: each computer character's Easy / Normal / Hard team (3 Bakugan + all 6 cards + upgrades).
// Usage: node tools/aiteams.mjs <catalog.json>
import fs from 'fs';
import { fitsAttrs, abilityScore, lineBlocked, GATE_COLORS, AB_COLORS } from '../js/setup.js';
import { isCoded } from '../js/abilities.js';
const cat = JSON.parse(fs.readFileSync(process.argv[2]));
const byName = new Map(cat.toys.filter(t => t.baseG).map(t => [t.name, t]));
// character: attribute (one, or one per difficulty) and the Bakugan used at each difficulty (stronger Bakugan as it goes up)
const CH = {
  dan:        ['pyrus',    ['Dragonoid', 'Falconeer', 'Serpenoid'],     ['Dragonoid', 'Laserman', 'Griffon'],       ['Delta Dragonoid II', 'Fortress', 'Warius']],
  runo:       ['haos',     ['Tigrerra', 'Centipoid', 'Saurus'],         ['Tigrerra', 'Tentaclear', 'Laserman'],     ['Blade Tigrerra', 'Mega Nemus', 'Tentaclear']],
  marucho:    ['aquos',    ['Preyas', 'Juggernoid', 'Stinglash'],       ['Preyas', 'Sirenoid', 'Siege'],            ['Preyas II (Angelo)', 'Preyas', 'Dual Elfin']],
  julie:      ['subterra', ['Gorem', 'Saurus', 'Terrorclaw'],           ['Gorem', 'Cycloid', 'Siege'],              ['Hammer Gorem', 'Thunder Wilda', 'Cycloid']],
  shun:       ['ventus',   ['Skyress', 'Falconeer', 'Monarus'],         ['Skyress', 'Harpus', 'Laserman'],          ['Storm Skyress', 'Cosmic Ingram', 'Harpus']],
  akira:      ['subterra',    ['Saurus', 'Juggernoid', 'Robotallion'],     ['Falconeer', 'Siege', 'Griffon'],          ['Laserman', 'Warius', 'Fortress']],
  shuji:      [['subterra', 'darkus', 'darkus'],   ['Fear Ripper', 'Gargonoid', 'Robotallion'], ['Fear Ripper', 'Siege', 'Laserman'],       ['Hades', 'Laserman', 'Siege']],
  jenny:      ['aquos',    ['Siege', 'Centipoid', 'Serpenoid'],         ['Siege', 'Elico', 'Stinglash'],            ['Siege', 'Elfin', 'Elico']],
  jewls:      ['subterra', ['Centipoid', 'Manion', 'Ravenoid'],         ['Centipoid', 'Terrorclaw', 'Griffon'],     ['Centipoid', 'Wilda', 'Laserman']],
  billy:      ['subterra', ['Cycloid', 'Terrorclaw', 'Manion'],         ['Cycloid', 'Premo Vulcan', 'Siege'],       ['Cycloid', 'Premo Vulcan', 'Wilda']],
  komba:      ['ventus',   ['Harpus', 'Manion', 'Ravenoid'],            ['Harpus', 'Falconeer', 'Laserman'],        ['Harpus', 'Ingram', 'Altair']],
  julio:      ['haos',     ['Tentaclear', 'Manion', 'Centipoid'],       ['Tentaclear', 'Brontes', 'Laserman'],      ['Tentaclear', 'Helios', 'Brontes']],
  chanlee:    ['pyrus',    ['Fortress', 'Gargonoid', 'Ravenoid'],       ['Fortress', 'Falconeer', 'Griffon'],       ['Fortress', 'Warius', 'Laserman']],
  klaus:      ['aquos',    ['Sirenoid', 'Centipoid', 'Juggernoid'],     ['Sirenoid', 'Elico', 'Siege'],             ['Sirenoid', 'Dual Elfin', 'Preyas II (Diablo)']],
  masquerade: ['darkus',   ['Reaper', 'Hydranoid', 'Fear Ripper'],      ['Hydranoid', 'Reaper', 'Laserman'],        ['Dual Hydranoid', 'Midnight Percival', 'Hades']],
  marduk:     ['darkus',   ['Gargonoid', 'Fear Ripper', 'Reaper'],      ['Vladitor', 'Reaper', 'Siege'],            ['Battle Ax Vladitor', 'Percival', 'Hades']],
};
const LEVELS = { easy: { upgrades: 0, rank: 4 }, normal: { upgrades: 5, rank: 1 }, hard: { upgrades: 10, rank: 0 } };   // rank 0 = best card for the team
const gates = cat.cards.filter(c => c.type === 'gate' && c.bonus), abilities = cat.cards.filter(c => c.type === 'ability' && isCoded(c));
const out = {}, problems = [];
for (const [id, [attrs0, ...tiers]] of Object.entries(CH)) {
  out[id] = { attr: Array.isArray(attrs0) ? attrs0.join('/') : attrs0 };
  Object.keys(LEVELS).forEach((lvl, k) => {
    const { upgrades, rank } = LEVELS[lvl], toys = [], attr = Array.isArray(attrs0) ? attrs0[k] : attrs0;
    for (const n of tiers[k]) {
      const t = byName.get(n);
      if (!t) { problems.push(`${id} ${lvl}: no Bakugan "${n}"`); continue; }
      if (lineBlocked(toys, t.id)) problems.push(`${id} ${lvl}: ${n} is in the same evolution line as another`);
      toys.push({ id: t.id, attr: t.attributes[attr] ? attr : Object.keys(t.attributes)[0], name: n });
    }
    const attrs = [attr], ranked = (arr, score) => [...arr].sort((a, b) => score(b) - score(a));
    const team = { attr, upgrades, toys, gates: {}, abilities: {} };
    for (const c of GATE_COLORS) { const r = ranked(gates.filter(g => g.color === c), g => g.bonus[attr] || 0); const g = r[Math.min(rank, r.length - 1)]; team.gates[c] = { id: g.id, name: g.name }; }
    for (const c of AB_COLORS) {
      let pool = abilities.filter(a => a.color === c && fitsAttrs(a, attrs)); if (!pool.length) pool = abilities.filter(a => a.color === c);
      const r = ranked(pool, a => abilityScore(a, attrs)); const a = r[Math.min(rank, r.length - 1)]; team.abilities[c] = { id: a.id, name: a.name };
    }
    out[id][lvl] = team;
  });
}
fs.writeFileSync(new URL('../js/aiteams.js', import.meta.url), `// Computer opponents: each character's team at Easy / Normal / Hard. Built by tools/aiteams.mjs — edit the table there.
// upgrades: each upgrade adds ${UPG()}G to every Bakugan on the team (capped at 600G).
export const UPGRADE_G = ${UPG()};
export const AI_TEAMS = ${JSON.stringify(out, null, 1)};
`);
function UPG() { return 10; }
console.log(problems.length ? problems.join('\n') : 'ok', Object.keys(out).length, 'characters');
