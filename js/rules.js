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

import { bestOf, hasAttr } from './dual.js';
import { effectOf, gateEffectOf, fieldEffectOf } from './abilities.js';
export { isCoded } from './abilities.js';

export const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];
export const WIN_GATES = 3;
// New Vestroia rules (newMatch(..., { nv: true })): no Gate card wins. Each player has a Life Gauge of START_LIFE;
// losing a battle costs the difference in G-Power. A knockout costs (attacker's Speed - defender's Defense) x KO_PER (Billy, Nov 20),
// at least KO_MIN. 0 Life loses.
// Gate cards are used up after a battle and come back when you run out; Bakugan come back right after their battle.
export const START_LIFE = 500, KO_MIN = 100, KO_PER = 50;

// Grid of card spots that fit on the mat (columns c, rows r), and each player's throwing corner as [sx, sz].
export const DEFAULT_GRID = { cMin: -3, cMax: 2, rMin: -2, rMax: 1 };
export const DEFAULT_CORNERS = [[1, 1], [-1, -1], [1, -1], [-1, 1]];

// More than 2 players: teams = each player's team number. Tag Team = [0, 1, 0, 1]; Battle Royale = [0, 1, 2, 3].
// Teammates' Bakugan on the same Gate card fight together (their totals add up). s.winner is a team number
// (in a 1-on-1 match the team number is the player number, so nothing changes there).
export function newMatch(players, { first = 0, grid = DEFAULT_GRID, corners = DEFAULT_CORNERS, nv = false, teams = null, arena = null } = {}) {
  return {
    turn: first, grid, corners, placed: false, nv, arena, teams: teams || players.map((_, i) => i),
    pending: [],          // Red "before you throw" cards played this turn: { p, t, card }
    players: players.map(p => ({
      name: p.name,
      toys: p.toys.map(t => ({ ...t })),
      unused: p.toys.map((_, i) => i),
      used: [],
      gateHand: [...p.gates],
      abilityHand: [...(p.abilities || []), ...(p.trap ? [p.trap] : [])],   // a Trap plays like an Ability card, once
      abilityUsed: [],
      captured: [],
      life: START_LIFE, gateUsed: [], out: false,
    })),
    field: [],
    winner: null,
  };
}

export const teamOf = (s, p) => s.teams ? s.teams[p] : p;
export const sameTeam = (s, a, b) => teamOf(s, a) === teamOf(s, b);
const alive = s => s.players.map((_, p) => p).filter(p => !s.players[p].out);
const aliveTeams = s => [...new Set(alive(s).map(p => teamOf(s, p)))];
// next player in seat order who is still in
function nextPlayer(s, p) { const n = s.players.length; for (let k = 1; k <= n; k++) { const q = (p + k) % n; if (!s.players[q].out) return q; } return p; }
export const opponents = (s, p) => alive(s).filter(q => !sameTeam(s, p, q));

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
  return order.filter(p => !s.players[p].out && s.players[p].gateHand.length);
}

// Start of a turn. Returns events describing what happened.
// pickGate(p, hand) chooses which Gate card a player sets in the opening (index into hand).
// a player whose Bakugan are all standing on Gate cards (nothing in hand, nothing to recycle)
function stuck(s, q) {
  const pl = s.players[q];
  if (pl.unused.length) return false;
  const standing = new Set(s.field.flatMap(f => f.toys.filter(x => x.p === q).map(x => x.t)));
  return pl.used.length > 0 && pl.used.every(t => standing.has(t));
}
// New Vestroia: the turn passes without a throw (startTurn returned a 'skip' event)
export function skipTurn(s) { return endTurn(s, [{ type: 'skipped', p: s.turn }]).events; }
export function startTurn(s, pickGate = () => 0) {
  const ev = [];
  s.placed = false;
  if (s.invulnerable && s.invulnerable.p === s.turn) s.invulnerable = null;   // Invulnerable lasts until its owner's next turn
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
    // Every Bakugan is standing on a Gate card.
    // New Vestroia: you sit this turn out until one of them battles and comes back (unless everyone is stuck that way).
    // Classic (or everyone stuck): pick them all back up (the cards stay), or the match would stall.
    if (me.unused.length === 0 && me.used.length && s.nv && !alive(s).every(q => stuck(s, q))) {
      ev.push({ type: 'skip', p: s.turn });
      return ev;
    }
    if (me.unused.length === 0 && me.used.length) {
      for (const f of s.field) f.toys = f.toys.filter(x => x.p !== s.turn);
      me.unused = [...me.used]; me.used = [];
      ev.push({ type: 'pickUp', p: s.turn, toys: [...me.unused] });
    }
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
  return s.field.map((f, k) => k).filter(k => k !== fieldIdx && touching(here, s.field[k].cell) && !s.field[k].toys.some(x => sameTeam(s, x.p, p)));
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
  // Early Victory: standing on an empty Gate card wins it right away
  if (s.earlyVictory === p && g.toys.length === 0) {
    s.earlyVictory = null;
    g.toys.push({ p, t });
    ev.push({ type: 'stand', p, t, fieldIdx, cell: g.cell, slot: 0 });
    ev.push(...capture(s, p, fieldIdx, 'early victory'));   // New Vestroia: the card is just used up (no effect there; kept out of prebuilt decks)
    return endTurn(s, ev);
  }
  const mine = g.toys.filter(x => sameTeam(s, x.p, p));      // my team's Bakugan already there
  const theirs = g.toys.filter(x => !sameTeam(s, x.p, p));

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
  if (otherGate.toys.some(x => !sameTeam(s, x.p, p))) return { events: ev, battle: { fieldIdx: otherIdx } };
  return endTurn(s, ev);
}

// Knockout: the active player's throw knocked toys off their Gate cards.
// knocked: [{ p, t, card }] — card = the Gate card each toy was standing on.
// - Opponent's toy knocked off -> the thrower wins that Gate card, no matter the G-Power.
// - Your own toy knocked off -> it just leaves the card (already in your used pile).
// Call this before land() for the thrown toy. Returns events.
export function knockOff(s, knocked, by = null) {
  const ev = [];
  for (const k of knocked) {
    if (s.invulnerable && s.invulnerable.p === k.p && s.invulnerable.t === k.t) continue;   // Invulnerable
    const idx = s.field.findIndex(f => f.card === k.card);
    if (idx < 0) continue;                                   // card already taken by an earlier knockout
    const g = s.field[idx];
    g.toys = g.toys.filter(x => !(x.p === k.p && x.t === k.t));
    ev.push({ type: 'knockedOff', p: k.p, t: k.t, card: k.card });
    if (!sameTeam(s, k.p, s.turn) && s.nv) {
      // New Vestroia: the knocked-off Bakugan's owner takes damage; the Bakugan goes back to their hand
      const sv = (t, key) => ((t && t.stats) || {})[key] ?? 3;
      const atk = by === null ? 0 : sv(s.players[s.turn].toys[by], 'speed'), def = sv(s.players[k.p].toys[k.t], 'defense');
      ev.push(...damage(s, k.p, Math.max(KO_MIN, (atk - def) * KO_PER), 'knockout'));
      backToHand(s, k.p, k.t);
      if (s.winner !== null) break;
    } else if (!sameTeam(s, k.p, s.turn)) {
      ev.push(...capture(s, s.turn, idx, 'knockout'));
      if (s.winner !== null) break;
    }
  }
  return ev;
}

// ---------- Ability cards outside battle (the Ability card button)
// phase 'pre' (before the throw) or 'post' (after the Bakugan stops, before it stands/battles).
export function fieldCardOptions(s, phase, landing, p = s.turn) {
  const hand = s.players[p].abilityHand;
  return hand.map((c, i) => i).filter(i => {
    const e = fieldEffectOf(hand[i]);
    return e && e.when === phase && e.can({ s, p, landing });
  });
}
// Plays one. target depends on the card: Invulnerable {t}; Surprise Attack {mine: fieldIdx, theirs: {t, fieldIdx}};
// Trickster {t}; Sleight of Hand {gateIdx, fieldIdx}. Returns events; Surprise Attack returns { battle }.
export function playFieldCard(s, handIdx, phase, landing, target = {}, p = s.turn) {
  if (!fieldCardOptions(s, phase, landing, p).includes(handIdx)) throw new Error('cannot play that card now');
  const card = s.players[p].abilityHand.splice(handIdx, 1)[0];
  s.players[p].abilityUsed.push(card);
  const ev = [{ type: 'ability', p, card, when: phase }];
  switch (card.name) {
    case 'Another Throw': s.extraThrow = p; break;
    case 'Early Victory': s.earlyVictory = p; break;
    case 'Invulnerable': s.invulnerable = { p, t: target.t }; break;
    case 'Sleight of Hand': {
      const f = s.field[target.fieldIdx], mine = s.players[p].gateHand.splice(target.gateIdx, 1)[0];
      s.players[f.owner].gateHand.push(f.card);
      ev.push({ type: 'gateSwapped', old: f.card, card: mine, fieldIdx: target.fieldIdx, returnedTo: f.owner });
      f.card = mine; f.owner = p;
      break;
    }
    case 'Surprise Attack': {
      // the opponent's Bakugan joins yours on your card -> battle there
      const from = s.field[target.theirs.fieldIdx], to = s.field[target.mine];
      const victim = (from.toys.find(x => !sameTeam(s, x.p, p) && x.t === target.theirs.t) || { p: opponents(s, p)[0] }).p;
      from.toys = from.toys.filter(x => !(x.p === victim && x.t === target.theirs.t));
      to.toys.push({ p: victim, t: target.theirs.t });
      ev.push({ type: 'surprise', fieldIdx: target.mine, t: target.theirs.t, slot: to.toys.length - 1 });
      return { events: ev, battle: { fieldIdx: target.mine } };
    }
  }
  return { events: ev, battle: null };
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
  const inIt = [...new Set(s.field[fieldIdx].toys.map(x => x.p))];
  const order = s.players.map((_, i) => (s.turn + i) % s.players.length).filter(p => inIt.includes(p));
  const b = { fieldIdx, plays: [], next: order[0], passes: 0, events: [], order };
  const ge = gateEffectOf(s.field[fieldIdx].card);
  if (ge && ge.regain) {
    const w = build(s, fieldIdx, []);
    for (const { p, color } of ge.regain(w.gctx())) {
      const pl = s.players[p];
      const back = color === 'one' ? pl.abilityUsed.slice(-1) : pl.abilityUsed.filter(c => color === 'all' || c.color === color);   // 'one': the last card used
      if (!back.length) continue;
      pl.abilityUsed = pl.abilityUsed.filter(c => !back.includes(c));
      pl.abilityHand.push(...back);
      b.events.push({ type: 'regain', p, cards: back });
    }
  }
  return b;
}
export const abilityDone = b => b.passes >= (b.order ? b.order.length : 2);
const nextIn = (b, p) => b.order ? b.order[(b.order.indexOf(p) + 1) % b.order.length] : 1 - p;
export function abilityOptions(s, b, p = b.next) {
  const hand = s.players[p].abilityHand;
  const w = build(s, b.fieldIdx, b.plays);
  const ge = gateEffectOf(w.g.card);
  if (ge && ge.noAbility && ge.noAbility(w.gctx(), p)) return [];          // the Gate card says no
  const blocked = card => b.plays.some(pl => { const e = effectOf(pl.card) || {};
    return (pl.p !== p && e.blocks && e.blocks(card)) || (e.blocksAll && e.blocksAll(card)); });
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
  b.passes = 0; b.next = nextIn(b, p);
  return [{ type: 'ability', p, card, when: 'battle' }];
}
export function passAbility(s, b) { b.passes++; b.next = nextIn(b, b.next); }

// Sets up both sides and runs the attribute / Gate-table / Gate-use steps of every played card.
function build(s, fieldIdx, plays) {
  const g = s.field[fieldIdx];
  const a = g.toys.find(x => x.p === s.turn) || g.toys.find(x => sameTeam(s, x.p, s.turn)) || g.toys[0];
  const sides = [a, ...g.toys.filter(x => x !== a)].map(x => {
    const toy = s.players[x.p].toys[x.t];
    return { p: x.p, t: x.t, name: toy.name, attr: toy.attr, attr2: toy.attr2 || null, printed: toy.g, start: toy.g, total: toy.g, steps: [],
      noGate: false, noAbility: false, useHighest: false, gateMult: 1, abilityMult: 1 };
  });
  // Clear toys take the opponent's attribute.
  for (const sd of sides) if (sd.attr === 'clear') { const o = sides.find(x => !sameTeam(s, x.p, sd.p) && x.attr !== 'clear'); if (o) sd.attr = o.attr; }
  const table = { ...(g.card.bonus || {}) };
  const ctx = play => {
    const me = sides.find(x => x.p === play.p) || sides[0];
    const opp = sides.filter(x => !sameTeam(s, x.p, me.p)).sort((x, y) => y.total - x.total)[0] || sides.find(x => x !== me);
    return { s, field: g, gateCard: g.card, table, me, opp, sides, card: play.card, plays };
  };
  const gctx = () => ({ s, field: g, gateCard: g.card, table, sides, card: g.card });
  // Gate card effect: printed G-Power changes and per-side flags
  const ge = gateEffectOf(g.card);
  const printedNotes = ge && ge.printed ? ge.printed(gctx()) : [];
  if (ge && ge.gate) ge.gate(gctx());
  const lastReset = plays.map(pl => !!(effectOf(pl.card) || {}).resets).lastIndexOf(true);   // Rewind cancels earlier cards
  for (const phase of ['attr', 'table', 'gate'])
    for (const [i, play] of plays.entries()) { if (i < lastReset) continue; const e = effectOf(play.card); if (e && e[phase]) e[phase](ctx(play)); }
  return { g, sides, table, ctx, gctx, ge, printedNotes };
}

// Works out a battle on one Gate card. Returns the steps for the screen to animate.
// b = a battle from startBattle() (with its played cards), or just the Gate card's field index.
export const ARENA_BONUS = 50;
export function computeBattle(s, b) {
  if (typeof b === 'number') b = startBattle(s, b);
  const { g, sides, table, ctx, gctx, ge, printedNotes } = build(s, b.fieldIdx, b.plays);
  const step = (sd, label, amount, note) => {
    sd.steps.push({ label, amount, note, from: sd.total, to: sd.total + amount });
    sd.total += amount;
  };
  // Level Field: both toys' printed G-Power counts as zero
  if (b.plays.some(pl => (effectOf(pl.card) || {}).printedZero)) for (const sd of sides) sd.printed = 0;
  if (b.plays.some(pl => (effectOf(pl.card) || {}).printedZero)) printedNotes.push(...sides.map(sd => ({ side: sd, note: 'Level Field: printed G-Power 0' })));
  // Gate card changed printed G-Power (swap / doubling)
  for (const { side, note } of printedNotes) {
    const diff = side.printed - side.total;
    step(side, g.card.name, diff, diff ? note : note + ', no change');
  }
  // Red cards played before the throw this turn
  for (const pend of s.pending) {
    const e = effectOf(pend.card);
    for (const sd of sides) {
      const other = sides.find(x => !sameTeam(s, x.p, sd.p)) || sides.find(x => x !== sd);
      const amt = e.bonus({ side: sd, other, mine: sd.p === pend.p && sd.t === pend.t }) * sd.abilityMult;
      if (amt) step(sd, pend.card.name, amt);
    }
  }
  // Ability cards played in this battle, in order
  // Rewind: cards played before it are cancelled
  const lastReset = b.plays.map(pl => !!(effectOf(pl.card) || {}).resets).lastIndexOf(true);
  for (const [i, play] of b.plays.entries()) {
    const e = effectOf(play.card), c = ctx(play);
    if (i < lastReset) { step(c.me, play.card.name, 0, 'cancelled by Rewind'); continue; }
    if (e.addSides) { for (const { side, amount } of e.addSides(c)) step(side, play.card.name, side.noAbility ? 0 : amount * side.abilityMult); continue; }
    if (e.add) step(c.me, play.card.name, c.me.noAbility ? 0 : e.add(c) * c.me.abilityMult, c.me.noAbility ? 'cancelled' : undefined);
    else step(c.me, play.card.name, 0, e.swap ? 'swap at the end' : 'played');
  }
  // Gate card extra G-Power (Trick Jump, Mega Warrior, Naga's Wrath)
  if (ge && ge.add) for (const sd of sides) { const amt = ge.add(gctx(), sd); if (amt) step(sd, g.card.name, amt); }
  // Gate bonus
  const highest = Math.max(0, ...ATTRS.map(a => table[a] || 0));
  for (const sd of sides) {
    let amt = sd.noGate ? 0 : (sd.useHighest ? highest : bestOf(sd, a => table[a])) * sd.gateMult;   // Dual Attribute: the better of its two
    const notes = [sd.noGate && 'blocked', sd.useHighest && !sd.noGate && 'highest bonus', sd.gateMult > 1 && !sd.noGate && 'x' + sd.gateMult].filter(Boolean);
    step(sd, `Gate card: ${g.card.name}`, amt, notes.join(', ') || undefined);
  }
  // Attribute arena (Billy): every Bakugan of the arena's attribute gets +50G, whoever owns it; a Trap played here with that attribute too
  if (s.arena) {
    const label = s.arena[0].toUpperCase() + s.arena.slice(1) + ' Field';
    for (const sd of sides) if (hasAttr(sd, s.arena)) step(sd, label, ARENA_BONUS);
    for (const play of b.plays) if (play.card.type === 'trap' && (play.card.attrs || []).includes(s.arena)) { const c = ctx(play); step(c.me, label, ARENA_BONUS, 'Trap'); }
  }
  // Swap cards: an odd number of swaps trades the two totals
  const swaps = b.plays.filter(pl => (effectOf(pl.card) || {}).swap);
  if (swaps.length % 2 === 1) {
    const [a, c2] = sides, ta = a.total, tc = c2.total, label = swaps.at(-1).card.name;
    step(a, label, tc - ta, 'totals swapped'); step(c2, label, ta - tc, 'totals swapped');
  }
  // each team's total is its Bakugan added up; the highest team wins, a tie at the top is a tie
  const teamTotal = {};
  for (const sd of sides) teamTotal[teamOf(s, sd.p)] = (teamTotal[teamOf(s, sd.p)] || 0) + sd.total;
  const ranked = Object.entries(teamTotal).sort((x, y) => y[1] - x[1]);
  const result = ranked.length < 2 || ranked[0][1] === ranked[1][1] ? 'tie' : +ranked[0][0];
  return { fieldIdx: b.fieldIdx, card: g.card, sides, result, teamTotal };
}

// Applies a computed battle to the state.
export function resolveBattle(s, battle) {
  const ev = [];
  const g = s.field[battle.fieldIdx];
  if (s.nv) {
    if (battle.result !== 'tie') {
      // every losing team takes the difference from the winning team's total, split between its players in the battle
      const win = battle.teamTotal[battle.result];
      for (const [tm, tot] of Object.entries(battle.teamTotal)) {
        if (+tm === battle.result) continue;
        const ps = [...new Set(battle.sides.filter(x => teamOf(s, x.p) === +tm).map(x => x.p))];
        for (const p of ps) if (s.winner === null) ev.push(...damage(s, p, Math.round((win - tot) / ps.length), 'battle'));
      }
    } else ev.push({ type: 'tie', fieldIdx: battle.fieldIdx, returnedTo: null, card: g.card });
    ev.push(...useUp(s, battle.fieldIdx, battle.result === 'tie' ? null : battle.result));
    return endTurn(s, ev).events;
  }
  if (battle.result === 'tie') {
    // Decided: nobody wins it; the Gate card goes back to whoever set it, as unused.
    s.field.splice(battle.fieldIdx, 1);
    s.players[g.owner].gateHand.push(g.card);
    ev.push({ type: 'tie', fieldIdx: battle.fieldIdx, returnedTo: g.owner, card: g.card });
  } else {
    const taker = sameTeam(s, s.turn, battle.result) && teamOf(s, s.turn) === battle.result ? s.turn
      : battle.sides.filter(x => teamOf(s, x.p) === battle.result).sort((x, y) => y.total - x.total)[0].p;
    ev.push(...capture(s, taker, battle.fieldIdx, 'battle'));
  }
  return endTurn(s, ev).events;
}

function capture(s, p, fieldIdx, how) {
  if (s.nv) return useUp(s, fieldIdx, p, how);
  const g = s.field.splice(fieldIdx, 1)[0];
  s.players[p].captured.push(g.card);
  const ev = [{ type: 'capture', p, card: g.card, how, fieldIdx }];
  const tm = teamOf(s, p), got = s.players.reduce((n, pl, q) => n + (teamOf(s, q) === tm ? pl.captured.length : 0), 0);
  if (got >= WIN_GATES) { s.winner = tm; ev.push({ type: 'win', p: tm }); }
  return ev;
}

// New Vestroia helpers
function damage(s, p, amount, how) {
  const pl = s.players[p]; pl.life = Math.max(0, pl.life - amount);
  const ev = [{ type: 'damage', p, amount, life: pl.life, how }];
  if (pl.life <= 0 && !pl.out) {
    // out of the match: their Bakugan leave the field (their Gate cards stay); last team standing wins
    pl.out = true; ev.push({ type: 'out', p });
    for (const f of s.field) f.toys = f.toys.filter(x => x.p !== p);
    const left = aliveTeams(s);
    if (left.length === 1 && s.winner === null) { s.winner = left[0]; ev.push({ type: 'win', p: s.winner, reason: 'Life Gauge' }); }
  }
  return ev;
}
function backToHand(s, p, t) {
  const pl = s.players[p];
  pl.used = pl.used.filter(x => x !== t); if (!pl.unused.includes(t)) pl.unused.push(t);
}
// a Gate card is used up: it goes to its owner's used pile and every Bakugan on it goes back to its owner's hand
function useUp(s, fieldIdx, p = null, how = 'battle') {
  const g = s.field.splice(fieldIdx, 1)[0];
  s.players[g.owner].gateUsed.push(g.card);
  for (const x of g.toys) backToHand(s, x.p, x.t);
  return [{ type: 'usedUp', p, card: g.card, how, fieldIdx }];
}

function endTurn(s, ev) {
  if (s.nv) for (const [p, pl] of s.players.entries())   // out of Gate cards: the used ones come back
    if (!pl.gateHand.length && pl.gateUsed.length) { pl.gateHand.push(...pl.gateUsed.splice(0)); ev.push({ type: 'gatesBack', p }); }
  s.pending = [];
  s.earlyVictory = null;
  if (s.winner === null && s.extraThrow === s.turn) {        // Another Throw: same player goes again
    s.extraThrow = null;
    ev.push({ type: 'extraThrow', p: s.turn });
    return { events: ev, battle: null };
  }
  if (s.winner === null) {
    // If both players are out of Gate cards and the field is empty, the match can't continue:
    // most captured wins; equal = draw.
    const stuck = s.field.length === 0 && s.players.every(pl => pl.gateHand.length === 0);
    if (stuck) {
      const per = {};
      s.players.forEach((pl, q) => { per[teamOf(s, q)] = (per[teamOf(s, q)] || 0) + pl.captured.length; });
      const r = Object.entries(per).sort((x, y) => y[1] - x[1]);
      s.winner = r.length > 1 && r[0][1] === r[1][1] ? 'draw' : +r[0][0];
      ev.push({ type: 'win', p: s.winner, reason: 'out of Gate cards' });
    } else {
      s.turn = nextPlayer(s, s.turn);
      ev.push({ type: 'turn', p: s.turn });
    }
  }
  return { events: ev, battle: null };
}
