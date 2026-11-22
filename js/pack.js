import { applyDual } from './dual.js';
// Loads the asset pack the player stored on this device (IndexedDB) and hands out files from it.
const DB_NAME = 'marbles', STORE = 'pack';

function db() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB_NAME, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
export async function idbGet(key) {
  const d = await db();
  return new Promise((res, rej) => { const q = d.transaction(STORE).objectStore(STORE).get(key); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); });
}
export async function idbPut(key, val) {
  const d = await db();
  return new Promise((res, rej) => { const t = d.transaction(STORE, 'readwrite'); t.objectStore(STORE).put(val, key); t.oncomplete = res; t.onerror = () => rej(t.error); });
}

// The pack can be one zip or split across several (pack 0.49+: marbles-pack-1.zip = toys, traps, cards;
// marbles-pack-2.zip = everything else, including catalog.json and pack.json). Files are looked up in each zip in turn.
// a pack split into parts may carry a catalog.json / pack.json in each part: merge them into one
export async function mergedJson(zips, name) {
  const out = {};
  for (const z of zips) {
    const f = z.file(name); if (!f) continue;
    const j = JSON.parse(await f.async('string'));
    for (const [k, v] of Object.entries(j)) {
      if (Array.isArray(v) && Array.isArray(out[k])) out[k] = out[k].concat(v);
      else if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object') out[k] = { ...out[k], ...v };
      else if (!(k in out)) out[k] = v;
    }
  }
  return out;
}
export class Pack {
  static async open(blobs) {
    const p = new Pack();
    p.zips = await Promise.all([].concat(blobs).map(b => window.JSZip.loadAsync(b)));
    const find = n => p.zips.map(z => z.file(n)).find(Boolean);
    if (!find('pack.json')) throw new Error('This zip is not an asset pack (no pack.json).');
    p.info = await mergedJson(p.zips, 'pack.json');
    p.catalog = await mergedJson(p.zips, 'catalog.json');
    applyDual(p.catalog);   // Dual Attribute Bakugan can't be their fixed second attribute (js/dual.js)
        // pictures named toys/<id>/thumb-<attribute>.png fill in each Bakugan's thumbs automatically
    for (const t of p.catalog.toys || []) {
      if (t.thumbs) continue;
      const th = {};
      for (const a of ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus']) {
        const f = `toys/${t.id}/thumb-${a}.png`;
        if (find(f)) th[a] = f;
      }
      if (Object.keys(th).length) t.thumbs = th;
    }    // Trap pictures named traps/<id>/thumb-<attribute>.png fill in each Trap's thumbs the same way
    for (const t of p.catalog.traps || []) {
      if (t.thumbs) continue;
      const th = {};
      for (const a of ['pyrus', 'aquos', 'subterra', 'haos', 'darkus', 'ventus']) {
        const f = `traps/${t.id}/thumb-${a}.png`;
        if (find(f)) th[a] = f;
      }
      if (Object.keys(th).length) t.thumbs = th;
    }
    p.zip = { file: find };   // old callers use pack.zip.file(path)
    p.urls = new Map();
    return p;
  }
  static async fromDevice() {
    const saved = await idbGet('pack');
    return saved ? Pack.open(saved) : null;
  }
  // Object URL for a file in the pack (cached).
  async url(path) {
    if (!this.urls.has(path)) {
      const f = this.zip.file(path);
      if (!f) throw new Error('missing in pack: ' + path);
      this.urls.set(path, URL.createObjectURL(await f.async('blob')));
    }
    return this.urls.get(path);
  }
}
