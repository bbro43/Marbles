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

const $ = id => document.getElementById(id);
const KEY = 'marbles-story';
const SLOTS = ['Morning', 'Afternoon', 'Evening'];
const DAYS = 91;
const LEAGUE_DAYS = [0, 2, 4, 6, 8, 10, 11].map(w => w * 7 + 2);   // one league round a week (as js/season.js)
const PLACES = [['arena1', 'Arena 1'], ['arena2', 'Arena 2'], ['arena3', 'Arena 3'], ['arena4', 'Arena 4'], ['shop', 'The Shop']];
const ATTR_COLOR = { pyrus: '#e2453c', aquos: '#3b82e0', subterra: '#b07a3a', haos: '#e8d24a', darkus: '#8a4fc7', ventus: '#3fb56a' };
const cap = s => s[0].toUpperCase() + s.slice(1);
const NAME = { nv_dan: 'Dan', nv_shun: 'Shun', nv_marucho: 'Marucho', chanlee: 'Chan Lee' };

let cat = null, save = null;
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } };
const store = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch {} };

// ---------- the season
const teamDef = id => id === 'you' ? null : AI_TEAMS[id] || INTERSPACE[id];
const nameOf = id => id === 'you' ? save.you.name : NAME[id] || (INTERSPACE[id] || {}).name || cap(id);
function teamOf(id) {   // the deck for this brawler right now (level cards + this season's upgrades)
  const b = save.season.B[id];
  if (id === 'you') return { ...STARTERS[save.you.attr], upgrades: b.up };
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
  }
  } else if (view === 'shop') {
    const c = upCost('you'), b = save.season.B.you, left = UPS_PER_SEASON - (b.up - b.startUp);
    body = `<h2>The Shop</h2><p>G-Power boost: +10G to all three of your Bakugan.</p>
      <p>Cost: <b>${c} BP</b>. You have ${b.wallet} BP. Boosts left this season: ${left}.</p>
      <button class="big" id="buy" ${b.wallet < c || left <= 0 ? 'disabled' : ''}>Buy boost</button>` + who('shop') + back();
  } else if (view.startsWith('arena')) {
    body = `<h2>${PLACES.find(p => p[0] === view)[1]}</h2>` + who(view) + back();
  } else if (view === 'standings') body = standings() + back();
  else if (view === 'calendar') body = calendar() + back();
  else if (view === 'messages') body = `<h2>Messages</h2>` + (save.messages.map(m => `<div class="msg"><span>Day ${m.day + 1} · ${m.from}</span>${m.text}</div>`).join('') || '<p>No messages.</p>') + back();
  else if (view === 'inventory') {
    const t = teamOf('you');
    body = `<h2>Inventory</h2><p>Tap a Bakugan to name it your partner. (Just your favorite. It doesn't change how it battles.)</p>` +
      t.toys.map(x => { const d = cat.toys.find(y => y.id === x.id) || {}; const g = Math.min(G_CAP, (d.baseG || 0) + save.season.B.you.up * 10);
        return `<button class="row ${save.you.partner === x.id ? 'on' : ''}" data-partner="${x.id}"><span class="dot" style="background:${ATTR_COLOR[x.attr]}"></span>${d.name} · ${g}G${save.you.partner === x.id ? ' · Partner' : ''}</button>`; }).join('') + back();
  }
  $('main').innerHTML = header() + body;
  showMap(view === 'commons', f);
  $('main').querySelectorAll('[data-go]').forEach(b => b.onclick = () => render(b.dataset.go));
  $('main').querySelectorAll('[data-back]').forEach(b => b.onclick = () => render('commons'));
  $('main').querySelectorAll('[data-challenge]').forEach(b => b.onclick = () => challenge(b.dataset.challenge));
  $('main').querySelectorAll('[data-partner]').forEach(b => b.onclick = () => { save.you.partner = b.dataset.partner; store(); render('inventory'); });
  if ($('rest')) $('rest').onclick = rest;
  if ($('playLeague')) $('playLeague').onclick = () => launch(f.opp, { key: f.key, league: true });
  if ($('buy')) $('buy').onclick = () => { const b = save.season.B.you, c = upCost('you'); if (b.wallet >= c) { b.wallet -= c; b.up++; msg('ISA', `G-Power boost purchased. Your Bakugan are now +${b.up}.`); store(); render('shop'); } };
  store();
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
  map = mountCommons(host, { slot: SLOTS[save.slot], counts, highlight: f ? 'arena1' : null, yaw,
    onPick: k => { if (f && k === 'arena1') launch(f.opp, { key: f.key, league: true }); else render(k); } });
  mapKey = key;
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
  cat = pack.catalog;
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
