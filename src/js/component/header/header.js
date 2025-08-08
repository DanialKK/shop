const createHeader = () => {
    const header = document.createElement('header');
    header.className = "py-3 z-20 fixed right-0 top-0 left-0 bg-white/0 backdrop-blur-[100rem]"
    header.innerHTML = `<div class="container bg-bg-top-menu rounded-4xl py-2">
        <div class="flex items-center justify-between">
            <a href="" class="flex items-center gap-1">
                <span class="text-2xl font-bold">Digix</span>
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3551 7.72248L12.8148 4.03793H4.46021V0H14.674L18.9959 4.97227L16.3551 7.72248Z" fill="#00C76D"/>
                    <path d="M14.6008 24H0V4.02161H4.27908V19.9621H12.4902L14.8206 17.0947L7.55581 9.9215L10.6494 7.13192L20.448 16.8066L14.6008 24Z" fill="#00C76D"/>
                    <path d="M31.3366 0.670288V6.14574L22.3937 13.8797L19.5027 10.9039L31.3366 0.670288Z" fill="#00C76D"/>
                    <path d="M32.0001 17.1725V22.8832L24.9968 16.2756L28.0222 13.4188L32.0001 17.1725Z" fill="#00C76D"/>
                </svg>
            </a>
            <nav>
                <span class="cursor-pointer md:hidden" id="toggle-nav-menu" data-nav-menu="close">
                    <svg class="-scale-100 rotate-x-180" data-icon-menu="open" width="22" height="20" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28 2C28 0.89375 27.1063 0 26 0H2C0.893749 0 0 0.89375 0 2C0 3.10625 0.893749 4 2 4H26C27.1063 4 28 3.10625 28 2ZM28 12C28 10.8938 27.1063 10 26 10H10C8.89375 10 8 10.8938 8 12C8 13.1062 8.89375 14 10 14H18H26C27.1063 14 28 13.1062 28 12ZM16 22C16 23.1063 16.8938 24 18 24H26C27.1063 24 28 23.1063 28 22C28 20.8937 27.1063 20 26 20H18C16.8938 20 16 20.8937 16 22Z" fill="var(--color-custom-text)"/>
                    </svg>
                    <svg data-icon-menu="close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-6 hidden">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </span>
                <ul id="menu" class="max-sm:text-sm font-semibold max-md:shadow-2xl flex items-start gap-6 max-md:flex-col max-md:bg-menu-bg max-md:backdrop-blur-lg transition-all duration-200 z-10 max-md:fixed max-md:-right-44 max-md:top-0 max-md:-bottom-2000 max-md:w-40 max-md:pr-2 max-md:pt-4 md:items-center md:text-lg">
                    <li>
                        <a href="" class="max-md:py-4 max-md:pl-4 text-custom-subtext hover:text-menu-link-hover transition-all duration-250">
                            خانه
                        </a>
                    </li>
                    <li>
                        <a href="" class="max-md:py-4 max-md:pl-4 text-custom-subtext hover:text-menu-link-hover transition-all duration-250">
                            درباره ما
                        </a>
                    </li>
                    <li>
                        <a href="" class="max-md:py-4 max-md:pl-4 text-custom-subtext hover:text-menu-link-hover transition-all duration-250">
                            خدمات
                        </a>
                    </li>
                    <li>
                        <a href="" class="max-md:py-4 max-md:pl-4 text-custom-subtext hover:text-menu-link-hover transition-all duration-250">
                            داستان ما
                        </a>
                    </li>
                    <li id="theme" class="cursor-pointer bg-primary-button-bg text-primary-button-text rounded-full p-1">
                        <svg data-icon-theme="dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        <svg data-icon-theme="light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 hidden">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    </li>
                </ul>
            </nav>
        </div>
    </div>`

    return header;
}

// toggle mobile menu
const navMenuHandler = elem => {
    const flagMenu = elem.dataset.navMenu;
    const openIcon = elem.querySelector("[data-icon-menu=open]");
    const closeIcon = elem.querySelector("[data-icon-menu=close]");
    const menu = document.getElementById("menu")

    elem.dataset.navMenu = flagMenu === "close" ? "open" : "close";

    openIcon.classList.toggle("hidden", elem.dataset.navMenu === "open");
    closeIcon.classList.toggle("hidden", elem.dataset.navMenu === "close");

    if (elem.dataset.navMenu === "open") {
        menu.style.right = "0"
    } else {
        menu.style.right = "-170px"
    }
}

// theme control
const themeControl = {
    changeThemeHandler: (root, event) => {
        const theme = JSON.parse(localStorage.getItem("theme")) === "dark" ? "light" : "dark";
        localStorage.setItem("theme", JSON.stringify(theme));
        themeControl.setTheme(event.currentTarget, root);
    },
    setTheme: (wrapper, root) => {
        const theme = JSON.parse(localStorage.getItem("theme")) === "dark" ? "dark" : "light";
        root.classList.toggle("dark", theme === "dark");
        wrapper.querySelector("[data-icon-theme=dark]").classList.toggle("hidden", theme === "light");
        wrapper.querySelector("[data-icon-theme=light]").classList.toggle("hidden", theme === "dark");
    },
};

export {createHeader, themeControl, navMenuHandler};
