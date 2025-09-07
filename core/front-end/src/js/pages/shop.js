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

                const allProductsTemplate = res.map(product => {
                    console.log(productBox(product));
                    fragment.appendChild(productBox(product));
                });

                console.log(allProductsTemplate);

                console.log(fragment);

                productsWrapper.appendChild(fragment);
            } else {
                textMessage.innerHTML = "<h2 class='w-full text-center'>هیچ محصولی وجود ندارد</h2>"
            }
        } catch (e) {
            if (e instanceof Error) {
                console.log(e)
                textMessage.innerHTML = "<h2 class='w-full text-center'>در حال حاضر سرور در دسترس نمیباشد</h2>"
            } else {
                console.error("more: ", e)
            }
        }
    })()
}