// Billy's own outfit designs (Nov 22): rigged GLBs in pack 2's creator/models (made from his OBJs by scripts/outfitglb.mjs).
// Each piece has one color (its own texture). Pieces are offered on their own as new styles:
//   Tops   18 Brown Commander Jacket  19 Casual Field Jacket  20 Green Tech Jacket  21 Red Biker Jacket  22 Orange Field Jacket
//          23 Dark Wrap Top  24 Utility Vest  25 Green Yellow Top  26 Explorer Vest  27 Blue Dueling Coat  28 Blue Regal Coat
//          29 Navy Leader Coat      (30 Formal Gown and 31 High Uniform Dress only come as whole outfits)
//   Pants  14-25, Shoes 7-20: the pants and boots/shoes of each outfit (in the order of B_SETS)
// and four whole outfits (the Outfit part): the Gown and the Dress (no pants under them), and the two coats with their pants and boots.
export const B_SETS = ['Blue Dueling Coat', 'Blue Regal Suit', 'Brown Commander Jacket', 'Casual Field Jacket', 'Dark Wrap Top', 'Explorer Vest',
  'Green Tech Jacket', 'Green Yellow', 'Navy Leader Coat', 'Orange Field Jacket', 'Red Biker Jacket', 'Utility Vest'];
export const B_FIRST = { top: 18, down: 14, shoes: 7 };
export const isBilly = (kind, s) => kind in B_FIRST && s >= B_FIRST[kind];
// one swatch each (the piece's main color)
export const BCOLORS = {
  top18: ['#72451e'], top19: ['#3e527e'], top20: ['#8ed41c'], top21: ['#a41a22'], top22: ['#c27212'], top23: ['#3a2666'], top24: ['#5a6b2e'],
  top25: ['#ba9616'], top26: ['#6b4a2a'], top27: ['#223274'], top28: ['#1e4aa4'], top29: ['#1b255a'],
  down14: ['#788ab2'], down15: ['#183b83'], down16: ['#20328a'], down17: ['#70689d'], down18: ['#725da2'], down19: ['#ab9a70'],
  down20: ['#333336'], down21: ['#bdbdbd'], down22: ['#171f4c'], down23: ['#5a6a2e'], down24: ['#205aaa'], down25: ['#404072'],
  shoes7: ['#1d2246'], shoes8: ['#bdbdbd'], shoes9: ['#1e1e20'], shoes10: ['#333336'], shoes11: ['#1e1e20'], shoes12: ['#5f3d20'],
  shoes13: ['#bdbdbd'], shoes14: ['#203a8c'], shoes15: ['#1e1e20'], shoes16: ['#6a4323'], shoes17: ['#a41a22'], shoes18: ['#6a4323'],
  shoes19: ['#7a182a'], shoes20: ['#1e1e20'],
  outfit0: ['#7a182a'], outfit1: ['#2e385e'], outfit2: ['#223274'], outfit3: ['#1b255a'],
};
export const OUTFITS = [
  { label: 'Formal Gown', top: 30, down: null, shoes: 2, shoeColor: 0 },
  { label: 'High Uniform Dress', top: 31, down: null, shoes: 2, shoeColor: 1 },
  { label: 'Blue Dueling Coat', top: 27, down: 14, shoes: 6, shoeColor: 1 },
  { label: 'Navy Leader Coat', top: 29, down: 22, shoes: 5, shoeColor: 1 },
];
// whole outfits wear the game's own shoes (styles 0-6) in a set color, not Billy's boots (Billy, Nov 22)
// the look as worn: a whole outfit replaces the top, pants and shoes (down is null under the gown and the dress)
export function wear(L) {
  const o = L && L.outfit && L.outfit[0] >= 0 && OUTFITS[L.outfit[0]]; if (!o) return L;
  return { ...L, top: [o.top, 0], down: o.down === null ? null : [o.down, 0], shoes: [o.shoes, o.shoeColor || 0], gloves: [-1, 0], accent: [-1, 0] };
}
