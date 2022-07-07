const body = document.querySelector('body')
const initialTheme = 'light'

const setTheme = (theme) => {
    localStorage.setItem('theme', theme)
    body.setAttribute('data-theme', theme)
}

const ToggleTheme = () => {
    const activeTheme = localStorage.getItem('theme');

    if (activeTheme === 'light') setTheme('dark');
    else setTheme('light');
}

const setThemeOnInit = () => {
    const savadTheme = localStorage.getItem('theme');
    savadTheme
        ?
        body.setAttribute('data-theme', savadTheme) :
        setTheme(initialTheme);
}
setThemeOnInit();


$(function () {
    $(".search_box").click(function () {
        $(".pop-box, .cover").show();
    });
    $(".cover, .x-btn").click(function () {
        $(".cover, .pop-box").hide();
    });
});


// get user data
search_list = [];
//function search() {
console.log("called");
var starCountRef = firebase.database().ref('Datas/users');

starCountRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        //console.log(childKey);
        //console.log(childData);
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
        search_list.push(data);
    });
    console.log(search_list);
    document.getElementById('get_data').innerHTML = search_list;
});
//}


function msg_id_send_in_db(uid_f) {
    const { displayName, photoURL, uid, email } = JSON.parse(localStorage.getItem('login_data'));
    firebase.database().ref('Datas/connect/' + uid).set({
        uid: uid,
        uid_f: uid_f
    });
    alert("success");
}