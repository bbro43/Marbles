// Core rules engine. Pure logic: no rendering, no randomness inside the rules.
// The battle screen calls these functions and draws whatever they return.
//
// Words used here:
//   toy      = a ball. { id, name, attr, g }
//   unused   = toys you can still throw this round
//   used     = toys that already landed / battled
//   gateHand = your Gate cards not yet set
//   field    = Gate cards set on the mat: { card, owner, toys: [{p, t}] }
//   captured = Gate cards you've won (3 wins the match)

export const ATTRS = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];
export const WIN_GATES = 3;

export function newMatch(players, { first = 0 } = {}) {
  return {
    turn: first,
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

// Start of a turn. Returns events describing what happened.
// pickGate(p, hand) chooses which Gate card a player sets (index into hand).
export function startTurn(s, pickGate = () => 0) {
  const ev = [];
  if (s.field.length === 0) {
    for (const p of [s.turn, other(s.turn)]) {
      const hand = s.players[p].gateHand;
      if (!hand.length) continue;
      const card = hand.splice(pickGate(p, hand), 1)[0];
      s.field.push({ card, owner: p, toys: [] });
      ev.push({ type: 'gateSet', p, card, fieldIdx: s.field.length - 1 });
    }
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

export function canThrow(s, p = s.turn) {
  return s.winner === null && s.players[p].unused.length > 0 && s.field.length > 0;
}

// A throw landed. fieldIdx = index of the Gate card it opened on, or null for a miss.
// Returns { events, battle } where battle (if any) must be resolved with resolveBattle().
export function land(s, t, fieldIdx) {
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

  const at = (gate) => ({ owner: gate.owner, slot: gate.toys.length - 1 });   // where on the mat (for drawing)
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
  const otherIdx = s.field.findIndex((f, k) => k !== fieldIdx);
  const otherGate = s.field[otherIdx];
  if (!otherGate || otherGate.toys.some(x => x.p === p)) {
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
