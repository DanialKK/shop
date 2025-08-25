import {themeControl} from "@/js/component/header/header.js";
import {showLoader, hideLoader, pushLink} from "@/js/account/account.js";
import {renderAdminPanel} from "@/js/admin/admin-panel.js";
import {renderLoginAdmin} from "@/js/admin/admin-login.js";

const renderSPA = {
    "/admin/login": {
        render: renderLoginAdmin,
        title: "صفحه ورود ادمین",
    },
    "/admin/panel": {
        render: renderAdminPanel,
        title: "پنل مدیریت ادمین",
    },
}

// variables
const root = document.documentElement
const themeWrapper = document.getElementById("theme")

// theme control
themeControl.setTheme(themeWrapper, root);
themeWrapper.addEventListener("click", themeControl.changeThemeHandler.bind(null, root));

function router() {
    const path = window.location.pathname;

}

function redirectAdminPage() {
    setTimeout(() => {
        pushLink(`/admin/panel`)
        showLoader()
        router()
        hideLoader()
    }, 1400)
}

export {redirectAdminPage}