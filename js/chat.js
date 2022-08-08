
const { displayName, photoURL, uid, email } = JSON.parse(localStorage.getItem('login_data'));

var currentUserKey = '';
var chatKey = '';
var friend_id = '';
document.getElementById('chats').style = `background-image:url(./img/bg.png);background-repeat: no-repeat;background-position: center;`

if (uid) {
     const { displayName, photoURL, uid, email } = JSON.parse(localStorage.getItem('login_data'));
     document.getElementById("user_img").src = photoURL;
     currentUserKey = uid;
     LoadChatList();
} else {
     //logout();
     window.location = "login.html";
}
function loading() {
     let val = 1;
     while (val <= 6) {
          document.getElementById('listChat').innerHTML += `
          <div class="user_box" id="${val}" onclick="clickme(this.id)">
               <div class="img_user skeleton"></div>
               <div class="user_name_chats">
                    <div class="chart_name">
                         <div class="skeleton skeleton-text"></div>
                         <div class="skeleton skeleton-text"></div>
                    </div>
               </div>
          </div>
         `;
          val++;
     }
}
// window.onload = loading();


function LoadChatList() {
     console.log("callded:- LoadChatList");
     // .onload = loading();
     var db = firebase.database().ref('friend_list').onload = loading();
     db.on('value', function (lists) {
          lists.forEach(function (data) {
               var lst = data.val(); s
               var friendKey = '';
               if (lst.friendId === currentUserKey) {
                    friendKey = lst.userId;
               }
               else if (lst.userId === currentUserKey) {
                    friendKey = lst.friendId;
               }

               if (friendKey !== "") {
                    firebase.database().ref('users').child(friendKey).on('value', function (data) {
                         var user = data.val();
                         document.getElementById('listChat').innerHTML += `
                              <div class="user_box " id="${user.uid}" onclick="clickme(this.id)">
                                   <div class="img_user">
                                             <img src="${user.photoURL}" alt="loading">
                                   </div>
                                   <div class="user_name_chats">
                                             <div class="chart_name">${user.displayName}</div>
                                             <div class="chats_shot">hiii , bro</div>
                                   </div>
                                   <div class="time_no">
                                             <div class="time">10:20pm</div>
                                   <div class="notification_no">20</div>
                              </div>`;
                         console.log("data done");
                    });
               }
          });
     });
}


function StartChat(friendKey, friendName, friendPhoto) {
     var friendList = { friendId: friendKey, userId: currentUserKey };
     friend_id = friendKey;

     var db = firebase.database().ref('friend_list');
     var flag = false;
     db.on('value', function (friends) {
          friends.forEach(function (data) {
               var user = data.val();
               if ((user.friendId === friendList.friendId && user.userId === friendList.userId) || ((user.friendId === friendList.userId && user.userId === friendList.friendId))) {
                    flag = true;
                    chatKey = data.key;
               }
          });

          if (flag === false) {
               chatKey = firebase.database().ref('friend_list').push(friendList, function (error) {
                    if (error) alert(error);
                    else {
                         document.getElementById('chatPanel').removeAttribute('style');
                         document.getElementById('divStart').setAttribute('style', 'display:none');
                         hideChatList();
                    }
               }).getKey();
          }
          else {
               document.getElementById('chatPanel').removeAttribute('style');
               document.getElementById('divStart').setAttribute('style', 'display:none');
               hideChatList();
          }
          ///////////////////////////
          //display friend name and photo
          document.getElementById('divChatName').innerHTML = friendName;
          document.getElementById('imgChat').src = friendPhoto;

          document.getElementById('messages').innerHTML = '';

          document.getElementById('txtMessage').value = '';
          document.getElementById('txtMessage').focus();
          ////////////////////////////
          // Display The chat messages
          LoadChatMessages(chatKey, friendPhoto);
     });
}


function send_msg() {
     var message = document.getElementById('message').value;
     alert(message + " " + uid);
     document.getElementById('message').value = "";
}

function clickme(f_id) {
     document.getElementById('chats').style = ``;

     // firebase.database().ref('Datas/users').child(f_id).on('value', function (data) {
     //           var user = data.val();
     //           document.getElementById('f_name').innerHTML = user.displayName;
     //           document.getElementById('f_img').src = user.photoURL;
     //           var btn = document.getElementById(f_id);
     //           btn.classList.toggle("active");
     // });

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






// function storagedata(displayName, photoURL, uid, email) {
//      firebase.database().ref('Datas/users').set({
//           uid: uid,
//           displayName: displayName,
//           photoURL: photoURL,
//           email: email,
//      });
//      console.log("success");
// }


// function get_data() {
//      firebase.database().ref('Datas/users').on('value', function (snapshot) {
//           var uid = snapshot.val().uid
//           var displayName = snapshot.val().displayName;
//           var photoURL = snapshot.val().photoURL;
//           var email = snapshot.val().email;
//      });
// }

// function updata_data(displayName, photoURL, uid, email) {
//      firebase.database().ref('Datas/users').update({
//           uid: uid,
//           displayName: displayName,
//           photoURL: photoURL,
//           email: email,
//      });
// }

// function delete_data() {
//      firebase.database().ref('Datas/users').remove({
//      });
// }