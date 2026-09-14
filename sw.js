const CACHE = "ranok-v2";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-180.png", "voice/again.mp3", "voice/done_bed.mp3", "voice/done_dress.mp3", "voice/done_hair.mp3", "voice/done_wash.mp3", "voice/done_wc.mp3", "voice/intro.mp3", "voice/next_bed.mp3", "voice/next_dress.mp3", "voice/next_hair.mp3", "voice/next_wash.mp3", "voice/next_wc.mp3", "voice/win.mp3"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(m => m || caches.match("index.html")))
  );
});
