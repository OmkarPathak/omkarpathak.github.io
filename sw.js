---
layout: null
---

var urlsToCache = [];

var CACHE_NAME = 'omkar-pathak-cache-v1';

// Cache posts
// Limits the number of posts that gets cached to 3
// Reads a piece of front-matter in each post that directs the second loop to the folder where the assets are held
{% for post in site.posts limit:3 %}
  urlsToCache.push("{{ post.url }}")
  {% for file in site.static_files %}
    {% if file.path contains post.assets %}
      urlsToCache.push("{{ file.path }}")
    {% endif %}
  {% endfor %}
{% endfor %}

// Cache pages
// Do nothing if it's either an AMP page (as these are served via Googles cache) or the blog page
// Fallback to the offline pages for these
{% for page in site.html_pages %}
  {% if page.path contains 'amp-html' or page.path contains 'blog' %}
  {% else if %}
    urlsToCache.push("{{ page.url }}")
  {% endif %}
{% endfor %}

// Cache assets
// Removed assets/posts because I only want assets from the most recent posts getting cached
{% for file in site.static_files %}
    {% if file.extname == '.js' or file.extname == '.css' or file.path contains '/assets/images' %}
      urlsToCache.push("{{ file.path }}")
    {% endif %}
{% endfor %}

// Installation of service worker
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});


// Activate service worker
// this.addEventListener('activate', function (event) {
//   // Remove all caches that aren't whitelisted
//   var cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//         caches.keys().then(function (keyList) {
//         return Promise.all(keyList.map(function (key) {
//             if (cacheWhitelist.indexOf(key) === -1) {
//                 return caches.delete(key);
//             }
//         }));
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function(response) {
//           // Cache hit - return response
//           return response || fetch(event.request).then(function(response){
//             return caches.open(CACHE_NAME).then(function (cache){
//               cache.put(event.request, response.clone());
//             });
//           });
//         }
//       )
//     );
//   });

// self.addEventListener('fetch', function(event) {
//   console.log('Handling fetch event for', event.request.url);
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           console.log('Found response in cache:', response);
//           return response;
//         }
//         return fetch(event.request).then(function(response){
//           console.log('Response from network is:', response);
//         });
//       }
//     )
//   );
// });

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});