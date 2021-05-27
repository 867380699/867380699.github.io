const storeName = 'io-store-v3';
const cacheRegexp = new RegExp(`${location.host}/(js|css|assets)/.+`);

const fetchWithCacahe = async (request) => {
  const matchedResponse = await caches.match(request);
  if (matchedResponse) {
    return matchedResponse;
  } else {
    const store = await caches.open(storeName);
    const response = await fetch(request);
    if (response.ok) {
      if (cacheRegexp.test(request.url)) {
        await store.put(request.url, response.clone());
      }
    }
    return response;
  }
}

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(fetchWithCacahe(e.request));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key != storeName) {
          return caches.delete(key);
        }
      }));
    })
  );
});