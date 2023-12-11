let CACHE_NAME = 'pwa-site-cache-v1';
let urlsToCache = [
    '/',
    '/fallback.json',
    '/css/index.css',
    '/js/jquery.min.js',
    '/js/main.js',
    '/images/pwa-logo.png'
];

// Instal static asset ke cache
self.addEventListener('install', event => {
    event.waitUntil(async function() {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);
    }());
});

self.addEventListener('fetch', event => {
  // event.respondWith(
  //   caches.match(event.request).then((response) => {
  //     // Cache hit - return response
  //     // Jika ada cache di browser yang sesuai, maka return cache
  //     if (response) { 
  //       return response;
  //     }

  //     // Jika tidak ada cache, jalankan fungsi fetch ke network
  //     return fetch(event.request);
  //   })
  // )

  let request = event.request;
  let url     = new URL(request.url);

  //pisahkan request from API dan static file

  // kondisi static file
  if(url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((response) => {
        // Jika ada static cache makan return cachenya
        // jika titak ada cache, jalankan fungsi request ke network
        return response || fetch(request);
      })
    )
  }
  // kondisi untuk set cache dengan source from API 
  else {
    event.respondWith(
      // set cache baru dengan data yang bersumber dari request pada network
      // dimana nanti data cache dapat diserve saat kondisi sedang offline
      caches.open('vechiles-cache').then((cache) => {
        return fetch(request).then((liveResponse) => {
          cache.put(request, liveResponse.clone());
          return liveResponse;
        }).catch(() => {
          return caches.match(request).then((response) => {
            // jika sebelumnya sudah di set pada cache dengan nama yang sama, maka dapat di serve dengan response cache yang sudah ada
            if(response) return response;
            // jika tidak ada cache yang ditemuka, maka arahkan data yang akan diserve menuju file fallback.json yang sudah dicache pada 'cache static file'
            return caches.match('/fallback.json');
          })
        })
      })
    )
  }
  
})

self.addEventListener('activate', event => {
  event.waitUntil(  
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName != CACHE_NAME;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      )
    })
  )
})