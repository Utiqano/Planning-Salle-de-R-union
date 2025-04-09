// firebase-messaging-sw.js
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

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.getMessaging(app);

firebase.onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification?.title || 'WKW Notification';
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new message!',
        icon: 'https://media.licdn.com/dms/image/v2/C510BAQFv4NwvhYRq8Q/company-logo_200_200/company-logo_200_200/0/1631351838133?e=2147483647&v=beta&t=pE5-TQRX2fd9oIfzQypoBLterLoj-X4wOnC3C8MMI4Q'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
