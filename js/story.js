// Story mode: Interspace, played a day at a time from The Commons, season after season.
// - Days: three slots (Morning, Afternoon, Evening) and Rest. League match days are fixed; the rest of each league plays itself.
// - Events (Opens, Royal Challenge, Field Open, Major, Masters, Finale): you enter and play your own matches; everything else is simulated.
// - End of season: promotion (Season 2's special rule, then top 2 up / bottom 2 down), the next season, and the upgrade reset every 4 seasons.
// - Social: teams (fixed show teams, computer teams that form, your own), friendship, rivals, trade offers.
// - Scenes: scene(key) plays a conversation from SCENES (claude/story-scripts.md). Models for scenes: still to build (search "MODELS GO HERE").
import { Pack } from './pack.js';
import { makeRng, playMatch, buildPlayer } from './sim.js';
import { BP, MAX_UP, UPS_PER_SEASON, ATTRS6 } from './season.js';
import { setupSeason2, LEAGUE_NAMES, season2Events, promoteSeason2, VEXOS, NEWCOMERS } from './season2.js';
import { PRIZE_BAND } from './season.js';
import { AI_TEAMS, INTERSPACE, STARTERS } from './aiteams.js';
import { gPrice, G_CAP } from './profiles.js';
import { mountCommons } from './commons3d.js';
import { playLogin } from './login3d.js';
import { buildAvatar, DEFAULT_LOOK } from './avatar.js';
import { mountTeamRoom } from './teamroom3d.js';
import { stock, trapAttrCap, priceTrap, salesFor, salesOnDay, discountOn, saleText, isSoldToy } from './storyshop.js';
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
  if (id === 'you') {   // each of your Bakugan has its own upgrades (bought in the Shop): G-Power boosts and stat upgrades
    ensureColl(); migrateUps();
    return { ...save.you.deck, upgrades: 0, toys: save.you.deck.toys.map(x => { const u = save.you.coll.toys[tkey(x.id, x.attr)] || {}; return { ...x, up: u.g || 0, st: u.st || {} }; }) };
  }
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
  const y = save.you; if (y.coll && y.deck) { if (save.season && save.season.B && save.season.B.you) migrateUps(); return; }
  const st = STARTERS[y.attr];
  y.deck = JSON.parse(JSON.stringify({ toys: st.toys, gates: st.gates, abilities: st.abilities, extra: st.extra || {}, trap: null }));
  y.coll = { toys: Object.fromEntries(st.toys.map(t => [tkey(t.id, t.attr), {}])),
    cards: [...new Set([...Object.values(st.gates), ...Object.values(st.abilities), ...Object.values(st.extra || {}).flat()].map(c => c.id))], traps: [] };
}
// before Nov 20, boosts were bought for the whole team (B.you.up); move them onto each Bakugan you own, once
function migrateUps() {
  const b = save.season.B.you; if (!b.up || save.you.upsMoved) return;
  for (const k of Object.keys(save.you.coll.toys)) { const u = save.you.coll.toys[k] = save.you.coll.toys[k] || {}; u.g = (u.g || 0) + b.up; }
  b.up = 0; b.startUp = 0; save.you.upsMoved = true;
}
// League 1 is the top. League 4 covers all three divisions.
const leagueNum = (id = 'you') => Math.min(4, leagueOf(id) + 1);

// ---------- teams (story-mode-design.md). Teams don't change battles. 3+ members = a team room (PLACEHOLDER place) and a spot in
// Team Rankings (the members' average Elo). Max 6. The four show teams are fixed; computer brawlers form teams from week 3; you can
// create one, invite brawlers, accept invites, and leave (-25 friendship with every former teammate).
const FIXED_TEAMS = [
  { id: 'vexos', name: 'Vexos', ids: ['spectra', 'gus', 'mylene', 'volt', 'shadow', 'lync'] },
  { id: 'brawlers', name: 'Battle Brawlers', ids: ['nv_dan', 'nv_shun', 'nv_marucho', 'runo', 'julie'] },
  { id: 'resistance', name: 'Resistance', ids: ['ace', 'mira', 'baron'] },
  { id: 'masq', name: "Masquerade's team", ids: ['masquerade', 'klaus', 'chanlee', 'julio', 'komba', 'billy'] },
];
// our own team names for computer teams
const TEAM_NAMES = ['Nova Squad', 'Iron Comets', 'Sky Breakers', 'Pulse Riders', 'Storm Circuit', 'Crimson Orbit', 'Tidal Core', 'Granite Edge',
  'Solar Flux', 'Shadow Relay', 'Ember Line', 'Gale Force', 'Prism Pact', 'Static Crew', 'Quartz Guard', 'Vortex Union', 'Neon Drift', 'Echo Rally'];
const TEAM_MAX = 6, TEAM_ROOM = 3;
function teamsList() { if (!save.teams) save.teams = FIXED_TEAMS.map(t => ({ ...t, ids: [...t.ids], fixed: true })); return save.teams; }
const teamWith = id => teamsList().find(t => t.ids.includes(id)) || null;
const myTeam = () => teamWith('you');
const oppositeTeams = id => { const a = myTeam(), b = teamWith(id); return !!(a && b && a !== b); };
// computer teams form from week 3: free brawlers group up with others in their league or division
function formTeams(rng) {
  if (week(save.day) < 3) return;
  const taken = new Set(teamsList().flatMap(t => t.ids)), free = Object.keys(save.season.B).filter(id => id !== 'you' && !taken.has(id));
  const byLeague = {}; free.forEach(id => (byLeague[leagueOf(id)] = byLeague[leagueOf(id)] || []).push(id));
  let made = 0;
  for (const li of rng.shuffle(Object.keys(byLeague))) {
    const pool = rng.shuffle(byLeague[li]);
    while (pool.length >= 3 && made < 2 && rng() < 0.6) {
      const size = pool.length >= 4 && rng() < 0.5 ? 4 : 3, used = new Set(teamsList().map(t => t.name));
      const name = TEAM_NAMES.find(n => !used.has(n)) || `Team ${teamsList().length + 1}`;
      teamsList().push({ id: 't' + save.day + '_' + made, name, ids: pool.splice(0, size), fixed: false }); made++;
    }
  }
  if (made) msg('ISA', `New team${made > 1 ? 's' : ''} registered this week: ${teamsList().slice(-made).map(t => t.name).join(', ')}.`);
}
// a computer team with an opening may invite you (more likely if you're friends with its members)
function teamInvites(rng) {
  if (myTeam() || week(save.day) < 2) return;
  const open = teamsList().filter(t => !t.fixed && t.ids.length < TEAM_MAX);
  for (const t of rng.shuffle(open)) {
    const f = t.ids.reduce((n, id) => n + friendship(id), 0) / t.ids.length, chance = f >= 40 ? 0.6 : f >= 10 ? 0.3 : f >= 0 ? 0.12 : 0;
    if (rng() < chance) { addOffer({ type: 'team', team: t.id, from: t.ids[0] }); msg(nameOf(t.ids[0]), `${t.name} has an opening. Want to join us? (Teams screen)`); scene('teamInvite', { team: t.id }); return; }
  }
}
function addOffer(o) { save.offers = (save.offers || []).filter(x => !(x.type === o.type && x.team === o.team)); save.offers.push({ ...o, day: save.day }); }
function joinTeam(tid) {
  const t = teamsList().find(x => x.id === tid); if (!t || t.ids.length >= TEAM_MAX || myTeam()) return false;
  t.ids.push('you'); save.offers = (save.offers || []).filter(x => x.team !== tid); bondTeam(t);
  msg('ISA', `You joined ${t.name}.`); if (t.ids.length >= TEAM_ROOM) scene('teamRoomOpen', { team: t.id, joined: t.ids.length > TEAM_ROOM });
  return true;
}
function leaveTeam() {
  const t = myTeam(); if (!t) return;
  t.ids = t.ids.filter(id => id !== 'you'); t.ids.forEach(id => befriend(id, -25, true));
  if (!t.ids.length || (t.mine && t.ids.length < 2)) save.teams = teamsList().filter(x => x !== t);
  msg('ISA', `You have left ${t.name}. Your former teammates have been notified.`); say('ISA', `You have left ${t.name}. Your former teammates have been notified.`);
}
function createTeam(name) {
  if (myTeam()) return;
  teamsList().push({ id: 'you_' + save.day, name: name || `${save.you.name}'s team`, ids: ['you'], fixed: false, mine: true });
  msg('ISA', `Team ${name} registered. Invite brawlers from the Teams screen. A team room opens at ${TEAM_ROOM} members.`);
}
// you invite a brawler: they accept by friendship; brawlers on a show team never leave it
function inviteToTeam(id) {
  const t = myTeam(); if (!t || t.ids.length >= TEAM_MAX) return 'Your team is full.';
  const theirs = teamWith(id); if (theirs && theirs.fixed) return `${nameOf(id)} is staying with ${theirs.name}.`;
  const f = friendship(id), chance = f >= 75 ? 1 : f >= 40 ? 0.85 : f >= 10 ? 0.45 : f >= 0 ? 0.15 : 0;
  if (makeRng(save.season.seed + save.day * 53 + id.length * 7 + (save.invitesTried || 0))() >= chance) { save.invitesTried = (save.invitesTried || 0) + 1; return `${nameOf(id)} turned the invite down.`; }
  if (theirs) { theirs.ids = theirs.ids.filter(x => x !== id); if (theirs.ids.length < 2 && !theirs.fixed) save.teams = teamsList().filter(x => x !== theirs); }
  t.ids.push(id); bond(id); if (t.ids.length === TEAM_ROOM) scene('teamRoomOpen', { team: t.id });
  return `${nameOf(id)} joined ${t.name}!`;
}
function teamRanks() {
  const B = save.season.B;
  return teamsList().map(t => { const m = t.ids.filter(id => B[id]); return { ...t, m, elo: m.reduce((n, id) => n + B[id].elo, 0) / (m.length || 1) }; })
    .filter(t => t.m.length >= TEAM_ROOM).sort((a, b) => b.elo - a.elo);
}

// ---------- friendship (story-mode-design.md): -100 to 100. Stranger < 10, Acquaintance 10+, Friend 40+, Best Friend 75+.
// Teammate +1 a week; Tag Team together +3 (+5 if you win); a title for your team +3; trade +4; losing to them -2;
// on opposite teams -1 on every interaction; leaving a team -25 with every former teammate.
const FR_LEVELS = [[75, 'Best Friend'], [40, 'Friend'], [10, 'Acquaintance'], [-Infinity, 'Stranger']];
const frLevel = id => FR_LEVELS.find(([n]) => friendship(id) >= n)[1];
// teammates (Billy, Nov 20): joining the same team gives a small friendship boost (+10), and teammates are never Strangers
const TEAM_BOND = 10, TEAM_MIN = 12;
function bond(id, boost = true) {
  if (id === 'you' || !save.season.B[id]) return;
  save.friends = save.friends || {}; const f = save.friends[id] || 0;
  save.friends[id] = Math.min(100, Math.max(boost ? f + TEAM_BOND : f, TEAM_MIN));
}
const bondTeam = (t, boost = true) => t && t.ids.includes('you') && t.ids.forEach(id => bond(id, boost));
function befriend(id, n, flat = false) {
  if (id === 'you' || !save.season.B[id]) return;
  save.friends = save.friends || {};
  const before = frLevel(id), d = n - (!flat && oppositeTeams(id) ? 1 : 0);
  save.friends[id] = Math.max(-100, Math.min(100, (save.friends[id] || 0) + d));
  const after = frLevel(id);
  if (after !== before && d > 0) { msg('ISA', `${nameOf(id)} is now your ${after === 'Best Friend' ? 'best friend' : after.toLowerCase()}.`); if (after === 'Best Friend') scene('bestFriend', { id }); }
}
// ---------- rivals (Billy): whoever you face most, and evenly: at least 5 of your last 30 matches, winning 40-60% of those
function noteMatch(id, r) {
  const before = rivals().map(x => x.id);
  save.recent = [...(save.recent || []), { id, r }].slice(-40);   // rivals: 5+ of your last 40 matches (Billy, Nov 20)
  for (const x of rivals()) if (!before.includes(x.id)) { msg('ISA', `Rival registered: ${nameOf(x.id)}. You have met ${x.n} times recently, ${x.w}-${x.n - x.w - x.d}${x.d ? `-${x.d}` : ''}.`); scene('newRival', { id: x.id }); }
}
function rivals() {
  const c = {}; (save.recent || []).forEach(m => { const x = c[m.id] = c[m.id] || { id: m.id, n: 0, w: 0, d: 0 }; x.n++; if (m.r === 'w') x.w++; if (m.r === 'd') x.d++; });
  return Object.values(c).filter(x => x.n >= 5 && x.w / x.n >= 0.4 && x.w / x.n <= 0.6).sort((a, b) => b.n - a.n);
}
const isRival = id => rivals().some(x => x.id === id);

// ---------- trades: a brawler you meet may offer one of their cards or Bakugan for one of yours that isn't in your deck.
// Their item comes from Interspace stock up to one league above yours. A trade is +4 friendship (+3 if you're on opposite teams).
function tradeOffer(id) {
  const rng = makeRng(save.season.seed + save.day * 97 + save.slot * 13 + id.split('').reduce((n, c) => n + c.charCodeAt(0), 0));
  if (rng() > (friendship(id) >= 40 ? 0.3 : 0.15) || (save.tradesDone || {})[`${save.day}-${save.slot}-${id}`]) return null;
  ensureColl(); STOCK = STOCK || stock(cat);
  const y = save.you, d = y.deck, L = leagueNum(), inDeck = new Set([...Object.values(d.gates), ...Object.values(d.abilities), ...Object.values(d.extra || {}).flat()].map(x => x && x.id));
  const deckToys = new Set(d.toys.map(t => tkey(t.id, t.attr)));
  const mySpare = [...y.coll.cards.filter(c => !inDeck.has(c)).map(c => ({ kind: 'card', id: c, name: (cat.cards.find(x => x.id === c) || {}).name })),
    ...Object.keys(y.coll.toys).filter(k => !deckToys.has(k)).map(k => { const [tid, attr] = k.split(':'); return { kind: 'toy', id: tid, attr, name: `${(cat.toys.find(x => x.id === tid) || {}).name} (${cap(attr)})` }; })];
  const spare = mySpare.filter(x => !(x.kind === 'toy' && x.id === y.partner)), helps = spare.filter(x => improves(id, x));   // never your partner
  if (!spare.length || (friendship(id) < 10 && !helps.length)) return null;   // Strangers only ask for something that makes their deck better
  const theirs = [...STOCK.gates, ...STOCK.abilities].filter(x => x.tier >= L - 1 && !y.coll.cards.includes(x.c.id)).map(x => ({ kind: 'card', id: x.c.id, name: x.c.name }))
    .concat(STOCK.toys.filter(x => x.tier >= L - 1).flatMap(x => Object.keys(x.t.attributes).filter(a => !y.coll.toys[tkey(x.t.id, a)]).map(a => ({ kind: 'toy', id: x.t.id, attr: a, name: `${x.t.name} (${cap(a)})` }))));
  if (!theirs.length) return null;
  return { give: rng.pick(helps.length ? helps : spare), get: rng.pick(theirs), key: `${save.day}-${save.slot}-${id}` };
}
// would this spare item of yours make their deck better? (Billy, Nov 20)
//   a synthetic Bakugan stronger than their weakest Bakugan; a Gate card with a bigger bonus for their Bakugan than their card of
//   that color; an Ability card of a higher shop tier than their card of that color
function improves(id, x) {
  const d = teamOf(id); if (!d || !d.toys) return false;
  if (x.kind === 'toy') { const t = cat.toys.find(q => q.id === x.id); if (!t || !isSoldToy(t)) return false;   // Interspace's synthetic Bakugan (brawlers' partners aren't sold)
    return (t.baseG || 0) > Math.min(...d.toys.map(q => (cat.toys.find(c => c.id === q.id) || {}).baseG || 0)); }
  const c = cat.cards.find(q => q.id === x.id); if (!c) return false;
  if (c.type === 'gate') { const fit = card => card && card.bonus ? d.toys.reduce((a, q) => a + (card.bonus[q.attr] || 0), 0) / d.toys.length : 0;
    const mine = d.gates && d.gates[c.color]; return fit(c) > fit(mine && cat.cards.find(q => q.id === mine.id)); }
  if (c.type === 'ability') { STOCK = STOCK || stock(cat); const tier = cid => (STOCK.abilities.find(a => a.c.id === cid) || {}).tier || 0;
    const mine = d.abilities && d.abilities[c.color]; return tier(c.id) > tier(mine && mine.id); }
  return false;
}
// the trade conversation (scripts: Trade offer)
function tradeTalk(id) {
  const o = tradeOffer(id); if (!o) return; const tn = tone(id);
  say(id, tn === 'best' || tn === 'friend' ? `Hey, I've got a ${o.get.name} I'm not using. Want to swap for your ${o.give.name}?`
    : tn === 'acq' ? `Want to trade? My ${o.get.name} for your ${o.give.name}.` : `Trade. ${o.get.name} for ${o.give.name}. Yes or no.`,
    [['Trade', () => { doTrade(id); say('ISA', 'Trade complete.'); store(); render(save.view); }], ['No', () => {}]]);
}
function doTrade(id) {
  const o = tradeOffer(id); if (!o) return; const y = save.you;
  if (o.give.kind === 'card') y.coll.cards = y.coll.cards.filter(c => c !== o.give.id); else delete y.coll.toys[tkey(o.give.id, o.give.attr)];
  if (o.get.kind === 'card') y.coll.cards.push(o.get.id); else y.coll.toys[tkey(o.get.id, o.get.attr)] = {};
  save.tradesDone = { ...(save.tradesDone || {}), [o.key]: true };
  befriend(id, 4);
  msg('ISA', `Trade with ${nameOf(id)}: your ${o.give.name} for their ${o.get.name}.`);
}

// ---------- Scenes (claude/story-scripts.md). Each key is a hook already called at the right moment in the game.
// A scene is just say() lines: say(who, text) for a line, a 3rd argument for choices, { call: true } for a call window.
// Lines marked DRAFT are new (not in the scripts doc yet), written in the same voice for Billy to edit.
const you = () => save.you.name;
const divName = () => { const n = save.season.names[leagueOf('you')]; return n.includes('Division') ? 'Division ' + n.split('Division ')[1] : n; };   // spoken: "Division B" (or "League 2")
const divRank = () => [...save.season.leagues[leagueOf('you')]].sort((a, b) => tablePts(b) - tablePts(a)).indexOf('you') + 1;
const SCENES = {
  // S2-05: the first newcomer you meet (first time you walk into an arena)
  firstNewcomer({ id, arena }) {
    say(id, `Oh, hey. You're new too, right? ${divName()}?`);
    say(id, `I'm ${nameOf(id)}. Just got my synthetics this morning. Still figuring out which one I like.`);
    say(id, `Want to try a practice match? Doesn't count for the league, but it beats standing around.`, [
      ['Battle', () => { save.after = { kind: 'newcomer', id, w: save.season.B.you.rec.w, l: save.season.B.you.rec.l }; store();
        launch(id, { key: `N${save.day}-${save.slot}-${id}`, arena: arena || 'arena' }); }],
      ['Not now', () => say(id, `No problem. I'll be around. Everyone's going to be around, honestly.`)]]);
  },
  // S2-05, after the practice match
  newcomerAfter({ id, won }) {
    if (won) say(id, `Nice. Okay, I'm writing that down. You're on my list now.`);
    else say(id, `Ha! First win of the season. Don't worry, I won't tell anyone. Probably.`);
  },
  // S2-08: the top of League 1 notices you (week 7, only if you're top 4 of your division)
  midseasonCall({ from }) {
    if (divRank() > 4) return;   // missable
    say('ISA', `Incoming call for ${you()}. Caller: ${nameOf(from)}, League 1.`);
    say(from, `So you're the one climbing ${divName()}. I saw your last match.`, null, { call: true });
    say(from, `Keep it up and we'll meet in a Major soon.`, null, { call: true });
    say('ISA', 'Call ended.');
  },
  // DRAFT: an event you entered is starting
  eventStart({ event }) {
    say('ISA', `${event} begins now. You are in the draw.`);
    say('ISA', 'Your matches are played in order. I will call you to the arena for each one. Good luck.');
  },
  // DRAFT: you won an event
  eventWin({ event, prize }) {
    say('ISA', `${event} is complete. The winner is ${you()}.`);
    say('ISA', `The title has been added to your record.${prize ? ` Your prize, ${prize.name || prize}, is in your inventory.` : ''}`);
    say('ISA', 'Congratulations.');
  },
  // the promotion call: your highest-friendship brawler in the league you're moving up to
  promotion({ from, to, league }) {
    if (!(to < from)) return;
    const caller = (league || []).filter(id => id !== 'you').sort((a, b) => friendship(b) - friendship(a))[0];
    say('ISA', `Promotion confirmed. Next season you battle in League ${to}.`);
    if (!caller) return;
    say('ISA', `Incoming call for ${you()}. Caller: ${nameOf(caller)}.`);
    const t = tone(caller);
    say(caller, t === 'best' || t === 'friend' ? `You're coming up to our league! Finally. It was getting boring up here.` : `Saw you got promoted. See you in the league.`, null, { call: true });
    say('ISA', 'Call ended.');
  },
  // DRAFT: the regular season is over
  seasonEnd() {
    say('ISA', 'The regular season is complete.');
    say('ISA', `You finished ${ordinal(divRank())} in ${save.season.names[leagueOf('you')]}. Final standings and promotions are posted.`);
  },
  // rival line bank: on becoming rivals
  newRival({ id }) {
    const r = rivals().find(x => x.id === id), n = r ? r.n : 5;
    say(id, `${you()}. That's ${n} times this month. I'm starting to think we keep ending up in the same arena on purpose.`);
  },
  // DRAFT: someone becomes your best friend
  bestFriend({ id }) {
    say(id, `Hey, ${you()}. I was thinking. You're the first person I look for when I log in.`);
    say(id, `So... best friends? Good. That's settled. Now battle me.`);
  },
  // team invite, by friendship tone (only when you're not on a team; the Teams screen still lists the offer)
  teamInvite({ team }) {
    const t = teamsList().find(x => x.id === team); if (!t) return;
    const from = t.ids.find(id => id !== 'you'), tn = tone(from), mine = myTeam();
    const line = { best: `${t.name} has a spot open. Honestly, we've been saving it for you. Want in?`, friend: `We've got room on ${t.name}. You'd fit right in. Interested?`,
      acq: `${t.name} is looking for one more. Your record's decent. Want to join?`, cold: `There's an opening on ${t.name}. The others suggested you. Your call.` }[tn];
    say(from, line);
    if (mine) say('ISA', `Joining ${t.name} means leaving ${mine.name}. Your former teammates will be notified.`);
    say(from, 'So?', [['Join', () => { if (myTeam()) leaveTeam(); if (t.ids.length < TEAM_MAX) { say('ISA', `You are now a member of ${t.name}.`); joinTeam(team); } store(); render(save.view); }],
      ['No thanks', () => { save.offers = (save.offers || []).filter(o => o.team !== team); store(); say(from, tn === 'best' || tn === 'friend' ? 'No worries. Offer stands.' : 'Okay.'); }]]);
  },
  // DRAFT: your team reaches 3 members
  teamRoomOpen({ team, joined }) {
    const t = teamsList().find(x => x.id === team); if (!t) return;
    if (joined) say('ISA', `As a member of ${t.name}, you now have access to its team room.`);   // joined a team that already had a room
    else say('ISA', `${t.name} now has ${t.ids.length} members. Your team room is open.`);
    say('ISA', 'You will find it in the Team Rooms building in The Commons.');
  },
  // DRAFT: the daily greeting after the login corridor
  login() {
    const f = myFixture(save.day), ev = eventToday();
    say('ISA', `Good ${['morning', 'afternoon', 'evening'][save.slot] || 'day'}, ${you()}. Today is day ${save.day + 1} of Season ${save.seasonNo || 2}.`);
    if (f && !f.played) say('ISA', `You have a league match today against ${nameOf(f.opp)}.`);
    else if (ev) say('ISA', `${ev.name} takes place today.`);
    else say('ISA', 'Nothing fixed is on your schedule today.');
  },
};
window.STORY_SCENE = (key, data) => scene(key, data);   // for testing: play any scene from the console
const ordinal = n => n + (['th', 'st', 'nd', 'rd'][(n % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][n % 100] || 'th');
function scene(key, data = {}) { const f = SCENES[key]; if (f) try { f(data); } catch (e) { console.error('scene', key, e); } }

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
// sides: [[ids], [ids], ...] (2 to 4 sides); winner = side index or null; stats: { id: { beaten, gates, dealt } }; league: true for a league match
function record(sides, winner, stats, { league = false } = {}) {
  const B = save.season.B, out = {};
  sides.forEach((g, i) => g.forEach(id => {
    const st = stats[id] || {}, k = winner === null ? 'd' : winner === i ? 'w' : 'l';
    const bp = (k === 'w' ? BP.win : 0) + Math.min(BP.maxBeaten, st.beaten || 0) * BP.beaten + Math.min(BP.maxGates, st.gates || 0) * BP.gate + Math.floor((st.dealt || 0) / BP.dealtPer);
    B[id].rec[k]++; out[id] = bp; earn(id, bp);
    if (league) { B[id].lg[k]++; B[id].lg.pts += k === 'w' ? 3 : k === 'd' ? 1 : 0; B[id].lg.bp += bp; }
  }));
  // Elo: team average; a Battle Royale counts as the winner beating each of the others (half weight)
  const avg = g => g.reduce((n, id) => n + B[id].elo, 0) / g.length;
  const pairs = sides.length === 2 ? [[0, 1]] : winner === null ? [] : sides.map((_, i) => i).filter(i => i !== winner).map(i => [winner, i]);
  const delta = sides.map(() => 0);
  for (const [a, b] of pairs) {
    const ea = 1 / (1 + 10 ** ((avg(sides[b]) - avg(sides[a])) / 400)), sa = winner === null ? 0.5 : winner === a ? 1 : 0, k = sides.length > 2 ? 16 : 32;
    delta[a] += k * (sa - ea); delta[b] -= k * (sa - ea);
  }
  sides.forEach((g, i) => g.forEach(id => { B[id].elo += delta[i]; }));
  return out;
}
// a computer-only match, played by the simulator
function simMatch(a, b, { arena = null, league = false } = {}, rng) { return simSides([[a], [b]], { arena, league }, rng); }
// sides: [[ids]...]; rules 'nv' / 'classic'; arena: null, an attribute, or 'random'. Returns the winning side index or null.
function simSides(sides, { arena = null, league = false, rules = 'nv' } = {}, rng) {
  const flat = sides.flat(), teams = sides.flatMap((g, i) => g.map(() => i));
  const field = arena === 'random' ? rng.pick(ATTRS6) : arena;
  const ent = flat.map(id => ({ name: nameOf(id), level: save.season.B[id].level, player: buildPlayer(cat, teamOf(id), { name: nameOf(id), owner: id, nv: rules === 'nv' }) }));
  const r = playMatch(ent, { nv: rules === 'nv', teams: sides.length > 2 || flat.length > 2 ? teams : null, rng, arena: field });
  const order = [...new Set(teams)], w = r.winner === 'draw' ? null : order.indexOf(r.winner);
  record(sides, w, Object.fromEntries(flat.map((id, i) => [id, r.stats[i]])), { league });
  return w;
}

// ---------- the calendar
const week = d => Math.floor(d / 7) + 1;
const leagueDays = () => save.season.leagueDays || LEAGUE_DAYS;
const roundOn = d => leagueDays().indexOf(d);
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
  for (const e of save.season.events) if (e.day === d && !save.season.eventsDone.includes(e.name)) runEvent(e);
}
// ---------- events (Billy, Nov 20): you enter and play your own matches; everyone else's are simulated.
// Formats: knockout (16), groups (4 groups of 4, round robin, top 2 into a knockout of 8), royale (Battle Royale groups of 4, winners to a
// final of 4), tag (Tag Team pairs in a knockout). A draw in a knockout is replayed once, then the higher rating goes through.
// The live event is kept in save.event so it survives going to battle.html and back.
const eventToday = () => save.season.events.find(e => e.day === save.day && !save.season.eventsDone.includes(e.name));
const byBPList = l => { const B = save.season.B; return [...l].sort((a, b) => B[b].bp - B[a].bp || B[b].elo - B[a].elo); };
const tablePts = id => { const b = save.season.B[id]; return b.lg.pts * 1e6 + b.lg.bp; };
// invites to the Major, Masters and Finale (as js/season.js): League 1, this season's event winners, Open finalists outside League 1,
// the top 2 of the other league tables, Open semifinalists, then Season Ranking (BP)
function invites(size) {
  const S = save.season, out = [], add = id => { if (S.B[id] && !out.includes(id) && out.length < size) out.push(id); }, op = S.openPlace || {};
  S.leagues[0].forEach(add);
  Object.values(S.results || {}).forEach(r => r.winner.forEach(add));
  Object.entries(op).filter(([, p]) => p <= 2).sort((a, b) => a[1] - b[1]).forEach(([id]) => add(id));
  for (let rank = 0; rank < 2; rank++) S.leagues.slice(1).forEach(lg => { const top = [...lg].sort((a, b) => tablePts(b) - tablePts(a))[rank]; if (top) add(top); });
  Object.entries(op).filter(([, p]) => p === 3).forEach(([id]) => add(id));
  byBPList(Object.keys(S.B)).forEach(add);
  return out;
}
// who's in the event (you included when eligible); opts.withYou: you chose to enter
function eventField(e, rng, withYou) {
  const S = save.season, all = Object.keys(S.B), comp = all.filter(id => id !== 'you');
  let field;
  if (e.entry === 'royal') { const vex = (e.hosts || []).filter(id => S.B[id]); field = [...vex, ...byBPList(all.filter(id => !vex.includes(id) && leagueOf(id) > 0))].slice(0, e.size); }
  else if (e.invite) field = invites(e.size);
  else if (e.format === 'tag') field = rng.shuffle(comp.filter(id => leagueOf(id) > 0)).slice(0, e.size);   // Tag Team Opens are always full
  else field = rng.shuffle(comp.filter(id => rng() < ([0, 0.85, 0.95, 0.95][Math.min(3, leagueOf(id))] ?? 0.9))).slice(0, e.size);
  field = field.filter(id => id !== 'you');
  if (withYou) { if (field.length >= e.size) field = byBPList(field).slice(0, e.size - 1); field.push('you'); }
  else if (field.length < e.size && !e.invite && e.entry !== 'royal') field = field.concat(rng.shuffle(comp.filter(id => !field.includes(id) && leagueOf(id) > 0))).slice(0, e.size);
  if (e.format === 'tag' && field.length % 2) field = field.slice(0, -1);
  return field;
}
// can you enter? 'open' (you choose), 'invited', 'royal', or null
function eligibility(e) {
  if (e.entry === 'royal') {   // the Vexos plus the best by Season Ranking outside League 1
    const hosts = (e.hosts || []).filter(id => save.season.B[id]), rank = byBPList(Object.keys(save.season.B).filter(id => leagueOf(id) > 0 && !hosts.includes(id))).indexOf('you');
    return rank >= 0 && rank < e.size - hosts.length ? 'royal' : null;
  }
  if (e.invite) return invites(e.size).includes('you') ? 'invited' : null;
  return leagueOf('you') === 0 ? null : 'open';   // Opens are for Leagues 2 and below
}
// tag pairs: canon pairs first, your partner, then the rest drawn
const TAG_PAIRS = [['runo', 'julie'], ['nv_dan', 'nv_shun'], ['spectra', 'gus'], ['mylene', 'shadow'], ['volt', 'lync'], ['mira', 'ace'],
  ['nv_marucho', 'baron'], ['klaus', 'chanlee'], ['julio', 'komba'], ['akira', 'shuji'], ['jenny', 'jewls']];
function tagSides(ids, rng, partner) {
  const left = new Set(ids), out = [];
  if (left.has('you')) { const pt = partner && left.has(partner) ? partner : rng.pick([...left].filter(id => id !== 'you')); out.push(['you', pt]); left.delete('you'); left.delete(pt); }
  for (const [a, b] of TAG_PAIRS) if (left.has(a) && left.has(b)) { out.push([a, b]); left.delete(a); left.delete(b); }
  const rest = rng.shuffle([...left]); for (let i = 0; i + 1 < rest.length; i += 2) out.push([rest[i], rest[i + 1]]);
  return out;
}
const sideElo = g => g.reduce((n, id) => n + save.season.B[id].elo, 0) / g.length;
const sideBP = g => g.reduce((n, id) => n + save.season.B[id].bp, 0);
const seedSides = sides => [...sides].sort((a, b) => sideBP(b) - sideBP(a) || sideElo(b) - sideElo(a));
// a knockout round: 1st vs last, 2nd vs 2nd last, ...
const koPairs = sides => { const out = []; for (let i = 0; i < sides.length / 2; i++) out.push([sides[i], sides[sides.length - 1 - i]]); return out; };
// start an event (with or without you)
function startEvent(e, withYou, partner = null) {
  const rng = makeRng(save.season.seed + e.day * 104723), field = eventField(e, rng, withYou);
  if (withYou && partner && !field.includes(partner)) field.splice(field.findIndex(id => id !== 'you'), 1, partner);   // your Tag Team partner comes with you
  const sides = seedSides(e.format === 'tag' ? tagSides(field, rng, partner) : field.map(id => [id]));
  const ev = { name: e.name, tier: e.tier, format: e.format, rules: e.rules || 'nv', arena: e.arena || null, prize: e.prize || null, seed: save.season.seed + e.day * 7841,
    sides, you: withYou, matches: [], placed: [], log: [], done: false };
  if (e.format === 'groups') {
    const groups = [[], [], [], []]; sides.forEach((sd, i) => groups[Math.floor(i / 4) % 2 ? 3 - (i % 4) : i % 4].push(sd));   // snake seeding
    ev.phase = 'groups'; ev.groups = groups.map(g => ({ sides: g, pts: g.map(() => 0) }));
    ev.matches = ev.groups.flatMap((g, gi) => rounds(g.sides.map((_, i) => i)).flat().map(([a, b]) => ({ group: gi, sides: [g.sides[a], g.sides[b]], gi: [a, b] })));
  } else if (e.format === 'royale') {
    ev.phase = 'groups'; ev.matches = []; for (let i = 0; i < sides.length; i += 4) ev.matches.push({ sides: sides.slice(i, i + 4), royale: true });
  } else { ev.phase = 'ko'; ev.matches = koPairs(sides).map(pr => ({ sides: pr })); }
  if (withYou) scene('eventStart', { event: e.name });
  return ev;
}
const hasYou = m => m.sides.some(sd => sd.includes('you'));
const bestSide = m => m.sides.map((sd, i) => [sideElo(sd), i]).sort((a, b) => b[0] - a[0])[0][1];
const mustWin = (ev, m) => ev.phase !== 'groups' || !!m.royale;   // knockouts and Battle Royales need a winner
const fieldFor = (ev, m) => ev.arena === 'random' ? makeRng(ev.seed + ev.matches.indexOf(m) * 17).pick(ATTRS6) : ev.arena;
// play every computer match up to your next one (or to the end). Returns your next match, or null when the event is over.
function advanceEvent(ev) {
  const rng = makeRng(ev.seed + ev.log.length * 31);
  for (;;) {
    const m = ev.matches.find(x => x.winner === undefined);
    if (!m) { if (!nextPhase(ev)) return finishEvent(ev); continue; }
    if (ev.you && hasYou(m)) return m;
    let w = simSides(m.sides, { rules: ev.rules, arena: fieldFor(ev, m) }, rng);
    if (w === null && mustWin(ev, m)) { w = simSides(m.sides, { rules: ev.rules, arena: fieldFor(ev, m) }, rng); if (w === null) w = bestSide(m); }
    settle(ev, m, w);
  }
}
function settle(ev, m, w) {
  m.winner = w;
  ev.log.push(`${m.sides.map(sd => sd.map(nameOf).join(' & ')).join(' vs ')}: ${w === null ? 'draw' : m.sides[w].map(nameOf).join(' & ') + ' won'}`);
  if (m.group !== undefined) { const g = ev.groups[m.group]; if (w === null) { g.pts[m.gi[0]]++; g.pts[m.gi[1]]++; } else g.pts[m.gi[w]] += 3; }
  if (ev.phase === 'ko' || m.royale) (m.sides.filter((_, i) => i !== w)).forEach(sd => ev.placed.unshift(sd));
}
function nextPhase(ev) {
  const winners = ev.matches.filter(m => m.winner !== undefined && m.winner !== null).map(m => m.sides[m.winner]);
  if (ev.phase === 'groups' && ev.format === 'groups') {
    const q = ev.groups.flatMap(g => g.sides.map((sd, i) => ({ sd, p: g.pts[i] })).sort((a, b) => b.p - a.p || sideElo(b.sd) - sideElo(a.sd)).slice(0, 2).map(x => x.sd));
    ev.groups.forEach(g => g.sides.forEach(sd => { if (!q.includes(sd)) ev.placed.unshift(sd); }));
    ev.phase = 'ko'; ev.done1 = [...(ev.done1 || []), ...ev.matches]; ev.matches = koPairs([q[0], q[2], q[4], q[6], q[5], q[7], q[1], q[3]]).map(pr => ({ sides: pr }));   // group winners meet another group's runner-up
    return true;
  }
  if (ev.phase === 'groups' && ev.format === 'royale') {
    ev.phase = 'final'; ev.done1 = [...(ev.done1 || []), ...ev.matches]; ev.matches = [{ sides: winners, royale: true }]; return true;
  }
  if (ev.phase === 'ko' && winners.length > 1) { ev.done1 = [...(ev.done1 || []), ...ev.matches]; ev.matches = koPairs(winners).map(pr => ({ sides: pr })); return true; }
  ev.champion = winners[0] || ev.matches[0].sides[0];
  return false;
}
function finishEvent(ev) {
  const S = save.season, B = S.B, champ = ev.champion, order = [champ, ...ev.placed.filter(sd => sd !== champ)];
  champ.forEach(id => { B[id].titles.push(ev.name); earn(id, BP.event[ev.tier] || 0); });
  if (ev.tier === 'Open') order.slice(0, 4).forEach((sd, i) => sd.forEach(id => { const p = i === 0 ? 1 : i === 1 ? 2 : 3; S.openPlace = S.openPlace || {}; if (!S.openPlace[id] || S.openPlace[id] > p) S.openPlace[id] = p; }));
  let prize = null;
  if (ev.prize) {   // a random Bakugan of the field's attribute, in the G range of the league the event is aimed at (Billy)
    const rng = makeRng(ev.seed + 99), [lo, hi] = PRIZE_BAND[ev.prize.league] || PRIZE_BAND[3], attr = ev.prize.attr || (ATTRS6.includes(ev.arena) ? ev.arena : rng.pick(ATTRS6));
    const pool = cat.toys.filter(t => t.game === 'bb' && t.baseG >= lo && t.baseG <= hi && (!t.attributes || t.attributes[attr]));
    if (pool.length) { const t = rng.pick(pool); prize = { id: t.id, name: t.name, attr }; }
    if (prize && champ.includes('you')) { ensureColl(); save.you.coll.toys[tkey(prize.id, attr)] = {}; }
  }
  S.results = S.results || {}; S.results[ev.name] = { winner: champ, runnerUp: order[1] || [], prize };
  S.eventsDone.push(ev.name);
  const yourPlace = ev.you ? order.findIndex(sd => sd.includes('you')) + 1 : 0;
  msg('ISA', `${ev.name} result. Winner: ${champ.map(nameOf).join(' & ')}.${prize ? ` Prize: ${prize.name} (${cap(prize.attr)}).` : ''}${ev.you ? ` Your finish: ${yourPlace === 1 ? 'winner' : yourPlace === 2 ? 'runner-up' : yourPlace <= 4 ? 'semifinal' : 'out in the early rounds'}.` : ''}`);
  // a title for you or a teammate: +3 friendship with your teammates (Billy)
  const mine = myTeam();
  if (mine && champ.some(id => mine.ids.includes(id))) mine.ids.filter(id => id !== 'you').forEach(id => befriend(id, 3));
  if (champ.includes('you')) scene('eventWin', { event: ev.name, prize });
  else if (mine) { const mate = champ.find(id => mine.ids.includes(id));
    if (mate) { msg('ISA', `${nameOf(mate)} of ${mine.name} has won ${ev.name}.`); save.mateNews = { id: mate, event: ev.name }; } }
  ev.done = true; ev.order = order;
  return null;
}
// a whole event without you (end of the day, or you skipped it)
function runEvent(e) { const ev = startEvent(e, false); advanceEvent(ev); }
// a teammate may leave your team: 2% a week, 5% if you aren't Friends, at most one a week (show teams never break up)
function teammatesMoveOn(rng) {
  const t = myTeam(); if (!t || t.fixed) return;
  for (const id of t.ids.filter(x => x !== 'you')) {
    if (rng() >= (friendship(id) >= 40 ? 0.02 : 0.05)) continue;
    t.ids = t.ids.filter(x => x !== id);
    msg('ISA', `${nameOf(id)} has left ${t.name}. ${t.name} now has ${t.ids.length} members.`);
    if (t.ids.length === TEAM_ROOM - 1) msg('ISA', `${t.name} no longer has enough members for a team room. The room will reopen when the team has three members.`);
    break;   // at most one a week
  }
}
function nextSlot() {
  save.slot++;
  if (save.slot > 2) { closeDay(); save.day++; save.slot = 0; dayStart(); }
  store();
}
function dayStart() {
  const f = myFixture(save.day), rng = makeRng(save.season.seed + save.day * 4513);
  if (save.day >= DAYS) { msg('ISA', 'The regular season is complete. Final standings and promotions are posted.'); scene('seasonEnd'); return; }
  if (save.day === 1 && (save.seasonNo || 2) === 2 && !save.seen.day1) {   // S2-06: the Day 1 summary
    save.seen.day1 = true; const dl = save.dayLog && save.dayLog.day === 0 ? save.dayLog : { m: 0, bp: 0 };
    const first = leagueDays().map(myFixture).find(Boolean), open1 = (save.season.events || []).find(e => e.name === 'Open I');
    msg('ISA', `Day 1 summary. Matches: ${dl.m}. BP earned: ${dl.bp}.${first ? ` Your first league match is on day ${leagueDays()[first.round - 1] + 1}.` : ''}`);
    if (open1) msg('ISA', `Open I starts this week. It is open to Leagues 2 to 4. Sign-up closes at the start of day ${open1.day + 1}.`);
  }
  if (save.day % 7 === 0 && save.day > 0) {   // weekly: teammates +1, computer teams form, team invites
    const t = myTeam(); if (t) t.ids.filter(id => id !== 'you').forEach(id => befriend(id, 1, true));
    formTeams(rng); teamInvites(rng); teammatesMoveOn(rng);
  }
  if (save.day === 42 && !save.seen.midseason) {   // midseason: a call from the top League 1 brawler (scene: S2-08)
    save.seen.midseason = true;
    const top = [...save.season.leagues[0]].sort((a, b) => tablePts(b) - tablePts(a))[0];
    if (divRank() <= 4) msg(nameOf(top), `Called you: "Keep it up and we'll meet in a Major soon."`); scene('midseasonCall', { from: top });
  }
  if (f && !f.played) msg('ISA', `League match today: ${nameOf('you')} vs ${nameOf(f.opp)}, round ${f.round}. Neutral Arena.`);
  const ev = eventToday();
  if (ev) {
    const el = eligibility(ev);
    msg('ISA', `${ev.name} takes place today.${el === 'invited' ? ' You have an invitation.' : el === 'royal' ? ' Your Season Ranking qualifies you.' : el === 'open' ? ' Entry is open to you.' : ''}`);
  }
}
function rest() {
  if (mandatoryToday()) return say('ISA', 'You have a league match today. Please play it first.');
  // every day you sleep through still gets its daily updates (weekly team news, the midseason call, the Day 1 summary)
  do { closeDay(); save.day++; save.slot = 0; dayStart(); } while (save.day < DAYS && !mandatoryToday() && !save.season.events.some(e => e.day === save.day));
  store(); render();
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
// sides: [[ids]...] with your side first; kind: 'free' | 'league' | 'event'
function launch(opp, { key, arena = 'arena', league = false }) { launchSides([['you'], [opp]], { key, arena, kind: league ? 'league' : 'free' }); }
function launchSides(sides, { key, arena = 'arena', kind = 'free', rules = 'nv' }) {
  const B = save.season.B;
  // battle.html seats Tag Team as [0,1,0,1] and Battle Royale as [0,1,2,3]
  const order = sides.length === 2 && sides[0].length === 2 ? [sides[0][0], sides[1][0], sides[0][1], sides[1][1]] : sides.flat();
  const teams = sides.length === 2 && sides[0].length === 2 ? [0, 1, 0, 1] : order.map((_, i) => i);
  save.pending = { key, kind, sides, order, teams };
  store();
  const match = { mode: order.length > 2 ? 'multi' : 'single', rules, arena: arena || 'arena', story: { key }, teams: order.length > 2 ? teams : undefined,
    players: order.map(id => id === 'you' ? { id: 'you', name: save.you.name, team: teamOf('you') }
      : { id, name: nameOf(id), team: teamOf(id), ai: B[id].level, level: B[id].level }) };
  try { sessionStorage.setItem('marbles-match', JSON.stringify(match)); } catch {}
  location.href = 'battle.html';
}
function takeResult() {
  let res = null; try { res = JSON.parse(sessionStorage.getItem('marbles-story-result') || 'null'); } catch {}
  if (!res || !save.pending || res.key !== save.pending.key) return;
  sessionStorage.removeItem('marbles-story-result');
  const { kind, key, sides, order, teams } = save.pending;
  const w = res.winner === 'draw' ? null : res.winner;   // winning team number = side index (your side is team 0)
  const st = Object.fromEntries(order.map((id, i) => [id, res.players[i] || {}]));
  const bp = record(sides, w, st, { league: kind === 'league' });
  if (kind === 'league') save.season.done[key] = true;
  // friendship and rivals (Billy): losing to someone -2; opposite teams -1 on every interaction; Tag Team partners +3 (+5 if you win)
  const foes = sides.slice(1).flat(), partner = sides[0].find(id => id !== 'you');
  foes.forEach(id => befriend(id, w !== null && w !== 0 && sides[w].includes(id) ? -2 : 0));
  if (partner) befriend(partner, w === 0 ? 5 : 3);
  if (sides.length === 2 && sides[1].length === 1) {
    const opp = sides[1][0], wasRival = isRival(opp); noteMatch(opp, w === 0 ? 'w' : w === null ? 'd' : 'l');
    if (wasRival && w !== null) save.queue = [...(save.queue || []), { rivalAfter: opp, won: w === 0 }];   // rival: after-match line
  }
  save.dayLog = save.dayLog && save.dayLog.day === save.day ? save.dayLog : { day: save.day, m: 0, bp: 0 };
  save.dayLog.m++; save.dayLog.bp += bp.you || 0;
  const result = w === null ? 'Draw' : w === 0 ? 'Win' : 'Loss';
  const vs = sides.slice(1).map(sd => sd.map(nameOf).join(' & ')).join(', ');
  msg('ISA', `${kind === 'league' ? 'League match' : kind === 'event' ? save.event.name : 'Free match'} vs ${vs}: ${result}. ${bp.you} BP.`);
  if (kind === 'league' && w === 0 && !save.seen.firstLeagueWin) { save.seen.firstLeagueWin = true; save.queue = [...(save.queue || []), 'firstLeagueWin']; }
  save.pending = null;
  if (kind === 'event') {   // back into the event: a knockout draw is replayed
    const ev = save.event, m = ev.matches.find(x => x.winner === undefined && hasYou(x));
    if (m) { if (w === null && mustWin(ev, m) && !m.replay) { m.replay = true; } else settle(ev, m, w === null && mustWin(ev, m) ? bestSide(m) : w); }
    store(); return;
  }
  nextSlot();
}

// ---------- screens
function header() {
  const b = save.season.B.you, li = leagueOf('you');
  return `<div class="hdr"><div><b>Season ${save.seasonNo || 2}</b> · Week ${Math.min(13, week(save.day))} · Day ${save.day + 1} · ${SLOTS[save.slot]}</div>
    <div>${save.season.names[li]} · ${b.wallet} BP</div></div>`;
}
function render(view = save.view || 'commons') {
  save.view = view;
  const f = mandatoryToday();
  let body = '';
  if (save.day >= DAYS && view !== 'seasonEnd') view = save.view = 'seasonEnd';
  if (save.event && !save.event.done && view !== 'event') view = save.view = 'event';
  if (view === 'commons') {
    const line = f ? `League match today against ${nameOf(f.opp)}. Arena 1 is reserved for you.`
      : `${SLOTS[save.slot]} slot. Tap a building to go there.`;
    body = `<div class="isa"><div class="isaname">ISA</div><div>${line}</div></div>
      ${f ? `<button class="big" id="playLeague">Play league match: vs ${nameOf(f.opp)}</button>` : ''}
      ${eventCall()}
      <div class="grid"><button id="rest">Rest</button><button data-go="calendar">Calendar</button><button data-go="teams">Teams</button><button data-go="brawlers">Brawlers</button></div>`;
  } else if (view === 'shop') {
    body = shopView();
  } else if (view.startsWith('arena')) {
    body = `<h2>${PLACES.find(p => p[0] === view)[1]}</h2>` + who(view) + back();
  } else if (view === 'standings') body = standings() + back();
  else if (view === 'calendar') body = calendar() + back();
  else if (view === 'event') body = eventView();
  else if (view === 'teams') body = teamsView() + back();
  else if (view === 'brawlers') body = brawlersView() + back();
  else if (view === 'teamroom') body = PLACE_VIEWS.teamroom() + back();
  else if (view === 'seasonEnd') body = seasonEndView();
  else if (view === 'messages') body = `<h2>Messages</h2>` + (save.messages.map(m => `<div class="msg"><span>Day ${m.day + 1} · ${m.from}</span>${m.text}</div>`).join('') || '<p>No messages.</p>') + back();
  else if (view === 'inventory') {
    ensureColl(); const y = save.you, t = y.deck;
    const nm = id => (cat.cards.find(c => c.id === id) || {}).name || '?';
    body = `<h2>My Room</h2><h3>Deck</h3>` +
      t.toys.map(x => { const d = cat.toys.find(q => q.id === x.id) || {}; const g = Math.min(G_CAP, (d.baseG || 0) + ((y.coll.toys[tkey(x.id, x.attr)] || {}).g || 0) * 10);
        return `<button class="row ${y.partner === x.id ? 'on' : ''}" data-partner="${x.id}"><span class="dot" style="background:${ATTR_COLOR[x.attr]}"></span>${d.name} · ${g}G${y.partner === x.id ? ' · Partner' : ''}</button>`; }).join('') +
      `<p class="note">Tap a Bakugan to name it your partner (just your favorite; it doesn't change how it battles).</p>
      <p>Gate cards: ${GATE_COLORS.map(c => nm((t.gates[c] || {}).id)).join(', ')}</p>
      <p>Ability cards: ${AB_COLORS.map(c => [t.abilities[c], ...((t.extra || {})[c] || [])].filter(Boolean).map(x => nm(x.id || x)).join(', ')).join(' · ')}</p>
      <button class="big" id="editDeck">Edit deck</button>
      <h3>Trap</h3>${y.coll.traps.length ? y.coll.traps.map(x => `<button class="row ${t.trap && t.trap.id === x.id && t.trap.attrs.join() === x.attrs.join() ? 'on' : ''}" data-usetrap="${x.uid}">${x.name} · ${x.attrs.map(cap).join(', ')}</button>`).join('') : '<p class="note">No Traps yet. The Shop sells them.</p>'}
      <p class="note">Collection: ${Object.keys(y.coll.toys).length} Bakugan, ${y.coll.cards.length} cards, ${y.coll.traps.length} Traps.</p>` + back();
  }
  { const mh = $('map'); if (mh && mh.parentNode === $('main')) document.body.appendChild(mh); }   // keep the 3D map when the page is redrawn
  if (room3d) { room3d.dispose(); room3d = null; }
  $('main').innerHTML = header() + body;
  showMap(view === 'commons', f);
  if (view === 'teamroom' && $('room3d')) mountRoom();
  if (save.mateNews && view !== 'commons' && (presence()[view] || []).includes(save.mateNews.id)) {   // a teammate's big result
    const { id } = save.mateNews; delete save.mateNews; store();
    if (friendship(id) >= 40) say(id, `Did you see? We did it! Okay, I did it. But it counts for the team.`);
  }
  if (view === 'commons' && lastView && lastView !== 'commons' && !dq.length) isaNotice();   // ISA: a random notice back in The Commons
  lastView = view;
  if (view.startsWith('arena') && !save.seen.firstNewcomer && !mandatoryToday()) {   // S2-05: the first newcomer you meet
    const mine = save.season.leagues[leagueOf('you')].filter(id => NEWCOMERS.includes(id));
    const here = (presence()[view] || []).filter(id => mine.includes(id));
    const id = here[0] || mine[makeRng(save.season.seed + 5).int(mine.length)];
    if (id) { save.seen.firstNewcomer = id; store(); scene('firstNewcomer', { id, arena: 'arena' }); }
  }
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
  wireExtras(view);
  if ($('buy')) $('buy').onclick = () => { const b = save.season.B.you, c = boostCost(); if (b.wallet >= c && b.up - b.startUp < UPS_PER_SEASON) { b.wallet -= c; b.up++; msg('ISA', `G-Power boost purchased. Your Bakugan are now +${b.up}.`); store(); render('shop'); } };
  store();
}
// ---------- the floating boards: short versions on the map, full versions in a popup
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
    h += `<p>Upgrades are now bought one Bakugan at a time: G-Power (2 boosts per Bakugan each season) and up to 5 stat upgrades (Speed, Defense, Magnet). Use the Upgrade counter in the Shop.</p>`;
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
  { const t = myTeam(); if (t && t.ids.length >= TEAM_ROOM) counts.teamroom = t.ids.length; }   // your team room: how many members
  map = mountCommons(host, { slot: SLOTS[save.slot], counts, highlight: f ? 'arena1' : null, yaw, boards: boards(),
    onPick: k => { if (k.startsWith('board:')) return boardPopup(k.slice(6)); if (k === 'shop' && !f) { ensureColl(); store(); location.href = 'room.html?story=1'; return; } if (k === 'inventory' && !f) { ensureColl(); store(); location.href = 'room.html?story=1&to=room'; return; } if (f && k === 'arena1') launch(f.opp, { key: f.key, league: true }); else render(k); } });
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
    const o = tradeOffer(id), t = teamWith(id);
    return `<div class="card"><div><b>${nameOf(id)}</b>${isRival(id) ? ' <span class="lock">Rival</span>' : ''} · ${save.season.names[leagueOf(id)]} · ${b.rec.w}-${b.rec.l}${t ? ` · ${t.name}` : ''} · ${frLevel(id)}</div>
      <div class="say">“${CHALLENGE[tone(id)]}”</div><button data-challenge="${id}">Challenge</button>
      ${o ? `<div class="note">Trade offer: their <b>${o.get.name}</b> for your <b>${o.give.name}</b>.</div><button data-trade="${id}">Trade</button>` : ''}</div>`; }).join('');
}
function challenge(id) {
  const rng = makeRng(save.season.seed + save.day * 13 + save.slot), arena = rng() < 0.6 ? 'field_' + mainAttr(id) : 'arena';
  const fieldName = arena === 'arena' ? 'the neutral Arena' : `the ${cap(mainAttr(id))} Field`;
  say(id, isRival(id) ? `Our record's too close. Let's fix that.` : CHALLENGE[tone(id)]);
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

// ---------- event screens
function eventCall() {
  const e = eventToday(); if (!e || save.event) return '';
  const el = eligibility(e); if (!el) return `<p class="note">${e.name} is today. You aren't in the field this time.</p>`;
  return `<button class="big" id="enterEvent">${el === 'open' ? 'Enter' : 'Accept invitation:'} ${e.name}</button>`;
}
function enterEvent() {
  const e = eventToday(); if (!e) return;
  const go = partner => { save.event = startEvent(e, true, partner); store(); render('event'); };
  if (e.format !== 'tag') return go(null);
  // Tag Team: pick a partner. Teammates and friends say yes; otherwise ISA draws one for you.
  const t = myTeam(), cands = Object.keys(save.season.B).filter(id => id !== 'you' && leagueOf(id) > 0 && ((t && t.ids.includes(id)) || friendship(id) >= 10))
    .sort((a, b) => friendship(b) - friendship(a)).slice(0, 5);
  say('ISA', 'Tag Team event. Choose your partner.', [...cands.map(id => [`${nameOf(id)} (${frLevel(id)})`, () => go(id)]), ['Let ISA draw one', () => go(null)]]);
}
function eventView() {
  const ev = save.event; if (!ev) return back();
  const m = ev.done ? null : advanceEvent(ev);
  store();
  const phase = ev.done ? 'Final results' : ev.phase === 'groups' ? (ev.format === 'royale' ? 'Battle Royale groups' : 'Group stage') : ev.phase === 'final' ? 'Final' : 'Knockout';
  let h = `<h2>${ev.name}</h2><p class="note">${ev.rules === 'classic' ? 'Classic rules' : 'New Vestroia rules'}${ev.arena === 'random' ? ' · random field each match' : ev.arena ? ` · ${cap(ev.arena)} Field` : ''} · ${phase}</p>`;
  if (ev.groups && ev.phase === 'groups') h += ev.groups.map((g, i) => `<div class="card"><b>Group ${'ABCD'[i]}</b>${g.sides.map((sd, k) => ({ sd, p: g.pts[k] })).sort((a, b) => b.p - a.p)
    .map(x => `<div class="${x.sd.includes('you') ? 'me' : ''}">${x.sd.map(nameOf).join(' & ')} · ${x.p} pts</div>`).join('')}</div>`).join('');
  if (m) {
    const foes = m.sides.filter(sd => !sd.includes('you')).map(sd => sd.map(nameOf).join(' & ')).join(', ');
    h += `<button class="big" id="playEvent">${m.replay ? 'Replay (draw): ' : 'Play your match: '}vs ${foes}</button>`;
  } else if (ev.done) {
    const place = ev.order.findIndex(sd => sd.includes('you')) + 1, r = save.season.results[ev.name];
    h += `<div class="card"><b>Winner: ${r.winner.map(nameOf).join(' & ')}</b>${r.prize ? `<div>Prize: ${r.prize.name} (${cap(r.prize.attr)})${r.winner.includes('you') ? ' — added to your collection' : ''}</div>` : ''}
      <div>Your finish: ${place === 1 ? 'Winner!' : place === 2 ? 'Runner-up' : place <= 4 ? 'Semifinal' : place <= 8 ? 'Quarterfinal' : 'Early rounds'}</div></div>
      <button class="big" id="endEvent">Continue</button>`;
  }
  h += `<h3>Results</h3>` + [...ev.log].reverse().slice(0, 14).map(l => `<div class="msg">${l}</div>`).join('');
  return h;
}
function playEvent() {
  const ev = save.event, m = ev.matches.find(x => x.winner === undefined && hasYou(x)); if (!m) return;
  const sides = [m.sides.find(sd => sd.includes('you')), ...m.sides.filter(sd => !sd.includes('you'))];
  const f = fieldFor(ev, m), n = (ev.done1 || []).length + ev.matches.indexOf(m);
  launchSides(sides, { key: `E${save.day}-${n}-${m.replay ? 'r' : ''}`, arena: f ? 'field_' + f : 'arena', kind: 'event', rules: ev.rules });
}
function endEvent() { save.event = null; save.slot = 2; nextSlot(); render('commons'); }

// ---------- teams, brawlers
function teamsView() {
  const t = myTeam(), offers = (save.offers || []).filter(o => o.type === 'team' && teamsList().some(x => x.id === o.team));
  let h = `<h2>Teams</h2>`;
  if (t) {
    h += `<div class="card"><b>${t.name}</b> · ${t.ids.length}/${TEAM_MAX}${t.fixed ? '' : ''}<div>${t.ids.map(id => `${nameOf(id)}${id === 'you' ? '' : ` (${frLevel(id)})`}`).join(', ')}</div>
      ${t.ids.length >= TEAM_ROOM ? `<button data-go="teamroom">Team room</button>` : `<p class="note">A team room opens at ${TEAM_ROOM} members.</p>`}
      ${t.ids.length < TEAM_MAX ? `<p class="note">Invite a brawler from the Brawlers screen.</p>` : ''}<button id="leaveTeam">Leave team</button></div>`;
  } else {
    h += `<p class="note">You're not on a team. Teams don't change battles: they're who you hang out with, your Tag Team partners and the Team Rankings.</p>
      <button class="big" id="createTeam">Create a team</button>`;
    h += offers.map(o => { const x = teamsList().find(q => q.id === o.team);
      return `<div class="card"><b>Invite: ${x.name}</b><div>${x.ids.map(nameOf).join(', ')}</div><button data-join="${x.id}">Join</button><button data-decline="${x.id}">Decline</button></div>`; }).join('');
  }
  h += `<h3>Team Rankings</h3>` + teamRanks().map((x, i) => `<div class="${x.ids.includes('you') ? 'me' : ''}">${i + 1}. ${x.name} · ${Math.round(x.elo)} · ${x.m.length} members</div>`).join('');
  return h;
}
function brawlersView() {
  const B = save.season.B, t = myTeam(), riv = rivals();
  const ids = Object.keys(B).filter(id => id !== 'you').sort((a, b) => friendship(b) - friendship(a) || B[b].elo - B[a].elo);
  return `<h2>Brawlers</h2>${riv.length ? `<p>Rival${riv.length > 1 ? 's' : ''}: <b>${riv.map(x => `${nameOf(x.id)} (${x.w}-${x.n - x.w - x.d}${x.d ? '-' + x.d : ''})`).join(', ')}</b></p>` : '<p class="note">No rival yet: face someone at least 5 times in your last 30 matches with a 40-60% win rate.</p>'}
    <table><tr><th>Brawler</th><th>League</th><th>Team</th><th>Friendship</th><th></th></tr>` +
    ids.map(id => { const tm = teamWith(id), can = t && !t.ids.includes(id) && t.ids.length < TEAM_MAX && !(tm && tm.fixed);
      return `<tr><td>${nameOf(id)}${isRival(id) ? ' <span class="lock">Rival</span>' : ''}</td><td>${leagueNum(id)}</td><td>${tm ? tm.name : '—'}</td><td>${frLevel(id)} (${friendship(id)})</td><td>${can ? `<button data-invite="${id}">Invite</button>` : ''}</td></tr>`; }).join('') + '</table>';
}
// the 3D team room (js/teamroom3d.js): a pod per member, the wall screen shows the team's rank
let room3d = null, lastView = null;
// ISA's random notices when you come back to The Commons (Billy, Nov 20): headlines, reminders, sales. At most one per time slot,
// and only some of the time, so it doesn't nag.
function isaNotice() {
  const k = `${save.seasonNo || 2}-${save.day}-${save.slot}`; if (save.lastNotice === k) return;
  const rng = makeRng(save.season.seed + save.day * 31 + save.slot * 7); if (rng() > 0.4) return;
  save.lastNotice = k; store();
  const S = save.season, lines = [], f = myFixture(save.day), next = (S.events || []).find(e => e.day > save.day && !S.eventsDone.includes(e.name));
  const top1 = [...S.leagues[0]].sort((a, b) => tablePts(b) - tablePts(a))[0];
  const last = Object.entries(S.results || {}).slice(-1)[0];
  const sales = salesOn();
  if (f && !f.played) lines.push(`Reminder: your league match against ${nameOf(f.opp)} is today.`);
  if (next) lines.push(`${next.name} is in ${next.day - save.day} day${next.day - save.day === 1 ? '' : 's'}.`);
  if (last) lines.push(`Latest result: ${last[0]} was won by ${last[1].winner.map(nameOf).join(' & ')}.`);
  if (top1) lines.push(`${nameOf(top1)} leads League 1.`);
  lines.push(`You are ${ordinal(divRank())} in ${divName()}.`);
  if (sales && sales.length) lines.push(`The Shop has a sale today: ${saleText(sales[0])}.`);
  const tm = myTeam(); if (tm && tm.ids.length >= TEAM_ROOM) lines.push(`${tm.name}'s team room is open if you need it.`);
  lines.push('Please keep the plaza clear of Gate cards.', 'Arena 3 has been cleaned. Thank you for your patience.', 'Lost Bakugan can be collected at the Shop counter.');
  say('ISA', rng.pick(lines));
}
function mountRoom() {
  const t = myTeam(), ranks = teamRanks(), k = ranks.findIndex(r => r.name === t.name), me = ranks[k];
  const ids = ['you', ...t.ids.filter(id => id !== 'you')];
  room3d = mountTeamRoom($('room3d'), { name: t.name,
    screen: [t.name, k >= 0 ? `Team Ranking: #${k + 1} of ${ranks.length}` : 'Team Ranking: —', `${t.ids.length} members · Avg Elo ${me ? Math.round(me.elo) : '—'}`, `Season ${save.seasonNo || 2} · Day ${save.day + 1}`],
    members: ids.map(id => ({ id, name: id === 'you' ? save.you.name : nameOf(id), sub: id === 'you' ? 'You' : frLevel(id), you: id === 'you' })),
    onPick: id => { if (id === 'you') return; const c = $('mate-' + id); if (!c) return; c.scrollIntoView({ behavior: 'smooth', block: 'center' }); c.classList.add('flash'); setTimeout(() => c.classList.remove('flash'), 1200); } });
}
// ---------- PLACEHOLDER places: rooms not built yet. Each returns the HTML for its screen until the real (3D) room exists.
// login: the corridor you arrive through each day (not shown yet). teamroom: the round room with the pod chairs (3+ members).
const PLACE_VIEWS = {
  login: () => '',   // built: js/login3d.js plays when Story mode opens (see the bottom of this file)
  teamroom: () => { const t = myTeam();
    if (!t) return `<h2>Team Rooms</h2><p>You're not on a team yet. Join or create one on the Teams screen, and your team gets a room at ${TEAM_ROOM} members.</p><button class="big" data-go="teams">Teams</button>`;
    if (t.ids.length < TEAM_ROOM) return `<h2>Team Rooms</h2><p>${t.name}'s room opens at ${TEAM_ROOM} members. You have ${t.ids.length}. Invite brawlers from the Brawlers screen.</p><button class="big" data-go="teams">Teams</button> <button class="big" data-go="brawlers">Brawlers</button>`;
    return `<h2>${t.name} · Team room</h2><div id="room3d" class="room3d"></div><p class="note">Tap a pod to talk to a teammate. Drag to look around.</p>` +
      t.ids.filter(id => id !== 'you').map(id => `<div class="card" id="mate-${id}"><b>${nameOf(id)}</b> · ${frLevel(id)}<div class="say">“${CHALLENGE[tone(id)]}”</div><button data-challenge="${id}">Challenge</button></div>`).join(''); },
};
function wireExtras(view) {
  const m = $('main');
  if ($('enterEvent')) $('enterEvent').onclick = enterEvent;
  if ($('playEvent')) $('playEvent').onclick = playEvent;
  if ($('endEvent')) $('endEvent').onclick = endEvent;
  if ($('createTeam')) $('createTeam').onclick = () => { const n = (prompt('Team name?', `${save.you.name}'s team`) || '').trim(); if (n) { createTeam(n.slice(0, 20)); store(); render('teams'); } };
  if ($('leaveTeam')) $('leaveTeam').onclick = () => { if (confirm('Leave your team? Every teammate loses 25 friendship with you.')) { leaveTeam(); store(); render('teams'); } };
  if ($('nextSeason')) $('nextSeason').onclick = () => { nextSeason(); store(); render('commons'); };
  m.querySelectorAll('[data-join]').forEach(b => b.onclick = () => { joinTeam(b.dataset.join); store(); render('teams'); });
  m.querySelectorAll('[data-decline]').forEach(b => b.onclick = () => { save.offers = save.offers.filter(o => o.team !== b.dataset.decline); store(); render('teams'); });
  m.querySelectorAll('[data-invite]').forEach(b => b.onclick = () => { const r = inviteToTeam(b.dataset.invite); msg('ISA', r); store(); render('brawlers'); say('ISA', r); });
  m.querySelectorAll('[data-trade]').forEach(b => b.onclick = () => tradeTalk(b.dataset.trade));
}

// ---------- end of season: promotion, then the next season
function finalTables() { const B = save.season.B; return save.season.leagues.map(lg => [...lg].sort((a, b) => B[b].lg.pts - B[a].lg.pts || B[b].lg.bp - B[a].lg.bp)); }
function promotedLeagues() {
  const t = finalTables();
  if (t.length === 6) return promoteSeason2(t);   // Season 2: top 4 of League 2, top 8 of League 3, top 4 of each League 4 division go up
  const nl = t.map(x => [...x]);   // from Season 3: top 2 up, bottom 2 down
  for (let i = 0; i + 1 < nl.length; i++) { const up = t[i + 1].slice(0, 2), down = t[i].slice(-2); nl[i] = nl[i].filter(id => !down.includes(id)).concat(up); nl[i + 1] = nl[i + 1].filter(id => !up.includes(id)).concat(down); }
  return nl;
}
function seasonEndView() {
  const S = save.season, before = leagueNum(), nl = promotedLeagues(), after = nl.findIndex(l => l.includes('you')) + 1;
  const n = save.seasonNo || 2, reset = (n + 1 - 1) % 4 === 0;
  const lg = finalTables()[leagueOf('you')], pos = lg.indexOf('you') + 1;
  const moved = after < before ? `Promoted to League ${after}!` : after > before ? `Relegated to League ${after}.` : `You stay in League ${after}.`;
  return `<h2>Season ${n} complete</h2><div class="card"><b>${S.names[leagueOf('you')]}: ${pos}${['th', 'st', 'nd', 'rd'][pos % 10 > 3 || [11, 12, 13].includes(pos % 100) ? 0 : pos % 10]} place</b>
    <div>${moved}</div><div>Titles this season: ${S.B.you.titles.join(', ') || 'none'}</div><div>Record: ${S.B.you.rec.w}-${S.B.you.rec.l}-${S.B.you.rec.d} · Elo ${Math.round(S.B.you.elo)}</div></div>
    ${reset ? `<p class="note">A new year starts with Season ${n + 1}: every brawler's upgrades reset to zero.</p>` : ''}
    <button class="big" id="nextSeason">Start Season ${n + 1}</button>` + standings();
}
function nextSeason() {
  const S = save.season, n = (save.seasonNo || 2) + 1, nl = promotedLeagues(), reset = (n - 1) % 4 === 0;
  const before = leagueNum(), after = nl.findIndex(l => l.includes('you')) + 1;
  save.history = [...(save.history || []), { season: n - 1, league: before, place: finalTables()[leagueOf('you')].indexOf('you') + 1, titles: S.B.you.titles, rec: S.B.you.rec, elo: Math.round(S.B.you.elo) }];
  scene('promotion', { from: before, to: after, league: nl[after - 1] });
  { const tm = myTeam(), li = id => nl.findIndex(l => l.includes(id)), was = id => S.leagues.findIndex(l => l.includes(id));   // teammates' promotions
    if (tm) tm.ids.filter(id => id !== 'you' && li(id) >= 0 && was(id) >= 0 && li(id) + 1 < Math.min(4, was(id) + 1)).forEach(id => msg('ISA', `${nameOf(id)} of ${tm.name} has been promoted to League ${li(id) + 1}.`)); }
  const seed = (S.seed * 31 + n * 7919) & 0x7fffffff, rng = makeRng(seed), B = {};
  for (const [id, b] of Object.entries(S.B)) {
    const up = reset ? 0 : b.up;
    B[id] = { id, name: b.name, level: b.level, up, startUp: up, elo: b.elo, bp: 0, wallet: b.wallet, rec: { w: 0, l: 0, d: 0 }, lg: { w: 0, l: 0, d: 0, pts: 0, bp: 0 }, titles: [],
      career: { w: ((b.career || {}).w || 0) + b.rec.w, l: ((b.career || {}).l || 0) + b.rec.l, d: ((b.career || {}).d || 0) + b.rec.d, titles: [...((b.career || {}).titles || []), ...b.titles.map(t => `S${n - 1} ${t}`)] } };
  }
  const days = [0, 2, 4, 6, 8, 10, 11, 1, 3, 5, 7].map(w => w * 7 + 2).sort((a, b) => a - b);   // 11 rounds for leagues of 12
  save.season = { seed, B, leagues: nl, names: ['League 1', 'League 2', 'League 3', 'League 4'], events: season2Events(rng).map(e => ({ ...e, day: e.week * 7 })),
    fixtures: nl.map(rounds), leagueDays: days, done: {}, eventsDone: [] };
  if (reset) for (const k of Object.keys(save.you.coll.toys)) save.you.coll.toys[k] = {};   // the yearly reset clears your Bakugan's upgrades too
  save.seasonNo = n; save.day = 0; save.slot = 0; save.view = 'commons'; save.seen.midseason = false;
  msg('ISA', `Season ${n} begins. You are in League ${after}.${reset ? ' Upgrades have been reset for everyone.' : ''}`);
  dayStart();
}

// ---------- dialogue box (ISA over the intercom, brawlers in person)
// ---------- Scene mode (Billy, Nov 20)
// Every conversation plays as a scene: the picture behind freezes, the speakers stand on the stage (models: to build together),
// and the text box at the bottom shows the speaker's name and types out the line. Tap to finish a line, tap again for the next.
//   say(who, text)                         a line (who: 'ISA', a brawler id or a name)
//   say(who, text, [[label, fn], ...])     a line that ends with choices
//   say(who, text, null, { call: true })   the speaker is on a call window (show characters, calls from far away)
//   say(who, text, null, { input: { placeholder, ok, done(value) } })   ask for typed text (your name)
let dq = [], typer = null, answering = false;
const TYPE_MS = 22;   // per letter
function say(who, text, choices = null, opts = {}) { dq.push({ who, text, choices, ...opts }); if (dq.length === 1 && !answering) showLine(); }
// a choice's answer plays right away, before anything else that was already waiting
function answer(fn) { const rest = dq.slice(1); dq = []; answering = true; try { fn(); } finally { answering = false; } dq.push(...rest); showLine(); }
const speakerName = who => (save && save.season && save.season.B && save.season.B[who]) ? nameOf(who) : who;
function enterScene() { if ($('scene').hidden) { $('scene').hidden = false; document.body.classList.add('scene-on'); } }
function exitScene() { $('scene').hidden = true; document.body.classList.remove('scene-on'); $('sceneStage').innerHTML = ''; }
// The stage. ISA is a glowing speaker panel; a call is a call window with the caller's attribute color.
// MODELS GO HERE: for a brawler in person, stage() makes an empty .actor slot (data-id = who). We'll put their 3D model
// (knee or waist up) into that slot together later.
function stage(l) {
  const st = $('sceneStage');
  if (l.who === 'ISA') { st.innerHTML = `<div class="isaPanel talk"></div>`; return; }
  if (l.call) { const a = save && save.season && save.season.B[l.who] ? mainAttr(l.who) : null;
    st.innerHTML = `<div class="callWin" style="--cc:${ATTR_COLOR[a] || '#ffcf3a'}"><div class="bar">INCOMING CALL</div><div class="emb"></div><div class="nm">${speakerName(l.who)}</div></div>`; return; }
  if (!st.querySelector(`.actor[data-id="${l.who}"]`)) st.innerHTML = `<div class="actor right" data-id="${l.who}"></div>`;   // MODEL SLOT (empty for now)
}
function showLine() {
  clearInterval(typer); typer = null;
  const l = dq[0]; if (!l) { exitScene(); return; }
  enterScene(); stage(l);
  const D = $('dlg'), cls = l.who === 'ISA' ? 'isa2' : l.call ? 'call' : '';
  D.innerHTML = `<div class="dname ${cls}">${speakerName(l.who)}${l.call ? ' · call' : ''}</div><div class="dtext"></div><div class="tail"></div>`;
  const T = D.querySelector('.dtext'); let n = 0;
  const finish = () => {
    clearInterval(typer); typer = null; T.textContent = l.text; const isa = $('sceneStage').querySelector('.isaPanel'); if (isa) isa.classList.remove('talk');
    const tail = D.querySelector('.tail');
    if (l.input) {
      tail.innerHTML = `<input id="nm" maxlength="14" placeholder="${l.input.placeholder || ''}"><div class="dch"><button id="nmok">${l.input.ok || 'OK'}</button></div>`;
      $('nmok').onclick = e => { e.stopPropagation(); const v = ($('nm').value || '').trim(); answer(() => l.input.done(v)); };
      $('nm').onclick = e => e.stopPropagation(); D.onclick = null; return;
    }
    if (l.choices) {
      tail.innerHTML = `<div class="dch">${l.choices.map(([t], i) => `<button data-c="${i}">${t}</button>`).join('')}</div>`;
      tail.querySelectorAll('[data-c]').forEach(b => b.onclick = e => { e.stopPropagation(); answer(l.choices[+b.dataset.c][1]); });
      D.onclick = null; return;
    }
    tail.innerHTML = `<div class="dnext">▼</div>`;
    D.onclick = () => { D.onclick = null; dq.shift(); showLine(); };
  };
  typer = setInterval(() => { n += 1; T.textContent = l.text.slice(0, n); if (n >= l.text.length) finish(); }, TYPE_MS);
  D.onclick = () => finish();   // tap while typing: show the whole line
}
function closeDialog() { dq = []; clearInterval(typer); exitScene(); }
const lines = (who, list, then) => { list.forEach((t, i) => say(who, t, i === list.length - 1 && then ? [['Continue', then]] : null)); };

// ---------- opening scenes (S2-01 to S2-04, claude/story-scripts.md)
function opening(s1) {
  lines('ISA', ['Connection established. Welcome to Bakugan Interspace.',
    'I am ISA, the Interspace System Assistant. I manage the arenas, the schedules and the rankings.',
    'Our records show your last battle was before the Bakugan returned to New Vestroia. Welcome back.',
    'Interspace opened to the public this season. Humans and Vestals battle here with their own partners and with synthetic Bakugan made by Interspace.'], () => {
    say('ISA', 'Please confirm your brawler name.', null, { input: { placeholder: 'Name', ok: 'Confirm', done: v => pickStarter(s1, v || 'Brawler') } });
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
    const first = leagueDays().map(myFixture).find(Boolean);
    if (first) msg('ISA', `Your first league match: vs ${nameOf(first.opp)} on day ${leagueDays()[first.round - 1] + 1}.`);
    msg('ISA', 'Open I is this week. On the day, you can enter it from The Commons.');
    dayStart(); store(); render('commons');
  }]]);
}

// ---------- start
async function start() {
  let pack = null; try { pack = await Pack.fromDevice(); } catch {}
  if (!pack) { $('main').innerHTML = '<p>No asset pack on this device yet. Go back and load it first.</p>'; return; }
  cat = pack.catalog; PACK = pack;
  save = load();
  if (loginCtl) { avatarSent = true; loginCtl.setAvatar(buildAvatar((save && save.you && save.you.look) || DEFAULT_LOOK, p => pack.url(p)).catch(() => null)); }   // you, in your login pod
  const s1 = await (await fetch('data/season1.json')).json();
  if (!save) { $('main').innerHTML = '<div class="hdr"><b>Bakugan Interspace</b></div>'; opening(s1); return; }
  if (save.season && save.you) { ensureColl(); migrateUps(); bondTeam(myTeam(), false); store(); }   // older saves: teammates at least Acquaintances
  takeResult();
  if (save.after && save.after.kind === 'newcomer') {   // back from the practice match with your first newcomer
    const a = save.after; delete save.after; store();
    if (save.season.B.you.rec.w + save.season.B.you.rec.l > a.w + a.l) scene('newcomerAfter', { id: a.id, won: save.season.B.you.rec.w > a.w });
  }
  render(save.view === 'shop' || (save.view || '').startsWith('arena') ? 'commons' : save.view);
  for (const q of save.queue || []) if (q && q.rivalAfter) say(q.rivalAfter, q.won ? `Fine. That one's yours. Next one's mine.` : `That evens it up. Same time tomorrow?`);
  for (const q of save.queue || []) if (q === 'firstLeagueWin') { say('ISA', `First league win recorded. Three points to ${save.you.name}.`); say('ISA', `Your name is now on the ${save.season.names[leagueOf('you')]} table.`); }
  save.queue = []; store();
}
$('newgame').onclick = () => { if (confirm('Start a new story? This erases your current one.')) { localStorage.removeItem(KEY); location.reload(); } };
// The login corridor plays each time you open Story mode from the menu (not when you come back from a battle or the Shop).
// It stays up at least 4 seconds, or until the page has finished loading.
let loginDone = null, loginCtl = null, avatarSent = false;
try { if (!sessionStorage.getItem('marbles-story-in')) { sessionStorage.setItem('marbles-story-in', '1'); const ready = new Promise(r => { loginDone = r; }); loginCtl = playLogin({ ready }); } } catch {}
start().catch(e => console.error(e)).finally(() => { if (loginCtl && !avatarSent) loginCtl.setAvatar(null); loginDone && loginDone(); });
// after the corridor: ISA's daily greeting (only for an existing story, and only if nothing else is being said)
if (loginCtl) loginCtl.done.then(() => { if (save && save.season && save.you && !dq.length) scene('login'); });
