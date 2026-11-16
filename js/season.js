// Story mode: an Interspace season (3 months = 13 weeks). Every match is played by js/sim.js; seeded = repeatable.
// - Leagues: each league is a single round robin; top 2 go up, bottom 2 go down. Table = points (3 win, 1 draw), BP earned in league matches breaks ties.
// - Events: 3 Opens, a Major, a Masters and the season finale, in every format; some use Classic rules.
// - 4 arenas x 3 slots a day (Morning, Afternoon, Evening); one match per brawler per slot.
// - BP: every BP a brawler earns is also a ranking point. Season Ranking = BP earned this season. All-Time Ranking = Elo.
// - Brawlers spend BP on upgrades (+10G each) as soon as they can afford one. Levels (which cards they use) stay fixed.
import { buildPlayer, playMatch, makeRng } from './sim.js';
import { AI_TEAMS, INTERSPACE } from './aiteams.js';
import { gPrice, G_CAP } from './profiles.js';

export const ARENAS = 4, SLOTS = ['Morning', 'Afternoon', 'Evening'], WEEKS = 13, DAYS = WEEKS * 7;
export const START_UP = { easy: 0, normal: 2, hard: 5 };
export const START_UP_OVERRIDE = { gus: 3, nv_dan: 2, masquerade: 6 };   // Billy: Dan toned down, the top 5 even
export const BP = { win: 100, beaten: 20, gate: 50, dealtPer: 5, maxBeaten: 3, maxGates: 3,   // per match: Bakugan beaten and Gate cards won count up to 3 each (Billy)
  event: { Open: 500, Major: 1000, Masters: 2000, Finale: 5000 } };
// an upgrade = +10G to each of the brawler's 3 Bakugan; it costs what those 3 boosts cost in the Shop (gPrice), so it rises every time
export const MAX_UP = 10;
const K = 32, START_ELO = 1500;
// Tag Team pairs that always enter together (Billy: canon or sensible pairs; everyone else is drawn)
export const TAG_PAIRS = [['runo', 'julie'], ['nv_dan', 'nv_shun'], ['spectra', 'gus'], ['mylene', 'shadow'], ['volt', 'lync'], ['mira', 'ace'],
  ['nv_marucho', 'baron'], ['klaus', 'chanlee'], ['julio', 'komba'], ['akira', 'shuji'], ['jenny', 'jewls']];

// the season's events (week 0..12). League rounds fill the other weeks.
export function calendar(theme = 'mix') {
  const ev = [
    { week: 1, tier: 'Open', format: 'knockout', size: 16, rules: 'nv', name: 'Open I' },
    { week: 3, tier: 'Open', format: 'royale', size: 16, rules: 'classic', name: 'Open II' },
    { week: 5, tier: 'Major', format: 'groups', size: 16, rules: 'nv', name: 'Major' },
    { week: 7, tier: 'Open', format: 'tag', size: 16, rules: 'nv', name: 'Open III' },
    { week: 9, tier: 'Masters', format: 'knockout', size: 16, rules: 'classic', name: 'Masters', invite: true },
    { week: 12, tier: 'Finale', format: 'roundrobin', size: 8, rules: 'nv', name: 'Season Finale', invite: true, final: true },
  ];
  if (theme === 'classic') ev.forEach(e => { e.rules = 'classic'; });
  if (theme === 'royale') ev.forEach(e => { if (e.tier === 'Open') e.format = 'royale'; });
  if (theme === 'tag') ev.forEach(e => { if (e.tier !== 'Finale') e.format = 'tag'; });
  return ev.map(e => ({ ...e, day: e.week * 7 }));
}
// league rounds: one a week, in weeks with no event first
const LEAGUE_DAYS = n => [0, 2, 4, 6, 8, 10, 11, 1, 3, 5, 7, 9].slice(0, n).sort((a, b) => a - b).map(w => w * 7 + 2);

// roster: [{ id, level, name?, upgrades?, elo?, wallet?, career? }]; leagues: [[ids], [ids], ...] top league first
export function runSeason(cat, roster, leagues, { seed = 1, season = 1, theme = 'mix' } = {}) {
  const rng = makeRng(seed);
  const B = new Map(roster.map(r => {
    const def = AI_TEAMS[r.id] || INTERSPACE[r.id]; if (!def) throw new Error('no team for ' + r.id);
    const up0 = r.upgrades ?? START_UP_OVERRIDE[r.id] ?? START_UP[r.level || 'normal'];
    return [r.id, { id: r.id, name: r.name || (INTERSPACE[r.id] || {}).name || r.id, level: r.level || 'normal', up: up0, startUp: up0,
      elo: r.elo ?? START_ELO, startElo: r.elo ?? START_ELO, bp: 0, wallet: r.wallet || 0, rec: { w: 0, l: 0, d: 0 },
      lg: { w: 0, l: 0, d: 0, pts: 0, bp: 0 }, career: r.career || { w: 0, l: 0, d: 0, titles: [] }, titles: [], busy: new Set() }];
  }));
  const ids = [...B.keys()], used = new Map(), matches = [], events = [];
  const avgE = g => g.reduce((n, id) => n + B.get(id).elo, 0) / g.length;
  const baseG = new Map(cat.toys.map(t => [t.id, t.baseG || 250]));
  const upCost = b => (AI_TEAMS[b.id] || INTERSPACE[b.id])[b.level].toys.reduce((n, x) => n + gPrice(b.up, Math.min(G_CAP, baseG.get(x.id) + b.up * 10)), 0);
  const earn = (id, n) => { const b = B.get(id); b.bp += n; b.wallet += n;
    for (let c = upCost(b); b.wallet >= c && b.up < MAX_UP; c = upCost(b)) { b.wallet -= c; b.up++; } };

  // ---- one match: plays it, then records, BP and Elo
  function play(sideIds, { rules = 'nv', teams = null, day, slot, event = null, league = null }) {
    const flat = sideIds.flat();
    const entrants = flat.map(id => { const b = B.get(id), team = { ...(AI_TEAMS[id] || INTERSPACE[id])[b.level], upgrades: b.up };
      return { name: b.name, level: b.level, player: buildPlayer(cat, team, { name: b.name, owner: id, nv: rules === 'nv' }) }; });
    const tm = teams || flat.map((_, i) => i);
    const r = playMatch(entrants, { nv: rules === 'nv', teams: tm, rng });
    const order = [...new Set(tm)], teamIds = order.map(t => flat.filter((_, i) => tm[i] === t));
    const winIdx = r.winner === 'draw' ? null : order.indexOf(r.winner);
    const bpOf = {};
    flat.forEach((id, i) => {
      const st = r.stats[i], b = B.get(id), side = order.indexOf(tm[i]);
      const k = winIdx === null ? 'd' : side === winIdx ? 'w' : 'l';
      const bp = (k === 'w' ? BP.win : 0) + Math.min(BP.maxBeaten, st.beaten) * BP.beaten + Math.min(BP.maxGates, st.gates) * BP.gate + Math.floor(st.dealt / BP.dealtPer);
      bpOf[id] = bp; earn(id, bp);
      b.rec[k]++; b.career[k] = (b.career[k] || 0) + 1;
      if (league !== null) { b.lg[k]++; b.lg.pts += k === 'w' ? 3 : k === 'd' ? 1 : 0; b.lg.bp += bp; }
    });
    // Elo: team average; Battle Royale = the winner beat each of the others
    const pairs = teamIds.length === 2 ? [[0, 1]] : winIdx === null ? [] : teamIds.map((_, i) => i).filter(i => i !== winIdx).map(i => [winIdx, i]);
    const delta = teamIds.map(() => 0);
    for (const [a, b] of pairs) {
      const ea = 1 / (1 + 10 ** ((avgE(teamIds[b]) - avgE(teamIds[a])) / 400)), sa = winIdx === null ? 0.5 : winIdx === a ? 1 : 0, k = teamIds.length > 2 ? K / 2 : K;
      delta[a] += k * (sa - ea); delta[b] -= k * (sa - ea);
    }
    teamIds.forEach((g, i) => g.forEach(id => { B.get(id).elo += delta[i]; }));
    const m = { day, slot, event, league, rules, sides: teamIds, winner: winIdx, turns: r.turns, bp: bpOf };
    matches.push(m); return m;
  }
  function book(ids2, from) {
    for (let k = from; k < DAYS * 3 + 60; k++) {
      if ((used.get(k) || 0) >= ARENAS || ids2.some(id => B.get(id).busy.has(k))) continue;
      used.set(k, (used.get(k) || 0) + 1); ids2.forEach(id => B.get(id).busy.add(k));
      return { day: Math.floor(k / 3), slot: k % 3, k };
    }
    throw new Error('no free slot');
  }
  const game = (sides, from, opts) => { const b = book(sides.flat(), from); return { m: play(sides, { ...opts, day: b.day, slot: b.slot }), next: b.k + 1 }; };
  // round robin pairings (circle method): rounds[r] = [[a, b], ...]
  function rounds(list) {
    const a = [...list]; if (a.length % 2) a.push(null);
    const n = a.length, out = [];
    for (let r = 0; r < n - 1; r++) { const pr = []; for (let i = 0; i < n / 2; i++) { const x = a[i], y = a[n - 1 - i]; if (x !== null && y !== null) pr.push([x, y]); } out.push(pr); a.splice(1, 0, a.pop()); }
    return out;
  }
  // ---- event formats (sides = arrays of ids). Each returns { order: [side...] best first, next }
  function knockout(sides, from, opts) {
    let alive = [...sides], next = from; const placed = [];
    while (alive.length > 1) {
      const n = 2 ** Math.ceil(Math.log2(alive.length)), byes = n - alive.length, through = alive.slice(0, byes), rest = alive.slice(byes), winners = [];
      let roundEnd = next;
      for (let i = 0; i < rest.length / 2; i++) {
        const pr = [rest[i], rest[rest.length - 1 - i]]; let w = null, at = next;
        for (let t = 0; t < 2 && w === null; t++) { const g = game(pr, at, opts); at = g.next; w = g.m.winner; }   // a draw is replayed once
        if (w === null) w = avgE(pr[0]) >= avgE(pr[1]) ? 0 : 1;                                                // then the higher rating goes through
        winners.push(pr[w]); placed.unshift(pr[1 - w]); roundEnd = Math.max(roundEnd, at);
      }
      alive = [...through, ...winners]; next = roundEnd;
    }
    return { order: [alive[0], ...placed], next };
  }
  function roundRobin(sides, from, opts) {
    const score = new Map(sides.map(s => [s, 0])); let next = from;
    for (const rd of rounds(sides)) {
      let roundEnd = next;
      for (const [x, y] of rd) { const g = game([x, y], next, opts); roundEnd = Math.max(roundEnd, g.next);
        if (g.m.winner === 0) score.set(x, score.get(x) + 3); else if (g.m.winner === 1) score.set(y, score.get(y) + 3); else { score.set(x, score.get(x) + 1); score.set(y, score.get(y) + 1); } }
      next = roundEnd;
    }
    return { order: [...sides].sort((a, b) => score.get(b) - score.get(a) || avgE(b) - avgE(a)), next };
  }
  function royale(sides, from, opts) {          // groups of 4; each group's winner goes to a final of 4
    const finals = [], others = []; let end = from;
    for (let g0 = 0; g0 < sides.length; g0 += 4) {
      const grp = sides.slice(g0, g0 + 4); if (grp.length < 2) { finals.push(...grp); continue; }
      const g = game(grp, from, { ...opts, teams: grp.map((_, i) => i) }); end = Math.max(end, g.next);
      const w = g.m.winner ?? 0; finals.push(grp[w]); others.push(...grp.filter((_, i) => i !== w));
    }
    const g = game(finals, end, { ...opts, teams: finals.map((_, i) => i) }); const w = g.m.winner ?? 0;
    return { order: [finals[w], ...finals.filter((_, i) => i !== w), ...others], next: g.next };
  }
  function tagTeams(list) {
    const left = new Set(list), out = [];
    for (const [a, b] of TAG_PAIRS) if (left.has(a) && left.has(b)) { out.push([a, b]); left.delete(a); left.delete(b); }
    const rest = rng.shuffle([...left]); for (let i = 0; i + 1 < rest.length; i += 2) out.push([rest[i], rest[i + 1]]);
    return out.sort((a, b) => avgE(b) - avgE(a));
  }
  const byBP = list => [...list].sort((a, b) => B.get(b).bp - B.get(a).bp || B.get(b).elo - B.get(a).elo);
  const leagueOf = id => leagues.findIndex(l => l.includes(id));

  // ---- league rounds and events, in date order
  const leagueRounds = leagues.map(lg => rounds(lg));
  const nRounds = Math.max(...leagueRounds.map(r => r.length)), lDays = LEAGUE_DAYS(nRounds);
  const todo = [...lDays.map((day, r) => ({ day, round: r })), ...calendar(theme).map(e => ({ day: e.day, event: e }))].sort((a, b) => a.day - b.day);
  for (const item of todo) {
    if (item.round !== undefined) {
      leagueRounds.forEach((rs, li) => { for (const [x, y] of rs[item.round] || []) game([[x], [y]], item.day * 3, { rules: 'nv', league: li }); });
      continue;
    }
    const e = item.event, from = e.day * 3, opts = { rules: e.rules, event: e.name };
    // entry: Major, Masters and Finale go by Season Ranking (BP so far, then rating); Opens draw from everyone, lower leagues keener
    let entrants;
    if (e.invite || e.tier === 'Major') entrants = byBP(ids).slice(0, e.size);
    else entrants = rng.shuffle(ids.filter(id => rng() < ([0.45, 0.7, 0.9, 0.95][leagueOf(id)] ?? 0.9))).slice(0, e.size);
    if (e.format === 'tag' && entrants.length % 2) entrants = entrants.slice(0, -1);
    let res;
    if (e.format === 'knockout') res = knockout(byBP(entrants).map(id => [id]), from, opts);
    else if (e.format === 'roundrobin') res = roundRobin(byBP(entrants).map(id => [id]), from, opts);
    else if (e.format === 'royale') res = royale(rng.shuffle(entrants).map(id => [id]), from, opts);
    else if (e.format === 'tag') res = knockout(tagTeams(entrants), from, { ...opts, teams: [0, 1, 0, 1] });
    else if (e.format === 'groups') {
      const seeded = byBP(entrants), groups = [[], [], [], []];
      seeded.forEach((id, i) => groups[Math.floor(i / 4) % 2 ? 3 - (i % 4) : i % 4].push([id]));   // snake seeding
      let next = from; const qual = [];
      for (const g of groups) { const r = roundRobin(g, from, opts); next = Math.max(next, r.next); qual.push(...r.order.slice(0, 2)); }
      res = knockout(qual, next, opts); res.order = [...res.order, ...seeded.map(id => [id]).filter(s => !res.order.some(o => o[0] === s[0]))];
    }
    if (e.final) { const f = knockout([res.order[0], res.order[1]], res.next, opts); res.order = [...f.order, ...res.order.slice(2)]; res.next = f.next; }
    res.order[0].forEach(id => { earn(id, BP.event[e.tier]); B.get(id).titles.push(e.name); B.get(id).career.titles = [...(B.get(id).career.titles || []), `S${season} ${e.name}`]; });
    events.push({ ...e, entrants: entrants.length, winner: res.order[0], runnerUp: res.order[1] || [], endDay: Math.floor((res.next - 1) / 3) });
  }
  matches.sort((a, b) => a.day * 3 + a.slot - (b.day * 3 + b.slot));

  // ---- league tables: by points (decides promotion, Billy) and by BP (kept to compare)
  const tables = leagues.map(lg => ({
    byBP: [...lg].sort((a, b) => B.get(b).lg.bp - B.get(a).lg.bp || B.get(b).lg.pts - B.get(a).lg.pts),
    byPts: [...lg].sort((a, b) => B.get(b).lg.pts - B.get(a).lg.pts || B.get(b).lg.bp - B.get(a).lg.bp),
  }));
  const nextLeagues = key => {
    const nl = tables.map(t => [...t[key]]);
    for (let i = 0; i + 1 < nl.length; i++) { const up = tables[i + 1][key].slice(0, 2), down = tables[i][key].slice(-2);
      nl[i] = nl[i].filter(id => !down.includes(id)).concat(up); nl[i + 1] = nl[i + 1].filter(id => !up.includes(id)).concat(down); }
    return nl;
  };
  const out = id => { const b = B.get(id); return { id, name: b.name, level: b.level, elo: Math.round(b.elo), startElo: b.startElo, bp: b.bp, wallet: b.wallet,
    upgrades: b.startUp, endUpgrades: b.up, record: b.rec, league: b.lg, titles: b.titles, career: b.career, matches: b.rec.w + b.rec.l + b.rec.d }; };
  return {
    season, seed, theme, weeks: WEEKS, events, matchCount: matches.length,
    leagues: tables.map((t, i) => ({ league: i + 1, byBP: t.byBP.map(out), byPts: t.byPts.map(out) })),
    nextLeagues: nextLeagues('byPts'), nextLeaguesIfBP: nextLeagues('byBP'),
    seasonRanking: byBP(ids).map(out), allTime: [...ids].sort((a, b) => B.get(b).elo - B.get(a).elo).map(out),
    matches: matches.map(m => ({ d: m.day, s: m.slot, e: m.event, l: m.league, r: m.rules === 'classic' ? 'c' : 'nv', sides: m.sides, w: m.winner, bp: m.bp })),
  };
}
