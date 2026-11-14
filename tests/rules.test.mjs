// Run: node tests/rules.test.mjs
import assert from 'node:assert/strict';
import { newMatch, startTurn, land, computeBattle, resolveBattle } from '../js/rules.js';

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

console.log(`\n${n} tests passed`);
