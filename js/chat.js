
function clickme(id) {
          var btn = document.getElementById(id);
          btn.classList.toggle("active");
          //document.getElementById("p2").style.color = "blue";
          document.getElementById('user_chats').style.visibility = "visible";
          document.getElementById('header').style.visibility = "visible";
}

$('.User').click(function () {
          if ($(".User-Dropdown").hasClass("U-open")) {
                    $('.User-Dropdown').removeClass("U-open");
          }
          else {
                    $('.User-Dropdown').addClass("U-open");
          }
});



if (localStorage.getItem("uid")) {
          // Retrieve data
          //alert("Hi, " + localStorage.getItem("first_name"));
          var uid = localStorage.getItem("uid");
          var photoURL = localStorage.getItem("photoURL");
          var displayName = localStorage.getItem("displayName");
          document.getElementById("user_img").src = photoURL;
} else {
          //logout();
          window.location = "login.html";
}
