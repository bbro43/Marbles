// Offline cache for the app shell. The asset pack lives in IndexedDB, not here.
const CACHE = 'marbles-v14';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'vendor/jszip.min.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png',
  'battle.html', 'js/battle.js', 'js/rules.js', 'js/pack.js',
  'vendor/three/build/three.module.js', 'vendor/three/examples/jsm/loaders/GLTFLoader.js',
  'vendor/three/examples/jsm/utils/BufferGeometryUtils.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Network first (so updates show up when online), cache as fallback (so it works offline).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).pathname.includes('/pack/')) return; // the pack is kept in IndexedDB, don't store it twice
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request)));
});
