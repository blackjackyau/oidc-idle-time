importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

const cacheName = 'v1';

// // Call Install Event
// self.addEventListener('install', e => {
//   console.log('Service Worker: Installed');
// });

// // Call Activate Event
// self.addEventListener('activate', e => {
//   console.log('Service Worker: Activated');
//   // Remove unwanted caches
//   e.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cache => {
//           if (cache !== cacheName) {
//             console.log('Service Worker: Clearing Old Cache');
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// https://developers.google.com/web/tools/workbox/modules/workbox-precaching
// need to introduce this in prod mode
// const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
// const navigationRoute = new workbox.routing.NavigationRoute(handler);
// registerRoute(navigationRoute);

const doNothingCb = async ({ url, request, event, params }) => {
    return await fetch(request);
};

workbox.routing.registerRoute(
    /sockjs-node/,
    doNothingCb
);

workbox.routing.registerRoute(
    /\?code=/,
    doNothingCb
);

// others
workbox.routing.registerRoute(
    new RegExp('.+'),
    new workbox.strategies.CacheFirst()
);
