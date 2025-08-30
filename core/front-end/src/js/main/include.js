import * as headerComponent from "@/js/component/header/header.js"
import {createFooter} from "@/js/component/footer/footer.js";
import {createScrollUp} from "@/js/component/scroll-up/scroll-up.js";
import {customObserver} from "@/js/main/main.js";
import {tokenControl} from "@/js/api/api-utils.js";
import {checkLoginStatus} from "@/js/account/loginStatus.js";

const root = document.documentElement;

document.addEventListener("DOMContentLoaded", () => {
    // include header
    (() => {
        document.querySelector("header").replaceWith(headerComponent.createHeader());
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

        // control account icons
        const dataAccountIconsLink = document.querySelectorAll("[data-account-icons-link]");
        const dataAccountIconsIcon = document.querySelectorAll("[data-account-icons-icon]");

        (async () => {
            try {
                const isAccess = await checkLoginStatus();
                if (isAccess) {
                    headerComponent.controlAccountIcons(dataAccountIconsLink, dataAccountIconsIcon, isAccess)
                } else {
                    tokenControl.removeAccessToken()
                    headerComponent.controlAccountIcons(dataAccountIconsLink, dataAccountIconsIcon, false)
                }
            } catch (e) {
                console.log(e)
            }
        })();

        themeWrapper.addEventListener("click", headerComponent.themeControl.changeThemeHandler.bind(null, root))
    })();

    // include footer
    (() => {
        document.querySelector("footer").replaceWith(createFooter());
    })();

    //include scroll-up button
    (() => {
        const scrollFlag = `<span id="scroll-up-flag"></span>`
        document.body.insertAdjacentHTML("afterbegin", scrollFlag);
        const scrollUp = createScrollUp();
        document.body.append(scrollUp);
        const el = document.getElementById("scroll-up");

        customObserver(document.getElementById("scroll-up-flag"), () => {
            el.style.opacity = "0";
            el.style.visibility = "hidden";
        }, () => {
            el.style.visibility = "visible";
            el.style.opacity = "1";
        })
    })();
})
