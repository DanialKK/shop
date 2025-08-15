import "@/css/style.css"
import {themeControl} from "@/js/component/header/header.js";
import {renderSignup} from "@/js/account/signup.js";
import {renderLogin} from "@/js/account/login.js";
import {renderUserPanel} from "@/js/account/userPanel.js"
import {handleGetUserInfo} from "@/js/api/auth.js"
import {isRefreshTokenValid, removeToken} from "@/js/api/main-var.js";
import {renderAdminPanel} from "@/js/account/adminPanel.js";

const root = document.documentElement
const themeWrapper = document.getElementById("theme")
const loader = document.getElementById("loader-account")

const renderSPA = {
    "/account/login": {
        render: renderLogin,
        title: "صفحه ورود",
    },
    "/account/signup": {
        render: renderSignup,
        title: "صفحه ثبت نام"
    },
    "/account/user-panel": {
        render: renderUserPanel,
        title: "پنل کاربری"
    },
    "/account/admin-panel": {
        render: renderAdminPanel,
        title: "پنل ادمین"
    },
    404: {
        render: (() => {
            document.getElementById("app").innerHTML = `<h1 class="mx-auto text-center">آدرس اشتباهه</h1>`
        }),
        title: 404
    }
}

// toggle theme
themeControl.setTheme(themeWrapper, root);
themeWrapper.addEventListener("click", themeControl.changeThemeHandler.bind(null, root));

// show and hide password
const showHidePassword = () => {
    document.querySelectorAll("[data-toggle-password]").forEach((btn) => {
        const targetId = btn.getAttribute("data-target");
        const input = document.getElementById(targetId);
        if (!input) return;

        const eye = btn.querySelector("[data-eye]");
        const eyeOff = btn.querySelector("[data-eye-off]");

        btn.addEventListener("mousedown", (e) => e.preventDefault());

        btn.addEventListener("click", () => {
            const show = input.type === "password";
            input.type = show ? "text" : "password";

            if (eye && eyeOff) {
                eye.classList.toggle("hidden", show);
                eyeOff.classList.toggle("hidden", !show);
            }

            btn.setAttribute("aria-pressed", show ? "true" : "false");
            const label = show ? "مخفی کردن رمز عبور" : "نمایش رمز عبور";
            btn.setAttribute("aria-label", label);
            btn.setAttribute("title", label);
        });
    });
}

// manage loader
const showLoader = () => {
    if (loader) loader.style.display = "flex"
}
const hideLoader = () => {
    if (loader) setTimeout(() => loader.style.display = "none", 500)
}

function redirectAccountsPage(route) {
    setTimeout(() => {
        pushLink(`/account/${route}`)
        showLoader()
        router()
        hideLoader()
    }, 1000)
}

// render links
const handleLinks = () => {
    const spaAdminLinks = document.querySelectorAll("[data-spa-account-links]");

    spaAdminLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            pushLink(link.href);
            showLoader()
            router()
            hideLoader()
        })
    })
}
handleLinks()

// route and render pages
const router = () => {
    const path = window.location.pathname;
    const rout = renderSPA[path] || renderSPA[404]
    rout.render()
    document.title = rout.title
    handleLinks()
}

// push link to history
const pushLink = (link) => {
    history.pushState(null, null, link)
}

// render pages in loading address: /account/index.html
(async () => {
    const getRefreshTokenIsValid = isRefreshTokenValid();

    try {
        if (getRefreshTokenIsValid) {
            const getUserInfo = await handleGetUserInfo();

            if (getUserInfo.is_superuser) {
                pushLink(`/account/admin-panel`)
            } else {
                const tab = getTabPanelURL()
                if (tab) {
                    pushLink(`/account/user-panel?tab=${tab}`)
                } else {
                    pushLink("/account/user-panel")
                }
            }
            router()
        } else {
            removeToken()
            const mode = getModeFormURL()

            if (mode) {
                loadModeFormURL()
            } else {
                pushLink("/account/login")
                router()
            }
        }
    } catch (e) {
        console.log(e)
    }
})()

// load info or cart panel when user click the main header links
function getTabPanelURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab");
}

// load signup and login when click the header links
function getModeFormURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("mode");
}

function loadModeFormURL() {
    const mode = getModeFormURL();

    if (mode) {
        if (mode === "login") {
            pushLink("/account/login")
        } else if (mode === "signup") {
            pushLink("/account/signup")
        }
        router()
    }
}

loadModeFormURL();

// const categories = [
//     {
//         name: "بازی",
//         slug: "game",
//     },
//     {
//         name: "بنر",
//         slug: "banner",
//     },
//     {
//         name: "متفرقه",
//         slug: "more",
//     }
// ];

// create category
// (async () => {
//     try {
//         for (const category of categories) {
//             console.log(await handleCreateCategory(category.name, category.slug));
//         }
//     } catch (e) {
//         console.error(e);
//     }
// })();

// refresh token
// (async () => {
//     try {
//         const res = await handleRefreshToken()
//         console.log(res)
//         console.log(res.access)
//         console.log(res.refresh)
//     } catch (e) {
//         console.log(e)
//     }
// })();


window.addEventListener("popstate", router);
export {pushLink, router, showHidePassword, handleLinks, redirectAccountsPage, getTabPanelURL}
