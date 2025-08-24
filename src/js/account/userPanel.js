import {handleLogoutUser, handleGetUserInfo} from "@/js/api/auth.js"
import {redirectAccountsPage, getTabPanelURL} from "@/js/account/account.js";
import {serverDisconnect, tokenControl} from "@/js/api/api-utils.js";

const renderUserPanel = () => {
    const app = document.getElementById("app")
    const getAccessToken = tokenControl.accessToken

    if (getAccessToken) {
        app.innerHTML = `<div id="overlay" class="hidden fixed inset-0 -bottom-2000 bg-black/90 z-10"></div>
<div class="container mb-14">
                            <h1 class="mx-auto text-center">پنل کاربری</h1>
                         </div>
<section id="user-panel" class="container bg-content-bg rounded-2xl p-6 shadow-lg">
<aside class="flex flex-row max-xs:flex-col gap-4 items-baseline justify-center mx-auto w-72 max-xs:w-full space-y-6 max-xs:space-y-2 divide-x-2 max-xs:divide-x-0 max-xs:divide-y-2 max-xs:items-center divide-gray-500">
  <!-- تب اطلاعات حساب -->
  <div data-user-panel-tab-btn="info" class="max-xs:w-full max-xs:justify-center flex items-center gap-3 pl-4 max-xs:pl-0 cursor-pointer hover:bg-gray-400 p-2 hover:rounded-sm transition-all duration-100">
    <svg class="size-6 text-info-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4Z"/>
    </svg>
    <span class="text-sm font-normal text-custom-text sm:font-bold">اطلاعات حساب</span>
  </div>

  <!-- تب سبد خرید -->
  <div data-user-panel-tab-btn="cart" class="max-xs:w-full max-xs:justify-center flex items-center gap-3 cursor-pointer hover:bg-gray-400 p-2 hover:rounded-sm transition-all duration-100">
    <svg class="size-6 text-info-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13a1 1 0 0 0 1-1v-1H7.5M7 13h10"/>
    </svg>
    <span class="text-sm font-normal text-custom-text sm:font-bold">سبد خرید</span>
  </div>
</aside>
<hr>
  <!-- اطلاعات حساب -->
  <div data-user-panel-tab="info" data-user-panel-active="un-active" class="hidden p-6 sm:max-w-150 sm:mx-auto">
    <h2 class="text-xl font-bold mb-4">اطلاعات حساب</h2>
    <div class="space-y-4 max-xs:space-y-8 max-xs:*:text-sm max-xs:font-normal">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-info-text">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
        </svg>
        <span class="text-custom-subtext">نام کاربری: <strong id="username-panel">example</strong></span>
      </div>
      <div class="flex items-center gap-2">
        <svg class="size-6 text-info-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z"/>
        </svg>
        <span class="text-custom-subtext">ایمیل: <strong id="email-panel">example@example.com</strong></span>
      </div>
      <div class="flex items-center gap-2">
        <svg class="size-6 text-info-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4Z"/>
        </svg>
        <span class="text-custom-subtext">نوع کاربری: <strong id="user-type">نامشخص</strong></span>
      </div>
      <p data-success-message-logout class="min-h-6 text-green-700 dark:text-green-500"></p>
      <p data-error-message-logout  class="min-h-6 text-red-700 dark:text-red-500"></p>
      <div id="logout-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-fit max-w-120 bg-custom-bg  px-20 py-20 z-20 rounded-lg hidden max-xs:flex-col max-xs:w-full max-xs:px-0 items-center justify-center gap-4">
        <button id="logout-btn" class="text-nowrap min-w-fit cursor-pointer bg-red-700 hover:bg-red-900 text-white p-2 rounded-lg" type="button">خروج از حساب</button>
        <button id="stay-btn" class="text-nowrap min-w-fit cursor-pointer bg-green-800 hover:bg-green-900 text-white p-2 rounded-lg" type="button">ماندن در حساب</button>
      </div>
      <button id="open-logout-modal" class="max-xs:mb-0 primary-btn w-full mt-4 bg-red-700 hover:bg-red-900 text-white">خروج از حساب کاربری</button>
      <button id="get-info-btn" class="primary-btn w-full mt-4">گرفتن اطلاعات کاربری</button>
    </div>
  </div>

  <!-- سبد خرید -->
  <div data-user-panel-tab="cart" data-user-panel-active="active" class="block p-6 sm:max-w-150 sm:mx-auto mt-12">
    <h2 class="text-xl font-bold mb-4">سبد خرید</h2>
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-custom-border pb-2">
        <div class="flex items-center gap-2">
          <svg class="size-6 text-info-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13a1 1 0 0 0 1-1v-1H7.5M7 13h10"/>
          </svg>
          <span class="text-custom-subtext">محصول</span>
        </div>
        <span class="text-custom-text font-bold">0</span>
      </div>
      <div class="flex justify-between items-center mt-4">
        <span class="text-custom-subtext">جمع کل:</span>
        <span class="text-custom-text font-bold">0</span>
      </div>
      <button class="primary-btn w-full mt-4 bg-gray-600 cursor-auto" disabled>پرداخت</button>
    </div>
  </div>
</section>`;
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
    const getInfoBtn = document.getElementById("get-info-btn")
    const btnTabs = document.querySelectorAll("[data-user-panel-tab-btn]")
    const tabs = document.querySelectorAll("[data-user-panel-tab]");
    const textError = document.querySelector("[data-error-message-logout]");
    const textSuccess = document.querySelector("[data-success-message-logout]");
    const overlay = document.getElementById("overlay");
    const logoutModal = document.getElementById("logout-modal")
    const openLogoutModal = document.getElementById("open-logout-modal")
    const stayBtn = document.getElementById("stay-btn")

    function activeTabUI() {
        tabs.forEach(tab => {
            if (tab.dataset.userPanelActive === "active") {
                btnTabs.forEach(btn => {
                    if (btn.dataset.userPanelTabBtn === tab.dataset.userPanelTab) {
                        btn.style.backgroundColor = "var(--color-gray-500)"
                        btn.querySelector("span").style.color = "#fff"
                    } else {
                        btn.style.backgroundColor = "transparent"
                        btn.querySelector("span").style.color = "var(--color-custom-text)"
                    }
                })
            }
        })
    }

    function loadTab(key) {
        tabs.forEach(tab => {
            if (key === tab.dataset.userPanelTab) {
                tab.classList.remove("hidden")
                tab.classList.add("block")
                tab.dataset.userPanelActive = "active"
            } else {
                tab.classList.add("hidden")
                tab.classList.remove("block")
                tab.dataset.userPanelActive = "un-active"
            }
        })
        activeTabUI()
    }

    function getTab() {
        const params = getTabPanelURL()

        if (params) {
            loadTab(params);
        }
        activeTabUI()
    }

    getTab() // load info or cart tab, when click the links of main header links

    btnTabs.forEach(tab => {
        tab.addEventListener("click", e => {
            loadTab(e.currentTarget.dataset.userPanelTabBtn);
        })
    })
    openLogoutModal.addEventListener("click", () => {
        logoutModal.style.display = "flex";
        overlay.style.display = "block"
    })
    stayBtn.addEventListener("click", () => {
        logoutModal.style.display = "none";
        overlay.style.display = "none"
    })
    logoutBtn.addEventListener("click", e => {
        e.preventDefault();
        textError.innerHTML = "";
        // logout
        (async () => {
            try {
                const res = await handleLogoutUser()
                if (res.ok) textSuccess.innerHTML = "خروج موفقیت آمیز بود."
                tokenControl.removeAccessToken()
                redirectAccountsPage("login")
            } catch (e) {
                if (e instanceof TypeError) {
                    textError.textContent = "اتصال به سرور برقرار نشد، لطفا بعدا تلاش کنید"
                } else {
                    textError.textContent = e.message
                }
            }
        })();
    })
    // get user info
    getInfoBtn.addEventListener("click", () => {
        const usernamePanel = document.getElementById("username-panel")
        const emailPanel = document.getElementById("email-panel");
        const userType = document.getElementById("user-type");

        (async () => {
            try {
                const res = await handleGetUserInfo()
                usernamePanel.textContent = res.username
                emailPanel.textContent = res.email
                userType.textContent = res?.is_superuser ? "کاربر ویژه" : "کاربر معمولی";
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

export {renderUserPanel};
