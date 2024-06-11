self.addEventListener('install', function(event) {
    var CACHE_NAME = 'ophy-todo-cache-v1';
    var urlsToCache = [
        '/',
        './index.html',
    ];
  
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
  });