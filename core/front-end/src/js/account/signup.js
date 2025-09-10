import {handleRegisterUser} from "@/js/api/auth.js"
import {showHidePassword, handleLinks, redirectAccountsPage} from "@/js/account/account.js";
import {serverDisconnect} from "@/js/api/api-utils.js";

const renderSignup = () => {
    const app = document.getElementById("app")
    app.innerHTML = `<section id="signup" class="flex items-center justify-center px-4 bg-custom-bg text-custom-text">
        <div class="w-full max-w-md space-y-8">
            <div class="text-center">
                <h2>فرم ثبت نام</h2>
                <p data-success-signup-message class="my-8 text-green-800 dark:text-green-600"></p>
            </div>

            <form id="register-form" class="space-y-6 bg-content-bg shadow-lg rounded-xl p-6 border border-custom-border">
                <div>
                    <label for="new-username" dir="ltr" class="block text-sm font-medium text-custom-text">نام کاربری</label>
                    <input placeholder="نام کاربری" dir="ltr" id="new-username" name="username" type="text" required class="mt-1 block w-full rounded-md border-2 border-custom-border bg-white p-2 text-black shadow-sm focus:border-2 outline-none focus:border-green-600 focus:ring-primary"/>
                </div>
                
                <div>
                    <label for="new-email" dir="ltr" class="block text-sm font-medium text-custom-text">ایمیل</label>
                    <input placeholder="ایمیل" dir="ltr" id="new-email" name="email" type="email" required class="mt-1 block w-full rounded-md border-2 border-custom-border bg-white p-2 text-black shadow-sm focus:border-2 outline-none focus:border-green-600 focus:ring-primary"/>
                </div>

                <div class="relative">
                    <label for="new-password" dir="ltr" class="block text-sm font-medium text-custom-text">رمز عبور</label>
                    <input placeholder="رمز عبور" dir="ltr" id="new-password" name="password" type="password" required class="mt-1 block w-full outline-none rounded-md border-2 border-custom-border text-black bg-white p-2 pr-10 shadow-sm focus:border-2 focus:border-green-600 focus:ring-primary" />
                    <button type="button" class="absolute pt-5 inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-primary focus:outline-none" data-toggle-password data-target="new-password" aria-label="نمایش رمز عبور" aria-pressed="false" title="نمایش رمز عبور">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-eye><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-eye-off><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.634 6.634A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.379 5.255"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"/></svg>
                  </button>
                </div>

                <div class="relative">
                    <label for="confirm-password" dir="ltr" class="block text-sm font-medium text-custom-text">تکرار رمز عبور</label>
                    <input placeholder="تکرار رمز عبور" dir="ltr" id="confirm-password" name="confirmPassword" type="password" required class="mt-1 block w-full outline-none rounded-md border-2 border-custom-border text-black bg-white p-2 pr-10 shadow-sm focus:border-2 focus:border-green-600 focus:ring-primary" />
                    <button type="button" class="absolute pt-5 inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-primary focus:outline-none" data-toggle-password data-target="confirm-password" aria-label="نمایش رمز عبور" aria-pressed="false" title="نمایش رمز عبور">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-eye><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-eye-off><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.634 6.634A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.379 5.255"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"/></svg>
                    </button>
                </div>

                <div>
                    <p data-error-message-register class="text-red-700 dark:text-red-500"></p>
                </div>

                <button type="submit" class="primary-btn w-full">
                    ثبت نام
                </button>

                <div>
                    قبلاً ثبت‌نام کرده‌اید؟
                    <a data-spa-account-links href="/account/login" class="text-green-600 hover:text-menu-link-hover transition-all duration-250">وارد شوید</a>
                </div>
            </form>
        </div>
    </section>`
    bindEvent()
}

const bindEvent = () => {
    handleLinks()
    showHidePassword()

    const form = document.getElementById("register-form")

    form.addEventListener("submit", event => {
        event.preventDefault()
        const textError = document.querySelector("[data-error-message-register]")
        textError.innerHTML = ""
        const username = document.getElementById("new-username").value.trim()
        const email = document.getElementById("new-email").value.trim()
        const password = document.getElementById("new-password").value.trim()
        const password2 = document.getElementById("confirm-password").value.trim()

        const dataUser = {username, email, password, password2};

        (async () => {
            try {
                await handleRegisterUser(dataUser)
                document.querySelector("[data-success-signup-message]").innerHTML = "ثبت نام موفقت امیز بود"
                textError.innerHTML = ""
                redirectAccountsPage("login")
            } catch (e) {
                if (e instanceof TypeError) {
                    serverDisconnect(textError)
                } else {
                   textError.textContent = e.message
                }
            }
        })();
    })
}

export {renderSignup}