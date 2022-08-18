
var starCountRef = firebase.database().ref('users');
var db = firebase.database().ref('friend_list');

starCountRef.once('value', (snapshot) => {
    document.getElementById('get_data').innerHTML = "";
    snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        //console.log("search data:");
        //console.log(childData);
        console.log("search key:");
        console.log(childKey);

        if (childData.email !== firebase.auth().currentUser.email) {

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
                    <div class="s_btn" id="${childKey}" onclick="add_friend(this.id)">
                        <button>conncet</button>
                    </div>
                </div>`;
            document.getElementById('get_data').innerHTML += data;
        }
    });
});