import {getAllProducts} from "@/js/api/auth.js";

export function init() {
    const productsWrapper = document.getElementById('products-wrapper');
    const textMessage = document.getElementById("text-message");

    (async () => {
        try {
            const fragment = document.createDocumentFragment();

            productsWrapper.appendChild(fragment);
        } catch (e) {
            if (e instanceof Error) {
                textMessage.innerHTML = "<h2 class='w-full text-center'>در حال حاضر سرور در دسترس نمیباشد</h2>"
            } else {
                console.error("more: ", e)
            }
        }
    })()
}