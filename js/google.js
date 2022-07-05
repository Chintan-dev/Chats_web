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
                              console.log(localStorage.setItem("displayName", user.displayName));
                              console.log(localStorage.setItem("photoURL", user.photoURL));
                              console.log(localStorage.setItem("uid", user.uid));

                              window.location = "chat_page.html";
                              // ...
                    }).catch((error) => {
                              // Handle Errors here.
                              var errorCode = error.code;
                              var errorMessage = error.message;
                              // The email of the user's account used.
                              var email = error.email;
                              // The firebase.auth.AuthCredential type that was used.
                              var credential = error.credential;
                              // ...
                    });
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