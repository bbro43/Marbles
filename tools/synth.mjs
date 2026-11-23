// The synthetic Bakugan, spread evenly over every deck (Billy, Nov 22). Used by tools/aiteams.mjs and tools/newbrawlers.mjs.
// Synthetic = every Bakugan that isn't a cast partner, one of the 12 Gundalian and Neathian partners or Onyx's Dryoid,
// and isn't one of the six Maxus Helios pieces (those stay with the Vexos). No custom character without a named partner
// has a Bakugan of their own: all their Bakugan come from this spread.
//
// Strength bands, by base G (sized so each Bakugan lands in about the same number of decks):
export const BANDS = {
  high: ['El Condor', 'Fifth Paladin', 'Laserman', 'Warius', 'Hynoid', 'Bee Striker', 'Monarus', 'Wormquake', 'Reaper', 'Limulus', 'Fear Ripper'],
  mid: ['Siege', 'Terrorclaw', 'Tuskor', 'Falconeer', 'Rattleoid', 'Gargonoid', 'Mantris', 'Ravenoid', 'Griffon'],
  low: ['Centipoid', 'Manion', 'Jelldon', 'Stinglash', 'Robotallion', 'Goblin Ball', 'Saurus', 'Juggernoid', 'Serpenoid'],
};
export const SYNTHETIC = [...BANDS.high, ...BANDS.mid, ...BANDS.low];
// Each synthetic's home attribute, by what it looks like (Billy, Nov 22: the cast carry Bakugan that suit their attribute,
// like Reaper and Fear Ripper for Masquerade, Wormquake for an earth brawler, Ravenoid for a Ventus one, not an Aquos one).
// Custom characters aren't held to this: they get the even spread over every synthetic.
export const HOME = {
  pyrus: ['Warius', 'Hynoid', 'Falconeer', 'Griffon', 'Saurus'],
  aquos: ['Limulus', 'Terrorclaw', 'Jelldon', 'Juggernoid', 'Serpenoid'],
  subterra: ['Wormquake', 'Tuskor', 'Gargonoid', 'Stinglash', 'Goblin Ball'],
  haos: ['Laserman', 'Fifth Paladin', 'Siege', 'Manion', 'Robotallion'],
  darkus: ['Reaper', 'Fear Ripper', 'Rattleoid', 'Centipoid'],
  ventus: ['El Condor', 'Monarus', 'Bee Striker', 'Ravenoid', 'Mantris'],
};
// never on a cast deck: Siege and Centipoid are Jenny's and Jewls's own, Fifth Paladin is for custom characters only (Billy, Nov 22)
const NOT_CAST = new Set(['Siege', 'Centipoid', 'Fifth Paladin']);
const RANK = Object.fromEntries(SYNTHETIC.map((n, i) => [n, i]));   // 0 = strongest
// Each deck: its id and how many synthetic slots it has at each level (2 beside a partner, 3 with no partner).
// Levels share Bakugan so a deck feels like one deck as it gets stronger:
//   2 slots: Easy [low, mid]          Normal [mid, high]        Hard [high, high2]
//   3 slots: Easy [low, low2, mid]    Normal [mid, mid2, high]  Hard [high, high2, mid2]
// the cast and their attribute (the Vexos, spectra, mylene, volt, gus, shadow and lync, keep the Maxus Helios pieces)
const CAST_ATTR = { dan: 'pyrus', runo: 'haos', marucho: 'aquos', julie: 'subterra', shun: 'ventus', akira: 'subterra', shuji: 'darkus', jenny: 'aquos',
  jewls: 'subterra', billy: 'subterra', komba: 'ventus', julio: 'haos', chanlee: 'pyrus', klaus: 'aquos', masquerade: 'darkus',
  nv_dan: 'pyrus', nv_shun: 'ventus', nv_marucho: 'aquos', ace: 'darkus', mira: 'subterra', baron: 'haos' };
const CAST = Object.keys(CAST_ATTR);
const PARTNERED = ['brodny', 'kasimir', 'pavel', 'tibor', 'zarek', 'zorro', 'arcadius', 'mousoulios', 'demitri', 'eirene', 'petronas', 'eudocia', 'onyx'];
const NO_PARTNER = ['maisie', 'richard', 'ryan', 'sarah', 'george', 'ella', 'sophie', 'nico', 'freya', 'zoya', 'xander', 'heather', 'brandon', 'rocco',
  'otto', 'margaret', 'melissa', 'karen', 'brenda', 'ellie', 'amanda', 'gary', 'anthony',
  'vasek', 'vesna', 'ignatios', 'jason', 'evelyn', 'kala', 'olivia', 'raymond'];
// Marucho: Preyas at every level plus Juggernoid / Preyas II (Diablo) / Preyas II (Angelo) (Billy, Nov 22), so 1 synthetic a level.
// Akira and Shuji have no partner of their own: 3 synthetics of their attribute.
const SLOTS = { marucho: 1, akira: 3, shuji: 3 };
export const DECKS = [...CAST.map(id => [id, SLOTS[id] || 2]), ...PARTNERED.map(id => [id, 2]), ...NO_PARTNER.map(id => [id, 3])];

// deterministic even spread: each pick is the least-used Bakugan of its band (counted by decks it's in), ties by a rotating order
export function spread() {
  const used = Object.fromEntries(SYNTHETIC.map(n => [n, 0])), out = {};
  // interleave the decks so the three kinds share the counts fairly
  // the cast first (they pick by attribute), then everyone else interleaved, so the even spread evens out what the cast took
  const order = [...CAST]; const groups = [PARTNERED, NO_PARTNER].map(g => [...g]);
  while (groups.some(g => g.length)) for (const g of groups) if (g.length) order.push(g.shift());
  const slots = Object.fromEntries(DECKS);
  order.forEach((id, i) => {
    const mine = new Set();
    const attr = CAST_ATTR[id];
    // a cast deck: a Bakugan of its own attribute, the one nearest the band's strength (least used first), else the band as usual
    const castPick = band => { const want = { high: 0, mid: 1, low: 2 }[band];
      const list = (HOME[attr] || []).filter(n => !mine.has(n) && !NOT_CAST.has(n));
      const bandOf = n => BANDS.high.includes(n) ? 0 : BANDS.mid.includes(n) ? 1 : 2;
      const n = list.sort((a, b) => Math.abs(bandOf(a) - want) - Math.abs(bandOf(b) - want) || used[a] - used[b] || RANK[a] - RANK[b])[0];
      if (n && Math.abs(bandOf(n) - want) <= 1) { mine.add(n); used[n]++; return n; }
      // none left: reuse one of their attribute already in this deck (from another level), strongest first
      const again = [...mine].filter(n => (HOME[attr] || []).includes(n) && !level.includes(n)).sort((a, b) => RANK[a] - RANK[b])[0];
      return again || null; };
    let level = [];   // what this level already holds (a deck never carries the same Bakugan twice in one level)
    const pick = (band, same = []) => { level = same; if (attr) { const c = castPick(band); if (c) return c; }
      const list = BANDS[band].filter(n => !mine.has(n) && !(attr && NOT_CAST.has(n)));
      // ties broken by a hash of the deck and the Bakugan, so no two Bakugan always land in the same decks together
      const h = n => [...(id + '|' + n)].reduce((x, c) => (x * 31 + c.charCodeAt(0)) >>> 0, 7);
      const n = [...list].sort((a, b) => used[a] - used[b] || h(a) - h(b))[0];
      mine.add(n); used[n]++; return n; };
    if (slots[id] === 1) { const mi = pick('mid'), hi = pick('high'), hi2 = pick('high');
      out[id] = { easy: [mi], normal: [hi], hard: [hi2] }; }
    else if (slots[id] === 2) { const lo = pick('low'), mi = pick('mid', [lo]), hi = pick('high', [mi]), hi2 = pick('high', [hi]);
      out[id] = { easy: [lo, mi], normal: [mi, hi], hard: [hi, hi2] }; }
    else { const lo = pick('low'), lo2 = pick('low', [lo]), mi = pick('mid', [lo, lo2]), mi2 = pick('mid', [mi]), hi = pick('high', [mi, mi2]), hi2 = pick('high', [hi, mi2]);
      out[id] = { easy: [lo, lo2, mi], normal: [mi, mi2, hi], hard: [hi, hi2, mi2] }; }
  });
  return { decks: out, used };
}
