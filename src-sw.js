importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");
// BORRAR
// workbox.routing.registerRoute(
//   new RegExp('http://192.168.0.85/Odr/connections'),
//   new workbox.strategies.CacheFirst({
//     cacheName: 'madrolas',
//   })
// );

// workbox.routing.registerRoute(
//   new RegExp('http://192.168.0.85/Odr/Characters'),
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'imagenes',
//     plugins: [
//       new workbox.cacheableResponse.Plugin({
//         statuses: [0, 200]
//       })
//     ]
//   }),
// );

// Copiado y pegado desde aqui hacia abjo de los recipes de la documentacion de workbox

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
// workbox.routing.registerRoute(
//   /^https:\/\/fonts\.gstatic\.com/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'google-fonts-webfonts',
//     plugins: [
//       new workbox.cacheableResponse.Plugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// );

// workbox.routing.registerRoute(
//   /\.(?:png|gif|jpg|jpeg|svg)$/,
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'images',
//   })
// );

// workbox.routing.registerRoute(
//   /\.(?:js|css)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'static-resources',
//   })
// );

workbox.precaching.precacheAndRoute([]);