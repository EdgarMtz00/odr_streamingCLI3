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

workbox.precaching.precacheAndRoute([
  {
    "url": "Build/Avatar.data.unityweb",
    "revision": "c9993a3bd7042ca9fb2f264305195f25"
  },
  {
    "url": "Build/Avatar.json",
    "revision": "a027ae6649e139ecef7c371ab49ecfac"
  },
  {
    "url": "Build/Avatar.wasm.code.unityweb",
    "revision": "10fb502d1248b992422174b5b34418f6"
  },
  {
    "url": "Build/Avatar.wasm.framework.unityweb",
    "revision": "170d9e84cf7e6ba0e4e74abe33469fb9"
  },
  {
    "url": "Build/UnityLoader.js",
    "revision": "9aaa154a5d249214f9873d91d4b58127"
  },
  {
    "url": "favicon.ico",
    "revision": "fe4792d482196a50cf9ae0d9d90b6493"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "2262a3d9ddb38d79751466a0049a11c5"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "d28c29392b55ce7f3caf932f8c553287"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "3d4777c218251f085d38cfa477eb52ff"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "11f5d7eccaaa3a5df206be349f765e13"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "7319e75a0b6a363cd1a5ead0d5346485"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "0e9e7ca00c9149227390b979614aa881"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "a97415342c793c59764c6ccf0d98000f"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "f85d60724fe2b45562676ad4cc521c5a"
  },
  {
    "url": "img/icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "img/icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "img/icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "img/icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "img/icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "img/icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "img/icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "img/icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "img/icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "img/icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "img/icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "img/icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "img/icons/safari-pinned-tab.svg",
    "revision": "f78c0251d6ddd56ee219a1830ded71b4"
  },
  {
    "url": "index.html",
    "revision": "0e08790095adae8f77b5a7379a434e0d"
  },
  {
    "url": "manifest.json",
    "revision": "41c60194717057f5b29c0e19779b8496"
  },
  {
    "url": "robots.txt",
    "revision": "735ab4f94fbcd57074377afca324c813"
  },
  {
    "url": "TemplateData/favicon.ico",
    "revision": "57b5a31d2566cf227c47819eb3e5acfa"
  },
  {
    "url": "TemplateData/fullscreen.png",
    "revision": "f698ed7e8838ae7fef68b1423b6a3bc8"
  },
  {
    "url": "TemplateData/progressEmpty.Dark.png",
    "revision": "59cf8c9349b0be3828ea6ab0b7b7d126"
  },
  {
    "url": "TemplateData/progressEmpty.Light.png",
    "revision": "28df3e3bc879a2cffaaf78e371980f33"
  },
  {
    "url": "TemplateData/progressFull.Dark.png",
    "revision": "c74f81d50322b06afa5f20a1447a17ba"
  },
  {
    "url": "TemplateData/progressFull.Light.png",
    "revision": "d030ba7511bc275365f856d2af200e58"
  },
  {
    "url": "TemplateData/progressLogo.Dark.png",
    "revision": "cc0d7c1db16b413eb67aed0f10c3e99d"
  },
  {
    "url": "TemplateData/progressLogo.Light.png",
    "revision": "e608e32fb2102e953b6cae6f97f38286"
  },
  {
    "url": "TemplateData/style.css",
    "revision": "21e0ef8f2602b3ed47ba97eccaed5492"
  },
  {
    "url": "TemplateData/UnityProgress.js",
    "revision": "167cabac2ccecfb25fd7453130f3bc0a"
  },
  {
    "url": "TemplateData/webgl-logo.png",
    "revision": "8c9889fd3f9272b942d4868a9c1b094c"
  }
]);