// Service worker de SixSaaS: funciona sin conexión. Sube VERSION al publicar cambios.
const VERSION = 'sixsaas-v0.5.2';
const ASSETS = [
  './', 'index.html', 'manifest.webmanifest', 'css/styles.css',
  'js/app.js', 'js/config.js', 'js/modules.js', 'js/license.js', 'js/store.js', 'js/optimizer.js', 'js/academia.js', 'js/cursos/google-extra.js', 'js/cursos/setter.js', 'js/cursos/closer.js', 'js/cursos/fidelizar.js',
  'img/sixsaas.webp', 'img/academia.webp', 'img/academia-sm.webp', 'img/resenas.webp', 'img/cotizaciones.webp', 'img/recompras.webp', 'img/citador.webp', 'img/pedidos.webp', 'img/crm.webp',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/favicon.png', 'icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Red primero para la página (se entera de actualizaciones); caché primero para el resto.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(req, copy));
      return res;
    })),
  );
});
