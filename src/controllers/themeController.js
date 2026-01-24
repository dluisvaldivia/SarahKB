export function getInitialTheme(){
    return localStorage.getItem("theme") || "light";
}

export function setTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme)
}