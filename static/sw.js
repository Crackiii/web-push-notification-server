'use strict';

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');

    var d = JSON.parse(event.data.text());
  
    const title = d.title;
    const options = {
      body: d.body,
      icon: d.icon,
      badge: d.icon
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  
})

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );

});