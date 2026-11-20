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
export class Pack {
  static async open(blobs) {
    const p = new Pack();
    p.zips = await Promise.all([].concat(blobs).map(b => window.JSZip.loadAsync(b)));
    const find = n => p.zips.map(z => z.file(n)).find(Boolean);
    p.info = JSON.parse(await find('pack.json').async('string'));
    p.catalog = JSON.parse(await find('catalog.json').async('string'));
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
