const body = document.querySelector('body')
const initialTheme = 'light'
// document.getElementById('toggle').innerHTML = `
//     <img src="./img/toggle_img/${initialTheme}.svg" alt="">
// `;

const setTheme = (theme) => {
    localStorage.setItem('theme', theme)
    body.setAttribute('data-theme', theme)
}

const ToggleTheme = () => {
    const activeTheme = localStorage.getItem('theme');


    if (activeTheme === 'light') {
        setTheme('dark');
        // document.getElementById('toggle').innerHTML = `
        // <img src="./img/toggle_img/${activeTheme}.svg" alt="">
        // `;
    } else {
        setTheme('light');
        // document.getElementById('toggle').innerHTML = `
        // <img src="./img/toggle_img/${activeTheme}.svg" alt="">
        // `;

    }
}

const setThemeOnInit = () => {
    const savadTheme = localStorage.getItem('theme');
    // document.getElementById('toggle').innerHTML = `
    //     <img src="./img/toggle_img/${savadTheme}.png" alt="">
    //     `;

    savadTheme
        ?
        body.setAttribute('data-theme', savadTheme) :
        setTheme(initialTheme);
}
setThemeOnInit();
