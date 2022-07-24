

$(function () {
    $(".search_boxs").click(function () {
        $(".pop-box, .cover").show();
        // document.getElementById('pop-box').style.display = 'flex';
        // document.getElementById('cover').style.display = 'flex';
    });
    $(".cover, .x-btn").click(function () {
        $(".cover, .pop-box").hide();
    });
});


function alertFunction() {
    // alert('ok');
}
window.onload = alertFunction;


// get user data

function search() {
    console.log("called: search");
    var starCountRef = firebase.database().ref('Datas/users');

    starCountRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
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
                              <div class="connect" id="${childData.uid}" onclick="msg_id_send_in_db(this.id)">
                                  <button>connect</button>
                              </div>
                          </div>`;
                document.getElementById('get_data').innerHTML += data;
            }
        });
    });
}
search();

function msg_id_send_in_db(uid_f) {
    const { displayName, photoURL, uid, email } = JSON.parse(localStorage.getItem('login_data'));
    firebase.database().ref('Datas/connect/').push({
        uid: uid,
        uid_f: uid_f
    });
    alert("success");
}