// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAr5zya2cW4ma0T2KsaVdTbqwP-LSMvq_g",
//     authDomain: "yougram--com.firebaseapp.com",
//     databaseURL: "https://yougram--com-default-rtdb.firebaseio.com",
//     projectId: "yougram--com",
//     storageBucket: "yougram--com.appspot.com",
//     messagingSenderId: "41545296369",
//     appId: "1:41545296369:web:6a93bdbbcb04a798c23c50",
//     measurementId: "G-RWBVHYVZVH"
// };


// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// get username
function call() {
    var username = document.getElementById('username').value;
    alert(username);
}
var username = 'chintan';
// reference your database
var contactFormDB = firebase.database().ref('Datas/users/' + username);

// signup

document.getElementById("signup_form").addEventListener("submit", submitForm);

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
    }

    saveMessages(fname, lname, email, username, number, password, gender);

    //   enable alert
    console.log("success")
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

    document.getElementById("signup_form").reset();
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




// login

function loginUser() {
    var email = document.getElementById("user_name").value;
    var password = document.getElementById("password").value;

    //firebase have pre built login function
    //it takes two parameters first email and second is password

}

















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