---
layout: null
---

var urlsToCache = [];

var CACHE_NAME = 'omkar-pathak-cache-{{ site.time | date: "%Y%m%d%H%M%S" }}';

// Cache posts
// Limits the number of posts that gets cached to 3
// Reads a piece of front-matter in each post that directs the second loop to the folder where the assets are held
{% for post in site.posts limit:3 %}
  urlsToCache.push("{{ post.url }}");
  {% for file in site.static_files %}
    {% if file.path contains post.assets %}
      urlsToCache.push("{{ file.path }}");
    {% endif %}
  {% endfor %}
{% endfor %}

// Cache pages
// Do nothing if it's either an AMP page (as these are served via Googles cache) or the blog page
// Fallback to the offline pages for these
{% for page in site.html_pages %}
  {% if page.path contains 'amp-html' or page.path contains 'blog' or page.path contains 'projects' %}
  {% else if %}
    urlsToCache.push("{{ page.url }}");
  {% endif %}
{% endfor %}

// Cache assets
// Removed assets/posts because I only want assets from the most recent posts getting cached
{% for file in site.static_files %}
    {% if file.path contains '/public/css' or file.path contains '/public/js' or file.path contains '/public/images' %}
      urlsToCache.push("{{ file.path }}");
    {% endif %}
{% endfor %}

// Trim specified cache to max size
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(function(cache) {
    cache.keys().then(function(keys) {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

self.addEventListener('message', event => {
  if (event.data.command == 'trimCaches') {
    // caches.open(CACHE_NAME).then(function(cache) {
    //   console.log(cache.keys());
    // });
    // trimCache(CACHE_NAME, 75);
  }
});

// Installation of service worker
self.addEventListener('install', function(event) {
  self.skipWaiting();
  // Perform install steps
  caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME){
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  var request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) { return; }
  // Network first: visitors always get the latest HTML/CSS/JS; the cache is only an offline fallback.
  event.respondWith(
    fetch(request).then((response) => {
      if (response && response.ok) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    }).catch(() => caches.match(request))
  );
});
