import {accessToken} from "@/js/admin/admin.js";

export const renderPanel = () => {
    const app = document.getElementById("app")

    if (accessToken) {
        app.innerHTML = `<section id="panel">
            <div class="container">
                <div class="text-center">
                    <h1 class="mx-auto">
                        پنل مدیریت
                    </h1>
                </div>
            </div>
        </section>`
        bindEvent()
    } else {
        app.innerHTML = `<div class="flex justify-center items-center flex-col gap-8">
<h2 class="mx-auto text-center">هنوز وارد نشدید، لطفا ابتدا وارد شوید</h2>
<a data-spa-admin-links href="/admin/login" class="primary-btn">ورود</a>
</div>`
    }
}

const bindEvent = () => {

}