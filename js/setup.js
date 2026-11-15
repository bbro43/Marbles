// Team setup before a match: each player picks 3 toys (and their attributes), 1 Gold, 1 Silver and
// 1 Copper Gate card, and 1 Red, 1 Blue and 1 Green Ability card. Then who goes first.
// Each player slot remembers its last team on this device.
import { isCoded } from './abilities.js';

const ATTR_COLOR = { pyrus: '#e53935', aquos: '#1e88e5', subterra: '#b07a3c', haos: '#f2e7b8', darkus: '#7b3fa8', ventus: '#3fa34d', clear: '#cfd8dc' };
const GATE_COLORS = ['gold', 'silver', 'copper'], AB_COLORS = ['red', 'blue', 'green'];
const COLOR_HEX = { gold: '#e2b84a', silver: '#c9d1da', copper: '#c67a43', red: '#d9534f', blue: '#4a8fe0', green: '#4caf6a' };
const cap = s => s[0].toUpperCase() + s.slice(1);
const lv = (st, k) => Math.min(5, Math.max(1, (st || {})[k] ?? 3));
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const CSS = `
#setup { position:fixed; inset:0; z-index:50; background:#0d1014; overflow:auto; padding:14px; padding-bottom:90px; }
#setup h2 { margin:4px 0 10px; font-size:20px; } #setup h3 { margin:16px 0 8px; font-size:16px; color:#cfd8e2; }
#setup .row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
#setup input[type=text], #setup input[type=search] { background:#1b2430; color:#e8edf2; border:1px solid #2a3644; border-radius:10px; padding:9px 12px; font:inherit; }
#setup .slot { flex:1 1 150px; background:#1b2430; border:2px solid #2a3644; border-left:8px solid var(--c,#2a3644); border-radius:12px; padding:8px 10px; min-height:58px; position:relative; }
#setup .slot.empty { color:#5d6b7a; display:flex; align-items:center; justify-content:center; border-style:dashed; }
#setup .slot small { color:#93a2b2; display:block; font-size:12px; }
#setup .slot .x { position:absolute; top:4px; right:6px; background:none; border:0; color:#93a2b2; font-size:18px; cursor:pointer; }
#setup .dots { display:flex; gap:6px; margin-top:6px; } #setup .dot { width:22px; height:22px; border-radius:50%; border:2px solid transparent; cursor:pointer; }
#setup .dot.on { border-color:#fff; }
#setup .list { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:8px; max-height:300px; overflow:auto; margin-top:8px; padding:2px; }
#setup .item { text-align:left; background:#151d27; color:#e8edf2; border:2px solid #2a3644; border-left:6px solid var(--c,#2a3644); border-radius:10px; padding:7px 9px; font:inherit; cursor:pointer; }
#setup .item.off { opacity:.35; cursor:default; }
#setup .item.sel { border-color:#fff; border-left-color:var(--c); }
#setup .item b { display:block; font-size:14px; } #setup .item span { display:block; color:#93a2b2; font-size:12px; }
#setup .tabs { display:flex; gap:6px; } #setup .tab { flex:1; background:#151d27; color:#e8edf2; border:2px solid #2a3644; border-top:5px solid var(--c); border-radius:10px; padding:7px; font:inherit; cursor:pointer; text-align:left; }
#setup .tab.on { border-color:#fff; border-top-color:var(--c); } #setup .tab small { display:block; color:#93a2b2; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
#setup .bar { position:fixed; left:0; right:0; bottom:0; display:flex; gap:8px; padding:10px 14px; padding-bottom:calc(10px + env(safe-area-inset-bottom)); background:#121820; border-top:1px solid #2a3644; }
#setup .bar button, #setup .big { flex:1; background:#2a3644; color:#e8edf2; border:0; border-radius:12px; padding:13px; font:inherit; font-weight:700; cursor:pointer; }
#setup .bar .go { background:#d33; } #setup .bar .go:disabled { opacity:.4; }
#setup .filters { position:sticky; top:-14px; z-index:2; background:#0d1014; padding:10px 0 8px; display:flex; flex-direction:column; gap:8px; }
#setup .filters input { width:100%; box-sizing:border-box; }
#setup .fchip { background:#151d27; color:#e8edf2; border:2px solid #2a3644; border-left:6px solid var(--c); border-radius:999px; padding:5px 10px; font:inherit; font-size:13px; cursor:pointer; }
#setup .fchip.on { background:var(--c); color:#111; border-color:#fff; font-weight:700; }
#setup .none { color:#5d6b7a; padding:8px; }
#setup .tpic { width:64px; height:64px; object-fit:contain; float:left; margin:-2px 8px 0 -2px; }
#setup .slot .tpic { width:72px; height:72px; }
#setup .item.toy { min-height:72px; }
#setup .cpic { float:left; width:54px; height:72px; margin:0 8px 2px 0; background-size:cover; background-position:center; border-radius:4px; position:relative; }
#setup .cpic.blank i { position:absolute; left:4px; right:4px; top:22px; font-style:normal; font-weight:700; font-size:9px; line-height:1.1; color:#fff; text-align:center; text-shadow:0 1px 2px #000; }
#setup .item.card { min-height:80px; }
#setup .tab .cpic { width:36px; height:48px; margin-right:6px; } #setup .tab .cpic.blank i { font-size:6px; top:14px; }
#setup .big { display:block; width:100%; margin:8px 0; font-size:18px; }
`;

// Evolution lines: a team can hold only one toy from each line (Billy's call).
// Preyas II Angelo / Diablo share a line (one or the other); Preyas and Warius have no line.
const LINES = {
  dragonoid: ['bb_00', 'bb_01', 'dc_sp00', 'dc_sp00_00', 'dc_sp00_01'], tigrerra: ['bb_04', 'bb_05'], preyas2: ['bb_07', 'bb_08'],
  gorem: ['bb_09', 'bb_10'], skyress: ['bb_11', 'bb_12'], hydranoid: ['bb_13', 'bb_14'], leonidas: ['bb_62', 'bb_63'],
  vladitor: ['bb_64', 'bb_65'], ingram: ['dc_sp01', 'dc_sp01_00'], elfin: ['dc_sp02', 'dc_sp02_00'],
  percival: ['dc_sp03', 'dc_sp03_00', 'dc_sp12'], wilda: ['dc_sp04', 'dc_sp04_00'], nemus: ['dc_sp05', 'dc_sp05_00'],
  helios: ['dc_sp06', 'dc_sp06_01'],
};
const LINE_OF = Object.fromEntries(Object.entries(LINES).flatMap(([l, ids]) => ids.map(id => [id, l])));
// would adding toy id break the one-per-line rule for this team?
const lineBlocked = (team, id) => !!LINE_OF[id] && team.some(x => x.id !== id && LINE_OF[x.id] === LINE_OF[id]);

const ALL = ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus'];
const NAMES = { pyrus: /pyrus/i, aquos: /aquos|auqos/i, subterra: /sub ?t?terra/i, haos: /haos/i, darkus: /darkus/i, ventus: /ventus/i };
// attributes a card's text asks for ("…with one of your Haos or Ventus…")
const mentioned = card => ALL.filter(a => NAMES[a].test(card.text || ''));
// a card fits if it doesn't ask for an attribute, or asks for one of these; bonus cards need a bonus for one of them
function fitsAttrs(card, attrs) {
  const m = mentioned(card);
  if (m.length && !m.some(a => attrs.includes(a))) return false;
  const b = card.bonus || {};
  if (Object.values(b).some(v => v > 0) && !attrs.some(a => (b[a] || 0) > 0)) return false;
  return true;
}
function abilityScore(card, attrs) {
  const b = card.bonus || {};
  const avg = attrs.reduce((n, a) => n + (b[a] || 0), 0) / attrs.length;
  return avg + (card.extraBonus || 0) + (mentioned(card).some(a => attrs.includes(a)) ? 40 : 0);
}

function lastTeam(i) { try { return JSON.parse(localStorage.getItem('marbles-team-' + i) || 'null'); } catch { return null; } }
function saveTeam(i, t) { try { localStorage.setItem('marbles-team-' + i, JSON.stringify(t)); } catch {} }

export function makeToy(t, attr) {
  return { id: t.id, name: t.name, attr, g: t.baseG ?? 250, stats: { speed: 3, defense: 3, magnet: 3, ...(t.stats || {}) },
    model: t.model, attrTexture: t.attributes[attr] };
}
const rand = n => Math.floor(Math.random() * n);
const pick = arr => arr[rand(arr.length)];

// Resolves with { players: [{ name, toys, gates, abilities }], first }
export async function setupTeams(cat, pack) {
  const style = document.createElement('style'); style.textContent = CSS; document.head.append(style);
  const root = document.createElement('div'); root.id = 'setup'; document.body.append(root);
  // pictures: toy thumbnails, card art, blank card frames (all from the asset pack)
  root.innerHTML = '<h2>Loading pictures…</h2>';
  const pic = new Map();
  const paths = [...cat.toys.flatMap(t => Object.values(t.thumbs || {})), ...cat.cards.map(c => c.art).filter(Boolean), ...Object.values(cat.cardFrames || {})];
  await Promise.all([...new Set(paths)].map(async p => { try { pic.set(p, await pack.url(p)); } catch {} }));
  const thumb = (d, attr) => pic.get((d.thumbs || {})[attr]) || '';
  // a card picture: its art from the DS game, or the blank frame for its color with the name on it
  const cardPic = c => c.art && pic.get(c.art)
    ? `<span class="cpic" style="background-image:url(${pic.get(c.art)})"></span>`
    : `<span class="cpic blank" style="background-image:url(${pic.get((cat.cardFrames || {})[c.color]) || ''})"><i>${esc(c.name)}</i></span>`;
  const toys = cat.toys.filter(t => t.baseG && Object.keys(t.attributes || {}).length);
  const gates = cat.cards.filter(c => c.type === 'gate' && c.bonus);
  const abilities = cat.cards.filter(c => c.type === 'ability' && isCoded(c));
  const toyById = new Map(toys.map(t => [t.id, t])), cardById = new Map([...gates, ...abilities].map(c => [c.id, c]));

  const randomTeam = () => ({
    toys: (() => { const out = []; while (out.length < 3) { const d = pick(toys); if (!lineBlocked(out, d.id)) out.push({ id: d.id, attr: pick(Object.keys(d.attributes)) }); } return out; })(),
    gates: Object.fromEntries(GATE_COLORS.map(c => [c, pick(gates.filter(g => g.color === c)).id])),
    abilities: Object.fromEntries(AB_COLORS.map(c => [c, pick(abilities.filter(a => a.color === c)).id])),
  });
  // a saved team, keeping only what still exists in this asset pack
  const restore = (saved, i) => {
    const t = { name: `Player ${i + 1}`, toys: [], gates: {}, abilities: {} };
    if (!saved) return t;
    t.name = saved.name || t.name;
    t.toys = (saved.toys || []).filter(x => toyById.get(x.id) && toyById.get(x.id).attributes[x.attr]).slice(0, 3);
    for (const c of GATE_COLORS) if (cardById.get((saved.gates || {})[c])) t.gates[c] = saved.gates[c];
    for (const c of AB_COLORS) if (cardById.get((saved.abilities || {})[c])) t.abilities[c] = saved.abilities[c];
    return t;
  };

  // Auto finish: keep what's picked and fill the rest to suit it.
  // Toys: the team's main attribute (or the attribute filter), strongest first. Cards: the best fit for the team's attributes.
  const topPick = (arr, score) => { const s = [...arr].sort((a, b) => score(b) - score(a)).slice(0, 3); return s[rand(s.length)]; };
  function autoFinish(t, fa) {
    const counts = {}; t.toys.forEach(x => counts[x.attr] = (counts[x.attr] || 0) + 1);
    const main = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || fa[0];
    while (t.toys.length < 3) {
      const taken = new Set(t.toys.map(x => x.id));
      const ok = d => !taken.has(d.id) && !lineBlocked(t.toys, d.id);
      let pool = toys.filter(d => ok(d) && (main ? d.attributes[main] : true));
      if (!pool.length) pool = toys.filter(ok);
      const d = topPick(pool, d => d.baseG ?? 250);
      t.toys.push({ id: d.id, attr: main && d.attributes[main] ? main : Object.keys(d.attributes)[0] });
    }
    const attrs = t.toys.map(x => x.attr);
    for (const c of GATE_COLORS) if (!t.gates[c])
      t.gates[c] = topPick(gates.filter(g => g.color === c), g => attrs.reduce((n, a) => n + (g.bonus[a] || 0), 0)).id;
    const team = [...new Set(attrs)];
    for (const c of AB_COLORS) if (!t.abilities[c]) {
      const pool = abilities.filter(a => a.color === c && fitsAttrs(a, team));
      t.abilities[c] = topPick(pool.length ? pool : abilities.filter(a => a.color === c), a => abilityScore(a, attrs)).id;
    }
  }

  return await new Promise(resolve => {
    const teams = [restore(lastTeam(0), 0), restore(lastTeam(1), 1)];
    let who = 0, gateTab = 'gold', abTab = 'red', search = '';
    const filt = new Set();   // attribute filter (empty = all)

    const complete = t => t.toys.length === 3 && GATE_COLORS.every(c => t.gates[c]) && AB_COLORS.every(c => t.abilities[c]);
    const attrsOf = t => [...new Set(t.toys.map(x => x.attr))];

    function render() {
      const t = teams[who];
      if (who === 2) return renderFirst();
      const mine = attrsOf(t);
      const slots = [0, 1, 2].map(k => {
        const x = t.toys[k];
        if (!x) return `<div class="slot empty">Pick a Bakugan below</div>`;
        const d = toyById.get(x.id);
        return `<div class="slot" style="--c:${ATTR_COLOR[x.attr]}"><button class="x" data-rm="${k}">✕</button><img class="tpic" src="${thumb(d, x.attr)}" alt=""><b>${esc(d.name)}</b>
          <small>${d.baseG ?? 250}G · Spd ${lv(d.stats, 'speed')} · Def ${lv(d.stats, 'defense')} · Mag ${lv(d.stats, 'magnet')}</small>
          <div class="dots">${Object.keys(d.attributes).map(a => `<span class="dot ${a === x.attr ? 'on' : ''}" title="${cap(a)}" data-k="${k}" data-attr="${a}" style="background:${ATTR_COLOR[a]}"></span>`).join('')}</div></div>`;
      }).join('');
      const q = search.trim().toLowerCase();
      const hit = (...texts) => !q || texts.some(x => String(x || '').toLowerCase().includes(q));
      const fa = [...filt];
      const listAttr = d => fa.find(a => d.attributes[a]) || Object.keys(d.attributes)[0];   // show toys in the filtered color
      const toyList = toys.filter(d => hit(d.name) && (!fa.length || fa.some(a => d.attributes[a]))).map(d =>
        `<button class="item toy ${lineBlocked(t.toys, d.id) ? 'off' : ''}" data-add="${d.id}" style="--c:${ATTR_COLOR[listAttr(d)]}"><img class="tpic" src="${thumb(d, listAttr(d))}" alt="" loading="lazy"><b>${esc(d.name)}</b><span>${d.baseG ?? 250}G</span><span>Spd ${lv(d.stats, 'speed')} · Def ${lv(d.stats, 'defense')} · Mag ${lv(d.stats, 'magnet')}</span></button>`).join('');
      // Gate cards: sorted by the best bonus for your toys' attributes
      const focus = fa.length ? fa : mine.length ? mine : ALL;
      const score = g => Math.max(0, ...focus.map(a => g.bonus[a] || 0));
      const gateList = gates.filter(g => g.color === gateTab && hit(g.name, g.text) && (!fa.length || score(g) > 0)).sort((a, b) => score(b) - score(a)).map(g =>
        `<button class="item card ${t.gates[gateTab] === g.id ? 'sel' : ''}" data-gate="${esc(g.id)}" style="--c:${COLOR_HEX[g.color]}">${cardPic(g)}<b>${esc(g.name)}</b>
          <span>${focus.map(a => `${cap(a)} +${g.bonus[a] || 0}`).join(' · ')}</span>${g.text ? `<span>${esc(g.text)}</span>` : ''}</button>`).join('');
      const abList = abilities.filter(a => a.color === abTab && hit(a.name, a.text) && (!fa.length || fitsAttrs(a, fa))).map(a =>
        `<button class="item card ${t.abilities[abTab] === a.id ? 'sel' : ''}" data-ab="${esc(a.id)}" style="--c:${COLOR_HEX[a.color]}">${cardPic(a)}<b>${esc(a.name)}</b><span>${esc(a.text)}</span></button>`).join('');
      const tab = (kind, c, chosen, on) => `<button class="tab ${on ? 'on' : ''}" data-${kind}tab="${c}" style="--c:${COLOR_HEX[c]}">${chosen ? cardPic(cardById.get(chosen)) : ''}${cap(c)}<small>${chosen ? esc(cardById.get(chosen).name) : '—'}</small></button>`;
      root.innerHTML = `
        <h2>${esc(t.name)}: set up your team</h2>
        <div class="row"><input type="text" id="sname" maxlength="16" value="${esc(t.name)}" placeholder="Name"></div>
        <div class="filters">
          <input type="search" id="ssearch" placeholder="Search Bakugan and cards" value="${esc(search)}">
          <div class="row">${ALL.map(a => `<button class="fchip ${filt.has(a) ? 'on' : ''}" data-f="${a}" style="--c:${ATTR_COLOR[a]}">${cap(a)}</button>`).join('')}</div>
        </div>
        <h3>Bakugan (${t.toys.length}/3)</h3>
        <div class="row">${slots}</div>
        <div class="list">${toyList || '<span class="none">No matches</span>'}</div>
        <h3>Gate cards</h3>
        <div class="tabs">${GATE_COLORS.map(c => tab('g', c, t.gates[c], c === gateTab)).join('')}</div>
        <div class="list">${gateList || '<span class="none">No matches</span>'}</div>
        <h3>Ability cards</h3>
        <div class="tabs">${AB_COLORS.map(c => tab('a', c, t.abilities[c], c === abTab)).join('')}</div>
        <div class="list">${abList || '<span class="none">No matches</span>'}</div>
        <div class="bar"><button id="srand">Random</button><button id="sauto">Auto finish</button><button class="go" id="sdone" ${complete(t) ? '' : 'disabled'}>${who === 0 ? 'Next player' : 'Done'}</button></div>`;
      const $ = s => root.querySelector(s);
      $('#sname').oninput = e => { t.name = e.target.value || `Player ${who + 1}`; root.querySelector('h2').textContent = `${t.name}: set up your team`; };
      $('#ssearch').oninput = e => { search = e.target.value; const pos = e.target.selectionStart; render(); const s = root.querySelector('#ssearch'); s.focus(); s.setSelectionRange(pos, pos); };
      root.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { t.toys.splice(+b.dataset.rm, 1); render(); });
      root.querySelectorAll('[data-attr]').forEach(b => b.onclick = () => { t.toys[+b.dataset.k].attr = b.dataset.attr; render(); });
      root.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
        if (t.toys.length >= 3 || lineBlocked(t.toys, b.dataset.add)) return;
        const d = toyById.get(b.dataset.add); t.toys.push({ id: d.id, attr: Object.keys(d.attributes)[0] }); render();
      });
      root.querySelectorAll('[data-gate]').forEach(b => b.onclick = () => {
        t.gates[gateTab] = b.dataset.gate;
        gateTab = GATE_COLORS.find(c => !t.gates[c]) || gateTab; render();
      });
      root.querySelectorAll('[data-ab]').forEach(b => b.onclick = () => {
        t.abilities[abTab] = b.dataset.ab;
        abTab = AB_COLORS.find(c => !t.abilities[c]) || abTab; render();
      });
      root.querySelectorAll('[data-gtab]').forEach(b => b.onclick = () => { gateTab = b.dataset.gtab; render(); });
      root.querySelectorAll('[data-atab]').forEach(b => b.onclick = () => { abTab = b.dataset.atab; render(); });
      $('#srand').onclick = () => { Object.assign(t, randomTeam()); render(); };
      $('#sauto').onclick = () => { autoFinish(t, fa); render(); };
      root.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { filt.has(b.dataset.f) ? filt.delete(b.dataset.f) : filt.add(b.dataset.f); render(); });
      $('#sdone').onclick = () => {
        if (!complete(t)) return;
        saveTeam(who, t); who++; search = ''; filt.clear(); gateTab = 'gold'; abTab = 'red'; render(); root.scrollTop = 0;
      };
    }

    function renderFirst() {
      root.innerHTML = `<h2>Who goes first?</h2>
        <button class="big" data-first="0">${esc(teams[0].name)}</button>
        <button class="big" data-first="1">${esc(teams[1].name)}</button>
        <button class="big" data-first="r">Random</button>
        <button class="big" id="sback" style="background:#1b2430">Back</button>`;
      root.querySelectorAll('[data-first]').forEach(b => b.onclick = () => {
        const first = b.dataset.first === 'r' ? rand(2) : +b.dataset.first;
        root.remove(); style.remove();
        resolve({
          first,
          players: teams.map(t => ({
            name: t.name,
            toys: t.toys.map(x => makeToy(toyById.get(x.id), x.attr)),
            gates: GATE_COLORS.map(c => cardById.get(t.gates[c])),
            abilities: AB_COLORS.map(c => cardById.get(t.abilities[c])),
          })),
        });
      });
      root.querySelector('#sback').onclick = () => { who = 1; render(); };
    }

    render();
  });
}
