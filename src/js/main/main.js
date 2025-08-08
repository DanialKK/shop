import "/src/css/style.css";
import * as headerComponent from "/src/js/component/header/header.js"
import {createScrollUp} from "/src/js/component/scroll-up/scroll-up.js";

const root = document.documentElement;

// include header
(async () => {
    await document.querySelector("header").replaceWith(headerComponent.createHeader());
    const btnNavMenu = document.getElementById("toggle-nav-menu")
    const themeWrapper = document.getElementById("theme")
    const menu = document.getElementById("menu")

    headerComponent.themeControl.setTheme(themeWrapper, root);

    // toggle nav menu
    btnNavMenu.addEventListener("click", e => {
        e.stopPropagation();
        headerComponent.navMenuHandler(btnNavMenu)
    });

    // closes menu while click on body
    document.addEventListener("click", e => {
        const path = e.composedPath();
        if (btnNavMenu.dataset.navMenu === "open" && !path.includes(menu)) {
            headerComponent.navMenuHandler(btnNavMenu)
        }
    })

    themeWrapper.addEventListener("click", headerComponent.themeControl.changeThemeHandler.bind(null, root))
})();

// include scroll-up button
// (async () => {
//     const scrollUp = await createScrollUp();
//     await document.body.append(scrollUp);
//     const el = document.getElementById("scroll-up");
//
//     window.addEventListener("scroll", () => {
//         if (window.scrollY >= 50) el.style.display = "flex";
//     }, {once:true})
// })()
