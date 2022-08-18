firebase.database().ref('friend_list').once('value', function (lists) {
    lists.forEach(function (data) {
        var lst = data.val();
        console.log(lst);
        if ((lst.uid === childKey) && (lst.friend_id === uid) || (lst.friend_id === childKey) && (lst.uid === uid)) {
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
        } else {
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
});