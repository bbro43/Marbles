// The synthetic Bakugan, spread evenly over every deck (Billy, Nov 22). Used by tools/aiteams.mjs and tools/newbrawlers.mjs.
// Synthetic = every Bakugan that isn't a cast partner, one of the 12 Gundalian and Neathian partners or Onyx's Dryoid,
// and isn't one of the six Maxus Helios pieces (those stay with the Vexos). No custom character without a named partner
// has a Bakugan of their own: all their Bakugan come from this spread.
//
// Strength bands, by base G (sized so each Bakugan lands in about the same number of decks):
export const BANDS = {
  high: ['El Condor', 'Fifth Paladin', 'Laserman', 'Warius', 'Hynoid', 'Bee Striker', 'Monarus', 'Wormquake', 'Reaper', 'Limulus', 'Fear Ripper'],
  mid: ['Terrorclaw', 'Tuskor', 'Falconeer', 'Rattleoid', 'Gargonoid', 'Mantris', 'Ravenoid', 'Griffon'],
  low: ['Manion', 'Jelldon', 'Stinglash', 'Robotallion', 'Goblin Ball', 'Saurus', 'Juggernoid', 'Serpenoid'],
};
export const SYNTHETIC = [...BANDS.high, ...BANDS.mid, ...BANDS.low];
// Each deck: its id and how many synthetic slots it has at each level (2 beside a partner, 3 with no partner).
// Levels share Bakugan so a deck feels like one deck as it gets stronger:
//   2 slots: Easy [low, mid]          Normal [mid, high]        Hard [high, high2]
//   3 slots: Easy [low, low2, mid]    Normal [mid, mid2, high]  Hard [high, high2, mid2]
const CAST = ['dan', 'runo', 'marucho', 'julie', 'shun', 'akira', 'shuji', 'jenny', 'jewls', 'billy', 'komba', 'julio', 'chanlee', 'klaus', 'masquerade',
  'nv_dan', 'nv_shun', 'nv_marucho', 'ace', 'mira', 'baron'];   // the Vexos (spectra, mylene, volt, gus, shadow, lync) keep the Maxus Helios pieces
const PARTNERED = ['brodny', 'kasimir', 'pavel', 'tibor', 'zarek', 'zorro', 'arcadius', 'mousoulios', 'demitri', 'eirene', 'petronas', 'eudocia', 'onyx'];
const NO_PARTNER = ['maisie', 'richard', 'ryan', 'sarah', 'george', 'ella', 'sophie', 'nico', 'freya', 'zoya', 'xander', 'heather', 'brandon', 'rocco',
  'otto', 'margaret', 'melissa', 'karen', 'brenda', 'ellie', 'amanda', 'gary', 'anthony',
  'vasek', 'vesna', 'ignatios', 'jason', 'evelyn', 'kala', 'olivia', 'raymond'];
export const DECKS = [...CAST.map(id => [id, 2]), ...PARTNERED.map(id => [id, 2]), ...NO_PARTNER.map(id => [id, 3])];

// deterministic even spread: each pick is the least-used Bakugan of its band (counted by decks it's in), ties by a rotating order
export function spread() {
  const used = Object.fromEntries(SYNTHETIC.map(n => [n, 0])), out = {};
  // interleave the decks so the three kinds share the counts fairly
  const order = []; const groups = [CAST, PARTNERED, NO_PARTNER].map(g => [...g]);
  while (groups.some(g => g.length)) for (const g of groups) if (g.length) order.push(g.shift());
  const slots = Object.fromEntries(DECKS);
  order.forEach((id, i) => {
    const mine = new Set();
    const pick = band => { const list = BANDS[band].filter(n => !mine.has(n));
      const n = [...list].sort((a, b) => used[a] - used[b] || ((BANDS[band].indexOf(a) + i * 3) % BANDS[band].length) - ((BANDS[band].indexOf(b) + i * 3) % BANDS[band].length))[0];
      mine.add(n); used[n]++; return n; };
    if (slots[id] === 2) { const lo = pick('low'), mi = pick('mid'), hi = pick('high'), hi2 = pick('high');
      out[id] = { easy: [lo, mi], normal: [mi, hi], hard: [hi, hi2] }; }
    else { const lo = pick('low'), lo2 = pick('low'), mi = pick('mid'), mi2 = pick('mid'), hi = pick('high'), hi2 = pick('high');
      out[id] = { easy: [lo, lo2, mi], normal: [mi, mi2, hi], hard: [hi, hi2, mi2] }; }
  });
  return { decks: out, used };
}
