import {getOneProducts} from "@/js/api/auth.js";
import productPage from "@/js/component/product-page/productPage.js"

export function init() {
    const productWrapper = document.getElementById('product-wrapper');
    const textMessage = document.getElementById("text-message");

    // product id in URLParams
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get("id");

    (async () => {
        try {
            const product = await getOneProducts(+productID);
            const template = productPage(product);
            productWrapper.insertAdjacentHTML("beforeend", template);
        } catch (e) {
            console.log(e)
            if (e instanceof Error) {
                textMessage.innerHTML = "<h2 class='w-full text-center'>در حال حاضر سرور در دسترس نمیباشد</h2>"
            } else {
                console.error("more: ", e)
            }
        }
    })()
}