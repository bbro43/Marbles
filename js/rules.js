// Core rules engine. Pure logic: no rendering, no randomness inside the rules.
// The battle screen calls these functions and draws whatever they return.
//
// Words used here:
//   toy      = a ball. { id, name, attr, g }
//   unused   = toys you can still throw this round
//   used     = toys that already landed / battled
//   gateHand = your Gate cards not yet set
//   field    = Gate cards set on the mat: { card, owner, cell: [c, r], toys: [{p, t}] }
//   cell     = a spot on the card grid. Cells are card-sized; [0,0] is the cell just +x/+z of the mat's center,
//              so the starting rectangle is the four cells [-1|0, -1|0] around the center.
//   captured = Gate cards you've won (3 wins the match)

import { effectOf, gateEffectOf } from './abilities.js';
export { isCoded } from './abilities.js';

export const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];
export const WIN_GATES = 3;

// Grid of card spots that fit on the mat (columns c, rows r), and each player's throwing corner as [sx, sz].
export const DEFAULT_GRID = { cMin: -3, cMax: 2, rMin: -2, rMax: 1 };
export const DEFAULT_CORNERS = [[1, 1], [-1, -1], [1, -1], [-1, 1]];

export function newMatch(players, { first = 0, grid = DEFAULT_GRID, corners = DEFAULT_CORNERS } = {}) {
  return {
    turn: first, grid, corners, placed: false,
    pending: [],          // Red "before you throw" cards played this turn: { p, t, card }
    players: players.map(p => ({
      name: p.name,
      toys: p.toys.map(t => ({ ...t })),
      unused: p.toys.map((_, i) => i),
      used: [],
      gateHand: [...p.gates],
      abilityHand: [...(p.abilities || [])],
      abilityUsed: [],
      captured: [],
    })),
    field: [],
    winner: null,
  };
}

const other = p => 1 - p;

// The opening spot for a player: the cell of the center rectangle farthest from their throwing corner.
export function openingCell(s, p) {
  const [sx, sz] = s.corners[p];
  return [sx > 0 ? -1 : 0, sz > 0 ? -1 : 0];
}
const key = c => c[0] + ',' + c[1];
export function cellTaken(s, cell) { return s.field.some(f => key(f.cell) === key(cell)); }
const inGrid = (s, [c, r]) => c >= s.grid.cMin && c <= s.grid.cMax && r >= s.grid.rMin && r <= s.grid.rMax;

// Field empty and nobody has won: everyone with Gate cards left sets one in their opening spot.
export function needsOpening(s) {
  return s.winner === null && s.field.length === 0 && s.players.some(pl => pl.gateHand.length);
}
export function openingPlayers(s) {
  if (!needsOpening(s)) return [];
  const order = s.players.map((_, i) => (s.turn + i) % s.players.length);
  return order.filter(p => s.players[p].gateHand.length);
}

// Start of a turn. Returns events describing what happened.
// pickGate(p, hand) chooses which Gate card a player sets in the opening (index into hand).
export function startTurn(s, pickGate = () => 0) {
  const ev = [];
  s.placed = false;
  for (const p of openingPlayers(s)) {
    const hand = s.players[p].gateHand;
    const card = hand.splice(pickGate(p, hand), 1)[0];
    const cell = openingCell(s, p);
    s.field.push({ card, owner: p, cell, toys: [] });
    ev.push({ type: 'gateSet', p, card, cell, fieldIdx: s.field.length - 1, opening: true });
    if (p === s.turn) s.placed = true;            // the opening counts as this turn's Gate card
  }
  const me = s.players[s.turn];
  if (me.unused.length === 0) {
    // Rulebook: no unused toys -> all used toys come back. Toys still standing on a Gate stay there.
    const standing = new Set(s.field.flatMap(f => f.toys.filter(x => x.p === s.turn).map(x => x.t)));
    me.unused = me.used.filter(t => !standing.has(t));
    me.used = me.used.filter(t => standing.has(t));
    ev.push({ type: 'recycle', p: s.turn, toys: [...me.unused] });
  }
  return ev;
}

// After the opening: once per turn, before throwing, the active player may set one Gate card
// in any free spot that shares a side with a Gate card already on the field.
export function placeCells(s, p = s.turn) {
  if (s.winner !== null || s.placed || p !== s.turn || !s.players[p].gateHand.length || !s.field.length) return [];
  const out = new Map();
  for (const f of s.field) for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const cell = [f.cell[0] + dc, f.cell[1] + dr];
    if (inGrid(s, cell) && !cellTaken(s, cell)) out.set(key(cell), cell);
  }
  return [...out.values()];
}
export function placeGate(s, handIdx, cell) {
  const p = s.turn, hand = s.players[p].gateHand;
  if (!placeCells(s, p).some(c => key(c) === key(cell))) throw new Error('cannot set a Gate card there');
  if (!hand[handIdx]) throw new Error('no such Gate card');
  const card = hand.splice(handIdx, 1)[0];
  s.field.push({ card, owner: p, cell, toys: [] });
  s.placed = true;
  return [{ type: 'gateSet', p, card, cell, fieldIdx: s.field.length - 1 }];
}

// Landed on a card that already holds one of your own toys. You choose:
//   A) take the card (uncontested), or
//   B) move the new toy to a card touching it (sharing a side) that has none of your toys.
// This lists the cards for B. Empty list = only A.
const touching = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;
export function moveOptions(s, fieldIdx, p = s.turn) {
  const here = s.field[fieldIdx].cell;
  return s.field.map((f, k) => k).filter(k => k !== fieldIdx && touching(here, s.field[k].cell) && !s.field[k].toys.some(x => x.p === p));
}

export function canThrow(s, p = s.turn) {
  return s.winner === null && s.players[p].unused.length > 0 && s.field.length > 0;
}

// A throw landed. fieldIdx = index of the Gate card it opened on, or null for a miss.
// chooseMove(options) decides when it lands on your own toy (see moveOptions):
// return one of the options to move there, or null to take the card.
// Returns { events, battle } where battle (if any) must be resolved with resolveBattle().
export function land(s, t, fieldIdx, chooseMove = opts => opts[0]) {
  const p = s.turn, me = s.players[p];
  const i = me.unused.indexOf(t);
  if (i < 0) throw new Error('toy is not unused');
  const ev = [];

  if (fieldIdx === null || !s.field[fieldIdx]) {
    ev.push({ type: 'miss', p, t });           // toy goes back to unused
    return endTurn(s, ev);
  }
  me.unused.splice(i, 1);
  me.used.push(t);
  let g = s.field[fieldIdx];
  const mine = g.toys.filter(x => x.p === p);
  const theirs = g.toys.filter(x => x.p !== p);

  const at = (gate) => ({ cell: gate.cell, slot: gate.toys.length - 1 });   // where on the mat (for drawing)
  if (theirs.length) {
    g.toys.push({ p, t });
    ev.push({ type: 'stand', p, t, fieldIdx, ...at(g) });
    return { events: ev, battle: { fieldIdx } };
  }
  if (mine.length === 0) {
    g.toys.push({ p, t });
    ev.push({ type: 'stand', p, t, fieldIdx, ...at(g) });
    return endTurn(s, ev);
  }
  // Landed on a Gate card that already holds one of my own toys.
  const opts = moveOptions(s, fieldIdx, p);
  const pick = opts.length ? chooseMove(opts) : null;
  const otherIdx = opts.includes(pick) ? pick : -1;
  const otherGate = s.field[otherIdx];
  if (!otherGate) {
    g.toys.push({ p, t });
    ev.push({ type: 'stand', p, t, fieldIdx, ...at(g) });
    ev.push(...capture(s, p, fieldIdx, 'uncontested'));
    return endTurn(s, ev);
  }
  otherGate.toys.push({ p, t });
  ev.push({ type: 'moved', p, t, from: fieldIdx, fieldIdx: otherIdx, ...at(otherGate) });
  if (otherGate.toys.some(x => x.p !== p)) return { events: ev, battle: { fieldIdx: otherIdx } };
  return endTurn(s, ev);
}

// Knockout: the active player's throw knocked toys off their Gate cards.
// knocked: [{ p, t, card }] — card = the Gate card each toy was standing on.
// - Opponent's toy knocked off -> the thrower wins that Gate card, no matter the G-Power.
// - Your own toy knocked off -> it just leaves the card (already in your used pile).
// Call this before land() for the thrown toy. Returns events.
export function knockOff(s, knocked) {
  const ev = [];
  for (const k of knocked) {
    const idx = s.field.findIndex(f => f.card === k.card);
    if (idx < 0) continue;                                   // card already taken by an earlier knockout
    const g = s.field[idx];
    g.toys = g.toys.filter(x => !(x.p === k.p && x.t === k.t));
    ev.push({ type: 'knockedOff', p: k.p, t: k.t, card: k.card });
    if (k.p !== s.turn) {
      ev.push(...capture(s, s.turn, idx, 'knockout'));
      if (s.winner !== null) break;
    }
  }
  return ev;
}

// ---------- Ability cards
// Before throwing: Red cards you could play with toy t (indexes into your Ability hand).
export function throwOptions(s, t, p = s.turn) {
  const toy = s.players[p].toys[t];
  return s.players[p].abilityHand.map((c, i) => i).filter(i => {
    const e = effectOf(s.players[p].abilityHand[i]);
    return e && e.when === 'throw' && e.forToy(toy);
  });
}
export function playBeforeThrow(s, handIdx, t, p = s.turn) {
  if (!throwOptions(s, t, p).includes(handIdx)) throw new Error('cannot play that card now');
  const card = s.players[p].abilityHand.splice(handIdx, 1)[0];
  s.players[p].abilityUsed.push(card);
  s.pending.push({ p, t, card });
  return [{ type: 'ability', p, card, when: 'throw' }];
}

// During a battle: players take turns playing Ability cards (active player first). Playing a card
// passes the chance to the other player; the window closes when both pass in a row.
// The Gate card's effect may give players used Ability cards back first (b.events lists who got what).
export function startBattle(s, fieldIdx) {
  const b = { fieldIdx, plays: [], next: s.turn, passes: 0, events: [] };
  const ge = gateEffectOf(s.field[fieldIdx].card);
  if (ge && ge.regain) {
    const w = build(s, fieldIdx, []);
    for (const { p, color } of ge.regain(w.gctx())) {
      const pl = s.players[p];
      const back = pl.abilityUsed.filter(c => color === 'all' || c.color === color);
      if (!back.length) continue;
      pl.abilityUsed = pl.abilityUsed.filter(c => !back.includes(c));
      pl.abilityHand.push(...back);
      b.events.push({ type: 'regain', p, cards: back });
    }
  }
  return b;
}
export const abilityDone = b => b.passes >= 2;
export function abilityOptions(s, b, p = b.next) {
  const hand = s.players[p].abilityHand;
  const w = build(s, b.fieldIdx, b.plays);
  const ge = gateEffectOf(w.g.card);
  if (ge && ge.noAbility && ge.noAbility(w.gctx(), p)) return [];          // the Gate card says no
  const blocked = card => b.plays.some(pl => pl.p !== p && (effectOf(pl.card) || {}).blocks && effectOf(pl.card).blocks(card));
  return hand.map((c, i) => i).filter(i => {
    const e = effectOf(hand[i]);
    if (!e || e.when !== 'battle' || blocked(hand[i])) return false;
    return e.can(w.ctx({ p, card: hand[i] }));
  });
}
export function playAbility(s, b, handIdx, p = b.next) {
  if (!abilityOptions(s, b, p).includes(handIdx)) throw new Error('cannot play that card now');
  const card = s.players[p].abilityHand.splice(handIdx, 1)[0];
  s.players[p].abilityUsed.push(card);
  b.plays.push({ p, card });
  b.passes = 0; b.next = 1 - p;
  return [{ type: 'ability', p, card, when: 'battle' }];
}
export function passAbility(s, b) { b.passes++; b.next = 1 - b.next; }

// Sets up both sides and runs the attribute / Gate-table / Gate-use steps of every played card.
function build(s, fieldIdx, plays) {
  const g = s.field[fieldIdx];
  const a = g.toys.find(x => x.p === s.turn);
  const b = g.toys.find(x => x.p !== s.turn);
  const sides = [a, b].map(x => {
    const toy = s.players[x.p].toys[x.t];
    return { p: x.p, t: x.t, name: toy.name, attr: toy.attr, printed: toy.g, start: toy.g, total: toy.g, steps: [],
      noGate: false, noAbility: false, useHighest: false, gateMult: 1, abilityMult: 1 };
  });
  // Clear toys take the opponent's attribute.
  if (sides[0].attr === 'clear' && sides[1].attr !== 'clear') sides[0].attr = sides[1].attr;
  if (sides[1].attr === 'clear' && sides[0].attr !== 'clear') sides[1].attr = sides[0].attr;
  const table = { ...(g.card.bonus || {}) };
  const ctx = play => {
    const me = sides.find(x => x.p === play.p), opp = sides.find(x => x !== me);
    return { s, field: g, gateCard: g.card, table, me, opp, sides, card: play.card };
  };
  const gctx = () => ({ s, field: g, gateCard: g.card, table, sides, card: g.card });
  // Gate card effect: printed G-Power changes and per-side flags
  const ge = gateEffectOf(g.card);
  const printedNotes = ge && ge.printed ? ge.printed(gctx()) : [];
  if (ge && ge.gate) ge.gate(gctx());
  for (const phase of ['attr', 'table', 'gate'])
    for (const play of plays) { const e = effectOf(play.card); if (e && e[phase]) e[phase](ctx(play)); }
  return { g, sides, table, ctx, gctx, ge, printedNotes };
}

// Works out a battle on one Gate card. Returns the steps for the screen to animate.
// b = a battle from startBattle() (with its played cards), or just the Gate card's field index.
export function computeBattle(s, b) {
  if (typeof b === 'number') b = startBattle(s, b);
  const { g, sides, table, ctx, gctx, ge, printedNotes } = build(s, b.fieldIdx, b.plays);
  const step = (sd, label, amount, note) => {
    sd.steps.push({ label, amount, note, from: sd.total, to: sd.total + amount });
    sd.total += amount;
  };
  // Gate card changed printed G-Power (swap / doubling)
  for (const { side, note } of printedNotes) {
    const diff = side.printed - side.total;
    step(side, g.card.name, diff, diff ? note : note + ', no change');
  }
  // Red cards played before the throw this turn
  for (const pend of s.pending) {
    const e = effectOf(pend.card);
    for (const sd of sides) {
      const other = sides.find(x => x !== sd);
      const amt = e.bonus({ side: sd, other, mine: sd.p === pend.p && sd.t === pend.t }) * sd.abilityMult;
      if (amt) step(sd, pend.card.name, amt);
    }
  }
  // Ability cards played in this battle, in order
  for (const play of b.plays) {
    const e = effectOf(play.card), c = ctx(play);
    if (e.add) step(c.me, play.card.name, c.me.noAbility ? 0 : e.add(c) * c.me.abilityMult, c.me.noAbility ? 'cancelled' : undefined);
    else step(c.me, play.card.name, 0, e.swap ? 'swap at the end' : 'played');
  }
  // Gate card extra G-Power (Trick Jump, Mega Warrior, Naga's Wrath)
  if (ge && ge.add) for (const sd of sides) { const amt = ge.add(gctx(), sd); if (amt) step(sd, g.card.name, amt); }
  // Gate bonus
  const highest = Math.max(0, ...ATTRS.map(a => table[a] || 0));
  for (const sd of sides) {
    let amt = sd.noGate ? 0 : (sd.useHighest ? highest : (table[sd.attr] || 0)) * sd.gateMult;
    const notes = [sd.noGate && 'blocked', sd.useHighest && !sd.noGate && 'highest bonus', sd.gateMult > 1 && !sd.noGate && 'x' + sd.gateMult].filter(Boolean);
    step(sd, `Gate card: ${g.card.name}`, amt, notes.join(', ') || undefined);
  }
  // Swap cards: an odd number of swaps trades the two totals
  const swaps = b.plays.filter(pl => (effectOf(pl.card) || {}).swap);
  if (swaps.length % 2 === 1) {
    const [a, c2] = sides, ta = a.total, tc = c2.total, label = swaps.at(-1).card.name;
    step(a, label, tc - ta, 'totals swapped'); step(c2, label, ta - tc, 'totals swapped');
  }
  const result = sides[0].total === sides[1].total ? 'tie' : (sides[0].total > sides[1].total ? sides[0].p : sides[1].p);
  return { fieldIdx: b.fieldIdx, card: g.card, sides, result };
}

// Applies a computed battle to the state.
export function resolveBattle(s, battle) {
  const ev = [];
  const g = s.field[battle.fieldIdx];
  if (battle.result === 'tie') {
    // Decided: nobody wins it; the Gate card goes back to whoever set it, as unused.
    s.field.splice(battle.fieldIdx, 1);
    s.players[g.owner].gateHand.push(g.card);
    ev.push({ type: 'tie', fieldIdx: battle.fieldIdx, returnedTo: g.owner, card: g.card });
  } else {
    ev.push(...capture(s, battle.result, battle.fieldIdx, 'battle'));
  }
  return endTurn(s, ev).events;
}

function capture(s, p, fieldIdx, how) {
  const g = s.field.splice(fieldIdx, 1)[0];
  s.players[p].captured.push(g.card);
  const ev = [{ type: 'capture', p, card: g.card, how, fieldIdx }];
  if (s.players[p].captured.length >= WIN_GATES) { s.winner = p; ev.push({ type: 'win', p }); }
  return ev;
}

function endTurn(s, ev) {
  s.pending = [];
  if (s.winner === null) {
    // If both players are out of Gate cards and the field is empty, the match can't continue:
    // most captured wins; equal = draw.
    const stuck = s.field.length === 0 && s.players.every(pl => pl.gateHand.length === 0);
    if (stuck) {
      const [c0, c1] = s.players.map(pl => pl.captured.length);
      s.winner = c0 === c1 ? 'draw' : (c0 > c1 ? 0 : 1);
      ev.push({ type: 'win', p: s.winner, reason: 'out of Gate cards' });
    } else {
      s.turn = other(s.turn);
      ev.push({ type: 'turn', p: s.turn });
    }
  }
  return { events: ev, battle: null };
}
