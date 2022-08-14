const body = document.querySelector('body')
const initialTheme = 'light'
document.getElementById('toggle').innerHTML = `
    <img src="./img/toggle_img/${initialTheme}.svg" alt="">
    <span class="title">theme</span>
`;

const setTheme = (theme) => {
    localStorage.setItem('theme', theme)
    body.setAttribute('data-theme', theme)
}

const ToggleTheme = () => {
    const activeTheme = localStorage.getItem('theme');


    if (activeTheme === 'light') {
        setTheme('dark');
        document.getElementById('toggle').innerHTML = `
        <img src="./img/toggle_img/${activeTheme}.svg" alt="">
        <span class="title">theme</span>
        `;
    } else {
        setTheme('light');
        document.getElementById('toggle').innerHTML = `
        <img src="./img/toggle_img/${activeTheme}.svg" alt="">
        <span class="title">theme</span>
        `;

    }
}

const setThemeOnInit = () => {
    const savadTheme = localStorage.getItem('theme');
    document.getElementById('toggle').innerHTML = `
        <img src="./img/toggle_img/${savadTheme}.png" alt="">
        <span class="title">theme</span>
        `;

    savadTheme
        ?
        body.setAttribute('data-theme', savadTheme) :
        setTheme(initialTheme);
}
setThemeOnInit();
