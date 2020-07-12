importScripts('workbox/workbox-v5.1.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.core.skipWaiting();
workbox.core.clientsClaim();

const doNothingCb = async ({ url, request, event, params }) => {
    return await fetch(request);
};

workbox.routing.registerRoute(
    /sockjs-node/,
    doNothingCb
);

// filter code callback cache
workbox.routing.registerRoute(
    /\?code=/,
    doNothingCb
);

// others
workbox.routing.registerRoute(
    new RegExp('.+'),
    new workbox.strategies.CacheFirst()
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
