
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
                              /** @type {firebase.auth.OAuthCredential} */
                              var credential = result.credential;
                              //console.log(credential);

                              // This gives you a Google Access Token. You can use it to access the Google API.
                              var token = credential.accessToken;
                              //console.log(token);

                              // The signed-in user info.
                              var user = result.user;
                              //console.log(user);
                              const login_data = {
                                        displayName: user.displayName,
                                        photoURL: user.photoURL,
                                        uid: user.uid,
                                        email: user.email
                              }
                              localStorage.setItem('login_data', JSON.stringify(login_data));
                              //console.log(user.displayName + " " + user.photoURL + " " + user.uid + " " + user.email);
                              storagedata(user.displayName, user.photoURL, user.uid, user.email);

                              window.location = "chat_page.html";
                              // ...
                    }).catch((error) => {
                              // Handle Errors here.
                              var errorCode = error.code;
                              alert(errorCode);
                              var errorMessage = error.message;
                              alert(errorMessage);
                              // The email of the user's account used.
                              var email = error.email;
                              alert(email);
                              // The firebase.auth.AuthCredential type that was used.
                              var credential = error.credential;
                              alert(credential);
                              // ...
                    });
}


function storagedata(displayName, photoURL, uid, email) {
          firebase.database().ref('Datas/users/' + uid).set({
                    uid: uid,
                    displayName: displayName,
                    photoURL: photoURL,
                    email: email,
          });
          console.log("success");
}

function signup() {
          firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                              // Signed in 
                              var user = userCredential.user;
                              // ...
                    })
                    .catch((error) => {
                              var errorCode = error.code;
                              var errorMessage = error.message;
                              // ..
                    });
}

function logout() {
          // var provider = new firebase.auth.GoogleAuthProvider();
          // firebase.auth()
          localStorage.removeItem("login_data");
          window.location = "login.html";

          firebase.auth().signOut().then(() => {
                    alert("Sign-out successful.")
          }).catch((error) => {
                    // An error happened.
          });
}