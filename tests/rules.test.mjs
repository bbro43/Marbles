// Run: node tests/rules.test.mjs
import assert from 'node:assert/strict';
import { newMatch, startTurn, land, computeBattle, resolveBattle, knockOff, placeCells, placeGate, moveOptions, openingCell,
  startBattle, abilityOptions, playAbility, passAbility, abilityDone, isCoded } from '../js/rules.js';
import { EFFECTS } from '../js/abilities.js';
import { fieldCardOptions, playFieldCard } from '../js/rules.js';

const gate = (name, bonus) => ({ name, bonus });
const toy = (name, attr, g) => ({ name, attr, g });
let n = 0; const test = (name, fn) => { fn(); n++; console.log('ok -', name); };

function match() {
  return newMatch([
    { name: 'Dan', toys: [toy('Fear Ripper', 'pyrus', 500), toy('Serpenoid', 'haos', 550), toy('Saurus', 'pyrus', 400)],
      gates: [gate('High Energy', { pyrus: 0, aquos: 0, subterra: 0, haos: 110, darkus: 0, ventus: 120 }), gate('G2', {}), gate('G3', {})] },
    { name: 'Runo', toys: [toy('Fear Ripper', 'ventus', 500), toy('Tigrerra', 'haos', 450), toy('Juggernoid', 'subterra', 400)],
      gates: [gate('R1', {}), gate('R2', {}), gate('R3', {})] },
  ]);
}

test('rulebook example: Dan wins 660 vs 620 on High Energy', () => {
  const s = match();
  startTurn(s);                                  // both set Gate cards: field[0]=Dan's High Energy, field[1]=Runo's R1
  assert.equal(s.field.length, 2);
  // Dan rolls Fear Ripper onto Runo's gate (field 1)
  let r = land(s, 0, 1); assert.equal(r.battle, null); assert.equal(s.turn, 1);
  startTurn(s);
  // Runo rolls Ventus Fear Ripper onto Dan's gate (field 0, High Energy)
  r = land(s, 0, 0); assert.equal(s.turn, 0);
  startTurn(s);
  // Dan rolls Haos Serpenoid onto Runo's gate where his own Fear Ripper is -> moves to the other gate -> battle
  // (the two opening cards sit diagonally, so for this example put Dan's card beside Runo's)
  s.field[0].cell = [0, -1];
  r = land(s, 1, 1);
  assert.equal(r.events.find(e => e.type === 'moved').fieldIdx, 0);
  assert.deepEqual(r.battle, { fieldIdx: 0 });
  const b = computeBattle(s, 0);
  assert.equal(b.sides[0].total, 660); assert.equal(b.sides[1].total, 620); assert.equal(b.result, 0);
  resolveBattle(s, b);
  assert.equal(s.players[0].captured[0].name, 'High Energy');
  assert.equal(s.field.length, 1);
});

test('miss: toy stays unused, turn passes', () => {
  const s = match(); startTurn(s);
  const r = land(s, 0, null);
  assert.equal(r.events[0].type, 'miss'); assert.deepEqual(s.players[0].unused, [0, 1, 2]); assert.equal(s.turn, 1);
});

test('own toy on gate and none elsewhere -> uncontested capture', () => {
  const s = match(); startTurn(s);
  land(s, 0, 0); startTurn(s); land(s, 0, null); startTurn(s);   // Dan on gate 0, Runo misses
  land(s, 1, 1); startTurn(s); land(s, 1, null); startTurn(s);    // Dan on gate 1, Runo misses
  const r = land(s, 2, 0);                                         // Dan onto own gate 0, already has toy on gate 1
  assert.ok(r.events.some(e => e.type === 'capture' && e.how === 'uncontested'));
  assert.equal(s.players[0].captured.length, 1);
});

test('tie: nobody wins, Gate card back to whoever set it', () => {
  const s = newMatch([
    { name: 'A', toys: [toy('a', 'pyrus', 300)], gates: [gate('Ga', { pyrus: 100, haos: 100 })] },
    { name: 'B', toys: [toy('b', 'haos', 300)], gates: [gate('Gb', {})] },
  ]);
  startTurn(s);
  land(s, 0, 0); startTurn(s);           // A on own gate Ga
  const r = land(s, 0, 0);               // B lands on Ga -> battle, 400 vs 400
  const b = computeBattle(s, r.battle.fieldIdx);
  assert.equal(b.result, 'tie');
  resolveBattle(s, b);
  assert.equal(s.players[0].captured.length + s.players[1].captured.length, 0);
  assert.equal(s.players[0].gateHand.at(-1).name, 'Ga');
});

test('3 Gate cards wins', () => {
  const s = match();
  s.players[0].captured = [gate('x', {}), gate('y', {})];
  startTurn(s); land(s, 0, 0); startTurn(s); land(s, 0, null); startTurn(s); land(s, 1, 1); startTurn(s); land(s, 1, null); startTurn(s);
  land(s, 2, 0);
  assert.equal(s.winner, 0);
});

test('no unused toys -> used come back (except ones standing on a gate)', () => {
  const s = match(); startTurn(s);
  s.players[0].unused = []; s.players[0].used = [0, 1, 2]; s.field[0].toys.push({ p: 0, t: 2 });
  const ev = startTurn(s);
  assert.ok(ev.some(e => e.type === 'recycle'));
  assert.deepEqual(s.players[0].unused.sort(), [0, 1]); assert.deepEqual(s.players[0].used, [2]);
});

test('clear toy takes opponent attribute', () => {
  const s = newMatch([
    { name: 'A', toys: [toy('a', 'clear', 300)], gates: [gate('G', { darkus: 50 })] },
    { name: 'B', toys: [toy('b', 'darkus', 300)], gates: [gate('H', {})] },
  ]);
  startTurn(s); land(s, 0, 0); startTurn(s); const r = land(s, 0, 0);
  const b = computeBattle(s, r.battle.fieldIdx);
  assert.equal(b.sides[1].attr, 'darkus'); assert.equal(b.result, 'tie');
});

test('knockout: opponent toy knocked off -> thrower wins the card regardless of G-Power', () => {
  const s = newMatch([
    { name: 'A', toys: [toy('weak', 'pyrus', 250), toy('weak2', 'pyrus', 250)], gates: [gate('Ga', {})] },
    { name: 'B', toys: [toy('strong', 'haos', 600)], gates: [gate('Gb', {})] },
  ]);
  startTurn(s); land(s, 0, null); startTurn(s);       // A misses
  land(s, 0, 0); startTurn(s);                        // B stands on A's card Ga (field 0)
  const card = s.field[0].card;
  const ev = knockOff(s, [{ p: 1, t: 0, card }]);
  assert.ok(ev.some(e => e.type === 'capture' && e.how === 'knockout' && e.p === 0));
  assert.equal(s.players[0].captured[0].name, 'Ga');
  const r = land(s, 0, null);                          // A's ball then rolls off the mat area -> miss
  assert.equal(r.events[0].type, 'miss');
});

test('knocking your own toy off just removes it from the card', () => {
  const s = match(); startTurn(s);
  land(s, 0, 0); startTurn(s); land(s, 0, null); startTurn(s);
  const card = s.field[0].card;
  const ev = knockOff(s, [{ p: 0, t: 0, card }]);
  assert.ok(!ev.some(e => e.type === 'capture'));
  assert.equal(s.field[0].toys.length, 0);
});

const has = (cells, c) => cells.some(x => x[0] === c[0] && x[1] === c[1]);

test('opening: each card goes in the center-rectangle spot farthest from its thrower', () => {
  const s = match(); const ev = startTurn(s);
  assert.deepEqual(s.field.map(f => f.cell), [[-1, -1], [0, 0]]);   // P1 throws from +x/+z, P2 from -x/-z
  assert.ok(ev.every(e => e.opening));
  assert.deepEqual(openingCell({ corners: [[1, -1]] }, 0), [-1, 0]); // a 3rd/4th corner gets its own far spot
  assert.deepEqual(placeCells(s), []);                               // opening counts as this turn's card
});

test('place one Gate card per turn, touching a side of one already on the field', () => {
  const s = match(); startTurn(s); land(s, 0, null);   // P1 misses
  startTurn(s);                                        // P2's turn: may place
  const cells = placeCells(s);
  assert.ok(has(cells, [0, -1]) && has(cells, [-1, 0]) && has(cells, [1, 0]));
  assert.ok(!has(cells, [1, 1]) && !has(cells, [0, 0]));            // diagonal-only and taken spots aren't allowed
  placeGate(s, 0, [1, 0]);
  assert.equal(s.field.length, 3); assert.equal(s.players[1].gateHand.length, 1);
  assert.deepEqual(placeCells(s), []);
  assert.throws(() => placeGate(s, 0, [0, -1]));
});

test('two of my toys on a card: take it, or move to a touching card', () => {
  const s = match(); startTurn(s);                       // cards at [-1,-1] (P1's) and [0,0] (P2's) — diagonal, not touching
  land(s, 0, 1); startTurn(s); land(s, 0, null); startTurn(s);   // P1 on card 1 [0,0]; P2 misses
  assert.deepEqual(moveOptions(s, 1), []);                // nothing touching -> only "take"
  let r = land(s, 1, 1);
  assert.ok(r.events.some(e => e.type === 'capture' && e.how === 'uncontested'));
  // Now with a touching card
  const s2 = match(); startTurn(s2);
  land(s2, 0, 1); startTurn(s2);                          // P1 on [0,0]
  placeGate(s2, 0, [0, -1]); land(s2, 0, null); startTurn(s2);   // P2 sets a card at [0,-1], touching [0,0]
  assert.deepEqual(moveOptions(s2, 1), [2]);
  r = land(s2, 1, 1, () => null);                         // choose A: take it
  assert.ok(r.events.some(e => e.type === 'capture' && e.how === 'uncontested'));
  const s3 = match(); startTurn(s3);
  land(s3, 0, 1); startTurn(s3); placeGate(s3, 0, [0, -1]); land(s3, 0, null); startTurn(s3);
  r = land(s3, 1, 1, opts => opts[0]);                    // choose B: move to the touching card
  assert.equal(r.events.find(e => e.type === 'moved').fieldIdx, 2);
});

test('field empty again, nobody has won: cards are set like the first turn', () => {
  const s = newMatch([
    { name: 'A', toys: [toy('a', 'pyrus', 500), toy('a2', 'pyrus', 500)], gates: [gate('A1', {}), gate('A2', {})] },
    { name: 'B', toys: [toy('b', 'haos', 300)], gates: [gate('B1', {}), gate('B2', {})] },
  ]);
  startTurn(s); s.field[0].cell = [0, -1];             // put A's card beside B's so A can move between them
  land(s, 0, 1); startTurn(s);                          // A on B's card
  land(s, 0, 0); startTurn(s);                          // B on A's card
  let r = land(s, 1, 1);                                // A onto own toy -> moves to card 0 -> battle 500 vs 300
  resolveBattle(s, computeBattle(s, r.battle.fieldIdx));
  assert.equal(s.field.length, 1);
  // A captured card 0; card 1 still has A's first toy. B knocks it off and takes it.
  startTurn(s); knockOff(s, [{ p: 0, t: 0, card: s.field[0].card }]); land(s, 0, null);
  assert.equal(s.field.length, 0);
  const ev = startTurn(s);
  assert.equal(ev.filter(e => e.type === 'gateSet').length, 2);
  assert.deepEqual(s.field.map(f => f.cell).sort(), [[-1, -1], [0, 0]]);
});

const ab = (name, bonus = {}, color = 'blue') => ({ name, type: 'ability', color, bonus });
const gcard = (name, color, bonus) => ({ name, type: 'gate', color, bonus });
// A on its first toy (pyrus 300) battles B (haos 350) on A's card
function battleSetup(aAbilities, bAbilities, gateCard = gcard('Ga', 'silver', { pyrus: 100, haos: 50 }), aToys, bToys) {
  const s = newMatch([
    { name: 'A', toys: aToys || [toy('a', 'pyrus', 300), toy('a2', 'haos', 300)], gates: [gateCard], abilities: aAbilities },
    { name: 'B', toys: bToys || [toy('b', 'haos', 350)], gates: [gate('Gb', {})], abilities: bAbilities },
  ]);
  startTurn(s); land(s, 0, null); startTurn(s);
  land(s, 0, 0); startTurn(s);
  const r = land(s, 0, 0);
  return { s, b: startBattle(s, r.battle.fieldIdx) };
}

test('ability cards: take turns, active player first, both pass to finish', () => {
  const { s, b } = battleSetup([ab('Blaze', { pyrus: 80, aquos: 50, ventus: 50 })], [ab('Flash', { subterra: 50, haos: 110 })]);
  assert.equal(b.next, 0);
  playAbility(s, b, 0);
  assert.deepEqual(abilityOptions(s, b), [0]);
  playAbility(s, b, 0);
  passAbility(s, b); assert.ok(!abilityDone(b)); passAbility(s, b); assert.ok(abilityDone(b));
  const c = computeBattle(s, b);
  assert.equal(c.sides[0].total, 300 + 80 + 100);
  assert.equal(c.sides[1].total, 350 + 110 + 50);
});

test('Gold card: the pictured toy gets the Gate bonus twice', () => {
  const { s, b } = battleSetup([], [], gcard('Serpenoid', 'gold', { pyrus: 180, haos: 140 }),
    [toy('Serpenoid', 'pyrus', 300)], [toy('b', 'haos', 350)]);
  const c = computeBattle(s, b);
  assert.equal(c.sides[0].total, 300 + 360); assert.equal(c.sides[1].total, 350 + 140);
});

test('Copper cards: Stand Off blocks Ability cards; Molten Rock doubles the lowest printed', () => {
  let { s, b } = battleSetup([ab('Blaze', { pyrus: 80 })], [], gcard('Stand Off', 'copper', { pyrus: 140, haos: 80 }));
  assert.deepEqual(abilityOptions(s, b), []);
  ({ s, b } = battleSetup([], [], gcard('Molten Rock', 'copper', { pyrus: 70, haos: 130 })));
  const c = computeBattle(s, b);
  assert.equal(c.sides[0].total, 600 + 70); assert.equal(c.sides[1].total, 350 + 130);
});

test('Red swap card trades totals; No Trading stops it', () => {
  let { s, b } = battleSetup([], [ab('Haos Swap', {}, 'red')]);
  passAbility(s, b); playAbility(s, b, 0);
  let c = computeBattle(s, b);
  assert.equal(c.sides[0].total, 350 + 50); assert.equal(c.sides[1].total, 300 + 100);
  ({ s, b } = battleSetup([ab('No Trading', {}, 'green')], [ab('Haos Swap', {}, 'red')]));
  playAbility(s, b, 0);
  assert.deepEqual(abilityOptions(s, b), []);
});

test('Copper regain: Stand Your Ground gives used Ability cards back', () => {
  const s = newMatch([
    { name: 'A', toys: [toy('a', 'pyrus', 300), toy('a2', 'pyrus', 300)], gates: [gcard('Stand Your Ground', 'copper', {}), gate('G2', {})], abilities: [ab('Blaze', { pyrus: 80 })] },
    { name: 'B', toys: [toy('b', 'haos', 350)], gates: [gate('Gb', {})] },
  ]);
  startTurn(s); s.players[0].abilityUsed.push(s.players[0].abilityHand.pop());
  land(s, 0, null); startTurn(s); land(s, 0, 0); startTurn(s);
  const r = land(s, 0, 0); const b = startBattle(s, r.battle.fieldIdx);
  assert.equal(b.events[0].type, 'regain'); assert.equal(s.players[0].abilityHand.length, 1);
});

test('mini-game cards: Time Breaker, Double Input, Rewind, Level Field, No Backsies', () => {
  let { s, b } = battleSetup([ab('Pyrus Time Breaker', {}, 'red')], [ab('Flash', { haos: 110 })]);
  playAbility(s, b, 0); playAbility(s, b, 0);
  let c = computeBattle(s, b);
  assert.equal(c.sides[1].total, 350 + 50);                      // Flash cancelled
  ({ s, b } = battleSetup([ab('Pyrus Double Input', {}, 'red'), ab('Blaze', { pyrus: 80 })], []));
  playAbility(s, b, 0); passAbility(s, b); playAbility(s, b, 0);
  c = computeBattle(s, b);
  assert.equal(c.sides[0].total, 300 + 160 + 200);
  ({ s, b } = battleSetup([ab('Blaze', { pyrus: 80 })], [ab('Rewind', {}, 'red')]));
  playAbility(s, b, 0); playAbility(s, b, 0);
  c = computeBattle(s, b);
  assert.equal(c.sides[0].total, 300 + 100); assert.equal(c.sides[1].total, 350 + 50 + 50);
  ({ s, b } = battleSetup([ab('Level Field', {}, 'red')], []));
  playAbility(s, b, 0);
  c = computeBattle(s, b);
  assert.equal(c.sides[0].total, 100); assert.equal(c.sides[1].total, 50);
  ({ s, b } = battleSetup([ab('No Backsies', {}, 'green'), ab('Blaze', { pyrus: 80 })], [ab('Flash', { haos: 110 })]));
  playAbility(s, b, 0);
  assert.deepEqual(abilityOptions(s, b), []); passAbility(s, b);
  assert.deepEqual(abilityOptions(s, b), []);
});

test('cards outside battle: Another Throw, Early Victory, Sleight of Hand, Surprise Attack, Invulnerable', () => {
  const mk = abilities => newMatch([
    { name: 'A', toys: [toy('a', 'pyrus', 300), toy('a2', 'pyrus', 300), toy('a3', 'pyrus', 300)], gates: [gate('Ga', {}), gate('Ga2', { pyrus: 50 })], abilities },
    { name: 'B', toys: [toy('b', 'haos', 350), toy('b2', 'haos', 350)], gates: [gate('Gb', {})] },
  ]);
  // Another Throw: A goes again after the throw
  let s = mk([ab('Another Throw', {}, 'red')]); startTurn(s);
  assert.deepEqual(fieldCardOptions(s, 'pre'), [0]); playFieldCard(s, 0, 'pre');
  let r = land(s, 0, null); assert.equal(s.turn, 0); assert.ok(r.events.some(e => e.type === 'extraThrow'));
  land(s, 0, null); assert.equal(s.turn, 1);
  // Early Victory: standing on an empty card wins it
  s = mk([ab('Early Victory', {}, 'green')]); startTurn(s); playFieldCard(s, 0, 'pre');
  r = land(s, 0, 1); assert.ok(r.events.some(e => e.type === 'capture' && e.how === 'early victory'));
  // Sleight of Hand: on B's card, swap in one of A's Gate cards
  s = mk([ab('Sleight of Hand', {}, 'red')]); startTurn(s);
  const landing = { t: 0, fieldIdx: 1 };
  assert.deepEqual(fieldCardOptions(s, 'post', landing), [0]);
  playFieldCard(s, 0, 'post', landing, { gateIdx: 0, fieldIdx: 1 });
  assert.equal(s.field[1].owner, 0); assert.equal(s.players[1].gateHand.length, 1);
  // Surprise Attack + Invulnerable
  s = mk([ab('Surprise Attack', {}, 'green'), ab('Invulnerable', {}, 'green')]); startTurn(s);
  land(s, 0, 0); startTurn(s); land(s, 0, 1); startTurn(s);          // A on card 0, B on card 1
  r = playFieldCard(s, 0, 'pre', null, { mine: 0, theirs: { t: 0, fieldIdx: 1 } });
  assert.equal(r.battle.fieldIdx, 0); assert.equal(s.field[0].toys.length, 2);
  playFieldCard(s, 0, 'pre', null, { t: 0 });
  assert.deepEqual(knockOff(s, [{ p: 0, t: 0, card: s.field[0].card }]), []);
});

test('every coded card has a known kind', () => {
  for (const [name, e] of Object.entries(EFFECTS)) assert.ok(['battle', 'throw'].includes(e.when), name);
  assert.ok(isCoded({ name: 'Blaze', color: 'blue', type: 'ability' })); assert.ok(isCoded({ name: 'Another Throw', color: 'red', type: 'ability' })); assert.ok(!isCoded({ name: 'Nope', color: 'red', type: 'ability' }));
});

console.log(`\n${n} tests passed`);
