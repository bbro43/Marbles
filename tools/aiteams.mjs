// Builds js/aiteams.js: each computer character's Easy / Normal / Hard team (3 Bakugan + all 6 cards + upgrades).
// Usage: node tools/aiteams.mjs <catalog.json>
import fs from 'fs';
import { fitsAttrs, abilityScore, lineBlocked, GATE_COLORS, AB_COLORS } from '../js/setup.js';
import { isCoded } from '../js/abilities.js';
const cat = JSON.parse(fs.readFileSync(process.argv[2]));
const byName = new Map(cat.toys.filter(t => t.baseG).map(t => [t.name, t]));
// character: attribute (one, or one per difficulty) and the Bakugan used at each difficulty (stronger Bakugan as it goes up)
const CH = {
  // Each character: its partner Bakugan (evolved on Hard where we have one) plus generic Bakugan.
  // A partner is only ever used by its own character, and never in a starter deck (checked below).
  dan:        ['pyrus',    ['Dragonoid', 'Serpenoid', 'Saurus'],        ['Dragonoid', 'Falconeer', 'Griffon'],      ['Delta Dragonoid II', 'Laserman', 'Warius']],
  runo:       ['haos',     ['Tigrerra', 'Saurus', 'Manion'],            ['Tigrerra', 'Ravenoid', 'Monarus'],        ['Blade Tigrerra', 'Laserman', 'Monarus']],
  marucho:    ['aquos',    ['Preyas', 'Stinglash', 'Serpenoid'],        ['Preyas', 'Stinglash', 'Reaper'],          ['Preyas II (Angelo)', 'Warius', 'Laserman']],
  julie:      ['subterra', ['Gorem', 'Saurus', 'Robotallion'],          ['Gorem', 'Terrorclaw', 'Gargonoid'],       ['Hammer Gorem', 'Terrorclaw', 'Monarus']],
  shun:       ['ventus',   ['Skyress', 'Ravenoid', 'Manion'],           ['Skyress', 'Falconeer', 'Monarus'],        ['Storm Skyress', 'Monarus', 'Laserman']],
  akira:      ['subterra', ['Saurus', 'Robotallion', 'Stinglash'],      ['Falconeer', 'Terrorclaw', 'Griffon'],     ['Laserman', 'Terrorclaw', 'Warius']],
  shuji:      [['subterra', 'darkus', 'darkus'], ['Fear Ripper', 'Gargonoid', 'Robotallion'], ['Fear Ripper', 'Reaper', 'Gargonoid'], ['Warius', 'Reaper', 'Laserman']],
  jenny:      ['aquos',    ['Siege', 'Serpenoid', 'Stinglash'],         ['Siege', 'Stinglash', 'Griffon'],          ['Siege', 'Warius', 'Laserman']],
  jewls:      ['subterra', ['Centipoid', 'Manion', 'Saurus'],           ['Centipoid', 'Terrorclaw', 'Griffon'],     ['Centipoid', 'Terrorclaw', 'Laserman']],
  billy:      ['subterra', ['Cycloid', 'Terrorclaw', 'Manion'],         ['Cycloid', 'Gargonoid', 'Falconeer'],      ['Cycloid', 'Laserman', 'Terrorclaw']],
  komba:      ['ventus',   ['Harpus', 'Manion', 'Ravenoid'],            ['Harpus', 'Falconeer', 'Monarus'],         ['Harpus', 'Laserman', 'Monarus']],
  julio:      ['haos',     ['Tentaclear', 'Manion', 'Saurus'],          ['Tentaclear', 'Griffon', 'Ravenoid'],      ['Tentaclear', 'Laserman', 'Monarus']],
  chanlee:    ['pyrus',    ['Fortress', 'Gargonoid', 'Ravenoid'],       ['Fortress', 'Falconeer', 'Griffon'],       ['Fortress', 'Warius', 'Laserman']],
  klaus:      ['aquos',    ['Sirenoid', 'Stinglash', 'Serpenoid'],      ['Sirenoid', 'Reaper', 'Stinglash'],        ['Sirenoid', 'Warius', 'Laserman']],
  masquerade: ['darkus',   ['Hydranoid', 'Reaper', 'Fear Ripper'],      ['Hydranoid', 'Reaper', 'Laserman'],        ['Dual Hydranoid', 'Reaper', 'Warius']],
  marduk:     ['darkus',   ['Vladitor', 'Gargonoid', 'Fear Ripper'],    ['Vladitor', 'Reaper', 'Gargonoid'],        ['Battle Ax Vladitor', 'Reaper', 'Laserman']],
  // New Vestroia: every New Vestroia Bakugan is someone's partner, so the others are generic Battle Brawlers Bakugan
  nv_dan:     ['pyrus',    ['Neo Dragonoid', 'Griffon', 'Falconeer'],   ['Neo Dragonoid', 'Laserman', 'Monarus'],   ['Hyper Dragonoid', 'Warius', 'Laserman']],
  nv_shun:    ['ventus',   ['Ingram', 'Ravenoid', 'Falconeer'],         ['Ingram', 'Monarus', 'Laserman'],          ['Cosmic Ingram', 'Monarus', 'Laserman']],
  nv_marucho: ['aquos',    ['Elfin', 'Stinglash', 'Griffon'],           ['Elfin', 'Preyas', 'Reaper'],              ['Dual Elfin', 'Preyas', 'Warius']],
  ace:        ['darkus',   ['Percival', 'Fear Ripper', 'Reaper'],       ['Percival', 'Reaper', 'Laserman'],         ['Midnight Percival', 'Warius', 'Laserman']],
  mira:       ['subterra', ['Wilda', 'Terrorclaw', 'Gargonoid'],        ['Wilda', 'Terrorclaw', 'Monarus'],         ['Thunder Wilda', 'Laserman', 'Terrorclaw']],
  baron:      ['haos',     ['Nemus', 'Ravenoid', 'Manion'],             ['Nemus', 'Monarus', 'Griffon'],            ['Mega Nemus', 'Laserman', 'Monarus']],
  spectra:    ['pyrus',    ['Helios', 'Falconeer', 'Gargonoid'],        ['Helios', 'Laserman', 'Reaper'],           ['Helios', 'Warius', 'Laserman']],
  mylene:     ['aquos',    ['Elico', 'Stinglash', 'Reaper'],            ['Elico', 'Reaper', 'Laserman'],            ['Elico', 'Warius', 'Laserman']],
  volt:       ['haos',     ['Brontes', 'Manion', 'Griffon'],            ['Brontes', 'Monarus', 'Ravenoid'],         ['Brontes', 'Monarus', 'Laserman']],
  gus:        ['subterra', ['Premo Vulcan', 'Gargonoid', 'Terrorclaw'], ['Premo Vulcan', 'Terrorclaw', 'Monarus'], ['Premo Vulcan', 'Laserman', 'Terrorclaw']],
  shadow:     ['darkus',   ['Hades', 'Fear Ripper', 'Gargonoid'],       ['Hades', 'Reaper', 'Fear Ripper'],         ['Hades', 'Warius', 'Reaper']],
  lync:       ['ventus',   ['Altair', 'Ravenoid', 'Falconeer'],         ['Altair', 'Monarus', 'Griffon'],           ['Altair', 'Laserman', 'Monarus']],
};
const NEW_VESTROIA = new Set(['nv_dan', 'nv_shun', 'nv_marucho', 'ace', 'mira', 'baron', 'spectra', 'mylene', 'volt', 'gus', 'shadow', 'lync']);
// partner Bakugan and who they belong to (the same person in both series counts once: Dan, Shun, Marucho)
const PARTNERS = {
  dan: ['Dragonoid', 'Delta Dragonoid II', 'Neo Dragonoid', 'Hyper Dragonoid', 'Maxus Dragonoid'], runo: ['Tigrerra', 'Blade Tigrerra'],
  marucho: ['Preyas', 'Preyas II (Angelo)', 'Preyas II (Diablo)', 'Elfin', 'Dual Elfin'], julie: ['Gorem', 'Hammer Gorem'],
  shun: ['Skyress', 'Storm Skyress', 'Ingram', 'Cosmic Ingram'], masquerade: ['Hydranoid', 'Dual Hydranoid'], chanlee: ['Fortress'], klaus: ['Sirenoid'],
  julio: ['Tentaclear'], billy: ['Cycloid'], komba: ['Harpus'], marduk: ['Vladitor', 'Battle Ax Vladitor'], jenny: ['Siege'], jewls: ['Centipoid'],
  christopher: ['Juggernoid'], player: ['Leonidas', 'Omega Leonidas'] /* the DS story hero's partner */, ace: ['Percival', 'Midnight Percival', 'Percival (unidentified form)'], mira: ['Wilda', 'Thunder Wilda'], baron: ['Nemus', 'Mega Nemus'],
  spectra: ['Helios', 'Maxus Helios'], gus: ['Premo Vulcan'], mylene: ['Elico'], volt: ['Brontes'], shadow: ['Hades'], lync: ['Altair'],
};
const SAME = { nv_dan: 'dan', nv_shun: 'shun', nv_marucho: 'marucho' };
const ownerOf = new Map(Object.entries(PARTNERS).flatMap(([who, list]) => list.map(n => [n, who])));
// starter decks for new players: generic Bakugan only; cards = that attribute's main character's Easy cards
const STARTERS = {
  pyrus: ['dan', ['Serpenoid', 'Saurus', 'Falconeer']], aquos: ['marucho', ['Stinglash', 'Serpenoid', 'Robotallion']],
  subterra: ['julie', ['Robotallion', 'Saurus', 'Manion']], haos: ['runo', ['Saurus', 'Manion', 'Ravenoid']],
  darkus: ['masquerade', ['Fear Ripper', 'Gargonoid', 'Serpenoid']], ventus: ['shun', ['Ravenoid', 'Manion', 'Stinglash']],
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
      if (t.id.startsWith('dc_') && !NEW_VESTROIA.has(id)) problems.push(`${id} ${lvl}: ${n} is a New Vestroia Bakugan`);
      if (ownerOf.has(n) && ownerOf.get(n) !== (SAME[id] || id)) problems.push(`${id} ${lvl}: ${n} is ${ownerOf.get(n)}'s partner`);
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
const starters = {};
for (const [attr, [who, names]] of Object.entries(STARTERS)) {
  for (const n of names) { if (ownerOf.has(n)) problems.push(`starter ${attr}: ${n} is a partner`); if (!byName.get(n)) problems.push(`starter ${attr}: no Bakugan ${n}`); }
  const e = out[who].easy;
  starters[attr] = { toys: names.map(n => ({ id: byName.get(n).id, attr, name: n })), gates: e.gates, abilities: e.abilities };
}
fs.writeFileSync(new URL('../js/aiteams.js', import.meta.url), `// Computer opponents: each character's team at Easy / Normal / Hard. Built by tools/aiteams.mjs — edit the table there.
// upgrades: each upgrade adds ${UPG()}G to every Bakugan on the team (capped at 600G).
export const UPGRADE_G = ${UPG()};
export const AI_TEAMS = ${JSON.stringify(out, null, 1)};
// new players' starter decks, by attribute
export const STARTERS = ${JSON.stringify(starters, null, 1)};
`);
function UPG() { return 10; }
console.log(problems.length ? problems.join('\n') : 'ok', Object.keys(out).length, 'characters');
