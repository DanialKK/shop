import "@/css/style.css"
import {themeControl} from "@/js/component/header/header.js";
import {renderSignup} from "@/js/account/signup.js";
import {renderLogin} from "@/js/account/login.js";
import {renderPanel} from "@/js/account/panel.js";

const root = document.documentElement
const themeWrapper = document.getElementById("theme")
const accessToken = localStorage.getItem("access");
const loader = document.getElementById("loader-account")

const renderSPA = {
    "/admin/login": {
        render: renderLogin,
        title: "صفحه ورود",
    },
    "/admin/signup": {
        render: renderSignup,
        title: "صفحه ثبت نام"
    },
    "/admin/panel": {
        render: renderPanel,
        title: "پنل مدیریت"
    },
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
    if (loader) setTimeout(() => loader.style.display = "none", 300)
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
    const rout = renderSPA[path] || (()=>{
        document.getElementById("app").innerHTML = `<h1 class="mx-auto text-center">آدرس اشتباهه</h1>`
    })
    rout.render()
    document.title = rout.title
    handleLinks()
}

// push link to history
const pushLink = (link) => {
    history.pushState(null, null, link)
}

// render pages in loading address: /account/index.html
const checkAccessToken = () => {
    if (accessToken) {
        pushLink("/admin/panel")
        router()
    } else {
        pushLink("/admin/login")
        router()
    }
}
checkAccessToken();

window.addEventListener("popstate", router);
export {accessToken, pushLink, router, showHidePassword}
