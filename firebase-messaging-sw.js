importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBRkQC9shy1T0wh3KGCLTT3d3OSsg-FnFI",
    authDomain: "department-bf249.firebaseapp.com",
    projectId: "department-bf249",
    storageBucket: "department-bf249.firebasestorage.app",
    messagingSenderId: "643353432987",
    appId: "1:643353432987:web:ceefaa575238670768473e",
    measurementId: "G-PP3HX954DM",
    databaseURL: "https://department-bf249-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.getMessaging();

self.addEventListener('push', (event) => {
    const payload = event.data.json();
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://media.licdn.com/dms/image/v2/C510BAQFv4NwvhYRq8Q/company-logo_200_200/company-logo_200_200/0/1631351838133?e=2147483647&v=beta&t=pE5-TQRX2fd9oIfzQypoBLterLoj-X4wOnC3C8MMI4Q',
        data: { url: 'https://utiqano.github.io/photo/' }
    };
    event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data.url || 'https://utiqano.github.io/photo/';
    event.waitUntil(clients.openWindow(url));
});
