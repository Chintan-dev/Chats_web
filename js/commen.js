

$(function () {
    $(".search_boxs").click(function () {
        $(".pop-box, .cover").show();

    });
    $(".cover, .x-btn").click(function () {
        $(".cover, .pop-box").hide();
    });


    $(".notifications_box").click(function () {
        $(".pop-box2, .cover").show();
    });
    $(".cover, .x-btn").click(function () {
        $(".cover, .pop-box2").hide();
    });
});


function alertFunction() {
    // alert('ok');
}
window.onload = alertFunction;


// get user data
var bol = true;
var friend = false;
loading(bol);
function search() {
    console.log("running: search");
    // firebase.database().ref('friend_list').child(chatKey).on('value', function (list, error) { });


    var starCountRef = firebase.database().ref('users');
    starCountRef.once('value', (snapshot) => {
        document.getElementById('get_data').innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log("search data:");
            console.log(childData);
            console.log("search key:");
            console.log(childKey);

            if (childData.email !== firebase.auth().currentUser.email) {
                // firebase.database().ref('friend_list').once('value', function (lists) {
                //     lists.forEach(function (data) {
                //         var lst = data.val();
                //         console.log(lst);
                //         if ((lst.uid === childKey) && (lst.friend_id === uid) || (lst.friend_id === childKey) && (lst.uid === uid)) {
                //             data = `<div class="users_info">
                //                         <div class="box_s"> 
                //                             <div class="img_s">
                //                                 <img src="${childData.photoURL}" id="photoURl" alt="">
                //                             </div>
                //                             <div class="username_s" id="displayName">
                //                                     ${childData.displayName}
                //                             </div>
                //                         </div>
                //                         <div class="s_btn" id="${childKey}" onclick="msg_id(this.id)">
                //                             <button>message</button>
                //                         </div>
                //                     </div>`;
                //             document.getElementById('get_data').innerHTML += data;
                //         } else {
                //             data = `<div class="users_info">
                //                         <div class="box_s"> 
                //                             <div class="img_s">
                //                                 <img src="${childData.photoURL}" id="photoURl" alt="">
                //                             </div>
                //                             <div class="username_s" id="displayName">
                //                                     ${childData.displayName}
                //                             </div>
                //                         </div>
                //                         <div class="s_btn" id="${childKey}" onclick="add_friend(this.id)">
                //                             <button>conncet</button>
                //                         </div>
                //                     </div>`;
                //             document.getElementById('get_data').innerHTML += data;
                //         }
                //     });
                // });
                data = `<div class="users_info">
                    <div class="box_s"> 
                        <div class="img_s">
                            <img src="${childData.photoURL}" id="photoURl" alt="">
                        </div>
                        <div class="username_s" id="displayName">
                                ${childData.displayName}
                        </div>
                    </div>
                    <div class="s_btn" id="${childKey}" onclick="add_friend(this.id)">
                        <button>conncet</button>
                    </div>
                </div>`;
                document.getElementById('get_data').innerHTML += data;
            }
        });
        const bol = false;
        loading(bol);
    });
}
search();
function loading(bol) {
    if (bol == true) {
        let val = 1;
        while (val <= 5) {
            document.getElementById('get_data').innerHTML += `
                <div  class="users_info" >
                    <div class="box_s">
                        <div class="img_s skeleton"></div>
                        <div class="username_s" id="displayName">
                            <div class="skeleton skeleton-text"></div>
                            <div class="skeleton skeleton-text"></div>
                        </div>
                    </div>
                    <div class="s_btn">
                        <button class="skeleton"></button>
                    </div>
                </div >`;
            val++;
        }
    }
}

function add_friend(friend_id) {
    const { uid } = JSON.parse(localStorage.getItem('User_data'));

    firebase.database().ref('friend_list').once('value', function (lists) {
        var found = 0;
        lists.forEach(function (data) {
            var lst = data.val();
            //console.log(lst);
            if ((lst.uid === friend_id) && (lst.friend_id === uid) || (lst.friend_id === friend_id) && (lst.uid === uid)) {
                //alert("found")
                found = 1;
            }
        });
        if (found !== 1) {
            firebase.database().ref('friend_list/').push({
                uid: uid,
                friend_id: friend_id
            });
            $(function () {
                $(".cover, .pop-box").hide();
            });
        } else {
            $(function () {
                $(".cover, .pop-box").hide();
            });
        }
    });
}

function msg_id(friend_id) {
    $(function () {
        $(".cover, .pop-box").hide();
    });
}
