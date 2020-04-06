// This is the service worker with the Advanced caching

// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register("/sw.js").then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}else{
  console.log('Service Workers not supported');
}
  