// Story mode: an Interspace season. A calendar of events (Open, Major, Masters, World Championship) in every format,
// 4 arenas x 3 slots a day (Morning, Afternoon, Evening), challenges between brawlers (one a day at most),
// Elo ratings, a Season Ranking and level changes at the end. Every match is played by js/sim.js. Seeded = repeatable.
import { buildPlayer, playMatch, makeRng } from './sim.js';
import { AI_TEAMS, INTERSPACE } from './aiteams.js';

export const ARENAS = 4, SLOTS = ['Morning', 'Afternoon', 'Evening'], DAYS = 364;
// a brawler's level (which cards they use) is fixed by STORY_START; upgrades (+10G each) are separate and start low
export const START_UP = { easy: 0, normal: 2, hard: 5 };
export const START_UP_OVERRIDE = { gus: 3, nv_dan: 2, masquerade: 6 };   // Billy: Dan toned down, the top 5 even
const K = 32, START_ELO = 1500;
// Season Ranking points: a match win, a draw, and how far you got in an event (winner, finalist, semifinal, quarterfinal)
const MATCH_PTS = { win: 3, draw: 1 };
const PLACE_PTS = { Open: [20, 12, 6, 3], Major: [40, 24, 12, 6], Masters: [60, 36, 18, 9], 'World Championship': [100, 60, 30, 15] };
// Tag Team pairs that always enter together (Billy: canon or sensible pairs; everyone else is drawn)
export const TAG_PAIRS = [['runo', 'julie'], ['nv_dan', 'nv_shun'], ['spectra', 'gus'], ['mylene', 'shadow'], ['volt', 'lync'], ['mira', 'ace'],
  ['nv_marucho', 'baron'], ['klaus', 'chanlee'], ['julio', 'komba'], ['akira', 'shuji'], ['jenny', 'jewls']];

// the year's events. week = 0..51; formats: knockout, roundrobin, groups (groups of 4 -> knockout), tag, royale
export function calendar() {
  const ev = [], formats = ['knockout', 'royale', 'roundrobin', 'tag'];
  for (let i = 0; i < 12; i++) {           // Opens every 4 weeks, rotating formats; every third one is Classic rules
    const f = formats[i % 4];
    ev.push({ week: 1 + i * 4, tier: 'Open', format: f, size: f === 'roundrobin' ? 8 : 16, rules: i % 3 === 2 ? 'classic' : 'nv', name: `Open #${i + 1}` });
  }
  [7, 19, 31, 43].forEach((w, i) => ev.push({ week: w, tier: 'Major', format: i === 2 ? 'tag' : 'groups', size: 16, rules: i % 2 ? 'classic' : 'nv', name: `Major ${['Spring', 'Summer', 'Autumn', 'Winter'][i]}` }));
  ev.push({ week: 25, tier: 'Masters', format: 'knockout', size: 16, rules: 'nv', name: 'Masters I', invite: true });
  ev.push({ week: 47, tier: 'Masters', format: 'groups', size: 16, rules: 'classic', name: 'Masters II', invite: true });
  ev.push({ week: 50, tier: 'World Championship', format: 'roundrobin', size: 8, rules: 'nv', name: 'World Championship', invite: true, final: true });
  return ev.sort((a, b) => a.week - b.week).map(e => ({ ...e, deadline: Math.max(0, e.week * 7 - 7), day: e.week * 7 }));
}

// brawlers: [{ id, upgrades?, elo?, career? }] -> a season. opts: { seed, season, cat }
export function runSeason(cat, roster, { seed = 1, season = 1, challengeChance = 0.12 } = {}) {
  const rng = makeRng(seed);
  const B = new Map(roster.map(r => {
    const def = AI_TEAMS[r.id] || INTERSPACE[r.id], name = (INTERSPACE[r.id] || {}).name || r.name || r.id;
    if (!def) throw new Error('no team for ' + r.id);
    const up0 = r.upgrades ?? START_UP_OVERRIDE[r.id] ?? START_UP[r.level || 'normal'];
    return [r.id, { id: r.id, name, level: r.level || 'normal', up: up0, startUp: up0,
      elo: r.elo ?? START_ELO, startElo: r.elo ?? START_ELO, pts: 0, rec: { w: 0, l: 0, d: 0 }, career: r.career || { w: 0, l: 0, d: 0, titles: [] }, titles: [], busy: new Set() }];
  }));
  const ids = [...B.keys()];
  const used = new Map();                  // day*3+slot -> arenas taken
  const matches = [], events = [];
  const slotKey = (d, s) => d * 3 + s;

  // ---- one match on (day, slot): plays it, updates records, Elo, Season points
  function play(sideIds, { rules = 'nv', teams = null, day, slot, event = null }) {
    const flat = sideIds.flat();
    const entrants = flat.map(id => { const b = B.get(id), lvl = b.level, team = { ...(AI_TEAMS[id] || INTERSPACE[id])[lvl], upgrades: b.up };
      return { name: b.name, level: lvl, player: buildPlayer(cat, team, { name: b.name, owner: id, nv: rules === 'nv' }) }; });
    const tm = teams || flat.map((_, i) => i);
    const r = playMatch(entrants, { nv: rules === 'nv', teams: tm, rng });
    const teamIds = [...new Set(tm)].map(t => flat.filter((_, i) => tm[i] === t));
    const winIdx = r.winner === 'draw' ? null : [...new Set(tm)].indexOf(r.winner);
    // records and points
    teamIds.forEach((g, i) => g.forEach(id => { const b = B.get(id);
      const k = winIdx === null ? 'd' : i === winIdx ? 'w' : 'l'; b.rec[k]++; b.career[k] = (b.career[k] || 0) + 1;
      if (k === 'w') b.pts += MATCH_PTS.win; if (k === 'd') b.pts += MATCH_PTS.draw; }));
    // Elo: team average; Battle Royale = the winner beat each of the others
    const avg = g => g.reduce((n, id) => n + B.get(id).elo, 0) / g.length;
    const pairs = teamIds.length === 2 ? [[0, 1]] : winIdx === null ? [] : teamIds.map((_, i) => i).filter(i => i !== winIdx).map(i => [winIdx, i]);
    const delta = teamIds.map(() => 0);
    for (const [a, b] of pairs) {
      const ea = 1 / (1 + 10 ** ((avg(teamIds[b]) - avg(teamIds[a])) / 400)), sa = winIdx === null ? 0.5 : winIdx === a ? 1 : 0;
      const k = teamIds.length > 2 ? K / 2 : K;
      delta[a] += k * (sa - ea); delta[b] -= k * (sa - ea);
    }
    teamIds.forEach((g, i) => g.forEach(id => { B.get(id).elo += delta[i]; }));
    const m = { day, slot, event, rules, sides: teamIds, winner: winIdx, turns: r.turns, life: r.stats.map(x => x.life) };
    matches.push(m); return m;
  }
  // find the next (day, slot) at or after `from` with a free arena where none of these brawlers is busy
  function book(ids2, from) {
    for (let k = from; k < DAYS * 3; k++) {
      if ((used.get(k) || 0) >= ARENAS) continue;
      if (ids2.some(id => B.get(id).busy.has(k))) continue;
      used.set(k, (used.get(k) || 0) + 1); ids2.forEach(id => B.get(id).busy.add(k));
      return { day: Math.floor(k / 3), slot: k % 3, k };
    }
    return null;
  }
  // a round of matches, all booked from `from`; returns the slot after the round finished
  function round(list, from, opts) {
    let end = from; const out = [];
    for (const sides of list) {
      const b = book(sides.flat(), from); if (!b) continue;
      out.push(play(sides, { ...opts, day: b.day, slot: b.slot })); end = Math.max(end, b.k + 1);
    }
    return { results: out, next: end };
  }
  const rank = list => [...list].sort((a, b) => B.get(b).elo - B.get(a).elo);
  // a knockout among sides (each side = [ids]); a draw is replayed, then the higher rating goes through
  function knockout(sides, from, opts) {
    let alive = [...sides], next = from, placed = [];
    while (alive.length > 1) {
      const n = 2 ** Math.ceil(Math.log2(alive.length)), byes = n - alive.length, pairs = [], through = alive.slice(0, byes);
      const rest = alive.slice(byes); for (let i = 0; i < rest.length / 2; i++) pairs.push([rest[i], rest[rest.length - 1 - i]]);
      const winners = [];
      for (const pr of pairs) {
        let w = null;
        for (let tries = 0; tries < 2 && w === null; tries++) {
          const r = round([pr], next, opts); next = r.next; const m = r.results[0];
          if (m && m.winner !== null) w = m.winner;
        }
        if (w === null) w = avgE(pr[0]) >= avgE(pr[1]) ? 0 : 1;
        winners.push(pr[w]); placed.unshift(pr[1 - w]);
      }
      alive = [...through, ...winners];
    }
    return { order: [alive[0], ...placed], next };
  }
  const avgE = g => g.reduce((n, id) => n + B.get(id).elo, 0) / g.length;
  function roundRobin(sides, from, opts) {
    const score = new Map(sides.map(s => [s, 0])); let next = from;
    for (let i = 0; i < sides.length; i++) for (let j = i + 1; j < sides.length; j++) {
      const r = round([[sides[i], sides[j]]], next, opts); next = Math.max(next, from); const m = r.results[0]; if (!m) continue;
      if (m.winner === 0) score.set(sides[i], score.get(sides[i]) + 3); else if (m.winner === 1) score.set(sides[j], score.get(sides[j]) + 3);
      else { score.set(sides[i], score.get(sides[i]) + 1); score.set(sides[j], score.get(sides[j]) + 1); }
      next = Math.max(next, r.next - 3);     // pairings share the days; booking keeps each brawler to one match a slot
    }
    const last = Math.max(from, ...[...used.keys()].filter(k => k >= from && sides.flat().some(id => B.get(id).busy.has(k))).map(k => k + 1));
    return { order: [...sides].sort((a, b) => score.get(b) - score.get(a) || avgE(b) - avgE(a)), next: last };
  }
  function royale(sides, from, opts) {          // groups of 4, each group's winner to a final of 4
    let next = from; const finals = [], others = [];
    for (let g = 0; g < sides.length; g += 4) {
      const grp = sides.slice(g, g + 4); if (grp.length < 2) { finals.push(...grp); continue; }
      const r = round([grp], next, { ...opts, teams: grp.map((_, i) => i) }); next = r.next;
      const m = r.results[0], w = m && m.winner !== null ? m.winner : 0;
      finals.push(grp[w]); others.push(...grp.filter((_, i) => i !== w));
    }
    const r = round([finals], next, { ...opts, teams: finals.map((_, i) => i) }); next = r.next;
    const m = r.results[0], w = m && m.winner !== null ? m.winner : 0;
    return { order: [finals[w], ...finals.filter((_, i) => i !== w), ...others], next };
  }
  function tagTeams(entrants) {
    const left = new Set(entrants), teamsOut = [];
    for (const [a, b] of TAG_PAIRS) if (left.has(a) && left.has(b)) { teamsOut.push([a, b]); left.delete(a); left.delete(b); }
    const rest = rng.shuffle([...left]); for (let i = 0; i + 1 < rest.length; i += 2) teamsOut.push([rest[i], rest[i + 1]]);
    return teamsOut;
  }

  // ---- the calendar
  const cal = calendar();
  for (const e of cal) {
    const from = e.day * 3;
    // who enters: invites go by rating at the deadline; Opens and Majors draw from everyone (lower-rated brawlers keener on Opens)
    let pool = rank(ids);
    let entrants;
    if (e.invite) entrants = pool.slice(0, e.size);
    else if (e.tier === 'Major') entrants = pool.slice(0, e.size);
    else entrants = rng.shuffle(pool.filter((id, i) => rng() < 0.55 + 0.4 * (i / pool.length))).slice(0, e.size);
    if (e.format === 'tag' && entrants.length % 2) entrants = entrants.slice(0, -1);
    if (entrants.length < 4) continue;
    const opts = { rules: e.rules, event: e.name };
    let res;
    if (e.format === 'knockout') res = knockout(rank(entrants).map(id => [id]), from, opts);
    else if (e.format === 'roundrobin') res = roundRobin(rank(entrants).map(id => [id]), from, opts);
    else if (e.format === 'groups') {
      const seeded = rank(entrants), groups = [[], [], [], []];
      seeded.forEach((id, i) => groups[Math.floor(i / 4) % 2 ? 3 - (i % 4) : i % 4].push([id]));   // snake seeding
      let next = from; const qual = [];
      for (const g of groups) { if (g.length < 2) continue; const r = roundRobin(g, from, opts); next = Math.max(next, r.next); qual.push(...r.order.slice(0, 2)); }
      res = knockout(qual, next, opts); res.order = [...res.order, ...seeded.map(id => [id]).filter(s => !res.order.some(o => o[0] === s[0]))];
    } else if (e.format === 'tag') res = knockout(tagTeams(entrants).sort((a, b) => avgE(b) - avgE(a)), from, { ...opts, teams: [0, 1, 0, 1] });
    else if (e.format === 'royale') res = royale(rng.shuffle(entrants).map(id => [id]), from, opts);
    // World Championship: the top two of the round robin play a final
    if (e.final && res.order.length >= 2) {
      const f = knockout([res.order[0], res.order[1]], res.next, opts); res.order = [...f.order, ...res.order.slice(2)]; res.next = f.next;
    }
    const pts = PLACE_PTS[e.tier];
    res.order.forEach((side, i) => { const k = i === 0 ? 0 : i === 1 ? 1 : i < 4 ? 2 : i < 8 ? 3 : -1;
      if (k >= 0) side.forEach(id => { B.get(id).pts += pts[k]; }); });
    res.order[0].forEach(id => { B.get(id).titles.push(e.name); B.get(id).career.titles = [...(B.get(id).career.titles || []), `S${season} ${e.name}`]; });
    events.push({ ...e, entrants: entrants.length, winner: res.order[0].map(id => B.get(id).name), runnerUp: (res.order[1] || []).map(id => B.get(id).name),
      endDay: Math.floor((res.next - 1) / 3) });
  }
  // ---- challenges: on a free day a brawler may challenge someone ranked a little above them (one a day at most)
  for (let day = 0; day < DAYS; day++) {
    const order = rank(ids), done = new Set();
    for (const [i, id] of order.entries()) {
      if (done.has(id) || rng() > challengeChance) continue;
      const freeToday = x => ![0, 1, 2].some(s => B.get(x).busy.has(day * 3 + s));
      if (!freeToday(id)) continue;
      const targets = order.slice(Math.max(0, i - 5), i).filter(x => !done.has(x) && freeToday(x));
      const opp = targets.length ? rng.pick(targets) : order.slice(i + 1, i + 4).find(x => !done.has(x) && freeToday(x));
      if (!opp) continue;
      const b = book([id, opp], day * 3); if (!b || b.day !== day) continue;
      play([[id], [opp]], { rules: 'nv', day: b.day, slot: b.slot, event: null });
      done.add(id); done.add(opp);
    }
  }
  matches.sort((a, b) => a.day * 3 + a.slot - (b.day * 3 + b.slot));
  // ---- season end: Season Ranking. Levels don't move yet (Billy: that comes with Season 2's newcomers); upgrades will come from BP.
  const seasonRank = [...ids].sort((a, b) => B.get(b).pts - B.get(a).pts || B.get(b).elo - B.get(a).elo);
  seasonRank.forEach(id => { B.get(id).endUp = B.get(id).up; });
  const out = [...B.values()].map(b => ({ id: b.id, name: b.name, elo: Math.round(b.elo), startElo: b.startElo, pts: b.pts, record: b.rec, titles: b.titles,
    level: b.level, upgrades: b.startUp, endUpgrades: b.endUp, career: b.career,
    matches: b.rec.w + b.rec.l + b.rec.d }));
  return {
    season, seed, events, matchCount: matches.length,
    seasonRanking: seasonRank.map(id => out.find(o => o.id === id)),
    allTime: [...out].sort((a, b) => b.elo - a.elo),
    matches: matches.map(m => ({ d: m.day, s: m.slot, e: m.event, r: m.rules === 'classic' ? 'c' : 'nv', sides: m.sides, w: m.winner })),
  };
}
