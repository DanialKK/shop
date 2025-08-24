import {themeControl} from "@/js/component/header/header.js";
import {redirectAccountsPage, showHidePassword} from "@/js/account/account.js";
import {handleGetUserInfo, handleLoginUser} from "@/js/api/auth.js";
import {serverDisconnect} from "@/js/api/api-utils.js";
import {renderAdminPanel} from "@/js/admin/admin-panel.js";

const root = document.documentElement
const themeWrapper = document.getElementById("theme")

themeControl.setTheme(themeWrapper, root);
themeWrapper.addEventListener("click", themeControl.changeThemeHandler.bind(null, root));

showHidePassword()
const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', e => {
    e.preventDefault()
    const textError = document.querySelector("[data-error-message-login]")
    textError.innerHTML = ""
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()
    const rememberMe = document.getElementById('remember-me').checked
    const userData = {username, password, rememberMe};

    (async () => {
        try {
            const userInfo = await handleGetUserInfo()

            if (userInfo?.is_superuser) {
                renderAdminPanel()
            } else {
                await handleLoginUser(userData)
                textError.innerHTML = ""
                document.querySelector("[data-success-login-message]").textContent = "لاگین موفقیت آمیز بود"

                redirectAccountsPage("user-panel")
                textError.textContent = "لطفا از بخش ویژه وارد شوید."
            }

        } catch (e) {
            if (e instanceof TypeError) {
                serverDisconnect(textError)
            } else {
                try {
                    const errObj = JSON.parse(e.message);
                    if (errObj.detail) {
                        textError.textContent = errObj.detail;
                    } else {
                        textError.textContent = "رمز یا نام کاربری اشتباه است.";
                    }
                } catch {
                    textError.textContent = e.message;
                }
            }
        }
    })()
})