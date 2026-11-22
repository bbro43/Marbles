// Dual Attribute Bakugan (Billy, Nov 21). A Dual Attribute Bakugan always carries a fixed second attribute on top of the
// ball's own, and can never be made in that fixed attribute (or any other listed in `never`).
// In battle it always gets the better of its two attributes: Gate card bonuses, Ability card bonuses and conditions,
// arena bonuses. To add another one: one line here.
export const DUAL = {
  bb_07: { second: 'haos', never: ['pyrus', 'haos'] },    // Preyas II (Angelo): Haos + the ball's attribute
  bb_08: { second: 'pyrus', never: ['pyrus', 'haos'] },   // Preyas II (Diablo): Pyrus + the ball's attribute
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
}
// an attribute it's allowed to be: the one asked for, or its first allowed one
export const fixAttr = (id, attr) => DUAL[id]?.never.includes(attr) ? ['aquos', 'darkus', 'ventus', 'subterra'].find(a => !DUAL[id].never.includes(a)) : attr;
