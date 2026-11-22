// Race playstyles for the computer (Billy, Nov 22). Used by the battle screen (js/battle.js) and the simulator (js/sim.js),
// on top of the Easy / Normal / Hard level (Easy brawlers stay loose whatever their race):
//   Gundalian  aggressive  uses everything it has to win fast: plays its best card whenever it adds anything, even when already
//                          winning (in New Vestroia the margin is the damage), throws into battles, always tries before/after-throw cards.
//   Neathian   defensive   saves its cards and Support for as long as it can: only plays when it's behind in the match or about to
//                          lose it, and then the cheapest card that turns the battle; avoids battles it isn't clearly winning.
//   Vestal     tactical    the smartest: lets small battles go to keep its cards, spends them where they swing the match (a big
//                          loss, a finish, a battle the match hangs on), with the cheapest card that does it; picks its battles.
//   Human      balanced    a mix of the three (the original computer play).
import { INTERSPACE } from './aiteams.js';
import './newbrawlers.js';   // the Season 3 and 4 brawlers join INTERSPACE
import { WIN_GATES } from './rules.js';

// the show's characters by race (everyone else in AI_TEAMS is Human); Interspace brawlers carry their own species
const VESTALS = new Set(['ace', 'mira', 'baron', 'spectra', 'mylene', 'volt', 'gus', 'shadow', 'lync']);
export const STYLE_OF_RACE = { gundalian: 'aggressive', neathian: 'defensive', vestal: 'tactical', human: 'balanced' };
export function raceOf(id) {
  if (!id) return 'human';
  const sp = (INTERSPACE[id] || {}).species;
  if (sp) return sp.toLowerCase();
  return VESTALS.has(id) ? 'vestal' : 'human';
}
export const styleOf = id => STYLE_OF_RACE[raceOf(id)] || 'balanced';

// where the match stands for player p (s: the rules state, teamOf(s, p)):
//   down       behind (New Vestroia: 50+ Life below the strongest opponent; Classic: fewer Gate cards won)
//   nearLoss   one more lost battle could end it (Life 150 or less; an opponent one card from winning)
//   finishing  an opponent is close to out (Life 150 or less; I'm one card from winning)
export function standing(s, p, teamOf) {
  const me = teamOf(s, p), foes = s.players.map((pl, q) => q).filter(q => teamOf(s, q) !== me && !s.players[q].out);
  if (s.nv) {
    const life = s.players[p].life, oLife = foes.map(q => s.players[q].life), top = Math.max(0, ...oLife);
    return { down: life + 50 < top, behind: life < top, low: life <= 250, nearLoss: life <= 150, finishing: oLife.some(l => l <= 150), life };
  }
  const got = q => s.players.filter((pl, r) => teamOf(s, r) === teamOf(s, q)).reduce((n, pl) => n + pl.captured.length, 0);
  const mine = got(p), theirs = Math.max(0, ...foes.map(got));
  return { down: mine < theirs, behind: mine < theirs, low: theirs >= WIN_GATES - 1, nearLoss: theirs >= WIN_GATES - 1, finishing: mine >= WIN_GATES - 1 };
}

// A battle card: now = my side's margin before playing anything (> 0 winning), scored = [{ i, g }] the margin after each
// playable card (best first). Returns the hand index to play, or -1 to pass. rnd() in [0, 1).
export function chooseAbility(style, lvl, now, scored, st, rnd) {
  const best = scored[0];
  if (!best || best.g <= now) return -1;                                   // nothing helps
  const wins = scored.filter(x => x.g > 0).sort((a, b) => a.g - b.g), cheapest = wins[0];   // the smallest card that still wins
  if (style === 'aggressive') {
    if (lvl === 'normal' && rnd() > 0.9) return -1;
    return best.i;                                                          // win, and win big
  }
  if (style === 'defensive') {
    if (now > 0) return -1;                                                 // already winning: keep everything
    if (now > -50 && !(st.behind || st.low)) return -1;                     // a close loss while level or ahead in the match: save the card
    if (cheapest) return cheapest.i;                                        // behind: the cheapest card that turns it
    return st.low ? best.i : -1;                                            // can't turn it: only spend to soften a loss that could end it
  }
  if (style === 'tactical') {
    const swing = best.g - now, big = st.nearLoss || st.finishing || now < -60 || swing >= 100;
    if (now > 0) return st.finishing || swing >= 100 ? best.i : -1;         // winning: cash in a big swing, or finish an opponent off
    if (!big) return -1;                                                    // a small loss: let it go, keep the card
    if (cheapest) return swing >= 100 ? best.i : cheapest.i;                // turn it (and make it count when the swing is big)
    return st.nearLoss || now < -150 ? best.i : -1;                         // can't turn it: soften a heavy or match-ending loss
  }
  // balanced: the original play
  if (now > 0 && lvl !== 'hard') return -1;
  if (lvl === 'normal') return rnd() < 0.75 ? best.i : -1;
  return now > 120 ? -1 : best.i;
}

// Choosing a throw: added to the option's value. battle: an opponent is there; diff: my G minus theirs there (with Gate bonus on Hard)
export function planBias(style, { battle, diff, empty }, st) {
  if (style === 'aggressive') return battle ? 25 + (diff < 0 ? 10 : 0) : empty ? -5 : 0;    // goes looking for battles, even close ones
  if (style === 'defensive') return battle ? (diff > 60 ? 0 : -45) : empty ? 20 : 0;         // only battles it's clearly winning
  if (style === 'tactical') {
    if (!battle) return 0;
    if (diff <= 0) return st && st.finishing ? 0 : -35;                     // no losing battles unless it can still finish the match
    return Math.min(60, diff / 4);                                          // the bigger the edge, the better
  }
  return 0;
}
// How likely it looks for a before/after-throw card, and how many it may use before a throw
export function fieldChance(style, lvl, st, base) {
  if (style === 'aggressive') return 1;
  if (style === 'defensive') return st && (st.down || st.nearLoss) ? base : base * 0.25;
  if (style === 'tactical') return st && (st.finishing || st.nearLoss || st.down) ? 1 : base * 0.6;
  return base;
}
export const preCardsMax = (style, lvl) => style === 'aggressive' ? 2 : lvl === 'hard' ? 2 : 1;
