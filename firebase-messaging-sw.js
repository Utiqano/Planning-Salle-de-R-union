importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

console.log('Service Worker: firebase-messaging-sw.js loaded');

const firebaseConfig = {
    apiKey: "AIzaSyBRkQC9shy1T0wh3KGCLTT3d3OSsg-FnFI",
    authDomain: "department-bf249.firebaseapp.com",
    projectId: "department-bf249",
    storageBucket: "department-bf249.appspot.com",
    messagingSenderId: "643353432987",
    appId: "1:643353432987:web:ceefaa575238670768473e",
    measurementId: "G-PP3HX954DM",
    databaseURL: "https://department-bf249-default-rtdb.firebaseio.com/"
};

try {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log('Service Worker: Firebase initialized successfully');

    // Initialize Firebase Messaging
    const messaging = firebase.messaging();
    console.log('Service Worker: Firebase Messaging initialized');

    // Handle background push notifications
    self.addEventListener('push', (event) => {
        console.log('Service Worker: Push event received:', event);
        try {
            const payload = event.data.json();
            console.log('Service Worker: Push payload:', payload);

            if (!payload.notification) {
                console.error('Service Worker: Push payload does not contain a notification:', payload);
                return;
            }

            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                icon: 'https://media.licdn.com/dms/image/v2/C510BAQFv4NwvhYRq8Q/company-logo_200_200/company-logo_200_200/0/1631351838133?e=2147483647&v=beta&t=pE5-TQRX2fd9oIfzQypoBLterLoj-X4wOnC3C8MMI4Q',
                data: { url: 'https://utiqano.github.io/photo/' }
            };

            event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
            console.log('Service Worker: Notification displayed:', notificationTitle);
        } catch (error) {
            console.error('Service Worker: Error handling push event:', error);
        }
    });

    // Handle notification clicks
    self.addEventListener('notificationclick', (event) => {
        console.log('Service Worker: Notification clicked:', event.notification);
        event.notification.close();
        const url = event.notification.data.url || 'https://utiqano.github.io/photo/';
        event.waitUntil(clients.openWindow(url));
        console.log('Service Worker: Opened URL:', url);
    });

} catch (error) {
    console.error('Service Worker: Firebase initialization failed:', error);
}
