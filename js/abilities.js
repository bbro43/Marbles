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

export const OPPOSITE = { pyrus: 'aquos', aquos: 'pyrus', subterra: 'ventus', ventus: 'subterra', haos: 'darkus', darkus: 'haos' };
export const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];

// ---------- helpers
const bonusOf = c => (c.card.bonus || {})[c.me.attr] || 0;
const isOwnGate = c => c.field.owner === c.me.p;
const isOppGate = c => c.field.owner !== c.me.p;
const standing = (s, p) => s.field.flatMap((f, k) => f.toys.filter(x => x.p === p).map(x => ({ ...x, k })));
const captured = (s, p) => s.players[p].captured.length;
const teamAttrs = (s, p) => new Set(s.players[p].toys.map(t => t.attr));
const always = () => true;
// "Preyas's" is the Preyas II card (either half); otherwise the card name is the toy name
const toyMatches = (toyName, cardName) => cardName === "Preyas's" ? toyName.startsWith('Preyas II') : toyName === cardName;

// ---------- Ability card builders
const plain = (can = always) => ({ when: 'battle', can, add: bonusOf });
const forToy = toyName => ({ when: 'battle', can: c => toyMatches(c.me.name, toyName), add: () => 200 });
const swapIf = cond => ({ when: 'battle', can: cond, swap: true, tag: 'swap' });
const vs = (mine, theirs) => ({ when: 'battle', can: c => c.me.attr === mine && c.opp.attr === theirs, add: () => 200 });
const pair = (a, b) => ({ when: 'battle', can: c => { const t = teamAttrs(c.s, c.me.p); return t.has(a) && t.has(b); }, add: () => 200 });
const trio = (...attrs) => ({
  when: 'battle',
  can: c => { const t = teamAttrs(c.s, c.me.p); return t.size === 3 && attrs.every(a => t.has(a)) && attrs.includes(c.me.attr); },
  add: () => 400,
});
const triangle = (...attrs) => ({ when: 'battle', can: c => attrs.includes(c.me.attr), add: c => 50 * captured(c.s, c.me.p) });

export const EFFECTS = {
  // ---- Red: swaps (totals are swapped at the end of the battle)
  'Pyrus Swap': swapIf(c => c.me.attr === 'pyrus'), 'Aquos Swap': swapIf(c => c.me.attr === 'aquos'),
  'Subterra Swap': swapIf(c => c.me.attr === 'subterra'), 'Haos Swap': swapIf(c => c.me.attr === 'haos'),
  'Darkus Swap': swapIf(c => c.me.attr === 'darkus'), 'Ventus Swap': swapIf(c => c.me.attr === 'ventus'),
  'Twin Swap': swapIf(c => c.me.attr === c.opp.attr), 'Counter Swap': swapIf(c => c.me.attr !== c.opp.attr),
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
const anyIs = attr => c => c.sides.some(sd => sd.attr === attr);
const fewerCaptured = c => { const [a, b] = c.sides.map(sd => captured(c.s, sd.p)); return a === b ? null : c.sides[a < b ? 0 : 1].p; };
const lowerPrinted = c => { const lo = lowest(c); return lo ? lo.p : null; };
const regainColor = (who, color) => ({ regain: c => { const p = who(c); return p === null ? [] : [{ p, color }]; } });
const gateBonusOf = (c, sd) => c.table[sd.attr] || 0;
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

export const effectOf = card => EFFECTS[card.name + '|' + card.color] || EFFECTS[card.name] || null;
export function gateEffectOf(card) {
  if (card.color === 'gold') return goldEffect(card);
  return GATE_EFFECTS[card.name] || null;
}
// Gate cards always work (their bonus counts); an Ability card counts as coded only if it has an effect.
export const isCoded = card => card.type === 'gate' || !!effectOf(card);
