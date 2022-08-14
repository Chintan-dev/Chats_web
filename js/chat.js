
var { displayName, photoURL, uid, Username, email } = JSON.parse(localStorage.getItem('User_data'));

var currentUserKey = '';
var chatKey = '';
var friend_id = '';
var bol = true;
loading(bol);

document.getElementById('chats').style = `background-image:url(./img/bg.png);background-repeat: no-repeat;background-position: center;`
document.getElementById("user_img").src = photoURL;
if (uid) {
     // const { displayName, photoURL, uid, email } = JSON.parse(localStorage.getItem('User_data'));
     document.getElementById("user_img").src = photoURL;
     currentUserKey = uid;
     LoadChatList();
     
} else {
     //logout();
     window.location = "login.html";
}


function onFirebaseStateChanged() {
     firebase.auth().onAuthStateChanged(onStateChanged);
}

function onStateChanged(user) {
     console.log("called onStateChanged ");
     // console.log(user);
     if (user) {
          //alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName);

          var userProfile = { email: '', name: '', photoURL: '' };
          userProfile.email = firebase.auth().currentUser.email;
          userProfile.name = firebase.auth().currentUser.displayName;
          userProfile.photoURL = firebase.auth().currentUser.photoURL;

          var db = firebase.database().ref('users');
          var flag = false;
          db.on('value', function (users) {
               users.forEach(function (data) {
                    var user = data.val();
                    if (user.email === userProfile.email) {
                         currentUserKey = data.key;
                         console.log("currentUserKey ="+currentUserKey);
                         flag = true;
                    }
               });

               // if (flag === false) {
               //      firebase.database().ref('users').push(userProfile);
               // }
               // else {
               //      document.getElementById('user_img').src = firebase.auth().currentUser.photoURL;
               //      document.getElementById('user_img').title = firebase.auth().currentUser.displayName;
               // }
               // LoadChatList();
          });
     }
     else {
          //alert("No Active user found");
          // document.getElementById('imgProfile').src = 'images/pp.png';
          // document.getElementById('imgProfile').title = '';

          // document.getElementById('lnkSignIn').style = '';
          // document.getElementById('lnkSignOut').style = 'display:none';

          // document.getElementById('lnkNewChat').classList.add('disabled');
     }
}

     // let val = 1;
     // let users = 5;
     // while (val <= users) {
     //      document.getElementById('listChat').innerHTML += `
     //      <div class="user_box " id="${val}" onclick="clickme(this.id)">
     //           <div class="img_user">
     //                     <img src="./img/profiles/${val}.webp" alt="loading">
     //           </div>
     //           <div class="user_name_chats">
     //                     <div class="chart_name">test_user_${val}</div>
     //                     <div class="chats_shot">hiii , bro</div>
     //           </div>
     //           <div class="time_no">
     //                     <div class="time">10:20pm</div>
     //           <div class="notification_no">${val}</div>
     //      </div>
     //      `;
     // }






function loading(bol) {
    if(bol== true){
     let val = 1;
     while (val <= 6) {
          document.getElementById('listChat').innerHTML += `
          <div class="user_box">
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
}
// window.onload = loading();


function LoadChatList() {
     console.log("callded:- LoadChatList");
     // .onload = loading();
     var db = firebase.database().ref('friend_list');
     db.on('value', function (lists) {
          document.getElementById('listChat').innerHTML =''; 
          lists.forEach(function (data) {
               var listchat_key=data.key;
               console.log(data.key);
               var lst = data.val(); 
               console.log(lst);
               var friendKey = '';
               if (lst.friend_id === currentUserKey) {
                    friendKey = lst.uid;
               }
               else if (lst.uid === currentUserKey) {
                    friendKey = lst.friend_id;
               }

               if (friendKey !== "") {
                    firebase.database().ref('users').child(friendKey).on('value', function (data) {
                         var user = data.val();
                         document.getElementById('listChat').innerHTML += `
                              <div class="user_box " id="${friendKey}" onclick="clickme(this.id)">
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
                         console.log("data loaded");
                    });
               }
          });
          bol=false;
          loading(bol);
     });
}


// function StartChat(friendKey, friendName, friendPhoto) {
//      var friendList = { friendId: friendKey, userId: currentUserKey };
//      friend_id = friendKey;

//      var db = firebase.database().ref('friend_list');
//      var flag = false;
//      db.on('value', function (friends) {
//           friends.forEach(function (data) {
//                var user = data.val();
//                if ((user.friendId === friendList.friendId && user.userId === friendList.userId) || ((user.friendId === friendList.userId && user.userId === friendList.friendId))) {
//                     flag = true;
//                     chatKey = data.key;
//                }
//           });

//           if (flag === false) {
//                chatKey = firebase.database().ref('friend_list').push(friendList, function (error) {
//                     if (error) alert(error);
//                     else {
//                          document.getElementById('chatPanel').removeAttribute('style');
//                          document.getElementById('divStart').setAttribute('style', 'display:none');
//                          hideChatList();
//                     }
//                }).getKey();
//           }
//           else {
//                document.getElementById('chatPanel').removeAttribute('style');
//                document.getElementById('divStart').setAttribute('style', 'display:none');
//                hideChatList();
//           }
//           ///////////////////////////
//           //display friend name and photo
//           document.getElementById('divChatName').innerHTML = friendName;
//           document.getElementById('imgChat').src = friendPhoto;

//           document.getElementById('messages').innerHTML = '';

//           document.getElementById('txtMessage').value = '';
//           document.getElementById('txtMessage').focus();
//           ////////////////////////////
//           // Display The chat messages
//           LoadChatMessages(chatKey, friendPhoto);
//      });
// }


function send_msg() {
     var message = document.getElementById('message').value;
     alert(message + " " + uid);
     document.getElementById('message').value = "";
}

function clickme(chat_user_id) {
     document.getElementById('chats').style = ``;

     firebase.database().ref('users').child(chat_user_id).on('value', function (data) {
               var user = data.val();
               console.log(user);
               document.getElementById('f_name').innerHTML = user.displayName;
               document.getElementById('f_img').src = user.photoURL;
     });


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

onFirebaseStateChanged();

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