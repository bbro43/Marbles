// Dual Attribute Bakugan (Billy, Nov 21). A Dual Attribute Bakugan always carries a fixed second attribute on top of the
// ball's own, and can never be made in that fixed attribute (or any other listed in `never`).
// In battle it always gets the better of its two attributes: Gate card bonuses, Ability card bonuses and conditions,
// arena bonuses. To add another one: one line here.
export const DUAL = {
  bb_07: { second: 'haos', never: ['pyrus', 'haos'] },    // Preyas II (Angelo): Haos + the ball's attribute
  bb_08: { second: 'pyrus', never: ['pyrus', 'haos'] },   // Preyas II (Diablo): Pyrus + the ball's attribute
  // Hybrids (pack 0.51): always both attributes; the catalog lists only the ball's
  tt_14: { second: 'ventus', never: [] },     // Tayghen: Aquos + Ventus
  tt_08: { second: 'aquos', never: [] },      // Hairadee: Ventus + Aquos
  tt_15: { second: 'haos', never: [] },       // Tricloid: Subterra + Haos
  tt_13: { second: 'subterra', never: [] },   // Rabeeder: Haos + Subterra
  tt_04: { second: 'darkus', never: [] },     // Druman: Pyrus + Darkus
  tt_02: { second: 'pyrus', never: [] },      // Centorrior: Darkus + Pyrus
};
export const secondOf = id => DUAL[id]?.second || null;
// all of a toy's (or a battle side's) attributes
export const attrsOf = x => x.attr2 && x.attr2 !== x.attr ? [x.attr, x.attr2] : [x.attr];
export const hasAttr = (x, a) => x.attr === a || x.attr2 === a;
// the best value of f(attribute) over its attributes
export const bestOf = (x, f) => Math.max(...attrsOf(x).map(a => f(a) || 0));
// the catalog: take the attributes a Dual Attribute Bakugan can't be out of its list, so no menu, shop or prize offers them
export function applyDual(catalog) {
  for (const t of catalog.toys || []) { const d = DUAL[t.id]; if (!d || !t.attributes) continue;
    t.attributes = Object.fromEntries(Object.entries(t.attributes).filter(([a]) => !d.never.includes(a)));
    t.dual = d.second; }
  for (const t of catalog.toys || []) if (t.attributes) ALLOWED[t.id] = Object.keys(t.attributes);
}
// an attribute it's allowed to be: the one asked for, or its first allowed one (from the catalog's list when there is one,
// so a Bakugan made in a single attribute, like the hybrids, always comes back as that one)
const ALLOWED = {};
export const fixAttr = (id, attr) => {
  const ok = ALLOWED[id]; if (ok && ok.length && !ok.includes(attr)) return ok[0];
  return DUAL[id]?.never.includes(attr) ? ['aquos', 'darkus', 'ventus', 'subterra'].find(a => !DUAL[id].never.includes(a)) : attr;
};
