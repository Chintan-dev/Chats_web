const { displayName, photoURL, uid, email } = JSON.parse(localStorage.getItem('login_data'));
if (uid) {
          const { displayName, photoURL, uid, email } = JSON.parse(localStorage.getItem('login_data'));
          document.getElementById("user_img").src = photoURL;
          LoadChatList()
} else {
          //logout();
          window.location = "login.html";
}


function LoadChatList() {
          console.log("callded:- LoadChatList");
          var db = firebase.database().ref('Datas/connect');
          db.on('value', function (lists) {
                    // document.getElementById('lstChat').innerHTML = `<li class="list-group-item" style="background-color:#f8f8f8;">
                    //               <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
                    //           </li>`;
                    lists.forEach(function (data) {
                              var lst = data.val();
                              var friendKey = '';
                              if (lst.uid_f === uid) {
                                        friendKey = lst.uid;
                              }
                              else if (lst.uid === uid) {
                                        friendKey = lst.uid_f;
                              }

                              if (friendKey !== "") {
                                        firebase.database().ref('Datas/users').child(friendKey).on('value', function (data) {
                                                  var user = data.val();
                                                  document.getElementById('listChat').innerHTML += `
                                                  <div class="user_box " id="${user.uid}" onclick="clickme(this.id)">
                                                            <div class="img_user">
                                                                      <img src="${user.photoURL}" alt="loading">
                                                            </div>
                                                            <div class="user_name_chats">
                                                                      <div class="chart_name">
                                                                                ${user.displayName}  
                                                                      </div>
                                                                      <div class="chats_shot">
                                                                                hiii , bro
                                                                      </div>
                                                            </div>
                                                            <div class="time_no">
                                                                      <div class="time">
                                                                                10:20pm
                                                                      </div>
                                                            <div class="notification_no">20
                                                            </div>
                                                  </div>`;
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
                    //////////////////////////////////////
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
          firebase.database().ref('Datas/users').child(f_id).on('value', function (data) {
                    var user = data.val();
                    document.getElementById('f_name').innerHTML = user.displayName;
                    document.getElementById('f_img').src = user.photoURL;

                    var btn = document.getElementById(f_id);
                    btn.classList.toggle("active");
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
