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

export const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];
export const WIN_GATES = 3;

// Grid of card spots that fit on the mat (columns c, rows r), and each player's throwing corner as [sx, sz].
export const DEFAULT_GRID = { cMin: -3, cMax: 2, rMin: -2, rMax: 1 };
export const DEFAULT_CORNERS = [[1, 1], [-1, -1], [1, -1], [-1, 1]];

export function newMatch(players, { first = 0, grid = DEFAULT_GRID, corners = DEFAULT_CORNERS } = {}) {
  return {
    turn: first, grid, corners, placed: false,
    players: players.map(p => ({
      name: p.name,
      toys: p.toys.map(t => ({ ...t })),
      unused: p.toys.map((_, i) => i),
      used: [],
      gateHand: [...p.gates],
      abilityHand: [...(p.abilities || [])],
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

// Works out a battle on one Gate card. Returns the steps for the screen to animate.
// abilities: optional extra steps [{ side, label, amount }] (card effects, later).
export function computeBattle(s, fieldIdx, abilities = []) {
  const g = s.field[fieldIdx];
  const a = g.toys.find(x => x.p === s.turn);
  const b = g.toys.find(x => x.p !== s.turn);
  const sides = [a, b].map(x => {
    const toy = s.players[x.p].toys[x.t];
    return { p: x.p, t: x.t, name: toy.name, attr: toy.attr, start: toy.g, total: toy.g, steps: [] };
  });
  // Clear toys take the opponent's attribute.
  if (sides[0].attr === 'clear' && sides[1].attr !== 'clear') sides[0].attr = sides[1].attr;
  if (sides[1].attr === 'clear' && sides[0].attr !== 'clear') sides[1].attr = sides[0].attr;

  for (const ab of abilities) {
    const sd = sides[ab.side];
    sd.steps.push({ label: ab.label, amount: ab.amount, from: sd.total, to: sd.total + ab.amount });
    sd.total += ab.amount;
  }
  const bonus = g.card.bonus || {};
  for (const sd of sides) {
    const amt = bonus[sd.attr] || 0;
    sd.steps.push({ label: `Gate card: ${g.card.name}`, amount: amt, from: sd.total, to: sd.total + amt });
    sd.total += amt;
  }
  const result = sides[0].total === sides[1].total ? 'tie' : (sides[0].total > sides[1].total ? sides[0].p : sides[1].p);
  return { fieldIdx, card: g.card, sides, result };
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
