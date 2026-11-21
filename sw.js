// Offline cache for the app shell. The asset pack lives in IndexedDB, not here.
const CACHE = 'marbles-v122';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'vendor/jszip.min.js',
  'icons/icon-192-v2.png', 'icons/icon-512-v2.png', 'icons/maskable-512-v2.png',
  'battle.html', 'js/battle.js', 'viewer.html', 'js/viewer.js', 'room.html', 'js/room.js', 'js/avatar.js', 'js/profiles.js', 'js/rules.js', 'js/pack.js', 'js/abilities.js', 'js/setup.js', 'js/aiteams.js',
  'story.html', 'js/story.js', 'js/home.js', 'js/control.js', 'js/login3d.js', 'js/teamroom3d.js', 'img/creator/part_hair10.png', 'img/creator/part_hair11.png', 'img/creator/part_hair12.png', 'img/creator/part_hair13.png', 'img/creator/part_hair14.png', 'img/creator/part_hair15.png', 'img/creator/part_bottom8.png', 'img/creator/part_bottom9.png', 'js/storyshop.js', 'js/commons3d.js', 'js/sim.js', 'js/season.js', 'js/season2.js', 'js/looks.js', 'js/showrank.js', 'data/season1.json',
  'vendor/three/build/three.module.js', 'vendor/three/examples/jsm/loaders/GLTFLoader.js',
  'vendor/three/examples/jsm/utils/BufferGeometryUtils.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Network first (so updates show up when online), cache as fallback (so it works offline).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).pathname.includes('/pack/')) return; // the pack is kept in IndexedDB, don't store it twice
  // Skip the browser's 10-minute HTTP cache so a new build never mixes with old files.
  const req = e.request.mode === 'navigate' ? fetch(e.request.url, { cache: 'no-cache' }) : fetch(e.request, { cache: 'no-cache' });
  e.respondWith(req.then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request)));
});
