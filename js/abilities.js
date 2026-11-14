// Ability card effects. Pure logic, used by rules.js.
//
// Cards are matched by name. A card that isn't in EFFECTS isn't coded yet and is left out of decks.
//
// Two kinds:
//   when: 'battle' — played during a battle, after the Gate card is turned over.
//   when: 'throw'  — played before you throw (the Red "before you stand / roll" cards).
//                    Their bonus applies if that toy battles this turn.
//
// A battle effect can have any of these steps. They run for every played card in this order:
//   attr(c)  — change attributes            (c.me.attr = …)
//   table(c) — change the Gate card's bonus table (c.table[a] = …)
//   gate(c)  — change how a side uses the Gate bonus (noGate, useHighest, gateMult, abilityMult)
//   add(c)   — returns a G-Power amount added to your toy
// can(c) says whether the card can be played right now.
//
// c = { s, field (the Gate card on the mat), gateCard, table, me, opp, card }
// side = { p, t, name, attr, printed, noGate, useHighest, gateMult, abilityMult }

export const OPPOSITE = { pyrus: 'aquos', aquos: 'pyrus', subterra: 'ventus', ventus: 'subterra', haos: 'darkus', darkus: 'haos' };
const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];

// ---------- helpers
const bonusOf = c => (c.card.bonus || {})[c.me.attr] || 0;
const isOwnGate = c => c.field.owner === c.me.p;
const isOppGate = c => c.field.owner !== c.me.p;
const has = (...attrs) => c => attrs.includes(c.me.attr);
const lowest = c => c.me.printed <= c.opp.printed;
const highestBonus = c => Math.max(0, ...ATTRS.map(a => c.table[a] || 0));
const standing = (s, p) => s.field.flatMap((f, k) => f.toys.filter(x => x.p === p).map(x => ({ ...x, k })));
const onOtherCard = (c, p) => standing(c.s, p).some(x => c.s.field[x.k] !== c.field);
// toys in a player's used pile (not standing on a card)
const usedPile = (s, p) => {
  const st = new Set(standing(s, p).map(x => x.t));
  return s.players[p].used.filter(t => !st.has(t)).map(t => s.players[p].toys[t]);
};
// toys in a player's used + unused piles (not on the field)
const offField = (s, p) => {
  const st = new Set(standing(s, p).map(x => x.t));
  return s.players[p].toys.filter((_, t) => !st.has(t));
};
const capturedBy = (s, p) => s.players[p].captured.length;
const and = (...fs) => c => fs.every(f => f(c));

// ---------- effect builders
const plain = (can = () => true) => ({ when: 'battle', can, add: bonusOf });
const flat = (amount, can = () => true) => ({ when: 'battle', can, add: () => amount });
const twiceIf = (cond) => ({ when: 'battle', can: () => true, add: c => bonusOf(c) * (cond(c) ? 2 : 1) });
const useHighest = (...attrs) => ({ when: 'battle', can: has(...attrs), gate: c => { c.me.useHighest = true; } });
const noOppGate = (...attrs) => ({ when: 'battle', can: and(has(...attrs), isOppGate), gate: c => { c.opp.noGate = true; } });
const gateTwiceNotHighest = (...attrs) => ({
  when: 'battle', can: has(...attrs),
  gate: c => { if ((c.table[c.me.attr] || 0) < highestBonus(c)) c.me.gateMult *= 2; },
});
const doubleBoth = (...attrs) => ({ when: 'battle', can: and(has(...attrs), isOppGate), gate: c => { c.me.gateMult *= 2; c.me.abilityMult *= 2; } });
const colorShiftHighest = (...attrs) => ({ when: 'battle', can: and(has(...attrs), isOppGate), add: highestBonus });
const wish = (color, oppOnly = true) => flat(200, c => (!oppOnly || isOppGate(c)) && c.gateCard.color === color);
const launcher = color => twiceIf(c => c.gateCard.color === color);
const named = (toyName, amount) => ({ when: 'battle', can: () => true, add: c => c.me.name === toyName ? amount : bonusOf(c) });
const opponentIs = (attrs, extra) => ({ when: 'battle', can: () => true, add: c => bonusOf(c) + (attrs.includes(c.opp.attr) ? extra : 0) });
const help = (myAttr, needAttr) => ({
  when: 'battle', can: isOppGate,
  add: c => bonusOf(c) * (c.me.attr === myAttr && usedPile(c.s, c.me.p).some(t => t.attr === needAttr) ? 2 : 1),
});
const teamwork = attr => plain(c => offField(c.s, c.me.p).some(t => t.attr === attr));
const shutdown = (...attrs) => ({ when: 'battle', can: has(...attrs), add: c => (c.card.bonus || {})[c.opp.attr] || 0 });
const graveyard = () => ({
  when: 'battle', can: () => true,
  add: c => [...new Set(usedPile(c.s, c.opp.p).map(t => t.attr))].reduce((n, a) => n + ((c.card.bonus || {})[a] || 0), 0),
});
const triangle = (...attrs) => ({
  when: 'battle', can: has(...attrs),
  add: c => 50 * (usedPile(c.s, 0).length + usedPile(c.s, 1).length),
});
// pick the attribute that gives a side the most from the Gate card (or the least, for the opponent)
const bestAttr = (c, choices) => choices.reduce((b, a) => ((c.table[a] || 0) > (c.table[b] || 0) ? a : b), choices[0]);
const worstAttr = (c, choices) => choices.reduce((b, a) => ((c.table[a] || 0) < (c.table[b] || 0) ? a : b), choices[0]);

// Red "before you throw" cards. forToy(toy) = can it be played with that toy.
// bonus(c) = what it adds in a battle this turn (c.mine = true when it's the thrown toy's side).
const throwCard = (forToy, bonus) => ({ when: 'throw', forToy, bonus });
const ifMine = amount => c => (c.mine ? amount : 0);
const attrIs = (...attrs) => toy => attrs.includes(toy.attr);
const anyToy = () => true;
const highestPrinted = amount => c => (c.side.printed >= c.other.printed ? amount : 0);
const lowestPrinted = (amount, haosExtra = 0) => c => (c.side.printed <= c.other.printed ? amount + (c.side.attr === 'haos' ? haosExtra : 0) : 0);

export const EFFECTS = {
  // ---- Blue: add G-Power by attribute
  'G-Power Boost': plain(), 'G-Power Bump': plain(), 'G-Power Bouns': plain(), 'G-Power Up': plain(),
  'G-Power Increase': plain(), 'Colorstorm': plain(), 'G-Power Surge': plain(), 'G-Power Lift': plain(),
  'Step-Up G-Power': plain(), 'Bright Light': plain(), 'Blaze': plain(), 'Dark Growth': plain(), 'Pip': plain(),
  'Turn Around': plain(), 'Bright Eyes': plain(), 'Powder Keg': plain(), 'Sparks': plain(),
  'Ohome Advantage': plain(), 'Fire Mana': plain(), 'Soil Mana': plain(), 'Light Mana': plain(),
  'Dark Stomp': plain(), 'Earth Stomp': plain(), 'Water Stomp': plain(), 'Weld Machine': plain(),
  'Double Whoop': plain(), 'Double Whomp': plain(), 'Late Fire': plain(), 'Sun Pebble': plain(), 'Wind Pebble': plain(),
  'Boulder Crush': plain(), 'Stand Up!': plain(),
  // extra text that does nothing in Core (no Battle Gear / Traps / removed-card piles yet)
  'Clean House': plain(), 'Silver Scream': plain(), 'Erosion': plain(), 'Dusted Gear': plain(),
  'Heavy Water': plain(), 'Dark Hole': plain(), 'Dusty Sparkle': plain(), 'Burning Sands': plain(),
  // where it's played
  'Updraft': plain(isOwnGate), 'Mega Impact': plain(isOwnGate), 'Hot Wind': plain(isOwnGate),
  'Circle of Fire': plain(isOwnGate), 'Flash': plain(isOwnGate), 'Bushfire': plain(isOwnGate),
  'Power of Darkness': plain(isOppGate), 'Summon Wave': plain(isOppGate), 'Late Tide': plain(isOppGate),
  'Late Storm': plain(isOppGate), 'Late Sunrise': plain(isOppGate), 'Late Sunset': plain(isOppGate),
  'Late Earthquake': plain(isOppGate),
  'Quaking Phoenix': plain(and(isOppGate, c => c.me.printed <= 450)),
  'Granite Gauntlet': plain(and(isOppGate, c => c.me.printed <= 450)),
  'Shadow Avatar': plain(and(isOppGate, c => c.me.printed <= 450)),
  'Predictable Opponent': plain(and(isOppGate, c => usedPile(c.s, c.opp.p).some(t => t.attr === c.me.attr))),
  // underdog cards
  'The Shadow': plain(lowest), 'The Gust': plain(lowest), 'The Glow': plain(lowest),
  'Elico Pop': plain(lowest), 'Sneak': plain(lowest),
  'Shiny Devil': plain(c => c.opp.printed >= c.me.printed + 200),
  // teammates on the field / in your piles
  'Water Gun': plain(c => onOtherCard(c, c.me.p)), 'Shade': plain(c => onOtherCard(c, c.me.p)),
  'Pushing Wind': plain(c => onOtherCard(c, c.me.p)), 'Distracting Friend': plain(c => onOtherCard(c, c.opp.p)),
  'Stand Tall': flat(100, c => onOtherCard(c, c.me.p)),
  'Teamwork Haos': teamwork('haos'), 'Teamwork Aquos': teamwork('aquos'), 'Teamwork Ventus': teamwork('ventus'),
  // Gate card color
  'Copper Launcher': launcher('copper'), 'Bronz Launcher': launcher('copper'), 'Golden Launcher': launcher('gold'),
  'Copper Boost': launcher('copper'), 'Bronze Boost': launcher('copper'), 'Golden Boost': launcher('gold'),
  'Copper Risk': wish('copper'), 'Silver Wish': wish('silver'), 'Golden Wish': wish('gold'), 'Copper Wish': wish('copper', false),
  // named toys
  'Helios': named('Helios', 120), 'Scraper': named('Scraper', 120), 'Klawgor': named('Klawgor', 120), 'Leefram': named('Leefram', 120),
  // who you're battling
  'Char the Earth': opponentIs(['aquos', 'ventus'], 100), 'Bathed in Light': opponentIs(['pyrus', 'darkus'], 100),
  'Thundercrack': opponentIs(['pyrus', 'darkus'], 100),
  'Night Help': help('ventus', 'darkus'), 'Fire Help': help('haos', 'pyrus'), 'Earth Help': help('aquos', 'subterra'),
  // counting cards
  'Late Surge': { when: 'battle', can: () => true, add: c => bonusOf(c) + 20 * capturedBy(c.s, c.opp.p) },
  'See the Light': { when: 'battle', can: has('haos'), add: c => 50 * capturedBy(c.s, c.opp.p) },
  'Triangle of Power': triangle('subterra', 'ventus', 'darkus'), 'Power Triangle': triangle('pyrus', 'aquos', 'haos'),
  'Graveyard Fire': graveyard(), 'Graveyard Howl': graveyard(), 'Graveyard Candle': graveyard(),
  'Big Brawl': { when: 'battle', can: () => true,
    add: c => bonusOf(c) * new Set(c.s.field.flatMap(f => f.toys.map(x => c.s.players[x.p].toys[x.t].attr))).size },
  'Touch with Fire': plain(c => c.me.attr === 'pyrus' && bestAttr(c, ATTRS) === 'pyrus'),
  'Earth Shutdown': shutdown('pyrus', 'aquos', 'ventus'), 'Fire Shutdown': shutdown('haos', 'aquos', 'subterra'),
  'Water Shutdown': shutdown('pyrus', 'darkus', 'subterra'), 'Wind Shutdown': shutdown('haos', 'darkus', 'subterra'),
  'Light Shutdown': shutdown('pyrus', 'darkus', 'ventus'),
  // ---- Green / Red: Gate bonus tricks
  'Solar Winds': useHighest('haos', 'ventus'), 'Bright Earth': useHighest('haos', 'subterra'),
  'Bright Torch': useHighest('haos', 'pyrus'), 'Blinding Reflection': useHighest('haos', 'aquos'),
  'Gate Shift': useHighest('ventus'), 'History Lesson': useHighest('aquos'),
  'Shadowfire': noOppGate('darkus', 'pyrus'), 'Shadow Vortex': noOppGate('darkus', 'ventus'),
  'Shadow Lash': noOppGate('darkus', 'subterra'), 'Rain of Shadows': noOppGate('darkus', 'aquos'),
  'Darkus': { when: 'battle', can: c => c.me.attr === 'darkus' && c.me.printed > c.opp.printed && c.me.printed - c.opp.printed < 70,
    gate: c => { c.opp.noGate = true; } },
  'Boil': gateTwiceNotHighest('haos', 'aquos'), 'Wash': gateTwiceNotHighest('haos', 'subterra'),
  'Toil': gateTwiceNotHighest('haos', 'ventus'), 'Second Best': gateTwiceNotHighest('haos', 'pyrus'),
  'Rock On': doubleBoth('haos', 'subterra'), 'Windmills': doubleBoth('ventus', 'aquos'), 'Dynamo Charge!': doubleBoth('darkus', 'pyrus'),
  'Darkfire Color Shift': colorShiftHighest('pyrus', 'darkus'), 'Lightwind Color Shift': colorShiftHighest('haos', 'ventus'),
  'Strong Winds Blow': { when: 'battle', can: has('ventus'), table: c => { for (const a of ATTRS) c.table[a] = (c.table[a] || 0) * 2; } },
  'Ground': { when: 'battle', can: has('subterra'), table: c => { for (const a of ATTRS) c.table[a] = Math.min(50, c.table[a] || 0); } },
  'Light Snap': { when: 'battle', can: has('haos'),
    table: c => { const h = c.table.haos || 0; for (const a of ATTRS) if ((c.table[a] || 0) > h) c.table[a] = 0; } },
  // ---- attribute changes (the best choice is made for you)
  'Special Mirror': { when: 'battle', can: () => true, attr: c => { c.me.attr = OPPOSITE[c.me.attr] || c.me.attr; c.opp.attr = OPPOSITE[c.opp.attr] || c.opp.attr; } },
  'Mirror Element': { when: 'battle', can: () => true, attr: c => { c.me.attr = bestAttr(c, [...new Set(c.s.players[c.opp.p].toys.map(t => t.attr))]); } },
  'Conform': { when: 'battle', can: () => true, attr: c => { c.me.attr = bestAttr(c, [...new Set(c.s.players[c.opp.p].toys.map(t => t.attr))]); } },
  'Color Shift': { when: 'battle', can: lowest, attr: c => { c.me.attr = bestAttr(c, [...new Set(c.s.players[c.me.p].toys.map(t => t.attr))]); } },
  'Color Swap': { when: 'battle', can: lowest, attr: c => { [c.me.attr, c.opp.attr] = [c.opp.attr, c.me.attr]; } },
  'Colorvoid': { when: 'battle', can: c => capturedBy(c.s, c.opp.p) > capturedBy(c.s, c.me.p), attr: c => { c.opp.attr = worstAttr(c, ATTRS); } },

  // ---- Red: before you throw (bonus if that toy battles this turn)
  'Dan and Marucho': throwCard(attrIs('pyrus', 'aquos'), ifMine(50)),
  'Mira and Shun': throwCard(attrIs('subterra', 'ventus'), ifMine(50)),
  'Ace and Baron': throwCard(attrIs('darkus', 'haos'), ifMine(50)),
  'Dark Wind Master': throwCard(attrIs('darkus'), ifMine(100)), 'Sun Fire Master': throwCard(attrIs('pyrus'), ifMine(100)),
  'Mud Master': throwCard(attrIs('subterra'), ifMine(100)), 'Hot Wind Master': throwCard(attrIs('ventus'), ifMine(100)),
  'Double Edge': throwCard(anyToy, highestPrinted(100)), 'Evil Power': throwCard(anyToy, highestPrinted(50)),
  'Detect Shrimp': throwCard(anyToy, lowestPrinted(100, 50)),
  'A Hand Up': throwCard(attrIs('haos'), lowestPrinted(50)), 'Flash Lance': throwCard(attrIs('haos'), lowestPrinted(100)),
  'Vendetta': throwCard(attrIs('pyrus', 'subterra', 'haos'), c => (c.mine && OPPOSITE[c.side.attr] === c.other.attr ? 200 : 0)),
  'Old opponents': throwCard(attrIs('aquos', 'ventus', 'darkus'), c => (c.mine && OPPOSITE[c.side.attr] === c.other.attr ? 200 : 0)),
};

export const effectOf = card => EFFECTS[card.name] || null;
export const isCoded = card => !!effectOf(card);
