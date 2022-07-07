if (localStorage.getItem("uid")) {
          // Retrieve data
          //alert("Hi, " + localStorage.getItem("first_name"));
          const { displayName, photoURL, uid, email } = JSON.parse(localStorage.getItem('login_data'));
          document.getElementById("user_img").src = photoURL;
} else {
          //logout();
          window.location = "login.html";
}

function send_msg() {
          var message = document.getElementById('message').value;
          alert(message + " " + uid);
          document.getElementById('message').value = "";
}




function clickme(id) {
          var btn = document.getElementById(id);
          btn.classList.toggle("active");
          //document.getElementById("p2").style.color = "blue";
          document.getElementById('user_chats').style.visibility = "visible";
          document.getElementById('header').style.visibility = "visible";
          document.getElementById('chats').style.right = "0%";
}
function back_to_chats() {
          document.getElementById('chats').style.right = "-102%";
}

$('.User').click(function () {
          if ($(".User-Dropdown").hasClass("U-open")) {
                    $('.User-Dropdown').removeClass("U-open");
          }
          else {
                    $('.User-Dropdown').addClass("U-open");
          }
});

// const user = firebase.auth().currentUser;

// if (user !== null) {
//           user.providerData.forEach((profile) => {
//                     console.log("Sign-in provider: " + profile.providerId);
//                     console.log("  Provider-specific UID: " + profile.uid);
//                     console.log("  Name: " + profile.displayName);
//                     console.log("  Email: " + profile.email);
//                     console.log("  Photo URL: " + profile.photoURL);
//           });
// }
