importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBRkQC9shy1T0wh3KGCLTT3d3OSsg-FnFI",
    authDomain: "department-bf249.firebaseapp.com",
    projectId: "department-bf249",
    storageBucket: "department-bf249.appspot.com", // Corrected storageBucket
    messagingSenderId: "643353432987",
    appId: "1:643353432987:web:ceefaa575238670768473e",
    measurementId: "G-PP3HX954DM",
    databaseURL: "https://department-bf249-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
    try {
        const payload = event.data.json();
        if (!payload.notification) {
            console.error('Push payload does not contain a notification:', payload);
            return;
        }

        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: 'https://media.licdn.com/dms/image/v2/C510BAQFv4NwvhYRq8Q/company-logo_200_200/company-logo_200_200/0/1631351838133?e=2147483647&v=beta&t=pE5-TQRX2fd9oIfzQypoBLterLoj-X4wOnC3C8MMI4Q',
            data: { url: 'https://utiqano.github.io/photo/' }
        };

        event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
    } catch (error) {
        console.error('Error handling push event:', error);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data.url || 'https://utiqano.github.io/photo/';
    event.waitUntil(clients.openWindow(url));
});
