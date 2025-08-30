import {getAllProducts} from "@/js/api/auth.js";
import {createProductBox} from "@/js/main/main.js"

export function init() {
    const productsWrapper = document.getElementById('products-wrapper');
    const textMessage = document.getElementById("text-message");

    (async () => {
        try {
            const products = await getAllProducts();
            const fragment = document.createDocumentFragment();
            products.reverse().forEach(product => {
                fragment.appendChild(createProductBox(product));
            })
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