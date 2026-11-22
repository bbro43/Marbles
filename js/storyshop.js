// Story mode Shop stock (Billy, Nov 20): what's for sale, what it costs, and which league you need to be in to buy it.
// Stronger items cost more AND are locked behind higher leagues, so you can't buy your way up the rankings.
// League numbers: 1 is the top league, 4 the bottom.
import { toyPrice, trapPrice } from './profiles.js';
import { isCoded } from './abilities.js';
import { makeRng } from './sim.js';

// Bakugan sold in Interspace: the first game's store Bakugan plus the synthetics, minus brawlers' own partners.
const NOT_SOLD = new Set(['Juggernoid', 'Centipoid', 'Siege', 'Vladitor', 'Battle Ax Vladitor']);
const SYNTHETIC = new Set(['Leefram', 'Robotallion', 'Foxbat', 'Ravenoid', 'Klawgor', 'Reaper', 'Scraper', 'Fear Ripper', 'Monarus', 'Hynoid', 'Spindle',
  'Gargonoid', 'Saurus', 'Fencer', 'Laserman', 'Warius', 'Serpenoid', 'Manion', 'Bee Striker', 'Terrorclaw', 'Griffon', 'Falconeer', 'Stinglash']);

// Ability cards by strength. Signature attacks (cards built around one Bakugan) are League 1.
const AB_L1 = new Set(['Boosted Dragon', 'Meteor Strike Dragon', 'Cut in Saber', 'Velocity Fang', 'Blue Stealth', 'Mega Impact', 'Grand Impact', 'Fire Storm',
  'Destruction Meteor Storm', 'Chaos of the Darkness', 'Darkus Gazer', 'Right Giganto', 'Forcing Wave', 'Face of Rage', 'Flare Binder', 'Feather Storm',
  'Alpha Blaster', 'Omega Eraser', 'Dark Sphere Impact', 'Thousand Destroyer', 'Special Stealth', 'Reaper of the Chaos', 'Triangle of Power', 'Power Triangle',
  'Power From Darkness', 'Summon Wave', 'Updraft', 'Brushfire', 'The Glow', 'The Shadow', 'The Gust']);
const AB_L2 = new Set(['Home Advantage', 'Flash', 'Circle Of Fire', 'Bright Light', 'Blaze', 'Hot Wind', 'Dark Growth', 'Invulnerable', 'Trickster', 'All For One',
  "Fill'er Up", 'Addition', 'Subtraction', 'Level Field', 'Rewind', 'Stolen Gold', 'Swiped Silver', 'Copped Copper']);
const AB_L3 = new Set(['G-Power Boost', 'G-Power Bump', 'G-Power Bonus', 'G-Power Up', 'G-Power Increase', 'Another Throw', 'Second Chance', 'Sleight of Hand',
  'Surprise Attack', 'Road Trip', 'Early Victory', 'Spin Battle Redo', 'Scratch Battle Redo', 'Timing Battle Redo', 'Pop Battle Redo', 'Trace Battle Redo', 'Bound Battle Redo']);
// everything else (Swaps, Time Breakers, Double Inputs, Combos, No Trading, Negative Wave, ...) is League 4

export const tierOfToy = t => t.baseG <= 270 ? 4 : t.baseG <= 320 ? 3 : t.baseG <= 380 ? 2 : 1;
export const tierOfGate = c => { const m = Math.max(0, ...Object.values(c.bonus || {})); return m <= 150 ? 4 : m <= 170 ? 3 : m <= 180 ? 2 : 1; };
export const tierOfAbility = c => AB_L1.has(c.name) ? 1 : AB_L2.has(c.name) ? 2 : AB_L3.has(c.name) ? 3 : 4;
export const trapAttrCap = league => ({ 4: 1, 3: 2, 2: 3, 1: 6 })[league] || 1;   // how many attributes a Trap you buy may cover

const MULT = { 4: 1, 3: 1.4, 2: 1.9, 1: 2.6 };   // stronger tiers cost more on top of the base price
const round50 = n => Math.round(n / 50) * 50;
const GATE_BASE = { gold: 250, silver: 200, copper: 150 };
export const priceToy = t => round50(toyPrice(t) * MULT[tierOfToy(t)]);   // every Bakugan, tt_ ones included (Billy, Nov 22: always the game formula)
export const priceGate = c => round50((GATE_BASE[c.color] || 200) * MULT[tierOfGate(c)] * 1.5);
export const priceAbility = c => round50(400 * MULT[tierOfAbility(c)]);
export const priceTrap = n => trapPrice(n);

export function stock(cat) {
  const toys = cat.toys.filter(isSoldToy)
    .map(t => ({ t, tier: tierOfToy(t), price: priceToy(t) })).sort((a, b) => a.t.baseG - b.t.baseG);
  const gates = cat.cards.filter(c => c.type === 'gate' && c.bonus).map(c => ({ c, tier: tierOfGate(c), price: priceGate(c) }));
  const abilities = cat.cards.filter(c => c.type === 'ability' && isCoded(c)).map(c => ({ c, tier: tierOfAbility(c), price: priceAbility(c) }));
  const traps = (cat.traps || []).map(t => ({ t }));
  return { toys, gates, abilities, traps };
}

// ---------- sales (Billy, Nov 20)
// Mid-season sale: week 7, 25% off everything. Small sales the rest of the season: two a week, each 5% or 10% off one group
// for 3 days (one Ability card color, one Gate card color, Bakugan of one attribute, or upgrades). Seeded once per season and saved.
const cap = s => s[0].toUpperCase() + s.slice(1);
const SALE_GROUPS = [...['red', 'blue', 'green'].map(c => ({ kind: 'ability', which: c, label: `${cap(c)} Ability cards` })),
  ...['gold', 'silver', 'copper'].map(c => ({ kind: 'gate', which: c, label: `${cap(c)} Gate cards` })),
  ...['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'].map(a => ({ kind: 'bakugan', which: a, label: `${cap(a)} Bakugan` })),
  { kind: 'upgrades', which: null, label: 'G-Power boosts' }];
export function salesFor(season) {
  if (season.sales) return season.sales;
  const r = makeRng(season.seed + 104729), out = [{ kind: 'all', which: null, label: 'everything', pct: 25, from: 42, to: 48, mid: true }];
  for (let w = 0; w < 13; w++) {
    if (w === 6) continue;   // the mid-season sale week
    for (const start of [w * 7 + Math.floor(r() * 2), w * 7 + 3 + Math.floor(r() * 2)]) {
      const g = SALE_GROUPS[Math.floor(r() * SALE_GROUPS.length)];
      out.push({ ...g, pct: r() < 0.5 ? 5 : 10, from: start, to: start + 2 });
    }
  }
  return (season.sales = out);
}
export const salesOnDay = (season, day) => salesFor(season).filter(x => day >= x.from && day <= x.to);
// item: { kind: 'upgrades' } / { kind: 'ability', color } / { kind: 'gate', color } / { kind: 'bakugan', attr } / { kind: 'trap' }
export const discountOn = (season, day, item) => salesOnDay(season, day).reduce((m, x) =>
  x.kind === 'all' || (x.kind === item.kind && (x.which === null || x.which === (item.color || item.attr))) ? Math.max(m, x.pct) : m, 0);
export const saleText = x => x.mid ? `MID-SEASON SALE: ${x.pct}% off everything` : `${x.pct}% off ${x.label}`;
export const tierOf = (kind, x) => kind === 'bakugan' ? tierOfToy(x) : x.type === 'gate' ? tierOfGate(x) : tierOfAbility(x);
export const priceOf = (kind, x) => kind === 'bakugan' ? priceToy(x) : x.type === 'gate' ? priceGate(x) : priceAbility(x);
export const isSoldToy = t => t.baseG && (t.psShop || SYNTHETIC.has(t.name) || /^tt_/.test(t.id)) && !NOT_SOLD.has(t.name);
