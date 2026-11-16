// Headless match simulator for story mode: plays a whole match with the real rules engine, no 3D and no screen.
// Computer players decide like they do in battle.js (which card to set, where to throw, which Ability cards to play).
// The throw itself is a dice roll instead of physics: how likely it is to land where it was aimed depends on the
// level and the Bakugan's Magnet; a Bakugan aimed at a card with an opponent on it can knock it off (Speed vs Defense).
// Before- and after-throw Ability cards are not used here yet.
import * as R from './rules.js';
import { makeToy, GATE_COLORS, AB_COLORS } from './setup.js';

export const UPGRADE_G = 10;   // same as js/aiteams.js

// a seeded random number generator, so a season can be replayed exactly
export function makeRng(seed) {
  let a = seed >>> 0;
  const r = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  r.int = n => Math.floor(r() * n); r.pick = arr => arr[r.int(arr.length)];
  r.shuffle = arr => { const b = [...arr]; for (let i = b.length - 1; i > 0; i--) { const j = r.int(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  return r;
}

// a player for R.newMatch from a team in js/aiteams.js (AI_TEAMS[id][level] or INTERSPACE[id][level])
export function buildPlayer(cat, team, { name, owner = null, nv = false } = {}) {
  const toyBy = new Map(cat.toys.map(t => [t.id, t])), cardBy = new Map(cat.cards.map(c => [c.id, c]));
  const toys = team.toys.map(x => { const t = makeToy(toyBy.get(x.id), x.attr, owner); t.g = Math.min(600, t.g + (team.upgrades || 0) * UPGRADE_G); return t; });
  const abilities = [...AB_COLORS.map(c => cardBy.get(team.abilities[c].id)),
    ...(nv ? AB_COLORS.flatMap(c => ((team.extra || {})[c] || []).map(x => cardBy.get(x.id || x))) : [])].filter(Boolean);
  const pl = { name, toys, gates: GATE_COLORS.map(c => cardBy.get(team.gates[c].id)), abilities };
  if (nv && team.trap) pl.trap = { type: 'trap', color: 'trap', id: 'ai-' + team.trap.id, trapId: team.trap.id, name: `Trap: ${team.trap.name}`, attrs: team.trap.attrs };
  return pl;
}

const HIT = { easy: 0.62, normal: 0.76, hard: 0.87 };       // chance a throw lands where it was aimed (before Magnet)
const bonusFor = (card, attr) => ((card && card.bonus) || {})[attr] || 0;
const lv = (toy, k) => (toy.stats || {})[k] ?? 3;

// play one match. entrants: [{ name, level, player }] (player from buildPlayer). opts: { nv, teams, rng, first }
// returns { winner (team number or 'draw'), turns, stats: [{ beaten, gates, life, out }] }
export function playMatch(entrants, { nv = true, teams = null, rng = makeRng(1), first = null, maxTurns = 400 } = {}) {
  const s = R.newMatch(entrants.map(e => e.player), { nv, teams, first: first ?? rng.int(entrants.length) });
  const lvl = p => entrants[p].level || 'normal';
  const stats = entrants.map(() => ({ beaten: 0, gates: 0, dealt: 0, life: 0, out: false }));
  const same = (a, b) => R.sameTeam(s, a, b);
  const home = p => { const [sx, sz] = s.corners[p]; return [sx * 3, sz * 3]; };
  const dist = (p, cell) => Math.hypot(cell[0] + 0.5 - home(p)[0], cell[1] + 0.5 - home(p)[1]);

  const gateIdx = p => {
    const pl = s.players[p], hand = pl.gateHand; if (!hand.length) return 0;
    if (lvl(p) === 'easy') return rng.int(hand.length);
    const attrs = pl.unused.map(t => pl.toys[t].attr); let best = 0, bv = -1;
    hand.forEach((c, i) => { const v = attrs.reduce((n, a) => n + bonusFor(c, a), 0) + rng(); if (v > bv) { bv = v; best = i; } });
    return best;
  };
  const plan = p => {
    const pl = s.players[p], options = [];
    for (const t of pl.unused) for (let k = 0; k < s.field.length; k++) {
      const f = s.field[k], toy = pl.toys[t];
      const theirs = f.toys.filter(x => !same(x.p, p)), mine = f.toys.filter(x => same(x.p, p));
      const gOf = x => { const o = s.players[x.p].toys[x.t]; return o.g + (lvl(p) === 'hard' ? bonusFor(f.card, o.attr) : 0); };
      const myG = toy.g + (lvl(p) === 'hard' ? bonusFor(f.card, toy.attr) : 0) + mine.reduce((n, x) => n + gOf(x), 0);
      let v;
      if (theirs.length) {
        const oG = Math.max(...[...new Set(theirs.map(x => R.teamOf(s, x.p)))].map(tm => theirs.filter(x => R.teamOf(s, x.p) === tm).reduce((n, x) => n + gOf(x), 0)));
        v = myG > oG ? 100 + (myG - oG) / 5 : myG === oG ? 10 : -60 + (myG - oG) / 5;
      } else if (mine.length) v = lvl(p) === 'hard' ? 120 : 70;
      else v = 30 + bonusFor(f.card, toy.attr) / 10;
      v -= dist(p, f.cell) * (lvl(p) === 'hard' ? 2 : 4);
      v += rng() * (lvl(p) === 'normal' ? 40 : 10);
      options.push({ t, k, v });
    }
    if (!options.length) return null;
    if (lvl(p) === 'easy') return rng.pick(options);
    return options.sort((a, b) => b.v - a.v)[0];
  };
  // the team's battle gap (my team's total minus the best other team's)
  const gap = (c, p) => { const mine = c.teamTotal[R.teamOf(s, p)] || 0; const o = Object.entries(c.teamTotal).filter(([tm]) => +tm !== R.teamOf(s, p)).map(([, v]) => v); return mine - (o.length ? Math.max(...o) : 0); };
  const ability = (p, bt, opts) => {
    const hand = s.players[p].abilityHand, now = gap(R.computeBattle(s, bt), p);
    if (now > 0 && lvl(p) !== 'hard') return -1;
    if (lvl(p) === 'easy') return now <= 0 && rng() < 0.35 ? rng.pick(opts) : -1;
    const best = opts.map(i => ({ i, g: gap(R.computeBattle(s, { ...bt, plays: [...bt.plays, { p, card: hand[i] }] }), p) })).sort((a, b) => b.g - a.g)[0];
    if (!best || best.g <= now) return -1;
    if (lvl(p) === 'normal') return rng() < 0.75 ? best.i : -1;
    return now > 120 ? -1 : best.i;
  };
  // credit Gate cards won and damage dealt. In a battle the winning team's players share the credit; outside a battle, the thrower gets it.
  const count = (ev, winners = null) => { for (const e of ev) {
    const who = winners || [s.turn];
    if (e.type === 'capture' || (e.type === 'usedUp' && e.p !== null && e.p !== undefined)) for (const q of who) stats[q].gates += 1 / who.length;
    if (e.type === 'damage') for (const q of (winners || [s.turn]).filter(q => !same(q, e.p))) stats[q].dealt += e.amount / who.length;
  } };
  const battle = fieldIdx => {
    const bt = R.startBattle(s, fieldIdx);
    while (!R.abilityDone(bt)) {
      const p = bt.next, opts = R.abilityOptions(s, bt);
      if (!opts.length) { R.passAbility(s, bt); continue; }
      const i = ability(p, bt, opts);
      if (i < 0) R.passAbility(s, bt); else R.playAbility(s, bt, i);
    }
    const b = R.computeBattle(s, bt);
    let winners = null;
    if (b.result !== 'tie') {
      const beaten = b.sides.filter(x => R.teamOf(s, x.p) !== b.result).length; winners = [...new Set(b.sides.filter(x => R.teamOf(s, x.p) === b.result).map(x => x.p))];
      for (const p of winners) stats[p].beaten += beaten / winners.length;
    }
    count(R.resolveBattle(s, b), winners || []);
  };

  let turns = 0;
  while (s.winner === null && turns < maxTurns) {
    turns++;
    R.startTurn(s, (p) => gateIdx(p));
    const p = s.turn;
    // set a Gate card next to the field, nearest my corner
    const cells = R.placeCells(s, p);
    if (cells.length && s.players[p].gateHand.length) {
      const cell = lvl(p) === 'easy' ? rng.pick(cells) : [...cells].sort((a, b) => dist(p, a) - dist(p, b))[0];
      R.placeGate(s, gateIdx(p), cell);
    }
    if (!R.canThrow(s, p)) { // nothing to throw: pass the turn by a miss with any Bakugan (rules recycle them)
      const t = s.players[p].unused[0]; if (t === undefined) break;
    }
    const pl = plan(p); if (!pl) break;
    const toy = s.players[p].toys[pl.t];
    // the throw: lands as aimed, on a touching card, or misses
    const hit = Math.min(0.97, HIT[lvl(p)] + 0.03 * (lv(toy, 'magnet') - 3) - 0.02 * dist(p, s.field[pl.k].cell));
    let k = pl.k;
    if (rng() > hit) {
      const near = s.field.map((f, i) => i).filter(i => i !== pl.k && Math.abs(s.field[i].cell[0] - s.field[pl.k].cell[0]) + Math.abs(s.field[i].cell[1] - s.field[pl.k].cell[1]) === 1);
      k = near.length && rng() < 0.5 ? rng.pick(near) : null;
    }
    // knockouts: a hard throw onto an opponent can knock it off (Speed against Defense)
    if (k !== null) {
      const f = s.field[k], foe = f.toys.find(x => !same(x.p, p));
      if (foe) {
        const o = s.players[foe.p].toys[foe.t], chance = Math.max(0.02, Math.min(0.25, 0.06 + 0.04 * (lv(toy, 'speed') - lv(o, 'defense'))));
        if (rng() < chance) { count(R.knockOff(s, [{ p: foe.p, t: foe.t, card: f.card }], pl.t)); if (s.winner !== null) break; k = s.field.indexOf(f); if (k < 0) k = null; }
      }
    }
    const r = R.land(s, pl.t, k, () => null);
    count(r.events);
    if (r.battle && s.winner === null) battle(r.battle.fieldIdx);
  }
  s.players.forEach((pl, p) => { stats[p].life = pl.life; stats[p].out = !!pl.out; stats[p].beaten = Math.round(stats[p].beaten); stats[p].gates = Math.round(stats[p].gates); stats[p].dealt = Math.round(stats[p].dealt); });
  return { winner: s.winner === null ? 'draw' : s.winner, turns, stats, teams: s.teams };
}
