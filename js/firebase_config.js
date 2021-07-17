const _firebaseConfig = {
    apiKey: "AIzaSyCxvWJ_TNqTOWjn3uYwLlg9Bx_f5rhwlIY",
    authDomain: "app-phantribe.firebaseapp.com",
    projectId: "app-phantribe",
    storageBucket: "app-phantribe.appspot.com",
    messagingSenderId: "502664113207",
    appId: "1:502664113207:web:de6301f612a12548e063b2",
    measurementId: "G-KSRYX6YC0K"
};
// Initialize Firebase
firebase.initializeApp(_firebaseConfig);
const _db = firebase.firestore();
const userRef = _db.collection("users");

