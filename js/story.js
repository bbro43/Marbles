// Story mode: Season 2 of Interspace, played a day at a time from The Commons.
// Stage 1: opening scenes, The Commons, locations and who's there, free challenges, league match days, the rest of the
// league simulated day by day, standings, calendar, messages, partner, a simple upgrade shop, Rest.
// (Events are simulated without you in this stage; entering them comes next.)
import { Pack } from './pack.js';
import { makeRng, playMatch, buildPlayer } from './sim.js';
import { BP, MAX_UP, UPS_PER_SEASON, ATTRS6 } from './season.js';
import { setupSeason2, LEAGUE_NAMES } from './season2.js';
import { AI_TEAMS, INTERSPACE, STARTERS } from './aiteams.js';
import { gPrice, G_CAP } from './profiles.js';
import { mountCommons } from './commons3d.js';
import { stock, trapAttrCap, priceTrap, salesFor, salesOnDay, discountOn, saleText } from './storyshop.js';
import { setupTeams, GATE_COLORS, AB_COLORS } from './setup.js';

const $ = id => document.getElementById(id);
const KEY = 'marbles-story';
const SLOTS = ['Morning', 'Afternoon', 'Evening'];
const DAYS = 91;
const LEAGUE_DAYS = [0, 2, 4, 6, 8, 10, 11].map(w => w * 7 + 2);   // one league round a week (as js/season.js)
const PLACES = [['arena1', 'Arena 1'], ['arena2', 'Arena 2'], ['arena3', 'Arena 3'], ['arena4', 'Arena 4'], ['shop', 'The Shop']];
const ATTR_COLOR = { pyrus: '#e2453c', aquos: '#3b82e0', subterra: '#b07a3a', haos: '#e8d24a', darkus: '#8a4fc7', ventus: '#3fb56a' };
const cap = s => s[0].toUpperCase() + s.slice(1);
const NAME = { nv_dan: 'Dan', nv_shun: 'Shun', nv_marucho: 'Marucho', chanlee: 'Chan Lee' };

let cat = null, save = null, PACK = null;
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } };
const store = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch {} };

// ---------- the season
const teamDef = id => id === 'you' ? null : AI_TEAMS[id] || INTERSPACE[id];
const nameOf = id => id === 'you' ? save.you.name : NAME[id] || (INTERSPACE[id] || {}).name || cap(id);
function teamOf(id) {   // the deck for this brawler right now (level cards + this season's upgrades)
  const b = save.season.B[id];
  if (id === 'you') { ensureColl(); return { ...save.you.deck, upgrades: b.up }; }
  return { ...teamDef(id)[b.level], upgrades: b.up };
}
const mainAttr = id => (teamOf(id).toys[0] || {}).attr || 'pyrus';
function rounds(list) {   // round robin pairings, circle method
  const a = [...list]; if (a.length % 2) a.push(null);
  const n = a.length, out = [];
  for (let r = 0; r < n - 1; r++) { const pr = []; for (let i = 0; i < n / 2; i++) { const x = a[i], y = a[n - 1 - i]; if (x !== null && y !== null) pr.push([x, y]); } out.push(pr); a.splice(1, 0, a.pop()); }
  return out;
}
function newSeason(s1, name, attr) {
  const seed = (Date.now() & 0x7fffffff) || 7;
  const S = setupSeason2(s1, { seed, you: { name, attr } });
  const B = {};
  for (const r of S.roster) B[r.id] = { id: r.id, name: r.id === 'you' ? name : NAME[r.id] || (INTERSPACE[r.id] || {}).name || cap(r.id), level: r.level || 'normal', up: r.upgrades || 0, startUp: r.upgrades || 0,
    elo: r.elo || 1500, bp: 0, wallet: r.wallet || 0, rec: { w: 0, l: 0, d: 0 }, lg: { w: 0, l: 0, d: 0, pts: 0, bp: 0 }, titles: [] };
  return { seed, B, leagues: S.leagues, names: S.names, events: S.events.map(e => ({ ...e, day: e.week * 7 })), fixtures: S.leagues.map(rounds), done: {}, eventsDone: [] };
}

// ---------- your collection and deck (start: your starter set; grows with Shop buys and prizes)
const tkey = (id, attr) => `${id}:${attr}`;
function ensureColl() {
  const y = save.you; if (y.coll && y.deck) return;
  const st = STARTERS[y.attr];
  y.deck = JSON.parse(JSON.stringify({ toys: st.toys, gates: st.gates, abilities: st.abilities, extra: st.extra || {}, trap: null }));
  y.coll = { toys: Object.fromEntries(st.toys.map(t => [tkey(t.id, t.attr), {}])),
    cards: [...new Set([...Object.values(st.gates), ...Object.values(st.abilities), ...Object.values(st.extra || {}).flat()].map(c => c.id))], traps: [] };
}
// League 1 is the top. League 4 covers all three divisions.
const leagueNum = (id = 'you') => Math.min(4, leagueOf(id) + 1);

// ---------- fixed teams (story-mode-design.md); Team Ranking = the members' average Elo
const TEAMS = [
  { name: 'Vexos', ids: ['spectra', 'gus', 'mylene', 'volt', 'shadow', 'lync'] },
  { name: 'Battle Brawlers', ids: ['nv_dan', 'nv_shun', 'nv_marucho', 'runo', 'julie'] },
  { name: 'Resistance', ids: ['ace', 'mira', 'baron'] },
  { name: "Masquerade's team", ids: ['masquerade', 'klaus', 'chanlee', 'julio', 'komba', 'billy'] },
];
// ---------- Shop sales (Billy, Nov 20): the schedule lives in js/storyshop.js (the store screen uses it too)
const saleSchedule = () => salesFor(save.season);
const salesOn = (day = save.day) => salesOnDay(save.season, day);
const discount = (item, day = save.day) => discountOn(save.season, day, item);
const boostCost = () => Math.round(upCost('you') * (100 - discount({ kind: 'upgrades' })) / 100);

// ---------- results: records, BP, Elo, league table, upgrades
function upCost(id) {
  const b = save.season.B[id], t = teamOf(id);
  return t.toys.reduce((n, x) => { const d = cat.toys.find(y => y.id === x.id); return n + gPrice(b.up, Math.min(G_CAP, (d ? d.baseG : 250) + b.up * 10)); }, 0);
}
function earn(id, n) {
  const b = save.season.B[id]; b.bp += n; b.wallet += n;
  if (id === 'you') return;   // you spend your own BP in the Shop
  for (let c = upCost(id); b.wallet >= c && b.up < MAX_UP && b.up - b.startUp < UPS_PER_SEASON; c = upCost(id)) { b.wallet -= c; b.up++; }
}
// sides: [[idA], [idB]]; winner 0/1/null; stats: { id: { beaten, gates, dealt } }; league: true for a league match
function record(sides, winner, stats, { league = false } = {}) {
  const B = save.season.B, out = {};
  sides.forEach((g, i) => g.forEach(id => {
    const st = stats[id] || {}, k = winner === null ? 'd' : winner === i ? 'w' : 'l';
    const bp = (k === 'w' ? BP.win : 0) + Math.min(BP.maxBeaten, st.beaten || 0) * BP.beaten + Math.min(BP.maxGates, st.gates || 0) * BP.gate + Math.floor((st.dealt || 0) / BP.dealtPer);
    B[id].rec[k]++; out[id] = bp; earn(id, bp);
    if (league) { B[id].lg[k]++; B[id].lg.pts += k === 'w' ? 3 : k === 'd' ? 1 : 0; B[id].lg.bp += bp; }
  }));
  if (sides.length === 2) {   // Elo
    const avg = g => g.reduce((n, id) => n + B[id].elo, 0) / g.length, ea = 1 / (1 + 10 ** ((avg(sides[1]) - avg(sides[0])) / 400));
    const sa = winner === null ? 0.5 : winner === 0 ? 1 : 0, d = 32 * (sa - ea);
    sides[0].forEach(id => { B[id].elo += d; }); sides[1].forEach(id => { B[id].elo -= d; });
  }
  return out;
}
// a computer-only match, played by the simulator
function simMatch(a, b, { arena = null, league = false } = {}, rng) {
  const ent = [a, b].map(id => ({ name: nameOf(id), level: save.season.B[id].level, player: buildPlayer(cat, teamOf(id), { name: nameOf(id), owner: id, nv: true }) }));
  const r = playMatch(ent, { nv: true, rng, arena });
  const w = r.winner === 'draw' ? null : r.winner;
  record([[a], [b]], w, { [a]: r.stats[0], [b]: r.stats[1] }, { league });
  return w;
}

// ---------- the calendar
const week = d => Math.floor(d / 7) + 1;
const roundOn = d => LEAGUE_DAYS.indexOf(d);
const leagueOf = id => save.season.leagues.findIndex(l => l.includes(id));
function myFixture(d) {
  const r = roundOn(d); if (r < 0) return null;
  const li = leagueOf('you'), pr = (save.season.fixtures[li][r] || []).find(p => p.includes('you'));
  if (!pr) return null;
  const key = `L${li}R${r}`;
  return { key, opp: pr[0] === 'you' ? pr[1] : pr[0], round: r + 1, played: !!save.season.done[key] };
}
const mandatoryToday = () => { const f = myFixture(save.day); return f && !f.played ? f : null; };
// end of a day: the rest of today's league round, and any event that falls today (simulated without you in this stage)
function closeDay() {
  const d = save.day, rng = makeRng(save.season.seed + d * 7919), r = roundOn(d);
  if (r >= 0) save.season.fixtures.forEach((rs, li) => (rs[r] || []).forEach(([a, b]) => {
    if (a === 'you' || b === 'you') return;
    const key = `L${li}R${r}:${a}-${b}`; if (save.season.done[key]) return;
    simMatch(a, b, { league: true }, rng); save.season.done[key] = true;
  }));
  for (const e of save.season.events) if (e.day === d && !save.season.eventsDone.includes(e.name)) runEvent(e, rng);
}
function runEvent(e, rng) {   // a quick knockout among the event's field (you aren't entered yet in this stage)
  const B = save.season.B, ids = Object.keys(B).filter(id => id !== 'you');
  const byBP = l => [...l].sort((a, b) => B[b].bp - B[a].bp || B[b].elo - B[a].elo);
  let field = e.invite || e.entry === 'royal' ? byBP(ids).slice(0, 16) : rng.shuffle(ids.filter(id => leagueOf(id) > 0)).slice(0, 16);
  if (e.entry === 'royal') field = [...(e.hosts || []), ...byBP(ids.filter(id => !(e.hosts || []).includes(id) && leagueOf(id) > 0))].slice(0, 16);
  let alive = byBP(field);
  while (alive.length > 1) {
    const next = [];
    for (let i = 0; i < alive.length / 2; i++) {
      const a = alive[i], b = alive[alive.length - 1 - i];
      const ar = e.arena === 'random' ? rng.pick(ATTRS6) : e.arena || null;
      const w = simMatch(a, b, { arena: ar }, rng); next.push(w === 1 ? b : a);
    }
    alive = next;
  }
  const win = alive[0]; B[win].titles.push(e.name); earn(win, BP.event[e.tier] || 0);
  save.season.eventsDone.push(e.name);
  msg('ISA', `${e.name} result. Winner: ${nameOf(win)}.`);
}
function nextSlot() {
  save.slot++;
  if (save.slot > 2) { closeDay(); save.day++; save.slot = 0; dayStart(); }
  store();
}
function dayStart() {
  const f = myFixture(save.day);
  if (save.day >= DAYS) { msg('ISA', 'The regular season is complete. Final standings are posted.'); return; }
  if (f && !f.played) msg('ISA', `League match today: ${nameOf('you')} vs ${nameOf(f.opp)}, round ${f.round}. Neutral Arena.`);
  const ev = save.season.events.find(e => e.day === save.day);
  if (ev) msg('ISA', `${ev.name} takes place today.`);
}
function rest() {
  if (mandatoryToday()) return say('ISA', 'You have a league match today. Please play it first.');
  do { closeDay(); save.day++; save.slot = 0; } while (save.day < DAYS && !mandatoryToday() && !save.season.events.some(e => e.day === save.day));
  dayStart(); store(); render();
}
function msg(from, text) { save.messages.unshift({ day: save.day, from, text }); save.messages = save.messages.slice(0, 80); }

// ---------- who's where (seeded per day and slot, so it doesn't change when you come back)
function presence() {
  const rng = makeRng(save.season.seed + save.day * 31 + save.slot * 7), me = leagueOf('you');
  const ids = Object.keys(save.season.B).filter(id => id !== 'you');
  const at = Object.fromEntries(PLACES.map(([k]) => [k, []]));
  for (const id of rng.shuffle(ids)) {
    const near = Math.abs(Math.min(leagueOf(id), 3) - Math.min(me, 3));
    if (rng() > [0.45, 0.25, 0.12, 0.06][near]) continue;
    const place = PLACES[rng.int(PLACES.length)][0]; if (at[place].length < 4) at[place].push(id);
  }
  return at;
}
function friendship(id) { return (save.friends || {})[id] || 0; }
function tone(id) { const f = friendship(id); return f >= 75 ? 'best' : f >= 40 ? 'friend' : f >= 10 ? 'acq' : 'cold'; }
const CHALLENGE = { best: 'Hey, there you are! Up for a match? I\'ve been testing a new combo.', friend: 'Got time for a battle? Let\'s see how your deck\'s coming along.',
  acq: 'You free? I could use a match.', cold: 'You\'re up next on my list. Let\'s get it over with.' };

// ---------- battles (battle.html), and their results coming back
function launch(opp, { key, arena = 'arena', league = false }) {
  const B = save.season.B, b = B[opp];
  save.pending = { key, opp, league, arena };
  store();
  const match = { mode: 'single', rules: 'nv', arena, story: { key }, players: [
    { id: 'you', name: save.you.name, team: teamOf('you') },
    { id: opp, name: nameOf(opp), team: teamOf(opp), ai: b.level, level: b.level }] };
  try { sessionStorage.setItem('marbles-match', JSON.stringify(match)); } catch {}
  location.href = 'battle.html';
}
function takeResult() {
  let res = null; try { res = JSON.parse(sessionStorage.getItem('marbles-story-result') || 'null'); } catch {}
  if (!res || !save.pending || res.key !== save.pending.key) return;
  sessionStorage.removeItem('marbles-story-result');
  const { opp, league, key } = save.pending, w = res.winner === 'draw' ? null : res.winner;
  const st = { you: res.players[0], [opp]: res.players[1] };
  const bp = record([['you'], [opp]], w, st, { league });
  if (league) save.season.done[key] = true;
  save.friends = save.friends || {};
  if (w === 1) save.friends[opp] = (save.friends[opp] || 0) - 2;   // losing to someone cools things a little
  const result = w === null ? 'Draw' : w === 0 ? 'Win' : 'Loss';
  msg('ISA', `${league ? 'League match' : 'Free match'} vs ${nameOf(opp)}: ${result}. ${bp.you} BP.`);
  if (league && w === 0 && !save.seen.firstLeagueWin) { save.seen.firstLeagueWin = true; save.queue = [...(save.queue || []), 'firstLeagueWin']; }
  save.pending = null;
  nextSlot();
}

// ---------- screens
function header() {
  const b = save.season.B.you, li = leagueOf('you');
  return `<div class="hdr"><div><b>Season 2</b> · Week ${Math.min(13, week(save.day))} · Day ${save.day + 1} · ${SLOTS[save.slot]}</div>
    <div>${save.season.names[li]} · ${b.wallet} BP</div></div>`;
}
function render(view = save.view || 'commons') {
  save.view = view;
  const f = mandatoryToday();
  let body = '';
  if (save.day >= DAYS) view = save.view = 'standings';
  if (view === 'commons') {
    const line = f ? `League match today against ${nameOf(f.opp)}. Arena 1 is reserved for you.`
      : `${SLOTS[save.slot]} slot. Tap a building to go there.`;
    body = `<div class="isa"><div class="isaname">ISA</div><div>${line}</div></div>
      ${f ? `<button class="big" id="playLeague">Play league match: vs ${nameOf(f.opp)}</button>` : ''}
      <div class="grid"><button id="rest">Rest</button><button data-go="calendar">Calendar</button></div>`;
  } else if (view === 'shop') {
    body = shopView();
  } else if (view.startsWith('arena')) {
    body = `<h2>${PLACES.find(p => p[0] === view)[1]}</h2>` + who(view) + back();
  } else if (view === 'standings') body = standings() + back();
  else if (view === 'calendar') body = calendar() + back();
  else if (view === 'messages') body = `<h2>Messages</h2>` + (save.messages.map(m => `<div class="msg"><span>Day ${m.day + 1} · ${m.from}</span>${m.text}</div>`).join('') || '<p>No messages.</p>') + back();
  else if (view === 'inventory') {
    ensureColl(); const y = save.you, t = y.deck, up = save.season.B.you.up;
    const nm = id => (cat.cards.find(c => c.id === id) || {}).name || '?';
    body = `<h2>My Room</h2><h3>Deck</h3>` +
      t.toys.map(x => { const d = cat.toys.find(q => q.id === x.id) || {}; const g = Math.min(G_CAP, (d.baseG || 0) + up * 10);
        return `<button class="row ${y.partner === x.id ? 'on' : ''}" data-partner="${x.id}"><span class="dot" style="background:${ATTR_COLOR[x.attr]}"></span>${d.name} · ${g}G${y.partner === x.id ? ' · Partner' : ''}</button>`; }).join('') +
      `<p class="note">Tap a Bakugan to name it your partner (just your favorite; it doesn't change how it battles).</p>
      <p>Gate cards: ${GATE_COLORS.map(c => nm((t.gates[c] || {}).id)).join(', ')}</p>
      <p>Ability cards: ${AB_COLORS.map(c => [t.abilities[c], ...((t.extra || {})[c] || [])].filter(Boolean).map(x => nm(x.id || x)).join(', ')).join(' · ')}</p>
      <button class="big" id="editDeck">Edit deck</button>
      <h3>Trap</h3>${y.coll.traps.length ? y.coll.traps.map(x => `<button class="row ${t.trap && t.trap.id === x.id && t.trap.attrs.join() === x.attrs.join() ? 'on' : ''}" data-usetrap="${x.uid}">${x.name} · ${x.attrs.map(cap).join(', ')}</button>`).join('') : '<p class="note">No Traps yet. The Shop sells them.</p>'}
      <p class="note">Collection: ${Object.keys(y.coll.toys).length} Bakugan, ${y.coll.cards.length} cards, ${y.coll.traps.length} Traps.</p>` + back();
  }
  { const mh = $('map'); if (mh && mh.parentNode === $('main')) document.body.appendChild(mh); }   // keep the 3D map when the page is redrawn
  $('main').innerHTML = header() + body;
  showMap(view === 'commons', f);
  $('main').querySelectorAll('[data-go]').forEach(b => b.onclick = () => render(b.dataset.go));
  $('main').querySelectorAll('[data-back]').forEach(b => b.onclick = () => render('commons'));
  $('main').querySelectorAll('[data-challenge]').forEach(b => b.onclick = () => challenge(b.dataset.challenge));
  $('main').querySelectorAll('[data-partner]').forEach(b => b.onclick = () => { save.you.partner = b.dataset.partner; store(); render('inventory'); });
  if ($('rest')) $('rest').onclick = rest;
  if ($('editDeck')) $('editDeck').onclick = editDeck;
  $('main').querySelectorAll('[data-usetrap]').forEach(e => e.onclick = () => { const x = save.you.coll.traps.find(q => q.uid === e.dataset.usetrap);
    save.you.deck.trap = { id: x.id, name: x.name, attrs: x.attrs }; store(); render('inventory'); });
  if ($('playLeague')) $('playLeague').onclick = () => launch(f.opp, { key: f.key, league: true });
  if (view === 'shop') shopWire();
  if ($('buy')) $('buy').onclick = () => { const b = save.season.B.you, c = boostCost(); if (b.wallet >= c && b.up - b.startUp < UPS_PER_SEASON) { b.wallet -= c; b.up++; msg('ISA', `G-Power boost purchased. Your Bakugan are now +${b.up}.`); store(); render('shop'); } };
  store();
}
// ---------- the floating boards: short versions on the map, full versions in a popup
function teamRanks() {
  const B = save.season.B;
  return TEAMS.map(t => { const m = t.ids.filter(id => B[id]); return { ...t, m, elo: m.reduce((n, id) => n + B[id].elo, 0) / (m.length || 1) }; })
    .filter(t => t.m.length >= 3).sort((a, b) => b.elo - a.elo);
}
function eloRanks() { const B = save.season.B; return Object.keys(B).sort((a, b) => B[b].elo - B[a].elo); }
function newsItems() {
  const out = [], next = save.season.events.filter(e => e.day >= save.day).sort((a, b) => a.day - b.day)[0];
  for (const x of salesOn()) out.push({ text: `Sale: ${saleText(x)}`, hot: true });
  const soon = saleSchedule().filter(x => x.from > save.day && x.from <= save.day + 3);
  for (const x of soon.slice(0, 2)) out.push({ text: `${x.from - save.day === 1 ? 'Tomorrow' : `In ${x.from - save.day} days`}: ${saleText(x)}` });
  if (next) out.push({ text: next.day === save.day ? `Today: ${next.name}` : `${next.name} in ${next.day - save.day} day${next.day - save.day > 1 ? 's' : ''}` });
  for (const name of [...save.season.eventsDone].reverse().slice(0, 2)) { const w = (save.season.B && Object.values(save.season.B).find(b => b.titles.includes(name))); if (w) out.push({ text: `${w.name} won the ${name}` }); }
  const top = eloRanks()[0]; out.push({ text: `No. 1 in Interspace: ${nameOf(top)}` });
  const lead = teamRanks()[0]; if (lead) out.push({ text: `Top team: ${lead.name}` });
  return out;
}
function boards() {
  const B = save.season.B, li = leagueOf('you');
  const lg = [...save.season.leagues[li]].sort((a, b) => B[b].lg.pts - B[a].lg.pts || B[b].lg.bp - B[a].lg.bp);
  const me = lg.indexOf('you');
  return [
    { key: 'news', title: 'Interspace News', color: 0xf08a24, lines: newsItems() },
    { key: 'league', title: save.season.names[li], color: 0x2f8fd8, lines: [...lg.slice(0, 5).map((id, i) => ({ text: `${i + 1}. ${nameOf(id)}  ${B[id].lg.pts} pts`, hot: id === 'you' })),
      ...(me >= 5 ? [{ text: `${me + 1}. You  ${B.you.lg.pts} pts`, hot: true }] : [])] },
    { key: 'rankings', title: 'Rankings', color: 0xd94a3a, lines: eloRanks().slice(0, 6).map((id, i) => ({ text: `${i + 1}. ${nameOf(id)}  ${Math.round(B[id].elo)}`, hot: id === 'you' })) },
    { key: 'teams', title: 'Team Rankings', color: 0x8a5cc7, lines: teamRanks().map((t, i) => `${i + 1}. ${t.name}  ${Math.round(t.elo)}`) },
  ];
}
function boardPopup(key) {
  const B = save.season.B, el = document.createElement('div'); el.className = 'pop';
  let h = '';
  if (key === 'news') h = `<h2>Interspace News</h2>` + newsItems().map(n => `<p class="${n.hot ? 'sale' : ''}">${n.text}</p>`).join('');
  else if (key === 'league') h = standings();
  else if (key === 'rankings') { const ids = eloRanks(), mi = ids.indexOf('you');
    h = `<h2>Rankings</h2><p class="note">Everyone in Interspace, by Elo. You're No. ${mi + 1}.</p><table><tr><th></th><th>Brawler</th><th>Elo</th><th>W-L</th></tr>` +
      ids.map((id, i) => `<tr class="${id === 'you' ? 'me' : ''}"><td>${i + 1}</td><td>${nameOf(id)}</td><td>${Math.round(B[id].elo)}</td><td>${B[id].rec.w}-${B[id].rec.l}</td></tr>`).join('') + '</table>'; }
  else if (key === 'teams') h = `<h2>Team Rankings</h2><p class="note">A team's ranking is its members' average Elo.</p>` + teamRanks().map((t, i) =>
      `<div class="card"><b>${i + 1}. ${t.name}</b> · ${Math.round(t.elo)}<div class="note">${t.m.map(id => `${nameOf(id)} (${Math.round(B[id].elo)})`).join(', ')}</div></div>`).join('');
  el.innerHTML = `<div class="popin">${h}<button class="big" data-close>Close</button></div>`;
  el.onclick = e => { if (e.target === el || e.target.dataset.close !== undefined) el.remove(); };
  document.body.appendChild(el);
}
// ---------- The Shop: boosts, Bakugan, Gate cards, Ability cards, Traps. Locked items show which league unlocks them.
let shopTab = 'boost', shopAttr = null, shopColor = null, trapPick = { id: null, attrs: [] }, STOCK = null;
const LOCK = n => `<span class="lock">League ${n}+</span>`;
const salePrice = (price, item) => Math.round(price * (100 - discount(item)) / 100);
function priceTag(price, item) { const p = salePrice(price, item); return p < price ? `<b>${p} BP</b> <s>${price}</s>` : `<b>${price} BP</b>`; }
function shopView() {
  ensureColl(); STOCK = STOCK || stock(cat);
  const b = save.season.B.you, L = leagueNum(), y = save.you;
  shopAttr = shopAttr || y.attr;
  const tabs = [['boost', 'Boosts'], ['bakugan', 'Bakugan'], ['gate', 'Gate cards'], ['ability', 'Ability cards'], ['trap', 'Traps']];
  let h = `<h2>The Shop</h2><p class="note">You have <b>${b.wallet} BP</b>. You're in ${save.season.names[leagueOf('you')]}: higher leagues unlock stronger stock.</p>` +
    salesOn().map(x => `<p class="sale">On sale: ${saleText(x)}${x.to > save.day ? ` (until day ${x.to + 1})` : ' (last day)'}</p>`).join('') +
    `<div class="tabs">${tabs.map(([k, n]) => `<button class="${shopTab === k ? 'on' : ''}" data-stab="${k}">${n}</button>`).join('')}</div>`;
  if (shopTab === 'boost') {
    const c = boostCost(), full = upCost('you'), left = UPS_PER_SEASON - (b.up - b.startUp);
    h += `<p>G-Power boost: +10G to every Bakugan you own.</p><p>Cost: ${priceTag(full, { kind: 'upgrades' })}. Boosts left this season: ${left}.</p>
      <button class="big" id="buy" ${b.wallet < c || left <= 0 ? 'disabled' : ''}>Buy boost</button>`;
  } else if (shopTab === 'bakugan') {
    h += `<div class="tabs">${ATTRS6.map(a => `<button class="${shopAttr === a ? 'on' : ''}" data-sattr="${a}" style="border-color:${ATTR_COLOR[a]}">${cap(a)}</button>`).join('')}</div>` +
      STOCK.toys.filter(x => x.t.attributes[shopAttr]).map(x => {
        const own = y.coll.toys[tkey(x.t.id, shopAttr)], it = { kind: 'bakugan', attr: shopAttr }, lock = x.tier < L;
        return `<div class="item ${lock ? 'locked' : ''}"><span class="dot" style="background:${ATTR_COLOR[shopAttr]}"></span><span class="nm">${x.t.name} <small>${x.t.baseG}G</small></span>
          ${own ? '<span class="own">Owned</span>' : lock ? LOCK(x.tier) : `${priceTag(x.price, it)} <button data-buy="toy:${x.t.id}" ${b.wallet < salePrice(x.price, it) ? 'disabled' : ''}>Buy</button>`}</div>`; }).join('');
  } else if (shopTab === 'gate' || shopTab === 'ability') {
    const cols = shopTab === 'gate' ? GATE_COLORS : AB_COLORS; if (!cols.includes(shopColor)) shopColor = cols[0];
    const list = (shopTab === 'gate' ? STOCK.gates : STOCK.abilities).filter(x => x.c.color === shopColor).sort((p, q) => q.tier - p.tier || p.price - q.price);
    h += `<div class="tabs">${cols.map(c => `<button class="${shopColor === c ? 'on' : ''}" data-scol="${c}">${cap(c)}</button>`).join('')}</div>` +
      list.map(x => { const own = y.coll.cards.includes(x.c.id), it = { kind: shopTab, color: x.c.color }, lock = x.tier < L;
        const sub = shopTab === 'gate' ? Object.entries(x.c.bonus).filter(([, v]) => v).map(([k, v]) => `${cap(k).slice(0, 3)} ${v}`).join(' · ') : (x.c.text || '');
        return `<div class="item ${lock ? 'locked' : ''}"><span class="nm">${x.c.name}<small>${sub}</small></span>
          ${own ? '<span class="own">Owned</span>' : lock ? LOCK(x.tier) : `${priceTag(x.price, it)} <button data-buy="card:${x.c.id}" ${b.wallet < salePrice(x.price, it) ? 'disabled' : ''}>Buy</button>`}</div>`; }).join('');
  } else if (shopTab === 'trap') {
    const capN = trapAttrCap(L), n = Math.max(1, trapPick.attrs.length), price = priceTrap(n), it = { kind: 'trap' };
    h += `<p class="note">A Trap covers up to <b>${capN}</b> attribute${capN > 1 ? 's' : ''} in your league${L > 1 ? ' (League ' + (L - 1) + ' allows more)' : ''}. Each extra attribute costs more. Traps are used in New Vestroia matches.</p>` +
      STOCK.traps.map(x => `<button class="row ${trapPick.id === x.t.id ? 'on' : ''}" data-trap="${x.t.id}">${x.t.name}</button>`).join('') +
      (trapPick.id ? `<p>Attributes (${trapPick.attrs.length}/${capN}):</p><div class="tabs">${ATTRS6.map(a => `<button class="${trapPick.attrs.includes(a) ? 'on' : ''}" data-tattr="${a}" style="border-color:${ATTR_COLOR[a]}">${cap(a)}</button>`).join('')}</div>
        <p>Cost: ${priceTag(price, it)}</p><button class="big" id="buyTrap" ${!trapPick.attrs.length || b.wallet < salePrice(price, it) ? 'disabled' : ''}>Buy Trap</button>` : '');
  }
  return h + who('shop') + back();
}
function shopWire() {
  const m = $('main'), b = save.season.B.you, y = save.you;
  m.querySelectorAll('[data-stab]').forEach(e => e.onclick = () => { shopTab = e.dataset.stab; render('shop'); });
  m.querySelectorAll('[data-sattr]').forEach(e => e.onclick = () => { shopAttr = e.dataset.sattr; render('shop'); });
  m.querySelectorAll('[data-scol]').forEach(e => e.onclick = () => { shopColor = e.dataset.scol; render('shop'); });
  m.querySelectorAll('[data-trap]').forEach(e => e.onclick = () => { trapPick = { id: e.dataset.trap, attrs: [] }; render('shop'); });
  m.querySelectorAll('[data-tattr]').forEach(e => e.onclick = () => { const a = e.dataset.tattr, i = trapPick.attrs.indexOf(a);
    if (i >= 0) trapPick.attrs.splice(i, 1); else if (trapPick.attrs.length < trapAttrCap(leagueNum())) trapPick.attrs.push(a); render('shop'); });
  m.querySelectorAll('[data-buy]').forEach(e => e.onclick = () => {
    const [kind, id] = e.dataset.buy.split(':');
    if (kind === 'toy') { const x = STOCK.toys.find(q => q.t.id === id), p = salePrice(x.price, { kind: 'bakugan', attr: shopAttr });
      if (x.tier < leagueNum() || b.wallet < p) return; b.wallet -= p; y.coll.toys[tkey(id, shopAttr)] = {};
      msg('ISA', `${x.t.name} (${cap(shopAttr)}) added to your collection for ${p} BP. Add it to your deck from My Room.`); }
    else { const x = [...STOCK.gates, ...STOCK.abilities].find(q => q.c.id === id), p = salePrice(x.price, { kind: x.c.type === 'gate' ? 'gate' : 'ability', color: x.c.color });
      if (x.tier < leagueNum() || b.wallet < p || y.coll.cards.includes(id)) return; b.wallet -= p; y.coll.cards.push(id);
      msg('ISA', `${x.c.name} added to your collection for ${p} BP.`); }
    store(); render('shop');
  });
  if ($('buyTrap')) $('buyTrap').onclick = () => {
    const T = STOCK.traps.find(q => q.t.id === trapPick.id).t, p = salePrice(priceTrap(trapPick.attrs.length), { kind: 'trap' });
    if (b.wallet < p || !trapPick.attrs.length || trapPick.attrs.length > trapAttrCap(leagueNum())) return;
    b.wallet -= p; y.coll.traps.push({ uid: 'tr' + Date.now(), id: T.id, name: T.name, attrs: [...trapPick.attrs] });
    if (!y.deck.trap) y.deck.trap = { id: T.id, name: T.name, attrs: [...trapPick.attrs] };
    msg('ISA', `Trap ${T.name} (${trapPick.attrs.map(cap).join(', ')}) purchased for ${p} BP.`); trapPick = { id: null, attrs: [] }; store(); render('shop');
  };
}
let map = null, mapKey = '';
function showMap(on, f) {
  const host = $('map'), key = `${save.day}-${save.slot}-${!!f}`;
  if (!on) { host.hidden = true; document.body.appendChild(host); return; }
  host.hidden = false; $('main').firstElementChild.after(host);
  if (map && mapKey === key) return;
  const yaw = map?.yaw; if (map) map.dispose();
  const counts = f ? {} : Object.fromEntries(Object.entries(presence()).map(([k, v]) => [k, v.length]));
  if (save.messages.length) counts.messages = Math.min(save.messages.length, 99);
  map = mountCommons(host, { slot: SLOTS[save.slot], counts, highlight: f ? 'arena1' : null, yaw, boards: boards(),
    onPick: k => { if (k.startsWith('board:')) return boardPopup(k.slice(6)); if (k === 'shop' && !f) { ensureColl(); store(); location.href = 'room.html?story=1'; return; } if (f && k === 'arena1') launch(f.opp, { key: f.key, league: true }); else render(k); } });
  mapKey = key;
}
// deck editor (the same one as My Room in the main game), limited to what you own
async function editDeck() {
  const y = save.you, d = y.deck, idOf = x => x && (x.id || x);
  const owned = { toys: y.coll.toys, cards: y.coll.cards };
  const start = { name: y.name, toys: d.toys.map(x => ({ id: x.id, attr: x.attr })), gates: Object.fromEntries(GATE_COLORS.map(c => [c, idOf(d.gates[c])])),
    abilities: Object.fromEntries(AB_COLORS.map(c => [c, idOf(d.abilities[c])])), extra: Object.fromEntries(AB_COLORS.map(c => [c, ((d.extra || {})[c] || []).map(idOf)])) };
  $('main').hidden = true; $('map').hidden = true;
  const r = await setupTeams(cat, PACK, [{ id: 'you', name: y.name }, null], start, owned, true);
  $('main').hidden = false;
  if (r && r.deck) {
    const card = id => { const c = cat.cards.find(q => q.id === id); return c ? { id: c.id, name: c.name } : null; };
    const full = r.deck.toys.length === 3 && GATE_COLORS.every(c => r.deck.gates[c]) && AB_COLORS.every(c => r.deck.abilities[c]);
    if (full) {
      y.deck = { toys: r.deck.toys.map(x => ({ id: x.id, attr: x.attr, name: (cat.toys.find(q => q.id === x.id) || {}).name })),
        gates: Object.fromEntries(GATE_COLORS.map(c => [c, card(r.deck.gates[c])])), abilities: Object.fromEntries(AB_COLORS.map(c => [c, card(r.deck.abilities[c])])),
        extra: Object.fromEntries(AB_COLORS.map(c => [c, ((r.deck.extra || {})[c] || []).map(card).filter(Boolean)])), trap: d.trap };
      if (!y.deck.toys.some(x => x.id === y.partner)) y.partner = null;
      store();
    }
  }
  render('inventory');
}
const back = () => `<button class="back" data-back>Back to The Commons</button>`;
function who(place) {
  if (mandatoryToday()) return `<p class="note">You have a league match today. Free matches open up after it.</p>`;
  const ids = presence()[place] || [];
  if (!ids.length) return `<p class="note">Nobody's here right now.</p>`;
  return ids.map(id => { const b = save.season.B[id];
    return `<div class="card"><div><b>${nameOf(id)}</b> · ${save.season.names[leagueOf(id)]} · ${b.rec.w}-${b.rec.l}</div>
      <div class="say">“${CHALLENGE[tone(id)]}”</div><button data-challenge="${id}">Challenge</button></div>`; }).join('');
}
function challenge(id) {
  const rng = makeRng(save.season.seed + save.day * 13 + save.slot), arena = rng() < 0.6 ? 'field_' + mainAttr(id) : 'arena';
  const fieldName = arena === 'arena' ? 'the neutral Arena' : `the ${cap(mainAttr(id))} Field`;
  say('ISA', `Challenge from ${nameOf(id)}. Arena: ${fieldName}. Free match: BP and your career record only.`, [
    ['Accept', () => launch(id, { key: `F${save.day}-${save.slot}-${id}`, arena })], ['Decline', () => closeDialog()]]);
}
function table(li) {
  const B = save.season.B, ids = [...save.season.leagues[li]].sort((a, b) => B[b].lg.pts - B[a].lg.pts || B[b].lg.bp - B[a].lg.bp);
  return `<h3>${save.season.names[li]}</h3><table><tr><th></th><th>Brawler</th><th>Pts</th><th>W-L-D</th><th>Elo</th></tr>` +
    ids.map((id, i) => `<tr class="${id === 'you' ? 'me' : ''}"><td>${i + 1}</td><td>${nameOf(id)}</td><td>${B[id].lg.pts}</td><td>${B[id].lg.w}-${B[id].lg.l}-${B[id].lg.d}</td><td>${Math.round(B[id].elo)}</td></tr>`).join('') + '</table>';
}
function standings() {
  const li = leagueOf('you'), order = [li, ...save.season.leagues.map((_, i) => i).filter(i => i !== li)];
  return `<h2>Standings</h2>` + order.map(table).join('');
}
function calendar() {
  const rows = [];
  for (let w = 1; w <= 13; w++) {
    const days = [...Array(7)].map((_, i) => (w - 1) * 7 + i);
    const lr = days.filter(d => roundOn(d) >= 0).map(d => { const f = myFixture(d); return f ? `League round ${f.round} vs ${nameOf(f.opp)} (day ${d + 1})${f.played ? ' ✓' : ''}` : `League round (day ${d + 1})`; });
    const ev = save.season.events.filter(e => days.includes(e.day)).map(e => `${e.name} (day ${e.day + 1})${save.season.eventsDone.includes(e.name) ? ' ✓' : ''}`);
    rows.push(`<div class="wk ${week(save.day) === w ? 'now' : ''}"><b>Week ${w}</b>${[...lr, ...ev].map(t => `<div>${t}</div>`).join('') || '<div class="note">Open week</div>'}</div>`);
  }
  return `<h2>Calendar</h2>` + rows.join('');
}

// ---------- dialogue box (ISA over the intercom, brawlers in person)
let dq = [];
function say(who, text, choices = null) { dq.push({ who, text, choices }); if (dq.length === 1) showLine(); }
function showLine() {
  const l = dq[0]; if (!l) { $('dlg').hidden = true; return; }
  $('dlg').hidden = false;
  $('dlg').innerHTML = `<div class="dname ${l.who === 'ISA' ? 'isa2' : ''}">${l.who}</div><div class="dtext">${l.text}</div>` +
    (l.choices ? `<div class="dch">${l.choices.map(([t], i) => `<button data-c="${i}">${t}</button>`).join('')}</div>` : `<div class="dnext">▼</div>`);
  if (l.choices) $('dlg').querySelectorAll('[data-c]').forEach(b => b.onclick = e => { e.stopPropagation(); const fn = l.choices[+b.dataset.c][1]; dq.shift(); showLine(); fn(); });
  else $('dlg').onclick = () => { dq.shift(); $('dlg').onclick = null; showLine(); };
}
function closeDialog() { dq = []; $('dlg').hidden = true; }
const lines = (who, list, then) => { list.forEach((t, i) => say(who, t, i === list.length - 1 && then ? [['Continue', then]] : null)); };

// ---------- opening scenes (S2-01 to S2-04, claude/story-scripts.md)
function opening(s1) {
  lines('ISA', ['Connection established. Welcome to Bakugan Interspace.',
    'I am ISA, the Interspace System Assistant. I manage the arenas, the schedules and the rankings.',
    'Our records show your last battle was before the Bakugan returned to New Vestroia. Welcome back.',
    'Interspace opened to the public this season. Humans and Vestals battle here with their own partners and with synthetic Bakugan made by Interspace.'], () => {
    $('dlg').hidden = false;
    $('dlg').innerHTML = `<div class="dname isa2">ISA</div><div class="dtext">Please confirm your brawler name.</div><input id="nm" maxlength="14" placeholder="Name"><div class="dch"><button id="nmok">Confirm</button></div>`;
    $('nmok').onclick = () => { const name = ($('nm').value || '').trim() || 'Brawler'; dq = []; pickStarter(s1, name); };
  });
}
function pickStarter(s1, name) {
  say('ISA', `Thank you, ${name}. Registration is complete.`);
  say('ISA', 'Every new brawler receives a synthetic starter set: three Bakugan, three Gate cards and three Ability cards.');
  say('ISA', 'Please choose the attribute you want to start with.', ATTRS6.map(a => [`${cap(a)} (${STARTERS[a].toys.map(t => t.name).join(', ')})`, () => {
    save = { v: 1, you: { name, attr: a, partner: null }, day: 0, slot: 0, view: 'commons', messages: [], seen: {}, friends: {}, season: newSeason(s1, name, a) };
    store();
    say('ISA', `${cap(a)} set registered. Your Bakugan are in your inventory.`);
    say('ISA', 'You may name one Bakugan as your partner. This is a personal choice. It does not change how it battles.',
      [...STARTERS[a].toys.map(t => [t.name, () => { save.you.partner = t.id; store(); say('ISA', `${t.name} is registered as your partner. You can change this at any time from your inventory.`); placement(); }]),
        ['Decide later', () => { say('ISA', 'Understood. You can choose a partner from your inventory at any time.'); placement(); }]]);
  }]));
}
function placement() {
  const div = save.season.names[leagueOf('you')].split('Division ')[1];
  say('ISA', 'Interspace has four leagues. League 1 holds the top brawlers from last season.');
  say('ISA', `New brawlers start in League 4. This season League 4 has twenty-four brawlers in three divisions.`);
  say('ISA', `You are in Division ${div}. Your first league match is on the calendar. The date is in your messages.`);
  say('ISA', 'The top four of each division move up at the end of the season. Nobody moves down this season.');
  say('ISA', 'All rankings are earned. Every result is recorded as it happened.');
  say('ISA', 'Each day has three slots: Morning, Afternoon and Evening. Brawlers are in the arenas and the Shop at different times. You may challenge anyone you find.');
  say('ISA', 'Free matches earn BP and count on your career record. League matches and events are fixed. I will remind you before each one.');
  say('ISA', `If you would like to skip ahead, choose Rest. I will wake you before your next fixed match. Welcome to The Commons, ${save.you.name}.`, [['Enter The Commons', () => {
    const first = LEAGUE_DAYS.map(myFixture).find(Boolean);
    if (first) msg('ISA', `Your first league match: vs ${nameOf(first.opp)} on day ${LEAGUE_DAYS[first.round - 1] + 1}.`);
    msg('ISA', 'Open I starts this week. Results will be posted in your messages.');
    dayStart(); store(); render('commons');
  }]]);
}

// ---------- start
async function start() {
  let pack = null; try { pack = await Pack.fromDevice(); } catch {}
  if (!pack) { $('main').innerHTML = '<p>No asset pack on this device yet. Go back and load it first.</p>'; return; }
  cat = pack.catalog; PACK = pack;
  save = load();
  const s1 = await (await fetch('data/season1.json')).json();
  if (!save) { $('main').innerHTML = '<div class="hdr"><b>Bakugan Interspace</b></div>'; opening(s1); return; }
  takeResult();
  render(save.view === 'shop' || (save.view || '').startsWith('arena') ? 'commons' : save.view);
  for (const q of save.queue || []) if (q === 'firstLeagueWin') { say('ISA', `First league win recorded. Three points to ${save.you.name}.`); say('ISA', `Your name is now on the ${save.season.names[leagueOf('you')]} table.`); }
  save.queue = []; store();
}
$('newgame').onclick = () => { if (confirm('Start a new story? This erases your current one.')) { localStorage.removeItem(KEY); location.reload(); } };
start();
