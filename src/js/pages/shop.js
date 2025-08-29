import {getAllProducts} from "@/js/api/auth.js";
import {createProductBox} from "@/js/main/main.js"

export function init() {
    const productsWrapper = document.getElementById('products-wrapper');
    (async () => {
        try {
            const products = await getAllProducts();
            const fragment = document.createDocumentFragment();
            products.reverse().forEach(product => {
                fragment.appendChild(createProductBox(product));
            })
            productsWrapper.appendChild(fragment);
        } catch (e) {
            productsWrapper.innerHTML = "<h2 class='w-full text-center'>در حال حاضر سرور در دسترس نمیباشد</h2>"
            if (e instanceof Error) {
                console.log("server is disconnect: ", e)
            } else {
                console.error("more: ", e)
            }
        }
    })()
}