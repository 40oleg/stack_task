self.addEventListener('install', function(event) {
    // Perform install steps
    var CACHE_NAME = 'ophy-todo-cache-v1';
    var urlsToCache = [
        '/',
        '/styles.css',
        '/app.js'
    ];
  
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
  });