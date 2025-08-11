import {accessToken} from "@/js/account/account.js";
import {handleLogoutUser} from "@/js/api/auth.js"

const renderUserPanel = () => {
    const app = document.getElementById("app")

    if (accessToken) {
        app.innerHTML = `<h1>پنل کاربری</h1>
<button id="logout-btn" type="button" class="primary-btn">خروج از حساب کاربری</button>`;
        bindEvent();
    } else {
        app.innerHTML = `<div class="flex justify-center items-center flex-col gap-8">
    <h2 class="mx-auto text-center">هنوز وارد نشدید، لطفا ابتدا وارد شوید</h2>
    <a data-spa-account-links href="/account/login" class="primary-btn">ورود</a>
</div>`
    }
}

const bindEvent = () => {
    const logoutBtn = document.getElementById("logout-btn")

    logoutBtn.addEventListener("click", e => {
        e.preventDefault();
        // logout
        (async () => {
            try {
                const res = await handleLogoutUser()
                console.log(res)
                localStorage.removeItem("access")
                localStorage.removeItem("refresh")
                sessionStorage.removeItem("access")
                sessionStorage.removeItem("refresh")
            } catch (e) {
                console.error(e);
            }
        })();
    })
}

export {renderUserPanel};
