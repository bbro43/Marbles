// Builds js/aiteams.js: each computer character's Easy / Normal / Hard team (3 Bakugan + all 6 cards + upgrades).
// Usage: node tools/aiteams.mjs <catalog.json>
import fs from 'fs';
import { fitsAttrs, abilityScore, lineBlocked, GATE_COLORS, AB_COLORS } from '../js/setup.js';
import { isCoded } from '../js/abilities.js';
import { TRAP_SLOTS } from '../js/profiles.js';
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
  lync:       ['ventus',   ['Altair', 'Wired', 'Falconeer'],            ['Altair', 'Wired', 'Griffon'],             ['Altair', 'Wired', 'Monarus']],
};
const NEW_VESTROIA = new Set(['nv_dan', 'nv_shun', 'nv_marucho', 'ace', 'mira', 'baron', 'spectra', 'mylene', 'volt', 'gus', 'shadow', 'lync']);
// partner Bakugan and who they belong to (the same person in both series counts once: Dan, Shun, Marucho)
const PARTNERS = {
  dan: ['Dragonoid', 'Delta Dragonoid II', 'Neo Dragonoid', 'Hyper Dragonoid', 'Maxus Dragonoid'], runo: ['Tigrerra', 'Blade Tigrerra'],
  marucho: ['Preyas', 'Preyas II (Angelo)', 'Preyas II (Diablo)', 'Elfin', 'Dual Elfin'], julie: ['Gorem', 'Hammer Gorem'],
  shun: ['Skyress', 'Storm Skyress', 'Ingram', 'Cosmic Ingram'], masquerade: ['Hydranoid', 'Dual Hydranoid'], chanlee: ['Fortress'], klaus: ['Sirenoid'],
  julio: ['Tentaclear'], billy: ['Cycloid'], komba: ['Harpus'], marduk: ['Vladitor', 'Battle Ax Vladitor'], jenny: ['Siege'], jewls: ['Centipoid'],
  christopher: ['Juggernoid'], player: ['Leonidas', 'Omega Leonidas'] /* the DS story hero's partner */, ace: ['Percival', 'Midnight Percival', 'Percival (unidentified form)'], mira: ['Wilda', 'Thunder Wilda'], baron: ['Nemus', 'Mega Nemus'],
  spectra: ['Helios', 'Maxus Helios'], gus: ['Premo Vulcan'], mylene: ['Elico'], volt: ['Brontes'], shadow: ['Hades'], lync: ['Altair', 'Wired'],
};
// New Vestroia characters' Traps (only they get one). Gus and Lync get Maxus Helios pieces in their attribute.
const TRAPS = { nv_dan: 'Scorpion', nv_shun: 'Hylash', nv_marucho: 'Tripod Epsilon', mira: 'Baliton', ace: 'Falcon Fly', baron: 'Piercian',
  spectra: 'Metalfencer', gus: 'Grakas Hound', mylene: 'Tripod Theta', volt: 'Dynamo', shadow: 'Fortress', lync: 'Spitarm' };
const TRAP_ATTRS = { easy: 2, normal: 3, hard: 4 };
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
// Gold Gate cards are character cards (a picture of one Bakugan, which gets the bonus twice).
// A prebuilt deck only takes a gold card for a Bakugan it has.
const goldFor = (g, names) => names.includes(g.name) || (g.name === "Preyas's" && names.some(n => n.startsWith('Preyas II')));
function pickGates(names, attr, rank) {
  const gt = {};
  for (const c of GATE_COLORS) {
    let pool = gates.filter(g => g.color === c);
    if (c === 'gold') { const mine = pool.filter(g => goldFor(g, names)); if (mine.length) pool = mine; else problems.push(`no gold card for ${names.join(', ')}`); }
    const score = g => (g.bonus[attr] || 0) + (c === 'gold' && goldFor(g, names.slice(0, 1)) ? 1000 : 0);   // the partner's own card first
    const r = [...pool].sort((a, b) => score(b) - score(a)), g = r[Math.min(c === 'gold' ? 0 : rank, r.length - 1)];
    gt[c] = { id: g.id, name: g.name };
  }
  return gt;
}
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
    team.gates = pickGates(toys.map(x => x.name), attr, rank);
    for (const c of AB_COLORS) {
      let pool = abilities.filter(a => a.color === c && fitsAttrs(a, attrs)); if (!pool.length) pool = abilities.filter(a => a.color === c);
      const r = ranked(pool, a => abilityScore(a, attrs)); const a = r[Math.min(rank, r.length - 1)]; team.abilities[c] = { id: a.id, name: a.name };
      // New Vestroia rules: 2 more of each color (the next best for the team; easier levels get weaker ones)
      let more = r.filter(x => x !== a); if (more.length < 2) more = ranked(abilities.filter(x => x.color === c && x !== a), x => abilityScore(x, attrs));
      team.extra = team.extra || {}; team.extra[c] = more.slice(Math.min(rank, Math.max(0, more.length - 2)), Math.min(rank, Math.max(0, more.length - 2)) + 2).map(x => ({ id: x.id, name: x.name }));
    }
    // before/after-throw cards (no G bonus, so the ranking above never picks them): Normal and Hard get some
    if (lvl !== 'easy') {
      const FIELD = { red: ['Another Throw', 'Second Chance', 'Trickster', 'Sleight of Hand'], green: ['Surprise Attack', 'Invulnerable', 'Early Victory', 'Road Trip'] };
      const h = [...id].reduce((n, ch) => n * 31 + ch.charCodeAt(0), 7) >>> 0;
      const fc = (color, k) => { const n = FIELD[color][(h + k) % FIELD[color].length]; const c = cat.cards.find(x => x.name === n); return { id: c.id, name: c.name }; };
      team.extra.red[1] = fc('red', lvl === 'hard' ? 1 : 0);                                  // New Vestroia: one red one (Normal), plus a green one (Hard)
      if (lvl === 'hard') { team.extra.green[1] = fc('green', 0); team.abilities.green = fc('green', 1); }   // Classic Hard: the green card is one too
    }
    if (TRAPS[id]) {   // the character's attribute, then the attributes its Gate cards favor most
      const t = (cat.traps || []).find(x => x.name === TRAPS[id]);
      if (!t) problems.push(`${id}: no Trap ${TRAPS[id]}`);
      else {
        const gcards = Object.values(team.gates).map(g => gates.find(x => x.id === g.id));
        const others = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'].filter(a => a !== attr)
          .sort((a, b) => gcards.reduce((n, g) => n + (g.bonus[b] || 0), 0) - gcards.reduce((n, g) => n + (g.bonus[a] || 0), 0));
        team.trap = { id: t.id, name: t.name, color: attr, attrs: [attr, ...others.slice(0, (TRAP_SLOTS[t.name] || TRAP_ATTRS[lvl]) - 1)] };
      }
    }
    out[id][lvl] = team;
  });
}
// ---------- Interspace brawlers (story mode): Billy's own characters from his Brawlers sheet.
// Every Bakugan they carry is synthetic; each brawler's signature is one of the 23 unassigned Bakugan (each used once).
// The other two are synthetics spread so every one of the 23 shows up about equally. Same Bakugan at every level.
const INTERSPACE = [
  ['maisie', 'Maisie', 'Vestal', ['pyrus', 'darkus', 'subterra'], 'Leefram'], ['richard', 'Richard', 'Human', ['pyrus', 'ventus', 'subterra'], 'Robotallion'],
  ['ryan', 'Ryan', 'Human', ['ventus', 'aquos', 'haos'], 'Foxbat'], ['sarah', 'Sarah', 'Human', ['ventus', 'aquos', 'subterra'], 'Ravenoid'],
  ['george', 'George', 'Human', ['darkus', 'aquos', 'subterra'], 'Klawgor'], ['ella', 'Ella', 'Vestal', ['pyrus', 'darkus'], 'Reaper'],
  ['sophie', 'Sophie', 'Vestal', ['darkus', 'ventus', 'subterra'], 'Scraper'], ['nico', 'Nico', 'Vestal', ['haos'], 'Fear Ripper'],
  ['freya', 'Freya', 'Vestal', ['pyrus', 'aquos'], 'Monarus'], ['zoya', 'Zoya', 'Vestal', ['pyrus', 'subterra'], 'Hynoid'],
  ['xander', 'Xander', 'Vestal', ['ventus', 'aquos'], 'Spindle'], ['heather', 'Heather', 'Human', ['aquos', 'subterra'], 'Gargonoid'],
  ['brandon', 'Brandon', 'Human', ['pyrus'], 'Saurus'], ['rocco', 'Rocco', 'Vestal', ['darkus', 'ventus', 'subterra'], 'Fencer'],
  ['otto', 'Otto', 'Vestal', ['darkus', 'aquos', 'haos'], 'Laserman'], ['margaret', 'Margaret', 'Human', ['haos'], 'Warius'],
  ['melissa', 'Melissa', 'Human', ['pyrus', 'darkus', 'aquos'], 'Serpenoid'], ['karen', 'Karen', 'Human', ['pyrus', 'darkus', 'haos'], 'Manion'],
  ['brenda', 'Brenda', 'Human', ['pyrus', 'darkus', 'ventus'], 'Bee Striker'], ['ellie', 'Ellie', 'Vestal', ['aquos', 'subterra'], 'Terrorclaw'],
  ['amanda', 'Amanda', 'Human', ['haos'], 'Griffon'], ['gary', 'Gary', 'Human', ['pyrus', 'darkus'], 'Falconeer'],
  ['anthony', 'Anthony', 'Human', ['aquos', 'subterra'], 'Stinglash'],
];
const SYN = INTERSPACE.map(x => x[4]), used = Object.fromEntries(SYN.map(n => [n, 1]));
if (new Set(SYN).size !== 23) problems.push('Interspace: signatures are not 23 different Bakugan');
const inter = {};
INTERSPACE.forEach(([id, name, species, attrs, sig], i) => {
  for (const n of SYN) { if (!byName.get(n)) problems.push(`Interspace ${id}: no Bakugan ${n}`); if (ownerOf.has(n)) problems.push(`Interspace ${id}: ${n} is a partner`); }
  // two more synthetics: least used so far, then a mix of strong and weak so decks stay close in power
  const rest = SYN.filter(n => n !== sig).sort((a, b) => used[a] - used[b] || ((SYN.indexOf(a) * 7 + i * 3) % 23) - ((SYN.indexOf(b) * 7 + i * 3) % 23));
  const names = [sig, rest[0], rest[1]]; used[rest[0]]++; used[rest[1]]++;
  const toyAttr = names.map((n, k) => attrs[k % attrs.length]);
  inter[id] = { name, species, attrs, signature: sig };
  Object.keys(LEVELS).forEach(lvl => {
    const { upgrades, rank } = LEVELS[lvl];
    const team = { attr: attrs[0], upgrades, toys: names.map((n, k) => ({ id: byName.get(n).id, attr: toyAttr[k], name: n })), gates: pickGates(names, attrs[0], rank), abilities: {}, extra: {} };
    for (const c of AB_COLORS) {
      let pool = abilities.filter(a => a.color === c && fitsAttrs(a, attrs)); if (!pool.length) pool = abilities.filter(a => a.color === c);
      const r = [...pool].sort((a, b) => abilityScore(b, attrs) - abilityScore(a, attrs)), a = r[Math.min(rank, r.length - 1)];
      team.abilities[c] = { id: a.id, name: a.name };
      const more = r.filter(x => x !== a), st = Math.min(rank, Math.max(0, more.length - 2));
      team.extra[c] = more.slice(st, st + 2).map(x => ({ id: x.id, name: x.name }));
    }
    inter[id][lvl] = team;
  });
});
const synCount = Object.entries(used).sort((a, b) => a[1] - b[1]);
const starters = {};
for (const [attr, [who, names]] of Object.entries(STARTERS)) {
  for (const n of names) { if (ownerOf.has(n)) problems.push(`starter ${attr}: ${n} is a partner`); if (!byName.get(n)) problems.push(`starter ${attr}: no Bakugan ${n}`); }
  const e = out[who].easy;
  starters[attr] = { toys: names.map(n => ({ id: byName.get(n).id, attr, name: n })), gates: pickGates(names, attr, 4), abilities: e.abilities, extra: e.extra };
}
fs.writeFileSync(new URL('../js/aiteams.js', import.meta.url), `// Computer opponents: each character's team at Easy / Normal / Hard. Built by tools/aiteams.mjs — edit the table there.
// upgrades: each upgrade adds ${UPG()}G to every Bakugan on the team (capped at 600G).
export const UPGRADE_G = ${UPG()};
export const AI_TEAMS = ${JSON.stringify(out, null, 1)};
// new players' starter decks, by attribute
export const STARTERS = ${JSON.stringify(starters, null, 1)};
// Interspace brawlers (story mode): all synthetic Bakugan
export const INTERSPACE = ${JSON.stringify(inter, null, 1)};
`);
function UPG() { return 10; }
console.log(problems.length ? problems.join('\n') : 'ok', Object.keys(out).length, 'characters,', Object.keys(inter).length, 'Interspace brawlers; synthetic use:', synCount.map(x => x.join(' ')).join(', '));
