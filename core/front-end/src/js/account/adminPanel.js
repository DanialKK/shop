import {accessToken} from "@/js/account/account.js";
import {createCategory} from "@/js/api/auth.js";

export const renderAdminPanel = () => {
    const app = document.getElementById("app")

    if (accessToken) {
        app.innerHTML = `<section id="panel">
            <div class="container">
                <div class="text-center">
                    <h1 class="mx-auto">
                        پنل مدیریت
                    </h1>
                    <h2 id="session"></h2>
                </div>
                <div class="flex justify-center items-center">
                    <button class="primary-btn" id="add-category">
                        اضافه کردن دسته بندی
                    </button>
                </div>
            </div>
        </section>`
        bindEvent()
    } else {
        app.innerHTML = `<div class="flex justify-center items-center flex-col gap-8">
    <h2 class="mx-auto text-center">هنوز وارد نشدید، لطفا ابتدا وارد شوید</h2>
    <a data-spa-account-links href="/account/login" class="primary-btn">ورود</a>
</div>`
    }
}

const bindEvent = () => {
    const addCategory = document.getElementById("add-category")

    addCategory.addEventListener("click", () => {
        (async () => {
            const res = await createCategory("tests", "tests")
            console.log(res)
        })()
    })
}