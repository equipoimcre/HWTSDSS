importScripts("/HWTSDSS/precache-manifest.c26b12f5fedad50e4b11d4af9d9e1df4.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable */


/*import {registerRoute} from 'workbox-routing';
import {NetworkFirst, CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';
import {precacheAndRoute} from 'workbox-precaching';*/


self.__precacheManifest = [].concat(self.__precacheManifest || []);


workbox.setConfig({
    debug: true
});

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

/*
// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
workbox.routing.registerRoute(
    // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    // Use a Stale While Revalidate caching strategy
    new workbox.strategies.StaleWhileRevalidate({
        // Put all cached files in a cache named 'assets'
        cacheName: 'assets',
        // Ensure that only requests that result in a 200 status are cached
        cacheableResponse: { statuses: [200]}
    }),
);*/



// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365
                //maxEntries: 30
            }),
        ],
        cacheableResponse: { statuses: [0, 200]}
    })
);


