import {showHidePassword, redirectAccountsPage} from "@/js/account/account.js"
import {handleLoginUser, handleGetUserInfo} from "@/js/api/auth.js"
import {serverDisconnect} from "@/js/api/api-utils.js";

const renderLogin = () => {
    const app = document.getElementById("app")
    app.innerHTML = `<section id="login" class="flex items-center justify-center px-4 bg-custom-bg text-custom-text">
        <div class="w-full max-w-md space-y-8">
            <div class="text-center">
                <h2>فرم لاگین</h2>
                <p data-success-login-message class="my-8 text-green-800 dark:text-green-600"></p>
            </div>

            <form id="login-form" class="space-y-6 bg-content-bg shadow-lg rounded-xl p-6 border border-custom-border">
                <div>
                    <label for="username" dir="ltr" class="block text-sm font-medium text-custom-text">نام کاربری</label>
                    <input placeholder="نام کاربری" dir="ltr" id="username" name="username" type="text" required class="mt-1 block w-full rounded-md border-custom-border bg-white border border-b-gray-400 p-2 text-black shadow-sm focus:border-primary focus:ring-primary"/>
                </div>
                
                <div class="relative">
                    <label for="password" dir="ltr" class="block text-sm font-medium text-custom-text">رمز عبور</label>
                    <input placeholder="رمز عبور" dir="ltr" id="password" name="password" type="password" required class="mt-1 block w-full rounded-md border-custom-border text-black bg-white border border-b-gray-400 p-2 pr-10 shadow-sm focus:border-primary focus:ring-primary" />
                    <button type="button" class="absolute pt-5 inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-primary focus:outline-none" data-toggle-password data-target="password" aria-label="نمایش رمز عبور" aria-pressed="false" title="نمایش رمز عبور">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-eye><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-eye-off><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.634 6.634A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.379 5.255"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"/></svg>
                      </button>
                </div>
                
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="remember-me" class="peer hidden" />
                    <span class="w-5 h-5 flex items-center justify-center border border-custom-text rounded bg-white peer-checked:bg-green-700 peer-checked:border-custom-text transition-all duration-200">
                        <svg class="w-4 h-4 text-white peer-checked:block hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                    <span class="text-sm text-custom-subtext">منو بخاطر بسپار</span>
                </label>

                <div>
                    <p data-error-message-login data-error-message class="text-red-700 dark:text-red-500"></p>
                </div>

                <button type="submit" class="primary-btn w-full">
                    ورود
                </button>

                <div>
                    در صورت ثبت نام نکردن،
                    <a data-spa-account-links href="/account/signup" class="text-green-600 hover:text-menu-link-hover transition-all duration-250">ثبت نام کنید</a>
                </div>
            </form>
        </div>
    </section>`

    bindEvent()
}

const bindEvent = () => {
    showHidePassword()
    const loginForm = document.getElementById('login-form')

    loginForm.addEventListener('submit', e => {
        e.preventDefault();

        (async () => {
            const loginData = getLoginData()
            loginData.textError.innerHTML = ""

            try {
                const userInfo = await handleGetUserInfo();

                if (userInfo?.is_superuser) {
                    loginData.textError.textContent = "لطفا از بخش ویژه وارد شوید."
                } else {
                    await handleLoginUser(loginData.username, loginData.password, loginData.rememberMe)
                    loginData.textError.innerHTML = ""
                    loginData.successMessage.textContent = "لاگین موفقیت آمیز بود"

                    redirectAccountsPage("user-panel")
                }
            } catch (e) {
                catchLoginError(e, loginData.textError)
            }
        })();
    })
}

function getLoginData() {
    const textError = document.querySelector("[data-error-message-login]")
    const successMessage = document.querySelector("[data-success-login-message]")
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()
    const rememberMe = document.getElementById('remember-me').checked
    return {username, password, rememberMe, textError, successMessage};
}

function catchLoginError(e, elem) {
    if (e instanceof TypeError) {
        serverDisconnect(elem)
    } else {
        try {
            const errObj = JSON.parse(e.message);
            if (errObj.detail) {
                elem.textContent = errObj.detail;
            } else {
                elem.textContent = "رمز یا نام کاربری اشتباه است.";
            }
        } catch {
            elem.textContent = e.message;
        }
    }
}

export {renderLogin}