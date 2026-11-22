// Card effects for the DS game's card set. Pure logic, used by rules.js.
//
// Cards are matched by name (and color, where two cards share a name). A card that isn't listed
// isn't coded yet and is left out of decks. Mini-game cards (Time Breaker, Battle Redo, Double Input,
// Prevention, pick-up cards…) are on hold until Billy decides how they should work.
//
// Ability cards (when: 'battle') are played during a battle, after the Gate card is turned over.
// Steps run for every played card in this order:
//   attr(c)  — change attributes
//   table(c) — change the Gate card's bonus table
//   gate(c)  — change how a side uses bonuses (noGate, noAbility, gateMult, abilityMult)
//   add(c)   — a G-Power amount added to your toy
//   swap     — true: swap the two toys' totals at the end
// can(c) says whether the card can be played right now. blocks(card) = cards the opponent can't play after it.
//
// Gate card effects (GATE_EFFECTS) apply when the card is turned over:
//   printed(c)      — change printed G-Power (swaps, doubling); returns notes for the screen
//   gate(c)         — per-side flags (e.g. Gold cards: that toy gets the bonus twice)
//   add(c, side)    — extra G-Power for a side
//   noAbility(c, p) — true if player p can't play Ability cards in this battle
//   regain(c)       — at battle start: who gets which used Ability cards back
//
// c = { s, field, gateCard, table, me, opp, sides, card }
// side = { p, t, name, attr, printed, noGate, noAbility, gateMult, abilityMult }

import { attrsOf, hasAttr, bestOf } from './dual.js';
export const OPPOSITE = { pyrus: 'aquos', aquos: 'pyrus', subterra: 'ventus', ventus: 'subterra', haos: 'darkus', darkus: 'haos' };
export const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];

// ---------- helpers
// Dual Attribute Bakugan (js/dual.js) have two attributes and always get the better: a check on your own Bakugan passes if
// either attribute fits, its bonus is the better of the two. A check on the other Bakugan passes only if it has just that one.
const has = hasAttr, mine = a => c => has(c.me, a);
const theirsIs = (sd, a) => attrsOf(sd).every(x => x === a);
const overlap = (x, y) => attrsOf(x).some(a => attrsOf(y).includes(a));
const bonusOf = c => bestOf(c.me, a => (c.card.bonus || {})[a]);
const isOwnGate = c => c.field.owner === c.me.p;
const isOppGate = c => c.field.owner !== c.me.p;
const standing = (s, p) => s.field.flatMap((f, k) => f.toys.filter(x => x.p === p).map(x => ({ ...x, k })));
const captured = (s, p) => s.players[p].captured.length;
const teamAttrs = (s, p) => new Set(s.players[p].toys.flatMap(t => attrsOf(t)));
const always = () => true;
// "Preyas's" is the Preyas II card (either half); otherwise the card name is the toy name
// A card that names a Bakugan works for every version of it (Billy, Nov 16): "Delta Dragonoid II" means any Dragonoid,
// "Preyas's" any Preyas (Preyas, Preyas II Angelo or Diablo). Names with no family are matched as written.
export const BASES = ['Dragonoid', 'Tigrerra', 'Preyas', 'Gorem', 'Skyress', 'Hydranoid', 'Leonidas', 'Vladitor', 'Ingram', 'Elfin',
  'Percival', 'Wilda', 'Nemus', 'Helios', 'Vulcan', 'Hades', 'Elico', 'Altair', 'Brontes'];
export const baseOf = name => BASES.find(b => new RegExp(`\\b${b}\\b`).test(name)) || name.replace(/'s$/, '');
export const toyMatches = (toyName, cardName) => { const b = baseOf(cardName); return toyName === b || new RegExp(`\\b${b}\\b`).test(toyName); };

// ---------- Ability card builders
const plain = (can = always) => ({ when: 'battle', can, add: bonusOf });
const forToy = toyName => ({ when: 'battle', can: c => toyMatches(c.me.name, toyName), add: () => 200 });
const swapIf = cond => ({ when: 'battle', can: cond, swap: true, tag: 'swap' });
const vs = (a, b) => ({ when: 'battle', can: c => has(c.me, a) && theirsIs(c.opp, b), add: () => 200 });
const pair = (a, b) => ({ when: 'battle', can: c => { const t = teamAttrs(c.s, c.me.p); return t.has(a) && t.has(b); }, add: () => 200 });
const trio = (...attrs) => ({
  when: 'battle',
  can: c => { const t = teamAttrs(c.s, c.me.p); return attrs.every(a => t.has(a)) && attrs.some(a => has(c.me, a)); },   // a team of 3 can only cover all 3 if it's exactly them (or a Dual Attribute fills one)
  add: () => 400,
});
const triangle = (...attrs) => ({ when: 'battle', can: c => attrs.some(a => has(c.me, a)), add: c => 50 * captured(c.s, c.me.p) });

// ---------- Mini-game cards: effects picked from Billy's card list to match each name (Billy's call)
const attrIs = mine;
const sameAttr = c => overlap(c.me, c.opp), diffAttr = c => attrsOf(c.me).some(a => !attrsOf(c.opp).includes(a));
// Time Breaker ← "Stuck": your opponent's Ability card bonuses count as zero this battle
const timeBreaker = cond => ({ when: 'battle', can: cond, gate: c => { c.opp.noAbility = true; } });
// Double Input ← "Rock On": your Gate and Ability card bonuses count twice
const doubleInput = cond => ({ when: 'battle', can: cond, gate: c => { c.me.gateMult *= 2; c.me.abilityMult *= 2; } });
const wish = color => ({ when: 'battle', can: c => c.gateCard.color === color, add: () => 200 });
const usedHas = (s, p, color, b) => s.players[p].abilityUsed.some(x => x.color === color && !(b || []).some(pl => pl.card === x));
const highestOf = c => Math.max(0, ...ATTRS.map(a => c.table[a] || 0));

const MINI = {
  'Pyrus Time Breaker': timeBreaker(attrIs('pyrus')), 'Aquos Time Breaker': timeBreaker(attrIs('aquos')),
  'Subterra Time Breaker': timeBreaker(attrIs('subterra')), 'Haos Time Breaker': timeBreaker(attrIs('haos')),
  'Darkus Time Breaker': timeBreaker(attrIs('darkus')), 'Ventus Time Breaker': timeBreaker(attrIs('ventus')),
  'Twin Time Breaker': timeBreaker(sameAttr), 'Counter Time Breaker': timeBreaker(diffAttr),
  'Pyrus Double Input': doubleInput(attrIs('pyrus')), 'Aquos Double Input': doubleInput(attrIs('aquos')),
  'Subterra Double Input': doubleInput(attrIs('subterra')), 'Haos Double Input': doubleInput(attrIs('haos')),
  'Darkus Double Input': doubleInput(attrIs('darkus')), 'Ventus Double Input': doubleInput(attrIs('ventus')),
  'Twin Double Input': doubleInput(sameAttr), 'Counter Double Input': doubleInput(diffAttr),
  // Battle Redos: start over with a twist
  'Scratch Battle Redo': { when: 'battle', can: always, table: c => { for (const a of ATTRS) c.table[a] = Math.min(50, c.table[a] || 0); } }, // ← Ground
  'Spin Battle Redo': { when: 'battle', can: always, attr: c => { for (const sd of c.sides) { sd.attr = OPPOSITE[sd.attr] || sd.attr; if (sd.attr2) sd.attr2 = OPPOSITE[sd.attr2] || sd.attr2; } } },   // ← Special Mirror
  'Timing Battle Redo': { when: 'battle', can: always, gate: c => { c.me.useHighest = true; } },                                         // ← Gate Shift
  'Pop Battle Redo': { when: 'battle', can: always, table: c => { for (const a of ATTRS) c.table[a] = (c.table[a] || 0) * 2; } },       // ← Strong Winds Blow
  'Trace Battle Redo': { when: 'battle', can: always,                                                                                      // ← Mirror Element
    attr: c => { const opts = [...new Set(c.s.players[c.opp.p].toys.flatMap(t => attrsOf(t)))]; c.me.attr = opts.reduce((b, a) => ((c.table[a] || 0) > (c.table[b] || 0) ? a : b), opts[0]); } },
  'Bound Battle Redo': { when: 'battle', can: always, gate: c => { c.opp.noGate = true; } },                                              // ← Shadowfire
  'Rewind': { when: 'battle', can: always, resets: true, add: () => 50 },                                                                 // ← Abisomega
  'Level Field': { when: 'battle', can: always, printedZero: true },                                                                       // ← "Pyrus" (green)
  // Green
  'No Backsies': { when: 'battle', can: always, blocksAll: () => true },                                                                   // ← Silver Doors
  'Out Of Time': { when: 'battle', can: always, blocks: () => true },                                                                       // ← Contestir's Gambit
  'Double Input Cancel': { when: 'battle', can: always, blocksAll: card => card.color === 'blue' || card.color === 'green' },             // ← Dark Tunnel
  'Prevention': { when: 'battle', can: always, gate: c => { for (const sd of c.sides) sd.noAbility = true; } },                          // ← Stuck
  'Stolen Gold': wish('gold'), 'Swiped Silver': wish('silver'), 'Copped Copper': wish('copper'),                                          // ← Golden/Silver/Copper Wish
  // Blue
  'All For One': { when: 'battle', can: c => standing(c.s, c.me.p).some(x => c.s.field[x.k] !== c.field), add: () => 100 },              // ← Stand Tall
  "Fill'er Up": { when: 'battle', can: c => c.s.players[c.me.p].abilityHand.length > c.s.players[c.opp.p].abilityHand.length, add: () => 200 }, // ← Holding Power
  'Subtraction': { when: 'battle', can: always, addSides: c => c.sides.map(sd => ({ side: sd, amount: usedHas(c.s, sd.p, 'blue', c.plays) ? -150 : 0 })) }, // ← Blue Drain
  'Addition': { when: 'battle', can: always, addSides: c => c.sides.map(sd => ({ side: sd, amount: usedHas(c.s, sd.p, 'blue', c.plays) ? 100 : 0 })) },      // ← Hate Gate
};

export const EFFECTS = {
  ...MINI,
  // ---- Red: swaps (totals are swapped at the end of the battle)
  'Pyrus Swap': swapIf(mine('pyrus')), 'Aquos Swap': swapIf(mine('aquos')),
  'Subterra Swap': swapIf(mine('subterra')), 'Haos Swap': swapIf(mine('haos')),
  'Darkus Swap': swapIf(mine('darkus')), 'Ventus Swap': swapIf(mine('ventus')),
  'Twin Swap': swapIf(sameAttr), 'Counter Swap': swapIf(diffAttr),
  // ---- Green
  'No Trading': { when: 'battle', can: always, blocks: card => (effectOf(card) || {}).tag === 'swap' },
  'Negative Wave': { when: 'battle', can: always, gate: c => { for (const sd of c.sides) { sd.noGate = true; sd.noAbility = true; } } },
  'Imbalance': { when: 'battle', can: always, gate: c => { c.opp.noGate = true; c.opp.noAbility = true; } },
  'Boosted Dragon|green': forToy('Dragonoid'), 'Meteor Strike Dragon': forToy('Delta Dragonoid II'),
  'Cut in Saber': forToy('Tigrerra'), 'Velocity Fang': forToy('Blade Tigrerra'),
  'Blue Stealth': forToy('Preyas'), 'Special Stealth': forToy("Preyas's"),
  'Mega Impact|green': forToy('Gorem'), 'Grand Impact': forToy('Hammer Gorem'),
  'Fire Storm': forToy('Skyress'), 'Destruction Meteor Storm': forToy('Storm Skyress'),
  'Chaos of the Darkness': forToy('Hydranoid'), 'Darkus Gazer': forToy('Dual Hydranoid'),
  'Right Giganto': forToy('Cycloid'), 'Forcing Wave': forToy('Sirenoid'), 'Face of Rage': forToy('Fortress'),
  'Flare Binder': forToy('Tentaclear'), 'Feather Storm': forToy('Harpus'), 'Alpha Blaster': forToy('Leonidas'),
  'Omega Eraser': forToy('Omega Leonidas'), 'Dark Sphere Impact': forToy('Vladitor'),
  'Thousand Destroyer': forToy('Battle Ax Vladitor'), 'Reaper of the Chaos': forToy('Reaper'),
  // ---- Blue: G-Power by attribute (the card's own bonus table), with conditions
  'Bright Light': plain(), 'G-Power Boost': plain(), 'G-Power Bump': plain(), 'Blaze': plain(),
  'Mega Impact|blue': plain(), 'Hot Wind': plain(), 'Flash': plain(), 'G-Power Bonus': plain(),
  'G-Power Up': plain(), 'Dark Growth': plain(), 'G-Power Increase': plain(),
  'Home Advantage': plain(isOwnGate), 'Circle Of Fire': plain(isOwnGate),
  'Power From Darkness': plain(isOppGate), 'Summon Wave': plain(isOppGate), 'Updraft': plain(isOppGate), 'Brushfire': plain(isOppGate),
  'The Glow': plain(c => c.opp.printed > c.me.printed), 'The Shadow': plain(c => c.opp.printed > c.me.printed),
  'The Gust': plain(c => c.opp.printed > c.me.printed),
  'Triangle of Power': triangle('subterra', 'darkus', 'ventus'), 'Power Triangle': triangle('pyrus', 'aquos', 'haos'),
  'Pyrus and Darkus Combo': pair('pyrus', 'darkus'), 'Ventus and Haos Combo': pair('ventus', 'haos'),
  'Subterra and Aquos Combo': pair('subterra', 'aquos'),
  'Pyrus and Subterra Combo': vs('pyrus', 'subterra'), 'Subterra and Haos Combo': vs('subterra', 'haos'),
  'Haos and Darkus Combo': vs('haos', 'darkus'), 'Darkus and Aquos Combo': vs('darkus', 'aquos'),
  'Aquos and Ventus Combo': vs('aquos', 'ventus'), 'Ventus and Pyrus Combo': vs('ventus', 'pyrus'),
  'Pyrus, Aquos and Haos Combo': trio('pyrus', 'aquos', 'haos'), 'Subterra, Ventus and Darkus Combo': trio('subterra', 'ventus', 'darkus'),
};

// ---------- Gate card effects
const lowest = c => c.sides[0].printed === c.sides[1].printed ? null : (c.sides[0].printed < c.sides[1].printed ? c.sides[0] : c.sides[1]);
const doubleLowest = { printed: c => { const lo = lowest(c); if (!lo) return []; lo.printed *= 2; return [{ side: lo, note: 'printed G-Power doubled' }]; } };
const swapPrinted = cond => ({ printed: c => {
  if (!cond(c)) return [];
  const [a, b] = c.sides; [a.printed, b.printed] = [b.printed, a.printed];
  return [{ side: a, note: 'printed G-Power swapped' }, { side: b, note: 'printed G-Power swapped' }];
} });
const anyIs = attr => c => c.sides.some(sd => has(sd, attr));
const fewerCaptured = c => { const [a, b] = c.sides.map(sd => captured(c.s, sd.p)); return a === b ? null : c.sides[a < b ? 0 : 1].p; };
const lowerPrinted = c => { const lo = lowest(c); return lo ? lo.p : null; };
const regainColor = (who, color) => ({ regain: c => { const p = who(c); return p === null ? [] : [{ p, color }]; } });
const gateBonusOf = (c, sd) => bestOf(sd, a => c.table[a]);
const blockWhere = pick => ({ noAbility: (c, p) => { const sd = pick(c); return !!sd && sd.p === p; } });
const higherOf = f => c => { const [a, b] = c.sides.map(sd => f(c, sd)); return a === b ? null : c.sides[a > b ? 0 : 1]; };
const lowerOf = f => c => { const [a, b] = c.sides.map(sd => f(c, sd)); return a === b ? null : c.sides[a < b ? 0 : 1]; };

export const GATE_EFFECTS = {
  'Stand Off': { noAbility: () => true },
  'Heavy Load': blockWhere(higherOf((c, sd) => captured(c.s, sd.p))),
  'Clipped Wings': blockWhere(higherOf(gateBonusOf)),
  'Scuttle': blockWhere(higherOf((c, sd) => sd.printed)),
  'Down For The Count': blockWhere(lowerOf(gateBonusOf)),
  'Stand Your Ground': { regain: c => c.sides.map(sd => ({ p: sd.p, color: 'all' })) },
  'Delayed Attack': regainColor(fewerCaptured, 'all'),
  'Load Up': regainColor(fewerCaptured, 'red'), 'Electrified': regainColor(fewerCaptured, 'green'),
  'Bait and Switch': regainColor(fewerCaptured, 'blue'),
  'Flat Out': regainColor(lowerPrinted, 'red'), 'Heat Haze': regainColor(lowerPrinted, 'green'), 'Wind Tunnel': regainColor(lowerPrinted, 'blue'),
  'Lockdown': { gate: c => { for (const sd of c.sides) sd.abilityMult *= 2; } },
  'Molten Rock': doubleLowest, 'Elements': doubleLowest, 'Waist Deep': doubleLowest, 'Lucky Find': doubleLowest,
  'Overtake': doubleLowest, 'Amped': doubleLowest, 'Reflexes': doubleLowest,
  'G-Power Exchange': swapPrinted(always), 'G-Power Swap': swapPrinted(always),
  'Flaming Wind': swapPrinted(anyIs('pyrus')), 'Power Siphon': swapPrinted(anyIs('aquos')), 'Sand Trap': swapPrinted(anyIs('subterra')),
  'Blinding Flash': swapPrinted(anyIs('haos')), 'Darkus Dealings': swapPrinted(anyIs('darkus')), 'Take Cover': swapPrinted(anyIs('ventus')),
  'Trick Jump': { add: (c, sd) => 100 * c.s.players[sd.p].abilityUsed.length },
  'Mega Warrior': { add: (c, sd) => 100 * captured(c.s, sd.p) },
  "Naga's Wrath": { add: (c, sd) => 150 * standing(c.s, sd.p).filter(x => c.s.field[x.k] !== c.field).length },
};
// Gold cards: the pictured toy gets the Gate bonus twice
const goldEffect = card => ({ gate: c => { for (const sd of c.sides) if (toyMatches(sd.name, card.name)) sd.gateMult *= 2; } });

// ---------- Cards used outside battle, from the Ability card button
// when: 'pre'  — before you throw;  'post' — after your Bakugan stops (stands or misses), before anything else happens.
// can(c): c = { s, p, landing } where landing = { t, fieldIdx } for 'post'. need = what the player has to pick.
const hasStanding = (s, p) => s.field.some(f => f.toys.some(x => x.p === p));
export const FIELD_EFFECTS = {
  'Another Throw': { when: 'pre', can: c => c.s.players[c.p].unused.length >= 2 },
  'Early Victory': { when: 'pre', can: () => true },
  'Invulnerable': { when: 'pre', can: c => hasStanding(c.s, c.p), need: 'myStanding' },
  'Surprise Attack': { when: 'pre', can: c => hasStanding(c.s, c.p) && c.s.field.some(f => f.toys.some(x => (c.s.teams ? c.s.teams[x.p] !== c.s.teams[c.p] : x.p !== c.p))), need: 'surprise' },
  'Second Chance': { when: 'post', can: () => true },
  'Trickster': { when: 'post', can: c => c.landing.fieldIdx !== null && c.s.players[c.p].unused.length >= 2, need: 'myUnused' },
  'Sleight of Hand': { when: 'post', can: c => c.landing.fieldIdx !== null && c.s.field[c.landing.fieldIdx].owner !== c.p && c.s.players[c.p].gateHand.length > 0, need: 'myGate' },
  'Road Trip': { when: 'post', can: c => c.landing.fieldIdx !== null && c.s.field.length > 1 },
};
export const fieldEffectOf = card => FIELD_EFFECTS[card.name] || null;

// A Trap (New Vestroia): 0G of its own; once per game you add it to a battle like an Ability card,
// and it gets the Gate card's bonus for each of its attributes, added to your Bakugan's total.
const TRAP = { when: 'battle', can: () => true, add: c => (c.card.attrs || []).reduce((n, a) => n + (c.table[a] || 0), 0) };
// A BakuNano or a Battle Gear (Billy, Nov 22: all Support works the same): once per match you add it to a battle like an
// Ability card, and it adds its boost to your Bakugan
const NANO = { when: 'battle', can: () => true, add: c => c.card.boost || 0 };
export const effectOf = card => card.type === 'trap' ? TRAP : card.type === 'nano' || card.type === 'gear' ? NANO : EFFECTS[card.name + '|' + card.color] || EFFECTS[card.name] || null;
export function gateEffectOf(card) {
  if (card.color === 'gold') return GATE_EFFECTS[card.name] || goldEffect(card);   // custom gold cards have their own effect
  return GATE_EFFECTS[card.name] || null;
}
// Gate cards always work (their bonus counts); an Ability card counts as coded only if it has an effect.
export const isCoded = card => card.type === 'gate' || !!effectOf(card) || !!fieldEffectOf(card);
