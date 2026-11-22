// Battle Gear and BakuNano (Billy, Nov 22; pack 0.51, catalog `battleGear` and `bakuNano`, files in pack 2).
// New Vestroia rules only, like Traps. Each comes in three colors (copper, silver, gold), each with its own boost and price.
// Each player brings 1 Battle Gear and 1 BakuNano with their Trap.
//   Battle Gear: before a throw, equip it to the Bakugan you're throwing; in every battle that Bakugan is in it adds its boost;
//                it comes off when that Bakugan wins a battle or gets a double stand, and can be equipped again later (js/rules.js).
//   BakuNano:    once per match, add it to your Bakugan in a battle (no Ability card needed): it adds its boost (js/abilities.js).
// Owned ones are kept like Traps: { uid, id, color } in owned.gear / owned.nano (Story: you.coll.gear / you.coll.nano),
// and a deck holds the uid in deck.gear / deck.nano.
export const GEAR_COLORS = ['copper', 'silver', 'gold'];
export const gearDefs = cat => cat.battleGear || [];
export const nanoDefs = cat => cat.bakuNano || [];
export const boostOf = (def, color) => ((def && def.boost) || {})[color] || 0;
export const priceOf = (def, color) => ((def && def.price) || {})[color] || 0;
// the color with the highest boost (of the ones given)
export const bestColor = (def, colors = GEAR_COLORS) => [...colors].filter(c => (def.attributes || def.boost || {})[c] !== undefined).sort((a, b) => boostOf(def, b) - boostOf(def, a))[0] || colors[0];
// for a battle player
export const gearForBattle = (def, color, uid) => def && { id: uid || 'gear-' + def.id, gearId: def.id, color, name: def.name, boost: boostOf(def, color) };
export const nanoForBattle = (def, color, uid) => def && { type: 'nano', color: 'nano', id: uid || 'nano-' + def.id, nanoId: def.id, nanoColor: color, name: def.name,
  boost: boostOf(def, color), text: `BakuNano: +${boostOf(def, color)}G to your Bakugan in this battle. Once per match.` };
// a computer brawler: one of each, picked from its name so it's always the same, in its highest-boost color
const hash = s => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
export function aiGear(cat, who) {
  const g = gearDefs(cat), n = nanoDefs(cat);
  const gd = g.length ? g[hash(who) % g.length] : null, nd = n.length ? n[hash(who + '*') % n.length] : null;
  return { gear: gd && gearForBattle(gd, bestColor(gd)), nano: nd && nanoForBattle(nd, bestColor(nd)) };
}
// a player's own (owned list + the uid in the deck)
export function ownedForBattle(cat, owned, deck) {
  const og = ((owned && owned.gear) || []).find(x => x.uid === (deck && deck.gear)), on = ((owned && owned.nano) || []).find(x => x.uid === (deck && deck.nano));
  const gd = og && gearDefs(cat).find(d => d.id === og.id), nd = on && nanoDefs(cat).find(d => d.id === on.id);
  return { gear: gd ? gearForBattle(gd, og.color, og.uid) : null, nano: nd ? nanoForBattle(nd, on.color, on.uid) : null };
}
