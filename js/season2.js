// Season 2 setup (the first season you play): who's in which league, the calendar, and how promotion works.
// One year and three months after New Vestroia. Interspace opens to the public: the 23 newcomers and you join in League 4.
import { makeRng } from './sim.js';
import { STORY_START, STARTERS } from './aiteams.js';
import { ATTRS6 } from './season.js';

export const VEXOS = ['spectra', 'gus', 'mylene', 'volt', 'shadow', 'lync'];
export const NEWCOMERS = ['richard', 'ryan', 'george', 'brandon', 'gary', 'anthony', 'nico', 'xander', 'rocco', 'otto',
  'maisie', 'ella', 'sophie', 'freya', 'zoya', 'ellie', 'sarah', 'heather', 'margaret', 'melissa', 'karen', 'brenda', 'amanda'];
export const NEWCOMER_UP = { easy: 0, normal: 2, hard: 5 };
export const LEAGUE_NAMES = ['League 1', 'League 2', 'League 3', 'League 4 · Division A', 'League 4 · Division B', 'League 4 · Division C'];

// The calendar (week 0-12). League rounds (7, one a week) fill the other days.
// arena: null = neutral Arena, an attribute = that field, 'random' = a random field each match.
// prize.league = which league the prize Bakugan is pitched at (G range in season.js PRIZE_BAND).
export function season2Events(rng) {
  const fieldAttr = rng.pick(ATTRS6);
  return [
    { week: 1, tier: 'Open', format: 'knockout', size: 16, rules: 'nv', name: 'Open I' },
    { week: 3, tier: 'Open', format: 'royale', size: 16, rules: 'classic', arena: 'random', name: 'Open II' },
    { week: 5, tier: 'Major', format: 'groups', size: 16, rules: 'nv', name: 'Major', invite: true },
    { week: 6, tier: 'Royal', format: 'knockout', size: 16, rules: 'nv', arena: 'random', name: 'Royal Challenge', entry: 'royal', hosts: VEXOS,
      prize: { league: 2 } },
    { week: 7, tier: 'Open', format: 'tag', size: 16, rules: 'nv', name: 'Open III' },
    { week: 8, tier: 'Open', format: 'knockout', size: 16, rules: 'nv', arena: fieldAttr, name: `${fieldAttr[0].toUpperCase() + fieldAttr.slice(1)} Field Open`,
      prize: { league: 4, attr: fieldAttr } },
    { week: 9, tier: 'Masters', format: 'knockout', size: 16, rules: 'classic', arena: 'random', name: 'Masters', invite: true, prize: { league: 1 } },
    { week: 12, tier: 'Finale', format: 'groups', size: 16, rules: 'nv', name: 'Season Finale', invite: true },
  ];
}

// Season 2 promotion (no relegation): top 4 of League 2, top 8 of League 3 and top 4 of each League 4 division go up -> four leagues of 12.
export function promoteSeason2([l1, l2, l3, a, b, c]) {
  const up4 = [...a.slice(0, 4), ...b.slice(0, 4), ...c.slice(0, 4)];
  return [[...l1, ...l2.slice(0, 4)], [...l2.slice(4), ...l3.slice(0, 8)], [...l3.slice(8), ...up4], [...a.slice(4), ...b.slice(4), ...c.slice(4)]];
}

// Build the Season 2 roster and leagues from the locked Season 1 result.
// you: { name, attr } — your starter (the attribute you picked); played by the simulator at Normal level when testing.
export function setupSeason2(season1, { seed = 1, you = { name: 'You', attr: 'pyrus' } } = {}) {
  const rng = makeRng(seed);
  const carried = season1.allTime.map(r => ({ id: r.id, name: r.name, level: r.level, upgrades: r.endUpgrades, elo: r.elo, wallet: r.wallet, career: r.career }));
  const newcomers = NEWCOMERS.map(id => ({ id, level: STORY_START[id], upgrades: NEWCOMER_UP[STORY_START[id]] }));
  const starter = STARTERS[you.attr];
  const player = { id: 'you', name: you.name, level: 'normal', upgrades: 0, team: { normal: starter, easy: starter, hard: starter } };
  // League 4: the 23 newcomers and you, shuffled into three divisions of 8
  const l4 = rng.shuffle([...NEWCOMERS, 'you']);
  const leagues = [...season1.nextLeagues, l4.slice(0, 8), l4.slice(8, 16), l4.slice(16)];
  return { roster: [...carried, ...newcomers, player], leagues, events: season2Events(rng), names: LEAGUE_NAMES, promote: promoteSeason2 };
}
