< script type = "module" >
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGFkkBn83EILZaSR02VMOiLJELSEXTJ24",
    authDomain: "yougram-com.firebaseapp.com",
    projectId: "yougram-com",
    storageBucket: "yougram-com.appspot.com",
    messagingSenderId: "361081673261",
    appId: "1:361081673261:web:7fa57378e64ced47300aa4",
    measurementId: "G-247YKK7F7N"
};

{ /* Initialize Firebase */ }
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); <
/script>