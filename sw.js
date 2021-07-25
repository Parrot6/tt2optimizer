const staticCacheName = "tt2-optimizer-v2.5";
const dynamicCache ="tt2-optimizer-dynamic-v2.5"
const assets = [
  '/',
  '/index.html',
  '/assets/app.css',
  //'/a/main.css',
  //'/assets/generalScripts.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
];

self.addEventListener('install', function(event){
  //console.log('service worker has been installed')  
  event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll(assets);
      })
    );
  });
  
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicCache).map(key => caches.delete(key)));
    })
  )
})

self.addEventListener('fetch', (e) => {
  //checkVersion(e);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request).then(fetchRes => {
        return caches.open(dynamicCache).then(cache => {
          if(fetchRes.status == 200){
             cache.put(e.request.url, fetchRes.clone());
          }
          return fetchRes;
        })
      })
      )
      );
});