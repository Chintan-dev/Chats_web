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
