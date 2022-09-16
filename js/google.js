
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
firebase.initializeApp(firebaseConfig);

function GoogleLogin() {
    //first of all create google provider object
    var provider = new firebase.auth.GoogleAuthProvider();
    //Login with popup window
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {

            // const isFirstLogin = getAdditionalUserInfo(result).isNewUser
            // alert(isFirstLogin)

            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            console.log(credential);

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            //console.log(token);

            function Create_Username() {
                //pop box show

                //get Username input using onkeypress Event and check Username in database 

                // get uniq username and return
                var username = prompt("Enter new Username");
                return username;
            }

            // The signed-in user info.
            var user = result.user;
            console.log(user);

            console.log(result.additionalUserInfo.isNewUser);

            if (result.additionalUserInfo.isNewUser) {
                //var Username = Create_Username();
                var Username = prompt("Enter new Username");
                // obj of data
                const User_data_o = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    Username: Username
                }
                const User_data = {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    Username: Username
                }
                // Store in loaclstorge client side
                console.log(User_data);


                // send to chat page
                // alert("user logined")
                //window.location = "index.html";

                // add data in database with push() -> push can created uquny id
                firebase.database().ref('users/' + user.uid).set(User_data_o, function (error) {
                    localStorage.setItem('User_data', JSON.stringify(User_data));
                    if (error) alert(error);
                    else {
                        alert(" you are login");
                        //window.location = "index.html";
                        checked_uid();
                    }
                });
                console.log("upload");


            } else {

                firebase.database().ref('users/' + user.uid).on('value', function (snapshot, error) {
                    var User_data = {
                        uid: user.uid,
                        displayName: snapshot.val().displayName,
                        photoURL: snapshot.val().photoURL,
                        email: snapshot.val().email,
                        Username: snapshot.val().Username
                    }
                    // Store in loaclstorge client side
                    console.log(User_data);
                    localStorage.setItem('User_data', JSON.stringify(User_data));
                    if (error) alert(error);
                    else {
                        alert(" you are login");
                        //window.location = "index.html";
                        checked_uid();
                    }
                });
                // send to chat page
                //alert("user logined")
                //window.location = "index.html";
            }
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}

function signup_form() {
    alert("Server error try in Google with signup");
    // var email = document.getElementById("email").value;
    // var password = document.getElementById("password").value;
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then((userCredential) => {
    //         // Signed in 
    //         var user = userCredential.user;
    //         // ...
    //         alert("done");
    //     })
    //     .catch((error) => {
    //         var errorCode = error.code;
    //         alert(errorCode);
    //         var errorMessage = error.message;
    //         alert(errorMessage);
    //         // ..
    //     });
}


function signup_form_qwifubqifb() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("cpassword").value;
    var Username = document.getElementById("username").value;
    var displayName = document.getElementById("fname").value + " " + document.getElementById("lname").value;
    let photoURL = Math.floor((Math.random() * 10) + 1);

    // validate that both passwords are same
    //if (password == confirmPassword) {

    //Here we will write create Account code
    //it takes two param first one email and second is password
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        function () {

            // firebase.auth().onAuthStateChanged((user) => {
            //     if (user) {
            //         // User is signed in, see docs for a list of available properties
            //         // https://firebase.google.com/docs/reference/js/firebase.User
            //         var uid = user.uid;
            //         alert(uid);
            //         // ...
            //     } else {
            //         // User is signed out
            //         // ...
            //     }
            // });

            //this function executes when account is successfully created
            //obj of data
            // const User_data = {
            //     uid: user.uid,
            //     displayName: displayName,
            //     photoURL: photoURL,
            //     email: email,
            //     Username: Username
            // }
            // // Store in loaclstorge client side
            // console.log(User_data);
            // localStorage.setItem('User_data', JSON.stringify(User_data));

            swal({
                title: "user registered",
                text: "",
                icon: "success",
            }).then((willDelete) => {
                if (willDelete) {
                    // goto chatpage
                    window.location = "index.html";
                }
            });

        }).catch(function (error) {
            //this function handles errors
            var errorMessage = error.message;
            alert(errorMessage);
        });
    // }
    // else {
    //     //alert when password did not matches
    //     alert("password does not matches");
    // }
}
function loginUser_bug() {
    alert("Server error try in Google with login");
}


function loginUser_bug() {
    var email = document.getElementById("user_name").value;
    var password = document.getElementById("password_login").value;

    //firebase have pre built login function
    //it takes two parameters first email and second is password

    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        //this function works when login successfully

        window.location = "index.html";
    }).catch(function (error) {
        //this will handle error
        var errorMessage = error.message;
        alert(errorMessage);
    });
}


function logout() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()

    swal({
        title: "Are you sure?",
        text: "You want to logout!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("User_data");
                window.location = "login.html";

                firebase.auth().signOut().then(() => {
                    // alert("Sign-out successful.")
                    console.log("Sign-out successful.");
                }).catch((error) => {
                    // An error happened.
                });
                // document.location.href = href = "login.html;";
            } else {
                // swal("welcome back!");
            }
        });
}





// valedetion
let i = 0;
function pass_checking_wffiqwufbiqwu() {
    console.log(i++);
    var newPassword = document.getElementById('password').value;
    var minNumberofChars = 6;
    var maxNumberofChars = 16;
    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // alert(newPassword);
    // if (newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars) {
    //           // return false;
    //           console.log("worink");
    // }
    // if (!regularExpression.test(newPassword)) {
    //           console.log("password should contain atleast one number and one special character");
    //           // alert("password should contain atleast one number and one special character");
    //           return false;
    // }

    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    console.log(re);
    return re.test(newPassword);
}

// function phone() {
//     var phone = document.getElementById('number').value;
//     console.log(phone);
//     var phoneRGEX = /^[(]{0,1}[1,2]{3}[)]{0,1} [-\s\.]{0,1}[0-9]{3}{-\s\.]{0,1}[0-9]{4}$/;
//     var phone_result = phoneRGEX.test(phone);
//     console.log();
//     localStorage.setItem(phone_no, phone)
// }



// {
//     "uid": "VqncV3Oa3DWDgruSSd79gxyT1772",
//         "displayName": "Chintan Patel",
//             "photoURL": "https://lh3.googleusercontent.com/a-/AFdZucqwN1EiOAWKEMt-nmD5aodUtYuDfbhGCwc2EtLEhQ=s96-c",
//                 "email": "chintu20111999@gmail.com",
//                     "emailVerified": true,
//                         "phoneNumber": null,
//                             "isAnonymous": false,
//                                 "tenantId": null,
//                                     "providerData": [
//                                         {
//                                             "uid": "111957442494797991946",
//                                             "displayName": "Chintan Patel",
//                                             "photoURL": "https://lh3.googleusercontent.com/a-/AFdZucqwN1EiOAWKEMt-nmD5aodUtYuDfbhGCwc2EtLEhQ=s96-c",
//                                             "email": "chintu20111999@gmail.com",
//                                             "phoneNumber": null,
//                                             "providerId": "google.com"
//                                         }
//                                     ],
//                                         "apiKey": "AIzaSyAr5zya2cW4ma0T2KsaVdTbqwP-LSMvq_g",
//                                             "appName": "[DEFAULT]",
//                                                 "authDomain": "yougram--com.firebaseapp.com",
//                                                     "stsTokenManager": {
//         "apiKey": "AIzaSyAr5zya2cW4ma0T2KsaVdTbqwP-LSMvq_g",
//             "refreshToken": "AOEOulabkq-RbGRcfvZ7W6HFIE2Xqim8pJevo_Ow0_g0_5x27UIrfCY2gdd3QQNo25cDwcUp7rEa9bKC8-zHTiDEa-Oli4mSZxAeLp_UYpu-de_-DPz3hwagDPC3TWmo8vrc-zI9V8j9vnFy5VDlWp9SFBlylWVAGPUKoUSRLtPGnHnoeR-nm_gBGD0mds53flXCfxIyCb7aGsvEIQcNLDBBQQbUlJIYt36U4Ds-sjIhSwFoHMaMrOIvP_YZtGDNjlIVrdLhh81eL_VPosab1gYMV9k6-R--yoEyGP0PdWS8w9dG30iM_zOXvrlMb-kQqLj4otjrLImS--i4WQCpOiRQPfdtyNnRKfeAjLiRstuNflsx-BHx4TSxyQRYCcrYW1fm7kVg2nXQlWEN4wZNB5aO44QGbO0ujsgAghlkol0hInMRNhz5Wkg",
//                 "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkMWIxOWYwZjU4ZTJjOWE5Njc3M2M5MmNmODA0NDEwMTc5NzEzMjMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2hpbnRhbiBQYXRlbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUZkWnVjcXdOMUVpT0FXS0VNdC1ubUQ1YW9kVXRZdURmYmhHQ3djMkV0TEVoUT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS95b3VncmFtLS1jb20iLCJhdWQiOiJ5b3VncmFtLS1jb20iLCJhdXRoX3RpbWUiOjE2NjAzODIwMDQsInVzZXJfaWQiOiJWcW5jVjNPYTNEV0RncnVTU2Q3OWd4eVQxNzcyIiwic3ViIjoiVnFuY1YzT2EzRFdEZ3J1U1NkNzlneHlUMTc3MiIsImlhdCI6MTY2MDM4MjAwNCwiZXhwIjoxNjYwMzg1NjA0LCJlbWFpbCI6ImNoaW50dTIwMTExOTk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTExOTU3NDQyNDk0Nzk3OTkxOTQ2Il0sImVtYWlsIjpbImNoaW50dTIwMTExOTk5QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.d5VJdTnt2yfenM_SAuYm5MH9hUjYuDar4mSxQ_ShVvTWEE4f-7AF0Um1XpH16iuZp5pCLl7Yb47-EwLCKxXbTPGpRhA5G1o7bFU08NZxk0DtNTByrnPqCP8QVSdWbAWZyEoN_C6GxYBQ-ttaP85RGxTdfW_2KJZx6bIToFpfmqh5GO1cslyQfByxxSMi7TtsjxNF7q9tLV_pZ1HpiABcWwCIhKrvEkJbUHkhONc-Lfo_tpmzpJAINC5vzeB9GTG5kU50SAwx7I-gfKd9G9NA84L95ttDVd78OWQ4-GZK19i37mux9_R_IKTKvDneUOQtDXOQjwTKn-f6mgkwPmkZUQ",
//                     "expirationTime": 1660385604000
//     },
//     "redirectEventId": null,
//         "lastLoginAt": "1660382004471",
//             "createdAt": "1657102214095",
//                 "multiFactor": {
//         "enrolledFactors": []
//     }
// }



// {
//     "a": "1657102214095",
//     "b": "1660382427478",
//     "lastSignInTime": "Sat, 13 Aug 2022 09:20:27 GMT",
//     "creationTime": "Wed, 06 Jul 2022 10:10:14 GMT"
// }
