// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAr5zya2cW4ma0T2KsaVdTbqwP-LSMvq_g",
    authDomain: "yougram--com.firebaseapp.com",
    databaseURL: "https://yougram--com-default-rtdb.firebaseio.com",
    projectId: "yougram--com",
    storageBucket: "yougram--com.appspot.com",
    messagingSenderId: "41545296369",
    appId: "1:41545296369:web:6a93bdbbcb04a798c23c50",
    measurementId: "G-RWBVHYVZVH"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);


var starCountRef = firebase.database().ref('users/-N5tLl1okR8LPiGZu81a');
starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    updateStarCount(postElement, data);
    console.log(data);
});

// reference your database
var contactFormDB = firebase.database().ref("users");

document.getElementById("signup_section").addEventListener("submit", submitForm);


function submitForm(e) {
    e.preventDefault();

    var fname = getElementVal("fname");
    var lname = getElementVal("lname");
    var email = getElementVal("email");
    var username = getElementVal("username");
    var number = getElementVal("number");
    var password = getElementVal("password");

    var ele = document.getElementsByName('gender');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            var gender = ele[i].value;
        // document.getElementById("result").innerHTML = "Gender: " + ele[i].value;
    }

    saveMessages(fname, lname, email, username, number, password, gender);

    //   enable alert
    console.log("done")
    swal({
        title: "user registered",
        text: "",
        icon: "success",
    }).then((willDelete) => {
        if (willDelete) {
            login();
        }
    });
    //   remove the alert

    //   reset the form
    document.getElementById("signup_section").reset();
}

const saveMessages = (fname, lname, email, username, number, password, gender) => {
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        fname: fname,
        lname: lname,
        email: email,
        username: username,
        number: number,
        password: password,
        gender: gender,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

















// <script type="module">
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyAr5zya2cW4ma0T2KsaVdTbqwP-LSMvq_g",
//     authDomain: "yougram--com.firebaseapp.com",
//     databaseURL: "https://yougram--com-default-rtdb.firebaseio.com",
//     projectId: "yougram--com",
//     storageBucket: "yougram--com.appspot.com",
//     messagingSenderId: "41545296369",
//     appId: "1:41545296369:web:6a93bdbbcb04a798c23c50",
//     measurementId: "G-RWBVHYVZVH"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
// </script>