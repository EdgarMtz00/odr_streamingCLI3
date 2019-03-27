
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderID': '50680997374'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[Service worker de mensajes] Mensaje de background recibido', payload);

    var obj = JSON.parse(payload.data.notification);
    var notificationTitle = obj.title;
    var notificationOptions = {
        body: obj.body,
        icon: obj.icon
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});