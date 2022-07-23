

let list = document.querySelectorAll(".list");
for (let i = 0; i < list.length; i++) {
          list[i].onclick = (e) => {
                    let j = 0;
                    while (j < list.length) {
                              list[j++].className = "list";
                    }
                    list[i].className = "list active";
          };
}

list.forEach((elements) => {
          elements.addEventListener("click", function (event) {
                    let bg = document.querySelector("body");
                    let color = event.target.getAttribute("data-color");
                    console.log(event.target)
                    bg.style.backgroundColor = color;
          });
});