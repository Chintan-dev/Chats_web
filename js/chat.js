
function clickme(id) {
          var btn = document.getElementById(3);
          btn.classList.toggle("active");
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