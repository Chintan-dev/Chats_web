console.log(firebase.auth().currentUser.uid);

var starCountRef = firebase.database().ref('users');
var db = firebase.database().ref('friend_list');
var count = 0;

starCountRef.once('value', (snapshot, error) => {
    document.getElementById('get_data').innerHTML = "";
    snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        if (childData.email !== firebase.auth().currentUser.email) {
            var count_no = 0;
            db.on('value', function (lists) {
                lists.forEach(function (data) {
                    // var listchat_key=data.key;
                    //console.log(data.key);
                    var lst = data.val();
                    //console.log(lst);
                    var friendKey = '';
                    var flag = '';

                    if (lst.friend_id === currentUserKey) {
                        friendKey = lst.uid;
                    }
                    else if (lst.uid === currentUserKey) {
                        friendKey = lst.friend_id;
                    }

                    if (friendKey !== "") {
                        if (friendKey == childKey) {
                            console.log("friendKey:" + childData.displayName);
                            count_no++;
                            flag = 1;
                            if (count_no !== 2) {
                                data = `<div class="users_info">
                                            <div class="box_s"> 
                                                <div class="img_s">
                                                    <img src="${childData.photoURL}" id="photoURl" alt="">
                                                </div>
                                                <div class="username_s" id="displayName">
                                                        ${childData.displayName}
                                                </div>
                                            </div>
                                            <div class="s_btn" id="${childKey}" onclick="msg_id(this.id)">
                                                <button>message</button>
                                            </div>
                                        </div>`;
                                document.getElementById('get_data').innerHTML += data;
                            }
                        }
                    } else {
                        if (flag !== 1) {
                            if (friendKey !== childKey) {
                                count_no++;
                                console.log("not a friendKey:" + childData.displayName);
                                if (count_no !== 2) {
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
                            }
                        }
                    }
                    //console.log(" ");
                });
            });
            console.log("count_no:" + count_no);
            count++;
            console.log(count);
        }
    });
    console.log("loop end");
    console.log(count);
    if (error) alert(error)
    else {
        const bol = false;
        loading(bol);
    }
});