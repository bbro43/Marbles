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

export class Pack {
  static async open(blob) {
    const p = new Pack();
    p.zip = await window.JSZip.loadAsync(blob);
    p.info = JSON.parse(await p.zip.file('pack.json').async('string'));
    p.catalog = JSON.parse(await p.zip.file('catalog.json').async('string'));
    p.urls = new Map();
    return p;
  }
  static async fromDevice() {
    const blob = await idbGet('pack');
    return blob ? Pack.open(blob) : null;
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
