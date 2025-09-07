import {getAllProducts} from "@/js/api/auth.js";
import productBox from "@/js/component/product-box/productBox.js";

export function init() {
    const productsWrapper = document.getElementById('products-wrapper');
    const textMessage = document.getElementById("text-message");

    (async () => {
        try {
            const products = await getAllProducts();

            if (products[0]) {
                const fragment = document.createDocumentFragment();
                const res = await getAllProducts()

                res.forEach(product => {
                    fragment.appendChild(productBox(product));
                });

                productsWrapper.appendChild(fragment);
            } else {
                textMessage.innerHTML = "<h2 class='w-full text-center'>هیچ محصولی وجود ندارد</h2>"
            }
        } catch (e) {
            if (e instanceof Error) {
                textMessage.innerHTML = "<h2 class='w-full text-center'>در حال حاضر سرور در دسترس نمیباشد</h2>"
            } else {
                console.error("more: ", e)
            }
        }
    })()
}